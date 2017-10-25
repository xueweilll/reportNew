	<script src="${req.contextPath}/styles/admin/js/importRecord.js"></script>  
	<script src="${req.contextPath}/styles/admin/bootstrapTable/js/bootstrap-table.js"></script>
	<script src="${req.contextPath}/styles/admin/bootstrapTable/js/bootstrap-table-zh-CN.js"></script>
	<script src="${req.contextPath}/styles/admin/assets/js/date-time/bootstrap-datepicker.min.js"></script>
	<script src="${req.contextPath}/styles/admin/assets/js/date-time/bootstrap-datepicker.zh-CN.js"></script>
	<!-- 页面列表高度（要加在最后加载） -->
	<script src="${req.contextPath}/styles/admin/js/pageHeight.js"></script>
	<!-- 头部提示信息 -->
	<#include "/admin/layout/list_top_info.ftl"/>
	<div class="container">
		<div id="toolbar" class="form-inline" style="margin-bottom: 10px;margin-top: 10px">
<!-- 		    <button type="button" id="re_send_del" class="btn btn-danger" disabled>删除</button> -->
<!-- 		    <button type="button" id="re_send_export" title="用户数据" class="btn btn-purple">导出</button> -->
<button type="button" id="re_send_excel" class="btn btn-primary">导入</button>
		 <div class="form-group" style="margin-left:200px"> 
		   	<span>用户名</span>
		   	<input style="width:65%"  type="text" id="userName" class="input-sm form-control" > 
		 </div>    
		 <div class="form-group"> 
		   	<span>数据类型</span>
		   	<input style="width:65%"  type="text" id="mobileNum" class="input-sm form-control" > 
		 </div>    
		 <div class="form-group"> 
		   	<span>导入日期</span>
		   	<input style="width:30%"  type="text" id="startDate" class="input-sm form-control date-picker"  data-date-format="yyyy-mm-dd"> -
		   	<input style="width:30%"  type="text" id="endDate"  class="input-sm form-control date-picker" data-date-format="yyyy-mm-dd" > 
		 </div>    
		 <button id="searche_record" type="button" class="btn btn-default">搜索</button>
	</div>
    <table id="importR_table"
       data-toggle="table"
       data-toolbar="#toolbar"
       data-side-pagination="server"
       
       data-pagination="true"
       data-query-params="paginationParam"
       data-method="get"
       data-page-size="30"
       data-page-list="[10, 30, 60,  100]"
       data-page-number="1"
       data-show-refresh="false"
       data-only-info-pagination="false"
       data-query-params-type="limit"
       data-striped="true"
       data-url="${req.contextPath}/irecord/iRecordlist"
       data-height=""
        data-detail-view="true"
       data-detail-formatter="detailFormatter"
       >
       <thead>

     <tr>
        <th data-visible="false" data-field="id">ID</th>
        <th data-field="fileName">文件名</th>
        <th data-field="author">用户名</th>
        <th data-field="dataType">数据类型</th>
        <th data-field="importTime" data-formatter="date_fr">导入时间</th>
        <th data-field="status" data-formatter="status_fr">状态</th>
        <th data-field="comment" data-formatter="comment_fr">备注</th>
    </tr>
    </thead>
    </table>
    
</div>
</div>

   <!-- 导入excel数据表单 -->
<form id="uploadForm" class="form-horizontal" method="post">
<div id="add_excel_form"  class="modal fade">
	<div class="modal-dialog">
		 <div class="modal-content">
		 	<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4><p style="font-size:12px;color:#B74635">(用户导入的初始密码为:123456)</p>
            </div>
            <div class="modal-body"> 
			  <div class="form-group">
			      <input  style="padding-left:10px;" type="file" id="inputfile" name="filePath">
	   			</div>
	   			<div class="form-group">
			    <div class="col-sm-10" style="padding-left:10px;">
			     <p class="form-control-static"><a href="${req.contextPath}/excel/user_excel-2003.xls">Excel模板下载(1997-2003版本)</a></p>
			      <p class="form-control-static"><a href="${req.contextPath}/excel/user_excel-2007.xlsx">Excel模板下载(2007-2010版本)</a></p>
			    </div>
			    <button type="submit" id="user_excel_im"  class="btn btn-default">提交</button>
 			 </div>
	   			
   			</div>
		 </div>   
	</div>    
</div>
</form>
