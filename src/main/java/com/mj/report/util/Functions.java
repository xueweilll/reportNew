package com.mj.report.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.support.DefaultSubjectContext;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.mj.report.model.Menu;


/**
 * 
* @ClassName: Functions 
* @Description 拓展的相关方法
* @author dsc 
* @date 2016年6月28日  
*
 */
@Component
public class Functions {


    public static boolean in(@SuppressWarnings("rawtypes") Iterable iterable, Object element) {
        if(iterable == null) {
            return false;
        }
        return CollectionUtils.contains(iterable.iterator(), element);
    }
    //根据session获取在线用户名称
    public  String principal(Session session) {
        PrincipalCollection principalCollection =
                (PrincipalCollection) session.getAttribute(DefaultSubjectContext.PRINCIPALS_SESSION_KEY);

        return principalCollection == null?"":(String)principalCollection.getPrimaryPrincipal();
    }
    //判断是否被踢出登录
    public  boolean isForceLogout(Session session) {
        return session.getAttribute(Constants.SESSION_FORCE_LOGOUT_KEY) != null;
    }
    /**
     * 递归遍历当前用户角色对应的菜单
     * @param menuList  菜单集合
     * @param parentId  父id
     * @return
     */
    public List<Menu> treeMenuList( List<Menu> menuList, int parentId) {  
		 List<Menu> childMenu = new  ArrayList<Menu>();  
	       for (Menu m : menuList) {  
	           int menuId = m.getMenuId() ;
	           int pid = m.getParentMenuId();
	           if (parentId == pid) {
	        	   
	        	   List<Menu> c_node = treeMenuList(menuList, menuId);  
	        	   m.setChildren(c_node);
	               childMenu.add(m);  
	           }  
	       }  
	       return childMenu;  
	   }
    
}

