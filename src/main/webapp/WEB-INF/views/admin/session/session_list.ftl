<script src="${req.contextPath}/styles/admin/bootstrapTable/js/bootstrap-table.js"></script>
<script src="${req.contextPath}/styles/admin/js/sessions.js"></script>
<script src="${req.contextPath}/styles/admin/bootstrapTable/js/bootstrap-table-zh-CN.js"></script>
<!-- 页面列表高度（要加在最后加载） -->
<script src="${req.contextPath}/styles/admin/js/pageHeight.js"></script>
	<!-- 头部提示信息 -->
	<#include "/admin/layout/list_top_info.ftl"/>
		
	<div class="container">
    <table id="session_table"
       data-toggle="table"
       data-url="${req.contextPath}/sessions/list"
       
       data-row-style="rowStyle"
       data-pagination="true"
       data-search="true"
       data-striped="true"
       data-page-size="30"
       data-page-list="[10, 30, 60,  100]"
       data-only-info-pagination="false"
       data-single-select="true"
       data-search-align="left"
       >
       <thead>

     <tr>
        <th data-field="currName" data-sortable="true">用户名</th>
        <th data-field="id">会话ID</th>
        <th data-field="host" data-sortable="true">IP地址</th>
        <th data-field="lastAccessTime" data-sortable="true">最后活跃时间</th>
        <th data-field="isKickedOut" data-formatter="status_fr">是否被踢出</th>
        <th data-field="action" data-formatter="actionFormatter" data-events="actionEvents">操作</th>
    </tr>
    </thead>
    </table>
    
    
    
</div>
