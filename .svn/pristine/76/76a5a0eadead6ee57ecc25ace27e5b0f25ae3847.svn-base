package com.mj.report.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.mj.report.model.Menu;
import com.mj.report.model.Role;
import com.mj.report.service.MenuService;
import com.mj.report.service.RoleService;
import com.mj.report.service.UserService;
import com.mj.report.util.TreeView;

/**
 * 
 *@ClassName:RoleAction.java
 *@author MJ009
 *@date 2016年7月12日
 *@Description 角色管理
 *
 */
@Controller
@RequestMapping("/role")
public class RoleAction {
	@Resource
	private RoleService roleService;
	@Resource
	private MenuService menuService;
	@Resource
	private UserService userService;
	protected Logger log = Logger.getLogger(this.getClass());
	
	/**
	 * 角色列表页面，
	 * @param m
	 * @return
	 */
	@RequestMapping(value = "/toRoleList")
	public String toRole(Model model){
		//菜单列表
		List<TreeView> treeList = new ArrayList<TreeView>();  
		List<Menu> mlist = menuService.findAll();
		for(Menu m:mlist){
			TreeView tree = new TreeView();
			tree.setId(m.getMenuId());
			tree.setName(m.getMenuName());
			tree.setpId(m.getParentMenuId());
			if(m.getIsLeaf() == 0){
				tree.setIsParent(true);
			}else{
				tree.setIsParent(false);
			}
			treeList.add(tree);
		}
		JSONArray json = (JSONArray) JSONArray.toJSON(treeList);
		model.addAttribute("allMenu", json.toString());
		 return "admin/role/role_list"; 
	}
	
	  //菜单树形结构  
  

	/**
	 * 角色列表初始化方法
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/rolelist")
	 public String rlist(HttpServletRequest request) {
		List<Role> rolelist = roleService.findAllRoleList();
		for(Role r:rolelist){
			//菜单id
			String rids[] = r.getMenuIds().split(",");
			//根据菜单id查询相关名称
			List<Menu> mlist = menuService.getMenuByIdList(rids);
			String minfo = "";
			for(Menu m:mlist){
				minfo += m.getMenuName()+",";
			}
			//拥有菜单名称集合
			r.setMenuList(minfo);
		}
		JSONArray json = (JSONArray) JSONArray.toJSON(rolelist);
		return json.toString(); 
	 }
	
	/**
	 * 角色cud操作
	 * @param request
	 * @param oper  区分操作类型
	 * @param user  user对象
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/editRole")
	public Boolean createRole(HttpServletRequest request, String oper,Role role){
		boolean success = false;
		if(StringUtils.isNotEmpty(oper)){
			if(oper.equals("addORedit")){//修改、新增操作，id不为空=修改
				if(role.getRoleId() != 0){
					roleService.updateById(role);
					log.info("修改角色：id="+role.getRoleId());
					success = true;
				}else{
					roleService.addRole(role);
					success = true;
				}
			}
			if(oper.equals("del")){
				String[] ids = request.getParameter("ids").split(",");
				for(String id:ids){
					//删除角色
					roleService.deleteById(Integer.parseInt(id));
					//删除角色对应的用户
					userService.deleteUserByRoleId(Integer.parseInt(id));
				}
				log.info("删除角色：id="+request.getParameter("ids"));
				success = true;
			}
		}
		return success;
	}
	
	
	/**
	 * 判断角色名是否存在
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/isExistsRole")
	public String ExistsRole(HttpServletRequest request){
		String uid = request.getParameter("roleId");
		String uname = request.getParameter("roleName");
		Role role = null;
		JSONObject jsonObject = new JSONObject();
		if(StringUtils.isNotEmpty(uid)){//uid不为空，表示修改
			role = roleService.selectByIdAndName(Integer.parseInt(uid), uname);
			if(null != role){
				jsonObject.put("valid", true);
			}else{
				role = roleService.selectByRoleName(uname);
				if(null != role){
					jsonObject.put("valid", false);
				}else{
					jsonObject.put("valid", true);
				}
			}
		}else{
			role = roleService.selectByRoleName(uname);
			if(null != role){
				jsonObject.put("valid", false);
			}else{
				jsonObject.put("valid", true);
			}
		}
		return jsonObject.toString();
	}
	
}
