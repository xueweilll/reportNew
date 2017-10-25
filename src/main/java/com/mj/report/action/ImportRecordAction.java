package com.mj.report.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mj.report.model.ImportRecord;
import com.mj.report.model.User;
import com.mj.report.service.ImportRecordService;

/**
 * 数据导入记录管理
 *@ClassName:ImportRecordAction.java
 *@author MJ009
 *@date 2016年9月13日
 *@Description TODO
 *
 */
@Controller
@RequestMapping("/irecord")
public class ImportRecordAction{
	@Resource
	ImportRecordService importRecordService;
	
	
	@RequestMapping(value="/toImportRecordList")
	public String toImportRecordList(Model model){
		return "admin/importRecord/importRecord_list";
	}
	
	
	/**
	 * 导入记录列表，json格式
	 * @param user
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/iRecordlist")
	 public String ulist(HttpServletRequest request) {
		//页面显示记录数
		int pageSize = Integer.parseInt(request.getParameter("limit"));
		//页码
		int pageIndex = Integer.parseInt(request.getParameter("pageIndex"));
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("notIn", (pageIndex-1)*pageSize);
		map.put("end", pageSize);
		map.put("startDate", request.getParameter("startDate"));
		map.put("endDate", request.getParameter("endDate"));
		map.put("userName", request.getParameter("userName"));
		//查询用户总数
		int totalNum = importRecordService.findCountIRcord(map);
		List<ImportRecord> ulist = importRecordService.FindRecordList(map);
        JSONObject obj = new JSONObject();
        obj.put("rows", ulist); //这里的 rows 和total 的key 是固定的
        obj.put("total", totalNum);
		return obj.toString(); 
	 }
}
