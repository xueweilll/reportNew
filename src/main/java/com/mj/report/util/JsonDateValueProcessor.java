package com.mj.report.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
/**
 * json日期格式转换，防止封装时，页面取值日期格式不正确
 * @author MJ009
 *
 */
public class JsonDateValueProcessor implements JsonValueProcessor  {
	 private String format ="yyyy-MM-dd HH:mm:ss";  
	 public Object processArrayValue(Object value, JsonConfig config) {   
		    return process(value);   
		  }   
		  
	 public Object processObjectValue(String key, Object value, JsonConfig config) {   
	    return process(value);   
	 }   
	     
	 private Object process(Object value){   
	   if(value instanceof Date){   
	      SimpleDateFormat sdf = new SimpleDateFormat(format,Locale.UK);   
	      return sdf.format(value);   
	    }   
	    return value == null ? "" : value.toString();   
	  }   

}
