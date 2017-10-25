package com.mj.report.Interceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.mj.report.model.Menu;
import com.mj.report.service.MenuService;
/**
 *后台头部信息拦截器
* @ClassName: 
* @Description: 
* @author dsc 
* @date 2016年6月23日  
*
 */
public class CommonInterceptor implements HandlerInterceptor {
	@Resource
	private MenuService menuService;
	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response,
			Object arg2, ModelAndView arg3) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object arg2) throws Exception {
		String mname = request.getParameter("mid");
		if(StringUtils.isNotEmpty(mname)){
			Menu menu = menuService.selectById(Integer.parseInt(mname));
			request.setAttribute("menuName", menu.getMenuName());
			request.setAttribute("menuUrl", menu.getMenuUrl());
			request.setAttribute("menuId", menu.getMenuId());
			return true;
		}
		return true;
	}

}
