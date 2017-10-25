package com.mj.report.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mj.report.dao.ImportRecordDao;
import com.mj.report.model.ImportRecord;
import com.mj.report.service.ImportRecordService;
/**
 * 
 *@ClassName:ImportRecordServiceImpl.java
 *@author MJ009
 *@date 2016年9月13日
 *@Description TODO
 *
 */
@Service("importRecordService")
public class ImportRecordServiceImpl implements ImportRecordService {

	@Resource
	ImportRecordDao importRecordDao;
	@Override
	public int addRecord(ImportRecord record) {
		return this.importRecordDao.insert(record);
	}
	@Override
	public ImportRecord findRecord(String dataType) {
		return this.importRecordDao.findRec(dataType);
	}
	@Override
	public int updateById(ImportRecord im) {
		return this.importRecordDao.updateByPrimaryKeySelective(im);
	}
	@Override
	public List<ImportRecord> ImportRecordList() {
		return this.importRecordDao.iRecordList();
	}
	@SuppressWarnings("rawtypes")
	@Override
	public int findCountIRcord(Map map) {
		return this.importRecordDao.countIRecord(map);
	}
	@SuppressWarnings("rawtypes")
	@Override
	public List<ImportRecord> FindRecordList(Map map) {
		return this.importRecordDao.findAllIRecord(map);
	}

}
