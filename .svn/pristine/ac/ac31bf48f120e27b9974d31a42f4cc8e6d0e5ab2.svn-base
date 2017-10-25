package com.mj.report.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mj.report.dao.DetailsDao;
import com.mj.report.model.Details;
import com.mj.report.service.DetailsService;
@Service("detailsService")
public class DetailsServiceImpl implements DetailsService {
	@Autowired
	private DetailsDao detailsDao;
	
	@Override
	public int deleteByPrimaryKey(Integer id) {
		return detailsDao.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(Details record) {
		return detailsDao.insert(record);
	}

	@Override
	public int insertSelective(Details record) {
		return detailsDao.insertSelective(record);
	}

	@Override
	public Details selectByPrimaryKey(Integer id) {
		return detailsDao.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(Details record) {
		return detailsDao.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKeyWithBLOBs(Details record) {
		return detailsDao.updateByPrimaryKeyWithBLOBs(record);
	}

	@Override
	public int updateByPrimaryKey(Details record) {
		return detailsDao.updateByPrimaryKey(record);
	}

	@Override
	public List<Map<String, Object>> getFirstList(Map<String, String> map) {
		return detailsDao.getFirstList(map);
	}

	@Override
	public List<Details> getFirstList1() {
		return detailsDao.getFirstList1();
	}

}
