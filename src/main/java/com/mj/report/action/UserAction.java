package com.mj.report.action;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.ExpiredCredentialsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.mj.report.model.ImportRecord;
import com.mj.report.model.Role;
import com.mj.report.model.User;
import com.mj.report.service.ImportRecordService;
import com.mj.report.service.RoleService;
import com.mj.report.service.UserService;
import com.mj.report.util.ExportExcel;
import com.mj.report.util.PasswordHelper;

/**
 * 
 *@ClassName:UserAction.java
 *@author MJ009
 *@date 2016年6月22日
 *@Description 用户管理
 *
 */
@Controller
@RequestMapping("/user")
public class UserAction {
	@Resource
	private UserService userService;
	@Resource
	private RoleService roleService;
	@Resource
    private PasswordHelper passwordHelper;
	@Resource
	private ImportRecordService importRecordService;
	protected Logger log = Logger.getLogger(this.getClass());
	//登录拦截
	@RequestMapping(value = "/login")  
    public String showLoginForm(HttpServletRequest req, Model model) { 
		Subject subject = SecurityUtils.getSubject();
		//如果用户登录状态已存在，则返回到首页，防止用户后退登录，一直跳转在登录页面
		if(StringUtils.isNotEmpty((String) subject.getPrincipal())){
			return "redirect:/"; 
		}else{
			String exceptionClassName = (String)req.getAttribute("shiroLoginFailure");  
	        String error = "";  
	        if(UnknownAccountException.class.getName().equals(exceptionClassName)) {  
	            error = "用户名/密码错误";  
	        } else if(IncorrectCredentialsException.class.getName().equals(exceptionClassName)) {  
	            error = "用户名/密码错误";  
	        } else if(ExcessiveAttemptsException.class.getName().equals(exceptionClassName)) {  
	            error = "输入错误次数过多,10分钟后重试";  
	        } else if(LockedAccountException.class.getName().equals(exceptionClassName)){
	        	error = "抱歉，该账号已被冻结！";  
	        } else if(ExpiredCredentialsException.class.getName().equals(exceptionClassName)){
	        	error = "凭证过期！"; 
	        }
	        if(req.getParameter("forceLogout") != null) {
	        	error = "您已经被管理员强制退出，请重新登录";
	        }
	        if(req.getParameter("kickout") != null) {
	        	error = "登录已失效，请重新登录";
	        }
	        log.info(error);
	        model.addAttribute("error", error);  
	        return "login"; 
		}
    }  
	
	
	//用户退出
	@RequestMapping(value = "/logout")  
	public String logout(HttpServletRequest request, Model model) {
		Subject subject = SecurityUtils.getSubject();
		log.info("用户退出！"+subject.getPrincipal());
//		if (subject.isAuthenticated()) {
			subject.logout(); // session 会销毁，在SessionListener监听session销毁，清理权限缓存
			log.info(subject);
//		}
		return "redirect:/"; 
	}
	//用户列表页面
	@RequestMapping(value = "/touserlist")
	public String touserlist(Model model){
		List<Role> rlist = roleService.findAllRoleList();
		model.addAttribute("rlist", rlist);
		return "admin/user/user_list"; 
	}
	//用户列表
	@ResponseBody
	@RequestMapping(value = "/userlist")
	 public String ulist(HttpServletRequest request,Model model) {
		//页面显示记录数
		int pageSize = Integer.parseInt(request.getParameter("limit"));
		//页码
		int pageIndex = Integer.parseInt(request.getParameter("pageIndex"));
		//起始位置条数
//		int offset = Integer.parseInt(request.getParameter("offset"));
//		offset+1,pageSize*pageIndex	map.put("notIn", (pageIndex-1)*(pageSize));
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("notIn", (pageIndex-1)*pageSize);
		map.put("end", pageSize);
		map.put("startDate", request.getParameter("startDate"));
		map.put("endDate", request.getParameter("endDate"));
		map.put("userName", request.getParameter("userName"));
		map.put("mobileNum", request.getParameter("mobileNum"));
		//查询用户总数
		int totalNum = userService.countUser(map);
		List<User> ulist = userService.findall(map);
        JSONObject obj = new JSONObject();
        obj.put("rows", ulist); //这里的 rows 和total 的key 是固定的
        obj.put("total", totalNum);
		return obj.toString(); 
	 }
	//用户CUD操作
	@ResponseBody
	@RequestMapping(value="/editUser")
	public Boolean createUser(HttpServletRequest request, String oper,User user){
		boolean success = false;
		if(StringUtils.isNotEmpty(oper)){
			if(oper.equals("addORedit")){//修改、新增操作，id不为空=修改
				if(user.getUserId() != 0){
					userService.updateById(user);
					log.info("用户修改-uid:"+user.getUserId());
					success = true;
				}else{
					user.setLatestLoginTime(null);
					user.setRegisterTime(new Timestamp(new Date().getTime()));
					user.setStatus("1");
					userService.addUser(user);
					success = true;
				}
			}
			if(oper.equals("del")){
				String[] ids = request.getParameter("ids").split(",");
				for(String id:ids){
					userService.deleteById(Integer.parseInt(id));
				}
				success = true;
			}
		}
		return success;
	}
	
