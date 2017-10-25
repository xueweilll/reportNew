package com.mj.report.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

@Service
public class Constants
{
    
    protected Logger log = Logger.getLogger(this.getClass());
    
    // 当前用户
    public static final String CURRENT_USER = "user";
    
    // 踢出用户
    public static final String SESSION_FORCE_LOGOUT_KEY = "session.force.logout";
    
    // 在线用户名称
    public static final String SUBJECT_SESSION_KEY =
        "org.apache.shiro.subject.support.DefaultSubjectContext_PRINCIPALS_SESSION_KEY";
    
    // 默认用户密码
    public static final String DEFAULT_PASSWORD = "123456";
    
    // //积分计算服务地址
    public static String PointService = null;
    
    //文件保存路径
//    public static String fileSavaPath="";
    
    //项目ip
//    public static String projectIp="";
    
    
    // 初始化系统参数方法
    @PostConstruct
    public void InitParameter()
    {
    }
    
}
