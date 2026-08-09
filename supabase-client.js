/**
 * Supabase Client Integration & Cloud Vault Manager
 */

const SUPABASE_URL = 'https://varhxxerwjbcaorwfbzs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcmh4eGVyd2piY2FvcndmYnpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxOTU1NDIsImV4cCI6MjEwMTc3MTU0Mn0.PzKLseT-G_jyRTht_hGkopV33SSR-CZ4gJkZhzfgpTE';

// Initialize Supabase JS SDK client
let supabaseClient = null;
if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const SupabaseAuth = {
    currentUser: null,
    currentProfile: null,

    /**
     * Initialize session and check active login with instant local backup
     */
    async initSession() {
        // 1. Restore instantly from local storage cache
        try {
            const cached = localStorage.getItem('encweb_user');
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed.user) {
                    this.currentUser = parsed.user;
                    this.currentProfile = parsed.profile || {
                        id: parsed.user.id,
                        email: parsed.user.email,
                        username: parsed.user.email ? parsed.user.email.split('@')[0] : 'User'
                    };
                }
            }
        } catch (e) {
            console.warn('Local session restore note:', e);
        }

        if (!supabaseClient) return this.currentUser;

        try {
            // 2. Sync with Supabase Auth session token
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session?.user) {
                this.currentUser = session.user;
                await this.fetchProfile(session.user.id);
                this.saveLocalSession();
            } else if (!session && !this.currentUser) {
                this.currentUser = null;
                this.currentProfile = null;
                localStorage.removeItem('encweb_user');
            }

            supabaseClient.auth.onAuthStateChange(async (event, session) => {
                if (session?.user) {
                    this.currentUser = session.user;
                    await this.fetchProfile(session.user.id);
                    this.saveLocalSession();
                } else if (event === 'SIGNED_OUT') {
                    this.currentUser = null;
                    this.currentProfile = null;
                    localStorage.removeItem('encweb_user');
                }
                if (typeof updateAuthUI === 'function') updateAuthUI();
            });

            return this.currentUser;
        } catch (e) {
            console.warn('Supabase Auth init session error:', e);
            return this.currentUser;
        }
    },

    saveLocalSession() {
        try {
            if (this.currentUser) {
                localStorage.setItem('encweb_user', JSON.stringify({
                    user: this.currentUser,
                    profile: this.currentProfile
                }));
            } else {
                localStorage.removeItem('encweb_user');
            }
        } catch (e) {}
    },

    /**
     * Sign Up new user with email, password, and username
     */
    async signUp(email, password, username) {
        if (!supabaseClient) throw new Error('Supabase client not loaded.');

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password
        });

        if (error) throw error;
        if (!data.user) throw new Error('Failed to create user account.');

        // Insert Profile
        const { error: profileErr } = await supabaseClient
            .from('profiles')
            .insert([{ id: data.user.id, email, username }]);

        if (profileErr) {
            console.warn('Profile insert note:', profileErr.message);
        }

        this.currentUser = data.user;
        await this.fetchProfile(data.user.id);
        this.saveLocalSession();
        return data.user;
    },

    /**
     * Sign In existing user
     */
    async signIn(email, password) {
        if (!supabaseClient) throw new Error('Supabase client not loaded.');

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        this.currentUser = data.user;
        await this.fetchProfile(data.user.id);
        this.saveLocalSession();
        return data.user;
    },

    /**
     * Sign In with Google OAuth Provider
     */
    async signInWithGoogle() {
        if (!supabaseClient) throw new Error('Supabase client not loaded.');
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + window.location.pathname
            }
        });
        if (error) throw error;
        return data;
    },

    /**
     * Update current user password
     */
    async updatePassword(newPassword) {
        if (!supabaseClient) throw new Error('Supabase client not loaded.');
        const { data, error } = await supabaseClient.auth.updateUser({
            password: newPassword
        });
        if (error) throw error;
        return data;
    },

    /**
     * Sign Out
     */
    async signOut() {
        if (supabaseClient) {
            await supabaseClient.auth.signOut();
        }
        this.currentUser = null;
        this.currentProfile = null;
        localStorage.removeItem('encweb_user');
        if (typeof updateAuthUI === 'function') updateAuthUI();
    },

    /**
     * Fetch user profile from DB
     */
    async fetchProfile(userId) {
        if (!supabaseClient || !userId) return null;
        try {
            const { data, error } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (!error && data) {
                this.currentProfile = data;
            } else if (this.currentUser) {
                this.currentProfile = {
                    id: this.currentUser.id,
                    email: this.currentUser.email,
                    username: this.currentUser.email.split('@')[0]
                };
            }
            return this.currentProfile;
        } catch (e) {
            return null;
        }
    },

    /**
     * Delete current user profile, data, and session
     */
    async deleteAccount() {
        const cachedUser = (JSON.parse(localStorage.getItem('encweb_user') || '{}')).user;
        const user = this.currentUser || cachedUser;
        if (!user) throw new Error('No active session found.');
        const userId = user.id;

        if (supabaseClient) {
            // Pass user_id_to_delete to RPC function
            const { error: rpcErr } = await supabaseClient.rpc('delete_user_account', {
                user_id_to_delete: userId
            });

            if (rpcErr) {
                console.error('RPC delete_user_account error:', rpcErr);
                // Fallback manual table wipe if RPC function not created in Supabase yet
                await supabaseClient.from('friends').delete().or(`user_id.eq.${userId},friend_id.eq.${userId}`);
                await supabaseClient.from('secret_messages').delete().eq('sender_id', userId);
                await supabaseClient.from('profiles').delete().eq('id', userId);
            }
            try {
                await supabaseClient.auth.signOut();
            } catch (e) {}
        }

        this.currentUser = null;
        this.currentProfile = null;
        localStorage.removeItem('encweb_user');
        return true;
    }
};

