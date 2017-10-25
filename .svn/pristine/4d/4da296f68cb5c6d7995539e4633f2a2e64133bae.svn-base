package com.mj.report.security.shiro.filter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.web.filter.PathMatchingFilter;
import org.springframework.beans.factory.annotation.Autowired;

import com.mj.report.service.UserService;
import com.mj.report.util.Constants;

/**
 * 
* @ClassName: SysUserFilter 
* @Description:  sysUserFilter用于根据当前登录用户身份获取User信息放入request；然后就可以通过request获取User。 
* @author dsc 
* @date 2016年6月24日  
* 
 */
public class SysUserFilter extends PathMatchingFilter {

    @Autowired
    private UserService userService;

    @Override
    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {

        String username = (String)SecurityUtils.getSubject().getPrincipal();
        request.setAttribute(Constants.CURRENT_USER, userService.selectByName(username));
        return true;
    }
}
