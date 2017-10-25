package com.mj.report.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mj.report.dao.RoleDao;
import com.mj.report.model.Role;
import com.mj.report.service.RoleService;
@Service("roleService")
public class RoleServiceImpl implements RoleService {
	@Resource
	private RoleDao roleDao;
	@Override
	public Role selectById(Integer roleId) {
		return this.roleDao.selectByPrimaryKey(roleId);
	}
	@Override
	public List<Role> findAllRoleList() {
		return this.roleDao.findAllRole();
	}
	@Override
	public int addRole(Role record) {
		return this.roleDao.insert(record);
	}
	@Override
	public Role selectByRoleName(String uname) {
		return this.roleDao.selectByRoleName(uname);
	}
	@Override
	public Role selectByIdAndName(Integer uid, String uname) {
		return this.roleDao.selectByIdAndName(uid, uname);
	}
	@Override
	public int updateById(Role role) {
		return this.roleDao.updateByPrimaryKeySelective(role);
	}
	@Override
	public int deleteById(Integer id) {
		return this.roleDao.deleteByPrimaryKey(id);
	}

}