const SupabaseFriends = {
    /**
     * Search users by username or email
     */
    async searchUsers(query) {
        if (!supabaseClient || !query || query.length < 2) return [];
        try {
            const { data, error } = await supabaseClient
                .from('profiles')
                .select('id, email, username')
                .or(`username.ilike.%${query}%,email.ilike.%${query}%`)
                .neq('id', SupabaseAuth.currentUser?.id || '')
                .limit(10);

            if (error) throw error;
            return data || [];
        } catch (e) {
            console.warn('User search error:', e);
            return [];
        }
    },

    /**
     * Add friend by user ID
     */
    async addFriend(friendId) {
        if (!supabaseClient || !SupabaseAuth.currentUser) throw new Error('Must be logged in.');

        const { data, error } = await supabaseClient
            .from('friends')
            .insert([
                { user_id: SupabaseAuth.currentUser.id, friend_id: friendId, status: 'accepted' }
            ]);

        if (error && !error.message.includes('duplicate key')) throw error;
        return true;
    },

    /**
     * Get accepted friends list for current user
     */
    async getFriends() {
        if (!supabaseClient || !SupabaseAuth.currentUser) return [];
        try {
            const { data, error } = await supabaseClient
                .from('friends')
                .select('friend_id, profiles!friends_friend_id_fkey(id, email, username)')
                .eq('user_id', SupabaseAuth.currentUser.id);

            if (error) {
                // Fallback: simple query
                const { data: rawFriends } = await supabaseClient
                    .from('friends')
                    .select('friend_id')
                    .eq('user_id', SupabaseAuth.currentUser.id);

                if (!rawFriends || rawFriends.length === 0) return [];
                const ids = rawFriends.map(f => f.friend_id);
                const { data: profs } = await supabaseClient
                    .from('profiles')
                    .select('id, email, username')
                    .in('id', ids);
                return profs || [];
            }

            return (data || []).map(d => d.profiles).filter(Boolean);
        } catch (e) {
            console.warn('Fetch friends error:', e);
            return [];
        }
    }
};

