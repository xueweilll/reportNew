package com.mj.report.service;

import java.util.List;
import java.util.Map;

import com.mj.report.model.User;

public interface UserService {
	public User findById(Integer id);
	
	 //根据用户名查询 
    public User selectByName(String uname);
    //用户列表
    @SuppressWarnings("rawtypes")
    public List<User> findall( Map map);
    //创建用户
    public int addUser(User u);
    //删除用户
    public int deleteById(Integer id);
    //修改
    public int updateById(User user);
    
    //冻结账户=解冻
    int setUserStatus(Integer status,Integer uid);
    
    User selectIdAndName(Integer id,String uname);
    
    /**
     * 根据角色id删除用户
     * @param roleid
     * @return
     */
    int deleteUserByRoleId(Integer roleid);
    
    User selectByStudentId(String studentId);
    
    /**
     * 登录查询
     * @param name_num_tel
     * @return
     */
    User login_user(String name_num_tel);
    
    /**
     * 根据手机号查询
     * @param tel
     * @return
     */
    Integer selectByM_N_S(String name,String num,String tel);
    /**
     * 用户总数
     * @return
     */
    @SuppressWarnings("rawtypes")
    int countUser( Map map);
    
    /**
	 * 所有用户
	 */
	List<User> selectUserList();
	
	/**
	 * 批量插入-excel数据
	 */
	void insertBatchExcel(List<User> ulist);
}
