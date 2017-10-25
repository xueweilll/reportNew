package com.mj.report.util;

import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Service;

import com.mj.report.model.User;

/**
 * 
* @ClassName: PasswordHelper 
* @Description: shiro密码盐加密
* @author dsc 
* @date 2016年6月23日  
*
 */
@Service
public class PasswordHelper {
    private RandomNumberGenerator randomNumberGenerator = new SecureRandomNumberGenerator();

    public String algorithmName = "md5";
    public int hashIterations = 2;

    public void setRandomNumberGenerator(RandomNumberGenerator randomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public void setAlgorithmName(String algorithmName) {
        this.algorithmName = algorithmName;
    }

    public void setHashIterations(int hashIterations) {
        this.hashIterations = hashIterations;
    }
    //生成加密密码
    public void encryptPassword(User user) {
    	String pass ;
    	if(user.getPassword() == null || "".equals(user.getPassword())){
    		pass = Constants.DEFAULT_PASSWORD;
    	}else{
    		pass = user.getPassword();
    	}
        user.setSalt(randomNumberGenerator.nextBytes().toHex());
        String newPassword = new SimpleHash(
                algorithmName,
                pass,
                ByteSource.Util.bytes(user.getCredentialsSalt()),
                hashIterations).toHex();
        user.setPassword(newPassword);
    }
}
