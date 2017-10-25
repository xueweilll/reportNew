package com.mj.report.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mj.report.dao.UserDao;
import com.mj.report.model.User;
import com.mj.report.service.UserService;
import com.mj.report.util.PasswordHelper;
@Service("userService")
public class UserServiceImpl implements UserService {

	@Resource
	private UserDao userDao;
	@Resource
    private PasswordHelper passwordHelper;
	@Override
	public User findById(Integer userId) {
		return this.userDao.selectByPrimaryKey(userId);
	}

	@Override
	public User selectByName(String uname) {
		return this.userDao.selectByUserName(uname);
	}

	@Override 
	@SuppressWarnings("rawtypes")
	public List<User> findall( Map map) {
		return this.userDao.findAllUser(map);
	}

	@Override
	public int addUser(User u) {
		//加密密码
        passwordHelper.encryptPassword(u);
		return this.userDao.insertSelective(u);
	}

	@Override
	public int deleteById(Integer id) {
		return this.userDao.deleteByPrimaryKey(id);
	}

	@Override
	public int updateById(User user) {
		return this.userDao.updateByPrimaryKeySelective(user);
	}

	@Override
	public int setUserStatus(Integer status,Integer uid) {
		return this.userDao.lockUserStatus(status,uid);
	}

	@Override
	public User selectIdAndName(Integer id, String uname) {
		return this.userDao.selectByIdAndName(id, uname);
	}

	@Override
	public int deleteUserByRoleId(Integer roleid) {
		return this.userDao.deleteByRoleId(roleid);
	}

	@Override
	public User selectByStudentId(String studentId) {
		return userDao.selectByStudentId(studentId);
	}

	@Override
	public User login_user(String name_num_tel) {
		return this.userDao.userToLogin(name_num_tel);
	}

	@Override
	public Integer selectByM_N_S(String name,String num,String tel) {
		return this.userDao.selectByMobile_Name_Stu(name,num,tel);
	}

	@Override
	@SuppressWarnings("rawtypes") 
	public int countUser(Map map) {
		return this.userDao.countUser(map);
	}

	@Override
	public List<User> selectUserList() {
		return this.userDao.selectUserList();
	}

	@Override
	public void insertBatchExcel(List<User> ulist) {
		this.userDao.insertBatch(ulist);
	}


}
