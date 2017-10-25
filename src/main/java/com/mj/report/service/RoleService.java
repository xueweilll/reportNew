package com.mj.report.service;

import java.util.List;

import com.mj.report.model.Role;

public interface RoleService {
	
	 /**
     * 根据id查询
     * @param roleId
     * @return
     */
    Role selectById(Integer roleId);
    
    /**
     * 查询所有角色
     * @return
     */
    List<Role> findAllRoleList(); 
    
    /**
     * 添加角色
     * @param record
     * @return
     */
    int addRole(Role record);
    
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
    
    /**
     * 角色修改
     * @param role
     * @return
     */
    public int updateById(Role role);
    
    /**
     * 删除
     * @param id
     * @return
     */
    public int deleteById(Integer id);
}