const SupabaseVault = {
    /**
     * Save cloud encrypted message with recipient permissions
     */
    async saveCloudMessage({ title, coverText, disguisedPayload, disguiseMode, accessType, recipientIds }) {
        if (!supabaseClient || !SupabaseAuth.currentUser) {
            throw new Error('Must be logged in to save to Cloud Vault.');
        }

        const payloadObj = {
            sender_id: SupabaseAuth.currentUser.id,
            title: title || 'Encrypted Message',
            cover_text: coverText,
            disguised_payload: disguisedPayload,
            disguise_mode: disguiseMode || 'stego-invisible',
            access_type: accessType || 'public',
            recipient_ids: recipientIds || []
        };

        const { data, error } = await supabaseClient
            .from('secret_messages')
            .insert([payloadObj])
            .select();

        if (error) throw error;
        return data?.[0];
    },

    /**
     * Load Cloud Messages visible to current user
     */
    async loadCloudMessages() {
        if (!supabaseClient || !SupabaseAuth.currentUser) return [];
        try {
            const userId = SupabaseAuth.currentUser.id;
            const { data, error } = await supabaseClient
                .from('secret_messages')
                .select('*')
                .or(`sender_id.eq.${userId},access_type.eq.public,recipient_ids.cs.{${userId}}`)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (e) {
            console.warn('Load cloud messages error:', e);
            return [];
        }
    }
};

const SupabaseChat = {
    /**
     * Send direct message to a friend
     */
    async sendMessage(recipientId, messageText) {
        if (!supabaseClient || !SupabaseAuth.currentUser) throw new Error('Must be logged in to chat.');

        const { data, error } = await supabaseClient
            .from('secret_messages')
            .insert([{
                sender_id: SupabaseAuth.currentUser.id,
                title: 'Direct Chat',
                cover_text: messageText,
                disguised_payload: messageText,
                disguise_mode: 'direct_chat',
                access_type: 'direct_chat',
                recipient_ids: [recipientId]
            }])
            .select();

        if (error) throw error;
        return data?.[0];
    },

    /**
     * Load direct chat messages between current user and friendId
     */
    async loadChatMessages(friendId) {
        if (!supabaseClient || !SupabaseAuth.currentUser || !friendId) return [];
        try {
            const userId = SupabaseAuth.currentUser.id;
            const { data, error } = await supabaseClient
                .from('secret_messages')
                .select('*')
                .eq('access_type', 'direct_chat')
                .or(`and(sender_id.eq.${userId},recipient_ids.cs.{${friendId}}),and(sender_id.eq.${friendId},recipient_ids.cs.{${userId}})`)
                .order('created_at', { ascending: true });

            if (error) throw error;
            return data || [];
        } catch (e) {
            console.warn('Load chat messages error:', e);
            return [];
        }
    },

    /**
     * Check unread incoming direct chat messages for current user since lastReadIsoTime
     */
    async checkUnreadChatCount(lastReadIsoTime) {
        if (!supabaseClient || !SupabaseAuth.currentUser) return 0;
        try {
            const userId = SupabaseAuth.currentUser.id;
            let query = supabaseClient
                .from('secret_messages')
                .select('id', { count: 'exact', head: true })
                .eq('access_type', 'direct_chat')
                .neq('sender_id', userId)
                .contains('recipient_ids', [userId]);

            if (lastReadIsoTime) {
                query = query.gt('created_at', lastReadIsoTime);
            }

            const { count, error } = await query;
            if (error) return 0;
            return count || 0;
        } catch (e) {
            return 0;
        }
    /**
     * Clear all chat messages between current user and friendId
     */
    async clearChatHistory(friendId) {
        if (!supabaseClient || !SupabaseAuth.currentUser || !friendId) return false;
        try {
            const userId = SupabaseAuth.currentUser.id;
            const { error } = await supabaseClient
                .from('secret_messages')
                .delete()
                .eq('access_type', 'direct_chat')
                .or(`and(sender_id.eq.${userId},recipient_ids.cs.{${friendId}}),and(sender_id.eq.${friendId},recipient_ids.cs.{${userId}})`);

            if (error) throw error;
            return true;
        } catch (e) {
            console.error('Clear chat history error:', e);
            throw e;
        }
    }
};

window.SupabaseAuth = SupabaseAuth;
window.SupabaseFriends = SupabaseFriends;
window.SupabaseChat = SupabaseChat;
