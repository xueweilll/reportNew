package com.mj.report.util;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.mj.report.model.ImportRecord;
import com.mj.report.model.User;
import com.mj.report.service.ImportRecordService;
import com.mj.report.service.UserService;

/**
 * 定时任务相关方法
 *@ClassName:TimerTaskFunctions.java
 *@author MJ009
 *@date 2016年9月8日
 *@Description TODO
 *
 */
@Component
public class TimerTaskFunctions {
	
	@Resource
	PasswordHelper passwordHelper;
	@Resource
	UserService userService;
	@Resource
	ImportRecordService importRecordService;
	/**
	 * 数据库定时备份
	 *@ClassName:BackupDataBase.java
	 *@author MJ009
	 *@date 2016年8月24日
	 *@Description TODO
	 *
	 */
	private static String hostIP="192.168.1.24";
	private static String userName="root";
	private static String password="root";
	private static String savePath="D:/backupDatabase";
	private static String databaseName="library";
	private static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
	protected Logger log = Logger.getLogger(this.getClass());
	/**
	 *cron参数按顺序依次为
	 *秒（0~59）
	 *分钟（0~59）
	 *小时（0~23）
	 *天（月）（0~31，但是你需要考虑你月的天数）
	 *月（0~11）
	 *天（星期）（1~7 1=SUN 或 SUN，MON，TUE，WED，THU，FRI，SAT）
	 *年份（1970－2099）
	 *"0 0 12 * * ?" 每天中午12点触发 
	 * 1/5 * *  * * ?  每5秒执行一次  
	 */
	 @Scheduled(cron="0 0 1 * * ?")   //每天凌晨1点备份
     public void backHandle(){  
		 String fileName = dateFormat.format(new Date())+".sql";
			File saveFile = new File(savePath);
			if (!saveFile.exists()) {// 如果目录不存在
				saveFile.mkdirs();// 创建文件夹
			}
			if (!savePath.endsWith(File.separator)) {
				savePath = savePath + File.separator;
			}

			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append("mysqldump").append(" --opt").append(" -h").append(hostIP);
			stringBuilder.append(" --user=").append(userName) .append(" --password=").append(password).append(" --lock-all-tables=true");
			stringBuilder.append(" --result-file=").append(savePath + fileName).append(" --default-character-set=utf8 ").append(databaseName);
			try {
				System.out.println(stringBuilder.toString());
				Process process = Runtime.getRuntime().exec(stringBuilder.toString());
				if (process.waitFor() == 0) {// 0 表示线程正常终止。
					System.out.println("--------------");
		 			log.info("数据库定时备份：文件名--"+fileName+".sql--备份时间"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
				}
			} catch (IOException e) {
	 			log.info("数据库定时备份：备份出错-"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"-IOException-"+e);
				e.printStackTrace();
			} catch (InterruptedException e) {
	 			log.info("数据库定时备份：备份出错-"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"-IOException-"+e);
				e.printStackTrace();
			}
     } 
	 public MultipartFile filePath(MultipartFile filePath){
		 return filePath;
	 }
	/**
	 * 10s扫描一次用户上传的excel文件
	 */
//	 @Scheduled(cron="1/10 * *  * * ?")
//	 public void userExcel(){
//			List<String> columns = new ArrayList<String>();
//			columns.add("username");//用户名
//			columns.add("name");//真实姓名
//			columns.add("mobile_number");//手机号
//			columns.add("email");//email
//			ImportExcel.setColumns(columns);
//			StringBuffer str = new StringBuffer("导入时间:"+new Timestamp(new Date().getTime())+":");
////			//返回的json形式字符串
//			try {
//				//数据库查询当前用户上传，最新一条记录，状态：正在解析的数据
//		        ImportRecord im = importRecordService.findRecord("user");
//		        ImportRecord imp = new ImportRecord();
//		        File file = null;
//		        if(null != im){
//		        	//修改状态
//					imp.setId(im.getId());
//					imp.setStatus(1);
//					importRecordService.updateById(imp);
//					
//					file = new File(im.getFilePath()+im.getFileName());
//		        }
//				//判断文件是否存在
//				if(null != file && file.exists()){
//					String retJson = ImportExcel.readExcel(file); 
//					log.info("***********解析文件**********");
//					JSONArray arr =  JSONArray.fromObject(retJson);
//					//批量插入，user存放到list中
//					List<User> ulist = new ArrayList<User>();
//					//i从1开始，（不循环列头信息）
//					int size = 0;
//					for(int i = 1;i<arr.size();i++){
//						 JSONObject job = arr.getJSONObject(i);
//						//是否存在，否即插入
//						 int isu = userService.selectByM_N_S(job.getString("username"), null, null);
//						 int isTel = userService.selectByM_N_S(null, null, job.getString("mobile_number"));
//						 if(isu == 0 &&  isTel == 0){
//							 User user = new User();
//							 user.setUsername(job.getString("username"));
//			                 user.setName(job.getString("name"));
//			                 user.setMobileNumber(job.getString("mobile_number"));
//			                 user.setEmail(job.getString("email"));
//			                 user.setComment("无");
//							 user.setStatus("1");
//							 user.setLatestLoginTime(null);
//							 user.setRegisterTime(new Timestamp(new Date().getTime()));
//							 user.setRoleId(2);//学生
//							//加密密码
//						     passwordHelper.encryptPassword(user);
//							 ulist.add(user);
//						 }
//						 else{
//							 size ++;
//							 str.append("重复记录，手机号："+job.getString("mobile_number")+"--用户名:"+job.getString("username")+"\n");
//						 }
//					}
////					//一条命令SQL引擎默认是一次最多插入 1000 笔记录，最多 2100 个字段参数
//					log.info("***********正在导入数据************");
//					if(ulist.size()>0){
//						if(ulist.size()*11 >2100){
//							for(int i=0,s=0;i<ulist.size()/190;i++,s+=190){
//						    	userService.insertBatchExcel(ulist.subList(s,s+190));
//						    }
//						}else{
//							userService.insertBatchExcel(ulist);
//						}
//					}
//					int sum = arr.size()-size-1;
//					log.info("***********数据导入完成************其中以过滤掉"+size+"条重复数据"+",成功导入"+sum+"条数据");
//					str.append(size+"条重复数据"+",成功导入"+sum+"条数据");
//					 //修改状态
//			        ImportRecord impR = new ImportRecord();
//			        impR.setId(im.getId());
//			        impR.setStatus(2);
//					impR.setComment(str.toString());
//					importRecordService.updateById(impR);
//	 				// //解析完成后，设置状态为，已完成
//				}
////				else{
////					log.info("未扫描到相关文件，时间:"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Timestamp(new Date().getTime())));
////				}
//			} catch (Exception e) {
//				// TODO: handle exception
//				e.printStackTrace();
//				str.append("导入失败,错误信息"+e);
//				log.info("导入信息："+str);
//			}
//	 }
}
