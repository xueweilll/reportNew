package com.mj.report.dao;

import java.util.List;

import com.mj.report.model.Role;

public interface RoleDao {
	/**
	 * 删除
	 * @param roleId
	 * @return
	 */
    int deleteByPrimaryKey(Integer roleId);
    
    /**
     * 添加角色
     * @param record
     * @return
     */
    int insert(Role record);

    int insertSelective(Role record);
    /**
     * 根据id查询
     * @param roleId
     * @return
     */
    Role selectByPrimaryKey(Integer roleId);
    
    /**
     * 修改角色
     * @param record
     * @return
     */
    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);
    
    /**
     * 查询所有角色
     * @return
     */
    List<Role> findAllRole(); 
    
    /**
     * 根据角色名查询
     * @param uname
     * @return
     */
    Role selectByRoleName(String uname);
    
    /**
     * 根据id，name查询角色
     * @param id
     * @param uname
     * @return
     */
    Role selectByIdAndName(Integer uid,String uname);
}