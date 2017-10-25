package com.mj.report.service;

import java.util.List;
import java.util.Map;

import com.mj.report.model.ImportRecord;

public interface ImportRecordService {
	public int addRecord(ImportRecord record);
	
	  /**
     * 根据用户名查询，status = 0 正在解析中的记录
     * @param userName
     * @return
     */
    ImportRecord findRecord(String dataType);
    
    int updateById(ImportRecord im);
    
    /**
     * 导入记录
     * @return
     */
    List<ImportRecord> ImportRecordList();
    
    int findCountIRcord(Map map);
    
    List<ImportRecord> FindRecordList(Map map);
}
