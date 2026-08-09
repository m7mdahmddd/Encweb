/**
 * CryptoEngine & Steganography Library
 * Provides AES-256-GCM encryption with PBKDF2 key derivation and clipboard-safe zero-width steganography.
 */

const CryptoEngine = {
    // Clipboard-Safe Zero-Width Encoding System:
    // Payload Data bits (NEVER use \uFEFF BOM which clipboards strip!):
    // ZW_0: Zero Width Space (\u200B) -> bit 0
    // ZW_1: Zero Width Non-Joiner (\u200C) -> bit 1
    //
    // Reserved Boundary Markers (\u200D Zero Width Joiner is reserved for markers):
    // START_MARKER: \u200D\u200D\u200B\u200D
    // END_MARKER:   \u200D\u200B\u200D\u200D
    START_MARKER: '\u200D\u200D\u200B\u200D',
    END_MARKER: '\u200D\u200B\u200D\u200D',

    // Legacy Markers (for backward compatibility decoding)
    LEGACY_START: '\u200C\u200D\uFEFF',
    LEGACY_END: '\uFEFF\u200D\u200C',
    LEGACY_START_2: '\uFEFF\u200D\uFEFF',
    LEGACY_END_2: '\u200D\uFEFF\u200D',

    // Emoji mapping palette (16 emojis for hex encoding 0-F)
    EMOJI_PALETTE: ['🌌', '🛸', '🚀', '🔮', '🔑', '🌟', '💎', '🌀', '⚡', '🔥', '🛡️', '🧬', '👁️', '✨', '🪐', '🎯'],

    /**
     * Derives an AES-GCM CryptoKey from a user password and salt
     */
    async deriveKey(password, salt) {
        const enc = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            enc.encode(password),
            'PBKDF2',
            false,
            ['deriveKey']
        );
        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    },

    /**
     * Encrypts plain text using AES-256-GCM with secret key password
     */
    async encryptText(plainText, password) {
        const enc = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await this.deriveKey(password, salt);

        const ciphertextBuffer = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            enc.encode(plainText)
        );

        // Combine salt (16 bytes) + IV (12 bytes) + Ciphertext into single Uint8Array
        const ciphertext = new Uint8Array(ciphertextBuffer);
        const combined = new Uint8Array(salt.length + iv.length + ciphertext.length);
        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(ciphertext, salt.length + iv.length);

        return combined;
    },

    /**
     * Decrypts combined byte array using AES-256-GCM and secret key password
     */
    async decryptBytes(combinedBytes, password) {
        if (!combinedBytes || combinedBytes.length < 28) {
            throw new Error('بيانات التشفير غير مكتملة أو تالفة.');
        }

        const salt = combinedBytes.slice(0, 16);
        const iv = combinedBytes.slice(16, 28);
        const ciphertext = combinedBytes.slice(28);

        const key = await this.deriveKey(password, salt);

        try {
            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                ciphertext
            );
            const dec = new TextDecoder();
            return dec.decode(decryptedBuffer);
        } catch (e) {
            throw new Error('كلمة المرور غير صحيحة أو تم تعديل النص المشفر.');
        }
    },

    /**
     * High-level async decrypt helper for any disguised text (stego, hex, or emoji)
     */
    async decrypt(disguisedText, password) {
        if (!disguisedText) throw new Error('نص تالف أو فارغ.');

        let bytes = null;
        if (this.hasHiddenPayload(disguisedText)) {
            bytes = this.zeroWidthToBytes(disguisedText);
        } else if (/^[0-9a-fA-F]+$/.test(disguisedText.trim())) {
            bytes = this.hexToBytes(disguisedText.trim());
        } else {
            bytes = this.emojiToBytes(disguisedText.trim());
        }

        return await this.decryptBytes(bytes, password);
    },

    /**
     * Converts byte array to zero-width invisible character string
     */
    bytesToZeroWidth(bytes) {
        let zwStr = this.START_MARKER;
        for (let i = 0; i < bytes.length; i++) {
            const byte = bytes[i];
            for (let bitIdx = 7; bitIdx >= 0; bitIdx--) {
                const bit = (byte >> bitIdx) & 1;
                zwStr += bit === 1 ? '\u200C' : '\u200B';
            }
        }
        zwStr += this.END_MARKER;
        return zwStr;
    },

    /**
     * Converts zero-width invisible character string back to byte array
     */
    zeroWidthToBytes(zwStr) {
        if (!zwStr) {
            throw new Error('لم يتم العثور على أي نص.');
        }

        // 1. Try modern clipboard-safe markers first
        let startIdx = zwStr.indexOf(this.START_MARKER);
        let endIdx = zwStr.lastIndexOf(this.END_MARKER);

        if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
            const payloadStr = zwStr.substring(startIdx + this.START_MARKER.length, endIdx);
            const bits = [];

            for (let i = 0; i < payloadStr.length; i++) {
                const ch = payloadStr[i];
                if (ch === '\u200B') bits.push(0);
                else if (ch === '\u200C') bits.push(1);
            }

            if (bits.length >= 224 && bits.length % 8 === 0) {
                const bytes = new Uint8Array(bits.length / 8);
                for (let i = 0; i < bits.length; i += 8) {
                    let byteVal = 0;
                    for (let b = 0; b < 8; b++) {
                        byteVal = (byteVal << 1) | bits[i + b];
                    }
                    bytes[i / 8] = byteVal;
                }
                return bytes;
            }
        }

        // 2. Fallback: extract zero-width payload bits even if markers were stripped by clipboard
        const payloadChars = (zwStr.match(/[\u200B\u200C]/g) || []);
        if (payloadChars.length >= 224 && payloadChars.length % 8 === 0) {
            const bytes = new Uint8Array(payloadChars.length / 8);
            for (let i = 0; i < payloadChars.length; i += 8) {
                let byteVal = 0;
                for (let b = 0; b < 8; b++) {
                    const bit = payloadChars[i + b] === '\u200C' ? 1 : 0;
                    byteVal = (byteVal << 1) | bit;
                }
                bytes[i / 8] = byteVal;
            }
            return bytes;
        }

        // 3. Fallback for legacy 2-bit quaternary encoding
        startIdx = zwStr.indexOf(this.LEGACY_START);
        endIdx = zwStr.lastIndexOf(this.LEGACY_END);
        if (startIdx === -1) startIdx = zwStr.indexOf(this.LEGACY_START_2);
        if (endIdx === -1) endIdx = zwStr.lastIndexOf(this.LEGACY_END_2);

        if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
            const payloadStr = zwStr.substring(startIdx + 3, endIdx);
            const zwChars = Array.from(payloadStr);

            if (zwChars.length >= 112 && zwChars.length % 4 === 0) {
                const legacyReverse = { '\u200B': 0, '\u200C': 1, '\u200D': 2, '\uFEFF': 3 };
                const bytes = new Uint8Array(zwChars.length / 4);

                for (let i = 0; i < zwChars.length; i += 4) {
                    const v1 = legacyReverse[zwChars[i]];
                    const v2 = legacyReverse[zwChars[i + 1]];
                    const v3 = legacyReverse[zwChars[i + 2]];
                    const v4 = legacyReverse[zwChars[i + 3]];

                    if (v1 !== undefined && v2 !== undefined && v3 !== undefined && v4 !== undefined) {
                        bytes[i / 4] = (v1 << 6) | (v2 << 4) | (v3 << 2) | v4;
                    }
                }
                return bytes;
            }
        }

        throw new Error('لم يتم العثور على أي شفرة مخفية صالحة داخل هذا النص.');
    },

    /**
     * Embeds invisible zero-width string inside a readable cover text
     */
    embedInCoverText(coverText, invisiblePayload) {
        if (!coverText || coverText.trim() === '') {
            coverText = 'Hope you are having a wonderful day!';
        }

        const firstSpaceIdx = coverText.indexOf(' ');
        if (firstSpaceIdx !== -1) {
            return coverText.slice(0, firstSpaceIdx + 1) + invisiblePayload + coverText.slice(firstSpaceIdx + 1);
        }
        return coverText + invisiblePayload;
    },

    /**
     * Checks if text contains zero-width steganographic payload
     */
    hasHiddenPayload(text) {
        if (!text) return false;
        if (text.includes(this.START_MARKER) && text.includes(this.END_MARKER)) return true;
        if (text.includes(this.LEGACY_START) && text.includes(this.LEGACY_END)) return true;
        if (text.includes(this.LEGACY_START_2) && text.includes(this.LEGACY_END_2)) return true;

        // Fallback check for raw zero-width payload bits
        const zwCount = (text.match(/[\u200B\u200C]/g) || []).length;
        return zwCount >= 224 && zwCount % 8 === 0;
    },

    /**
     * Converts byte array to emoji sequence
     */
    bytesToEmoji(bytes) {
        let result = '';
        for (let i = 0; i < bytes.length; i++) {
            const highNibble = (bytes[i] >> 4) & 0x0F;
            const lowNibble = bytes[i] & 0x0F;
            result += this.EMOJI_PALETTE[highNibble] + this.EMOJI_PALETTE[lowNibble];
        }
        return result;
    },

    /**
     * Converts emoji sequence back to byte array
     */
    emojiToBytes(emojiStr) {
        const emojis = Array.from(emojiStr.replace(/\s+/g, ''));
        if (emojis.length % 2 !== 0) {
            throw new Error('تسلسل الإيموجي غير مكتمل أو تالف.');
        }

        const bytes = new Uint8Array(emojis.length / 2);
        let byteIdx = 0;

        for (let i = 0; i < emojis.length; i += 2) {
            const highIdx = this.EMOJI_PALETTE.indexOf(emojis[i]);
            const lowIdx = this.EMOJI_PALETTE.indexOf(emojis[i + 1]);

            if (highIdx === -1 || lowIdx === -1) {
                throw new Error('يحتوي النص على إيموجي غريب ليس من ضمن الشفرة.');
            }

            bytes[byteIdx++] = (highIdx << 4) | lowIdx;
        }

        return bytes;
    },

    /**
     * Converts Uint8Array to Hex string
     */
    bytesToHex(bytes) {
        return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    },

    /**
     * Converts Hex string to Uint8Array
     */
    hexToBytes(hexStr) {
        const cleanHex = hexStr.replace(/[^0-9a-fA-F]/g, '');
        if (cleanHex.length % 2 !== 0) {
            throw new Error('نص Hex غير صحيح.');
        }
        const bytes = new Uint8Array(cleanHex.length / 2);
        for (let i = 0; i < cleanHex.length; i += 2) {
            bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
        }
        return bytes;
    }
};

if (typeof module !== 'undefined') {
    module.exports = CryptoEngine;
}
