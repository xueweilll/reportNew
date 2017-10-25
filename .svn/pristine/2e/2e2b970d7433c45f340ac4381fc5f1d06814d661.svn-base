package com.mj.report.security.credential;

import java.sql.Timestamp;
import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import com.mj.report.model.User;
import com.mj.report.service.UserService;

/**
 * 密码匹配，限制登录次数
 * 
 * @ClassName: HCMatcher
 * @Description: 密码验证，且可以提供自己的盐，而不是随机生成盐
 * @author dsc
 * @date 2016年6月23日
 * 
 */
public class HCMatcher extends HashedCredentialsMatcher {
	@Resource
	private UserService userService;
	//集群中可能会导致出现验证多过5次的现象，因为AtomicInteger只能保证单节点并发      
	private Cache<String, AtomicInteger> passwordRetryCache;
	protected Logger log = Logger.getLogger(this.getClass());

	public HCMatcher(CacheManager cacheManager) {
		passwordRetryCache = cacheManager.getCache("passwordRetryCache");
	}

	@Override
	public boolean doCredentialsMatch(AuthenticationToken token,
			AuthenticationInfo info) {
		String username = (String) token.getPrincipal();
		// cache中的重试次数+1
		AtomicInteger retryCount = passwordRetryCache.get(username);
		if (retryCount == null) {
			retryCount = new AtomicInteger(0);
			passwordRetryCache.put(username, retryCount);
		}
		if (retryCount.incrementAndGet() > 5) {
			log.info("登录失败>5次，username=" + username);
			// 超过5次抛出异常
			throw new ExcessiveAttemptsException();
		}

		boolean matches = super.doCredentialsMatch(token, info);
		if (matches) {
			// System.err.println("登录成功！");
			// 清除cache中的记录，否则cache中的重试次数+1
			passwordRetryCache.remove(username);
			User currUser = userService.selectByName(info.getPrincipals()
					.toString());
			Subject subject = SecurityUtils.getSubject();
			Session session = subject.getSession();
			session.setAttribute("ADMIN_USER", currUser);

			// 更新最后登录时间
			User user = new User();
			user.setUserId(currUser.getUserId());
			user.setLatestLoginTime(new Timestamp(new Date().getTime()));
			userService.updateById(user);
			log.info("用户登录成功！username=" + username + "&&IP=" + session.getHost()
					+ "&&ID=" + session.getId() + "&&TIME="
					+ session.getStartTimestamp());
		}
		return matches;
	}
}
