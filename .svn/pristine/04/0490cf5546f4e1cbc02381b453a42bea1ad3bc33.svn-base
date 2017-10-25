package com.mj.report.action;

import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mj.report.model.Details;
import com.mj.report.service.DetailsService;
import com.mj.report.util.ExportExcel;
import com.mj.report.util.StringUtil;

import net.sf.json.JSONArray;

@Controller
@RequestMapping("/details")
public class DetailsAction {
	@Autowired
	private DetailsService detailsService;
	/** 
	* @Title: First 
	* @Description: TODO(打開物流發起第一步) 
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	*/
	@RequestMapping("{details}")
	public String First(@PathVariable String details){
		return "admin/details/"+details;
	}
	/** 
	* @Title: getFirst 
	* @Description: TODO(获取物流第一步列表) 
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	*/
	@RequestMapping("getFirstList")
	@ResponseBody
	public String getFirst(HttpServletRequest request){
		String cs_request_date_search = StringUtil.nullToDefault(request.getParameter("cs_request_date_search"), "");
		String tranportation_number_search = StringUtil.nullToDefault(request.getParameter("tranportation_number_search"), "");
		String type_search = StringUtil.nullToDefault(request.getParameter("type_search"), "");
		String sap_delivery_order_search = StringUtil.nullToDefault(request.getParameter("sap_delivery_order_search"), "");
		Map<String, String> map = new HashMap<String,String>();
		map.put("cs_request_date_search", cs_request_date_search);
		map.put("tranportation_number_search",tranportation_number_search);
		map.put("type_search", type_search);
		map.put("sap_delivery_order_search", sap_delivery_order_search);
		List<Map<String, Object>> list = detailsService.getFirstList(map);
		//List<Details> list = detailsService.getFirstList1();
		JSONArray array = JSONArray.fromObject(list);
		return array.toString();
	}
	
	
	
