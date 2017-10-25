
$(function(){
	//系统窗口高度
	var sys_height = $(window).height(),
		//头部导航栏高度
	    nav_height = $("#navbar").height(),
	    //列表头部高度
	    level_top_height = $(".breadcrumbs").height(),
	    //工具条高度
	    tool_height = $(".fixed-table-toolbar").height(),
	    //分页部分高度
	    page_height = $(".fixed-table-pagination").height(),
//	    page_height = $(".clearfix").height(),
	    //样式间隔大小,为了避免造成几个px的误差
	    css_margin = 10;
//	alert(sys_height+"--"+nav_height+"--"+level_top_height+"--"+tool_height+"--"+page_height+"--"+css_margin);
	//列表信息最终高度
	var list_height = sys_height - nav_height - level_top_height - tool_height - page_height - css_margin;
	//高度赋值给列表div
	$(".fixed-table-container").attr("style","height:"+list_height+"px; padding-bottom: 0px;");
});
		