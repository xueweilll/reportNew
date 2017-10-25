package com.mj.report.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mj.report.dao.MenuDao;
import com.mj.report.model.Menu;
import com.mj.report.service.MenuService;
import com.mj.report.util.PasswordHelper;
@Service("menuService")
public class MenuServiceImpl implements MenuService {

	@Resource
	private MenuDao menuDao;
	@Resource
    private PasswordHelper passwordHelper;
	@Override
	public Menu selectById(Integer menuId) {
		return this.menuDao.selectByPrimaryKey(menuId);
	}
	@Override
	public List<Menu> getMenuList(Integer pid) {
		return menuDao.getAllMenuByPId(pid);
	}
	@Override
	public List<Menu> getMenuByIdList(String []ids) {
		return menuDao.getAllMenuById(ids);
	}
	@Override
	public int updateMenu(Menu menu) {
		return menuDao.updateMenu(menu);
	}
	@Override
	public int insertMenu(Menu menu) {
		return menuDao.insertMenu(menu);
	}
	@Override
	public int deleteByMenuId(Integer id) {
		return menuDao.deleteByMenuId(id);
	}
	@Override
	public List<Menu> findAll() {
		return menuDao.findAllMenu();
	}
	
}