	/** 
	* @Title: getFirst 
	* @Description: TODO(数据保存) 
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	*/
	@RequestMapping("treateFirst")
	@ResponseBody
	public boolean treateFirst(HttpServletRequest request,Details details){
		int flag = 0;
		if(details.getId() == 0){
			 flag = detailsService.insertSelective(details);
		}else{
			 flag = detailsService.updateByPrimaryKey(details);
		}
		return flag == 1 ? true : false;
	}
	
	
	/**
	 * @throws Exception 
	 * @throws IOException  
	* @Title: exportExcel 
	* @Description: TODO(导出excel) 
	* @param     设定文件 
	* @return void    返回类型 
	* @throws 
	*/
	@RequestMapping("export")
	public void exportExcel(HttpServletResponse response,HttpServletRequest request) throws Exception{
		String cs_request_date_search = StringUtil.nullToDefault(request.getParameter("cs_request_date_search"), "");
		String tranportation_number_search = StringUtil.nullToDefault(request.getParameter("tranportation_number_search"), "");
		String type_search = StringUtil.nullToDefault(request.getParameter("type_search"), "");
		String sap_delivery_order_search = StringUtil.nullToDefault(request.getParameter("sap_delivery_order_search"), "");
		Map<String, String> map = new HashMap<String,String>();
		map.put("cs_request_date_search", cs_request_date_search);
		map.put("tranportation_number_search",tranportation_number_search);
		map.put("type_search", type_search);
		map.put("sap_delivery_order_search", sap_delivery_order_search);
		List<Map<String, Object>> list = detailsService.getFirstList(map);
		if(list.size() != 0){
			//文件名，时间戳格式
			String fileName = "Excel-" + String.valueOf(System.currentTimeMillis()).substring(4, 13) + ".xls";
			//头信息
	        String headStr = "attachment; filename=\"" + fileName + "\"";  
	        response.setContentType("APPLICATION/OCTET-STREAM");  
	        response.setHeader("Content-Disposition", headStr);  
	        OutputStream out = response.getOutputStream();
	        //导出数据标题
	        String title = "物流管理";
	        //指定列名
	        String[] rowsName = new String[]{"序号","Cs_Request_Date",
	        								 "Tranportation_Number",
	        								 "Type",
	        								 "Customer",
	        								 "Ship_To_Location",
	        								 "City_Province",
	        								 "Request_EXW_Date",
	        								 "Pick_Up_Location",
	        								 "Request_Arrival_Date",
	        								 "Forwarder_Name",
	        								 "TruckType",
	        								 "运输下单日期",
	        								 "运输下单时间",
	        								 "要求车辆到厂时间",
	        								 "Truck_Pickup_Date",
	        								 "Truck_Arrival_Time",
	        								 "Truck_Left_Time",
	        								 "Loading_Duration",
	        								 "Loading_Duration_Breakdown",
	        								 "Truck_Plate",
	        								 "TruckType",
	        								 "Sap_Delivery_Order",
	        								 "Actual_Arrival_Customer_Date",
	        								 "Customer_Complain",
	        								 "Customer_Signed_Recipt_Request_Return_Date",
	        								 "Customer_Signed_Recipt_Actual_Return_Date"};  
		    List<Object[]>  dataList = new ArrayList<Object[]>();
		    for (Map<String, Object> map1 : list) {
				Object[] obj = new Object[27];
				obj[1] = map1.containsKey("cs_request_date") ? map1.get("cs_request_date").toString() :  "--";
				obj[2] = map1.containsKey("tranportation_number") ? map1.get("tranportation_number").toString() :  "--";
				obj[3] = map1.containsKey("type") ? map1.get("type").toString() :  "--";
				obj[4] = map1.containsKey("customer") ? map1.get("customer").toString() :  "--";
				obj[5] = map1.containsKey("ship_to_location") ? map1.get("ship_to_location").toString() :  "--";
				obj[6] = map1.containsKey("city_province") ? map1.get("city_province").toString() :  "--";
				obj[7] = map1.containsKey("request_exw_date") ? map1.get("request_exw_date").toString() :  "--";
				obj[8] = map1.containsKey("pick_up_location") ? map1.get("pick_up_location").toString() :  "--";
				obj[9] = map1.containsKey("request_arrival_date") ? map1.get("request_arrival_date").toString() :  "--";
				obj[10] = map1.containsKey("forwarder_name") ? map1.get("forwarder_name").toString() :  "--";
				obj[11] = map1.containsKey("trucktype") ? map1.get("trucktype").toString() :  "--";
				obj[12] = map1.containsKey("transport_order_date") ? map1.get("transport_order_date").toString() :  "--";
				obj[13] = map1.containsKey("transport_order_time") ? map1.get("transport_order_time").toString() :  "--";
				obj[14] = map1.containsKey("vehicle_planttime") ? map1.get("vehicle_planttime").toString() :  "--";
				obj[15] = map1.containsKey("truck_pickup_date") ? map1.get("truck_pickup_date").toString() :  "--";
				obj[16] = map1.containsKey("truck_arrival_time") ? map1.get("truck_arrival_time").toString() :  "--";
				obj[17] = map1.containsKey("truck_left_time") ? map1.get("truck_left_time").toString() :  "--";
				obj[18] = map1.containsKey("loading_duration") ? map1.get("loading_duration").toString() :  "--";
				obj[19] = map1.containsKey("loading_duration_breakdown") ? map1.get("loading_duration_breakdown").toString() :  "--";
				obj[20] = map1.containsKey("truck_plate") ? map1.get("truck_plate").toString() :  "--";
				obj[21] = map1.containsKey("trucktype1") ? map1.get("trucktype1").toString() :  "--";
				obj[22] = map1.containsKey("sap_delivery_order") ? map1.get("sap_delivery_order").toString() :  "--";
				obj[23] = map1.containsKey("actual_arrival_customer_date") ? map1.get("actual_arrival_customer_date").toString() :  "--";
				obj[24] = map1.containsKey("customer_complain") ? map1.get("customer_complain").toString() :  "--";
				obj[25] = map1.containsKey("customer_signed_recipt_request_return_date") ? map1.get("customer_signed_recipt_request_return_date").toString() :  "--";
				obj[26] = map1.containsKey("customer_signed_recipt_actual_return_date") ? map1.get("customer_signed_recipt_actual_return_date").toString() :  "--";
				dataList.add(obj);
			}
		    ExportExcel ex = new ExportExcel(title, rowsName, dataList);
	        ex.export(out);
		    
		    
		}
			
	}
	
	
	/** 
	* @Title: getFirst 
	* @Description: TODO(数据保存) 
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	*/
	@RequestMapping("treateFirst2")
	@ResponseBody
	public boolean treateFirst2(HttpServletRequest request,Details details){
		int flag = 0;
		flag = detailsService.updateByPrimaryKeySelective(details);
		return flag == 1 ? true : false;
	}
}
