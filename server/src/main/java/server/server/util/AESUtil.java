//package server.server.util;
//
//import org.springframework.stereotype.Component;
//
//import javax.crypto.Cipher;
//import javax.crypto.KeyGenerator;
//import javax.crypto.SecretKey;
//import javax.crypto.spec.SecretKeySpec;
//import java.util.Base64;
//
//@Component
//public class AESUtil {
//
//    private static final String ALGORITHM = "AES";
//    private static final String TRANSFORMATION = "AES";
//
//    public static SecretKey generateKey() throws Exception {
//        KeyGenerator keyGenerator = KeyGenerator.getInstance(ALGORITHM);
//        keyGenerator.init(128); // AES-128
//        return keyGenerator.generateKey();
//    }
//
//    public static String encrypt(String plainText, SecretKey key) throws Exception {
//        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
//        cipher.init(Cipher.ENCRYPT_MODE, key);
//        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes());
//        return Base64.getEncoder().encodeToString(encryptedBytes);
//    }
//
//    public static String decrypt(String encryptedText, SecretKey key) throws Exception {
//        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
//        cipher.init(Cipher.DECRYPT_MODE, key);
//        byte[] decodedBytes = Base64.getDecoder().decode(encryptedText);
//        byte[] decryptedBytes = cipher.doFinal(decodedBytes);
//        return new String(decryptedBytes);
//    }
//
//    public static String keyToString(SecretKey key) {
//        return Base64.getEncoder().encodeToString(key.getEncoded());
//    }
//
//    public static SecretKey stringToKey(String keyString) {
//        byte[] decodedKey = Base64.getDecoder().decode(keyString);
//        return new SecretKeySpec(decodedKey, 0, decodedKey.length, ALGORITHM);
//    }
//}
