package server.server.util;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.fail;

public class AESUtilTest {

    private static SecretKey key;
    private static String keyString;
    private static final String SESSION_ID = "mySessionId12345";

    @BeforeAll
    public static void setup() {
        try {
            // 키 생성
            key = AESUtil.generateKey();
            keyString = AESUtil.keyToString(key);
        } catch (Exception e) {
            fail("Failed to set up the key: " + e.getMessage());
        }
    }

    @Test
    public void testGenerateKey() {
        assertNotNull(key, "Key should not be null");
    }

    @Test
    public void testKeyToString() {
        assertNotNull(keyString, "Key string should not be null");
        assertFalse(keyString.isEmpty(), "Key string should not be empty");
    }

    @Test
    public void testStringToKey() {
        SecretKey retrievedKey = AESUtil.stringToKey(keyString);
        assertNotNull(retrievedKey, "Retrieved key should not be null");
        assertArrayEquals(key.getEncoded(), retrievedKey.getEncoded(), "Original key and retrieved key should be the same");
    }

    @Test
    public void testEncrypt() {
        try {
            String encryptedSessionId = AESUtil.encrypt(SESSION_ID, key);
            assertNotNull(encryptedSessionId, "Encrypted session ID should not be null");
            assertFalse(encryptedSessionId.isEmpty(), "Encrypted session ID should not be empty");
        } catch (Exception e) {
            fail("Encryption failed: " + e.getMessage());
        }
    }

    @Test
    public void testDecrypt() {
        try {
            String encryptedSessionId = AESUtil.encrypt(SESSION_ID, key);
            String decryptedSessionId = AESUtil.decrypt(encryptedSessionId, key);
            assertEquals(SESSION_ID, decryptedSessionId, "Decrypted session ID should match the original session ID");
        } catch (Exception e) {
            fail("Decryption failed: " + e.getMessage());
        }
    }

    @Test
    public void testFullEncryptionDecryptionCycle() {
        try {
            String encryptedSessionId = AESUtil.encrypt(SESSION_ID, key);
            SecretKey retrievedKey = AESUtil.stringToKey(keyString);
            String decryptedSessionId = AESUtil.decrypt(encryptedSessionId, retrievedKey);
            assertEquals(SESSION_ID, decryptedSessionId, "Decrypted session ID should match the original session ID");
        } catch (Exception e) {
            fail("Full encryption-decryption cycle failed: " + e.getMessage());
        }
    }
}
