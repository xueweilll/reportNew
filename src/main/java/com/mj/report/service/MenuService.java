package com.mj.report.service;

import java.util.List;

import com.mj.report.model.Menu;

public interface MenuService {
	
	 Menu selectById(Integer menuId);

	 List<Menu> getMenuList(Integer pid);
    
	 List<Menu> getMenuByIdList(String []ids);
	 
	 
	 /**
     * 修改
     * @param menu
     * @return
     */
    int updateMenu(Menu menu);
    /**
     * 新增菜单
     * @param menu
     * @return
     */
    int insertMenu(Menu menu);
    
    /**
     * 删除
     * @param id
     * @return
     */
    int deleteByMenuId(Integer id);
    
    /**
     * 
     * @return
     */
    List<Menu> findAll();
}
