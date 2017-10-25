package com.mj.report.action;


import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mj.report.model.Menu;
import com.mj.report.service.MenuService;
import com.mj.report.util.TreeView;

/**
 * 
 * 菜单管理
 *
 */
@Controller
@RequestMapping("/menu")
public class MenuAction {
	@Resource
	private MenuService menuService;
	protected Logger log = Logger.getLogger(this.getClass());
	
	//菜单列表页面
	@RequestMapping(value = "/toMenuList")
	public String toMenuList(Model model){
		//菜单列表
		List<TreeView> treeList = new ArrayList<TreeView>();  
		List<Menu> mlist = menuService.findAll();
		for(Menu m:mlist){
			TreeView tree = new TreeView();
			tree.setId(m.getMenuId());
			tree.setName(m.getMenuName());
			tree.setpId(m.getParentMenuId());
			tree.setMids(m.getParentMenuIds());
			tree.setMurl(m.getMenuUrl());
			tree.setIsDefault(m.getIsDefault() == 0?true:false);
			tree.setIconUrl(m.getIconUrl());
			if(m.getIsLeaf() == 0){
				tree.setIsParent(true);
			}else{
				tree.setIsParent(false);
			}
			treeList.add(tree);
		}
		JSONArray json = (JSONArray) JSONArray.fromObject(treeList);
		model.addAttribute("allMenu", json.toString());
		return "admin/menu/menu_list"; 
	}
//	//菜单列表
//	@ResponseBody
//	@RequestMapping(value = "/menulist",produces = {"text/json;charset=UTF-8"})
//	 public String mlist(User user,HttpServletRequest request) {
//		int pid = request.getParameter("p_id") == null?0:Integer.parseInt(request.getParameter("p_id"));
//		List<TreeView> treeList = new ArrayList<TreeView>();
//		//封装成ztree对应的数据格式
//		List<Menu> mlist = menuService.getMenuList(pid);
//		for(Menu m:mlist){
//			TreeView tree = new TreeView();
//			tree.setId(m.getMenuId());
//			tree.setName(m.getMenuName());
//			tree.setpId(m.getParentMenuId());
//			tree.setMurl(m.getMenuUrl());
//			tree.setMids(m.getParentMenuIds());
//			tree.setIsDefault(m.getIsDefault() == 0?true:false);
//			if(m.getIsLeaf() == 0){
//				tree.setIsParent(true);
//			}else{
//				tree.setIsParent(false);
//			}
//			treeList.add(tree);
//		}
//		JSONArray json = JSONArray.fromObject(treeList);
//		return json.toString(); 
//	 }
	
	/**
	 * 菜单cud操作
	 * @param request
	 * @param oper  区分操作类型
	 * @param user  user对象
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/editMenu")
	public String createMenu(HttpServletRequest request, String oper,Menu menu){
		boolean success = false;
		JSONObject jsonObject = new JSONObject();
		int mid_new = 0;
		if(StringUtils.isNotEmpty(oper)){
			if(oper.equals("addORedit")){//修改、新增操作，id不为空=修改
				if(menu.getMenuId()!=0){
					menuService.updateMenu(menu);
					log.info("修改菜单:id="+menu.getMenuId());
					success = true;
					oper = "edit";
				}else{
					int mid = menu.getParentMenuId();
					Menu cmenu = new Menu();
					cmenu.setMenuId(mid);
					cmenu.setIsLeaf(0);
					menuService.updateMenu(cmenu);
					//父节点parentMenuids+menuid
					menu.setParentMenuIds(menu.getParentMenuIds()+ menu.getParentMenuId() + "-");
					menu.setAvailable(0);
					menuService.insertMenu(menu);
					success = true;
					oper = "add";
					mid_new = menu.getMenuId();
				}
			}
			if(oper.equals("del")){
				String[] ids = request.getParameter("ids").split(",");
				for(String id:ids){
//					menuService.deleteByMenuId(Integer.parseInt(id));
					//删除只更改状态
					Menu m = new Menu();
					m.setAvailable(1);
					m.setMenuId(Integer.parseInt(id));
					menuService.updateMenu(m);
				}
				log.info("删除菜单:id="+request.getParameter("ids"));
				success = true;
			}
		}
		 jsonObject.put("oper",oper);
		 jsonObject.put("success",success);
		 jsonObject.put("mid_new",mid_new);
		 jsonObject.put("menu", menu);
		return jsonObject.toString();
	}
	/**
	 * 拖拽菜单
	 */
	@ResponseBody
	@RequestMapping(value="/dragMenu")
	public void dragMenu(Menu menu){
		Menu m = menuService.selectById(menu.getParentMenuId());
		menu.setParentMenuIds(m.getParentMenuIds()+ m.getMenuId() + "-");
		menuService.updateMenu(menu);
	}
	
}