	//判断新增用户名是否已存在
	@ResponseBody
	@RequestMapping(value="/isExistsUser")
	public String ExistsUser(HttpServletRequest request){
		String uid = request.getParameter("userId");
		String uname = request.getParameter("username");
		User user = null;
		JSONObject jsonObject = new JSONObject();
		if(StringUtils.isNotEmpty(uid)){//uid不为空，表示修改
			user = userService.selectIdAndName(Integer.parseInt(uid), uname);
			if(null != user){
				jsonObject.put("valid", true);
			}else{
				user = userService.selectByName(uname);
				if(null != user){
					jsonObject.put("valid", false);
				}else{
					jsonObject.put("valid", true);
				}
			}
		}else{
			user = userService.selectByName(uname);
			if(null != user){
				jsonObject.put("valid", false);
			}else{
				jsonObject.put("valid", true);
			}
		}
		return jsonObject.toString();
	}
	
	//冻结、解冻用户
	@ResponseBody
	@RequestMapping(value="/toLockUser")
	public Boolean lockUser(HttpServletRequest request){
		int status = Integer.parseInt(request.getParameter("status"));
		int sta = status == 1 ? 0 : 1;//如果status=1 ，赋值0.status=0，赋值1 
		int uid = Integer.parseInt(request.getParameter("userId"));
		int flag = userService.setUserStatus(sta, uid);
		log.info("用户状态修改-uid:"+uid);
		if(flag>0){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 上传excel
	 * @param request
	 * @return
	 * @throws IOException 
	 */
	@ResponseBody
	@RequestMapping(value="/importUser")
	public Boolean addUserExcel(HttpServletRequest request,@RequestParam(value = "filePath", required = false)MultipartFile filePath) throws IOException{
		Boolean success = false;
		String destDir = request.getServletContext().getRealPath("/")+"excelTempFile";
		try{
			File dir = new File(destDir);  
			 //路径不存在，创建
	        if(!dir.exists()){  
	            dir.mkdir();  
	        }  
	        //文件名重新生成
	        long file_new_name  = System.currentTimeMillis();
	        //文件名后缀
	        String suffix = filePath.getOriginalFilename().substring(filePath.getOriginalFilename().lastIndexOf("."));
	        File uploadFile = new File(destDir +"/"+ file_new_name+suffix);  
	        filePath.transferTo(uploadFile);
	        User user = (User)request.getSession().getAttribute("ADMIN_USER");
	        //修改导入记录表状态信息
	        ImportRecord im = new ImportRecord();
	        im.setAuthor(user.getUsername());
	        im.setComment("");
	        im.setFileName(file_new_name+suffix);
	        im.setFilePath(destDir +"/");
	        im.setImportTime(new Timestamp(new Date().getTime()));
	        im.setStatus(0);//正在解析
	        im.setDataType(request.getParameter("data_type"));
	        importRecordService.addRecord(im);
	        success = true;
	        //上传成功后，设置状态为，正在解析中
		}catch (Exception e){
			 e.printStackTrace();
			success = false;
		}
		return success;
	}
	
	/**
	 * 导出用户数据
	 * @param response
	 * @param request
	 * @return
	 * @throws Exception 
	 * 备注，导出的数据列中不能出现空值
	 */
	@ResponseBody
	@RequestMapping(value="/exportUser")
	public void exportUser(HttpServletResponse response,HttpServletRequest request) throws Exception{
		//文件名，时间戳格式
		String fileName = "Excel-" + String.valueOf(System.currentTimeMillis()).substring(4, 13) + ".xls";
		//头信息
        String headStr = "attachment; filename=\"" + fileName + "\"";  
        response.setContentType("APPLICATION/OCTET-STREAM");  
        response.setHeader("Content-Disposition", headStr);  
        OutputStream out = response.getOutputStream();
        //导出数据标题
        String title = "用户信息表格";
        //指定列名
        String[] rowsName = new String[]{"序号","用户名","真实姓名","手机号","邮件","注册时间","最后登录时间","状态","角色类型","备注"};  
	    List<Object[]>  dataList = new ArrayList<Object[]>();
	    //用户列表
	    List<User> ulist = userService.selectUserList();
	    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    Object[] objs = null;
	    for (User u:ulist) {  
	        objs = new Object[rowsName.length];  
	        objs[1] = u.getUsername();  
	        objs[2] = u.getName();  
	        objs[3] = u.getMobileNumber();  
	        objs[4] = u.getEmail();  
	        objs[5] = df.format(u.getRegisterTime()) ;
	        if(u.getLatestLoginTime() == null){
	        	objs[6] = "--";
	        }else{
	        	objs[6] =  u.getLatestLoginTime();
	        }
	        objs[7] = Integer.parseInt(u.getStatus()) == 1?"正常":"冻结";  
	        objs[8] = u.getRoleId();
	        objs[9] = u.getComment();
	        dataList.add(objs);  
	    }  
        ExportExcel ex = new ExportExcel(title, rowsName, dataList);
        ex.export(out);
	}
	
	/**
     * 修改密码
     * 
     * @param model
     * @param req
     * @return
     * @author dsc
     */
    @ResponseBody
    @RequestMapping("/changePWD")
    public String changePass(Model model, HttpServletRequest req)
    {
        Subject currentUser = SecurityUtils.getSubject();
        Session session = currentUser.getSession();
        User user = (User)session.getAttribute("ADMIN_USER");
        // 新密码
        String newPwd = req.getParameter("newPwd");
        // 当前密码
        String cpass = req.getParameter("cpass");
        // 密码盐设为当前用户的值，
        user.setSalt(user.getSalt());
        // 用加密的方法+固定的密码盐salt进行匹配。如果一致，表示密码相同
        String newPassword =
            new SimpleHash(passwordHelper.algorithmName, cpass, ByteSource.Util.bytes(user.getCredentialsSalt()),
                passwordHelper.hashIterations).toHex();
        if (!newPassword.equals(user.getPassword()))
        {
            return "1";// 新密码错误
        }
        else
        {
            User cuser = new User();
            cuser.setUserId(user.getUserId());
            cuser.setPassword(newPwd);
            cuser.setUsername(user.getUsername());
            // 根据用户id，密码，用户名，重新进行密码加密
            passwordHelper.encryptPassword(cuser);
            userService.updateById(cuser);
            return "0";
        }
        
    }
    
    
    /**
     * 上传头像.
     */
    @RequestMapping("avatarUpload")
    @ResponseBody
    public String avatarUpload(HttpServletRequest request,@RequestParam("avatar") MultipartFile avatar)
            throws Exception {
    	String destDir = request.getServletContext().getRealPath("/")+"headImg";
    	User user = (User)request.getSession().getAttribute("ADMIN_USER");
    	String imgurl = ""; 
    	try{
			File dir = new File(destDir);  
			 //路径不存在，创建
	        if(!dir.exists()){  
	            dir.mkdir();  
	        }  
	        //文件名重新生成
	        long file_new_name  = System.currentTimeMillis();
	        //文件名后缀
	        String suffix = avatar.getOriginalFilename().substring(avatar.getOriginalFilename().lastIndexOf("."));
	        File uploadFile = new File(destDir +"/"+ file_new_name+suffix);  
	        avatar.transferTo(uploadFile);
	       
	        User newUser = new User();
	        newUser.setUserId(user.getUserId());
	        newUser.setHeadUrl("/headImg/"+file_new_name+suffix);
	        imgurl = "/headImg/"+file_new_name+suffix;
	        userService.updateById(newUser);
	        
	        //上传成功后，设置状态为，正在解析中
		}catch (Exception e){
			 e.printStackTrace();
		}
        return imgurl;
    }
}


