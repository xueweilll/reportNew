package com.mj.report.dao;

import java.util.List;

import com.mj.report.model.Menu;
/**
 * 栏目
 * @author MJ009
 *
 */
public interface MenuDao {

    Menu selectByPrimaryKey(Integer menuId);
    /**
     * 根据 parentid
     * @param pid
     * @return
     */
    List<Menu> getAllMenuByPId(Integer pid);
    /**
     * 根据主键id
     * @param id
     * @return
     */
    List<Menu> getAllMenuById(String []ids);
    
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
    List<Menu> findAllMenu();
}