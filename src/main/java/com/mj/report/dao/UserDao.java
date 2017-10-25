package com.mj.report.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.mj.report.model.User;

public interface UserDao {

	int insertSelective(User record);

	User selectByPrimaryKey(Integer id);

	// 修改
	int updateByPrimaryKeySelective(User record);

	// 根据用户名查询
	User selectByUserName(String uname);

	/**
	 * 根据手机号查询
	 * 
	 * @param tel
	 * @return
	 */
	Integer selectByMobile_Name_Stu(@Param("name") String name,
			@Param("num") String num, @Param("tel") String tel);

	/**
	 * 根据用户名、学号、手机号查询
	 * 
	 * @param name_num_tel
	 * @return
	 */
	User userToLogin(String name_num_tel);

	/**
	 * 查询用户列表
	 * @param start 起始条数
	 * @param end起始条数
	 * @param userName 用户名
	 * @param mobileNum 手机号
	 * @param studentId 学号
	 * @param lastTime 最后登录时间
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	List<User> findAllUser( Map map);
//	List<User> findAllUser(@Param("start") Integer start,
//			@Param("end") Integer end, @Param("userName") String userName,
//			@Param("mobileNuM") String mobileNum,
//			@Param("studentId") String studentId,
//			@Param("lastTime") String lastTime);
	
	/*8
	 * 所有用户
	 */
	List<User> selectUserList();
	
	// 插入
	int insert(User record);

	// 删除
	int deleteByPrimaryKey(Integer id);

	// 冻结账户-解冻账户
	int lockUserStatus(Integer status, Integer uid);

	/**
	 * 根据id，name查询用户
	 * 
	 * @param id
	 * @param uname
	 * @return
	 */
	User selectByIdAndName(Integer uid, String uname);

	/**
	 * 根据角色id删除用户
	 * 
	 * @param roleid
	 * @return
	 */
	int deleteByRoleId(Integer roleid);

	User selectByStudentId(String studentId);

	/**
	 * 用户总数
	 * 
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	int countUser( Map map);
	
	/**
	 * 批量插入-excel数据
	 */
	void insertBatch(List<User> ulist);
}