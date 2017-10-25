package com.mj.report.action;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mj.report.model.Menu;
import com.mj.report.model.Role;
import com.mj.report.model.User;
import com.mj.report.service.MenuService;
import com.mj.report.service.RoleService;
import com.mj.report.util.Functions;


/**
 * 
 * @Description: 前端网站相关
 * @author dsc
 * @date 2016年6月28日
 *
 */
@Controller
public class HomeAction {

	@Resource
	MenuService menuService;
	@Resource
	RoleService roleService;
	@Resource
	private Functions functions;
	protected Logger log = Logger.getLogger(this.getClass());
	/**
	 * 后台首页
	 * 
	 * @param req
	 * @param model
	 * @return
	 */
	@RequestMapping("/")
	public String admin(HttpServletRequest req, Model model) {
		User loginUser = (User) req.getAttribute("user");
		Role role = roleService.selectById(loginUser.getRoleId());
		//非超管角色，跳转到首页
//		if(!role.getRoleName().equals("admin")){
//			return "redirect:/";
//		}
		//获取当前用户的角色id
		String roleIds[] = role.getMenuIds().split(",");
		//用来存储menuid对应的parentMenuIds
		String flag = "";
		//set筛选不重复数据
		Set<String> hSet = new HashSet<String>();
		for(String s:roleIds){
			//查找当前角色id的相关信息
			Menu ms = menuService.selectById(Integer.parseInt(s));
			//可能存在菜单被删除的情况
			if(null != ms){
				flag += ms.getParentMenuIds();
				//同时添加角色id
				hSet.add(s);
			}else{
				String menuIds = role.getMenuIds();
				//判断字符串出现位置，1, || ,1
				String new_mIds = menuIds.contains(s+",") == true?menuIds.replace(s+",", ""):menuIds.replace(","+s, "");
				Role new_role = new Role();
				new_role.setRoleId(role.getRoleId());
				new_role.setMenuIds(new_mIds);
				//修改全新menuIds
				roleService.updateById(new_role);
			}
			
		}
		String flag_id [] = flag.split("-");
		//将parentMenuIds和menuid组装进set集合中
		for(String sf:flag_id){
			hSet.add(sf);
		}
//		// 后台左侧栏目列表
		List<Menu> menulist = menuService.getMenuByIdList(hSet.toArray(new String[] {}));
		List<Menu> ml = functions.treeMenuList(menulist, 1);
//		System.out.println(ml);
		model.addAttribute("mlist", ml);
		log.info("初始化左侧栏目列表");
		return "admin/index";
	}
	
	/**
	 * 右侧内容部分
	 * @param req
	 * @param model
	 * @return
	 */
	@RequestMapping("/content")
	public String rightContent(HttpServletRequest req, Model model) {
		return "admin/layout/right";
	}
}
