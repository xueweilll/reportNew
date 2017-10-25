package com.mj.report.security.freemarker;

import java.io.IOException;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.jagregory.shiro.freemarker.ShiroTags;

import freemarker.template.TemplateException;

/**
 * 
* @ClassName: ShiroTagFreeMarkerConfigurer 
* @Description: 方便扩展freemarker中使用shiro标签
* @author dsc 
* @date 2016年6月22日  
*
 */
public class ShiroTagFreeMarkerConfigurer extends FreeMarkerConfigurer{
	
	@Override
    public void afterPropertiesSet() throws IOException, TemplateException {
        super.afterPropertiesSet();
        this.getConfiguration().setSharedVariable("shiro", new ShiroTags());
    }
}
