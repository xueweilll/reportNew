package com.mj.report.action;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.log4j.Logger;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mj.report.model.User;
import com.mj.report.util.Constants;
import com.mj.report.util.Functions;
import com.mj.report.util.JsonDateValueProcessor;

/**
 * 
* @ClassName: SessionController 
* @Description: 会话管理
* @author dsc 
* @date 2016年6月24日  
*
 */
@Controller
@RequestMapping("/sessions")
public class SessionAction {
	
	@Resource
	private SessionDAO sessionDAO; 
	@Resource
	private Functions functions;
	protected Logger log = Logger.getLogger(this.getClass());
	
	 //session列表页面
	@RequestMapping(value = "/tosessionlist")
	public String tosessionlist(){
		 return "admin/session/session_list"; 
	}
	
	//在线用户
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@ResponseBody
	@RequestMapping("/list")  
    public String list(Model model,ServletRequest request) {  
		//当前在线
        Collection<Session> sessions =  sessionDAO.getActiveSessions();
        //日期转为json固定格式
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class , new JsonDateValueProcessor());
        //转换json
        JSONArray  json = JSONArray.fromObject(sessions,jsonConfig);
        int i =0;
        //往shiro的session中手动添加元素
        for(Session se:sessions){
        	String currName = functions.principal(se);
        	if("".equals(currName)){
        		sessionDAO.delete(se);
        	}else{
        		Map addObj = new HashMap();
            	boolean iskick = functions.isForceLogout(se);
        		JSONObject firstObj = (JSONObject) json.get(i);
        		addObj.put("isKickedOut", iskick);//是否已被踢出
            	addObj.put("currName", currName);//用户名
        		addObj.put("onlineUser", ((User)request.getAttribute(Constants.CURRENT_USER)).getUsername());
        		firstObj.putAll(addObj);
        	}
        	i++;
        }
        return json.toString();  
    }
	//强制踢出用户
	@ResponseBody
	@RequestMapping("/{sessionId}/forceLogout")  
    public boolean forceLogout(@PathVariable("sessionId") String sessionId) {  
        try {  
            Session session = sessionDAO.readSession(sessionId);  
            if(session != null) {  
                session.setAttribute(Constants.SESSION_FORCE_LOGOUT_KEY, Boolean.TRUE);  
            }
            log.info("踢出用户ID="+sessionId);
        } catch (Exception e) {/*ignore*/}  
        return true;  
    }  
}
