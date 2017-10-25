package com.mj.report.dao;

import java.util.List;
import java.util.Map;

import com.mj.report.model.Details;

public interface DetailsDao {
    int deleteByPrimaryKey(Integer id);

    int insert(Details record);

    int insertSelective(Details record);

    Details selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Details record);

    int updateByPrimaryKeyWithBLOBs(Details record);

    int updateByPrimaryKey(Details record);
    
    List<Map<String, Object>> getFirstList(Map<String, String> map);
    
    List<Details> getFirstList1();
}