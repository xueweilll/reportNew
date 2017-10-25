<link rel="stylesheet" href="${req.contextPath}/styles/admin/ztree/css/metroStyle/metroStyle.css" type="text/css">
<script src="${req.contextPath}/styles/admin/bootstrapTable/js/bootstrap-table.js"></script>
<script src="${req.contextPath}/styles/admin/js/role.js"></script>
<script src="${req.contextPath}/styles/admin/ztree/js/jquery.ztree.core.js"></script>
<script src="${req.contextPath}/styles/admin/ztree/js/jquery.ztree.excheck.js"></script>
<script src="${req.contextPath}/styles/admin/bootstrapTable/js/bootstrap-table-zh-CN.js"></script>
<!-- 页面列表高度（要加在最后加载） -->
<script src="${req.contextPath}/styles/admin/js/pageHeight.js"></script>
	<#include "/admin/layout/list_top_info.ftl"/>
		
	<div class="container">
		<div id="toolbar" class="fixed-table-toolbar" style="margin-top:10px">
		    <button type="button" id="re_send_add" class="btn btn-success">新增</button>
		    <button type="button" id="re_send_del" class="btn btn-danger" disabled>删除</button>
	</div>
    <table id="role_table"
       data-toggle="table"
       data-toolbar="#toolbar"
       data-url="${req.contextPath}/role/rolelist"
       
       data-pagination="true"
       data-search="true"
       data-striped="true"
       data-page-size="30"
       data-page-list="[10, 30, 60,  100]"
       data-show-refresh="true"
       data-show-pagination-switch="true"
       data-only-info-pagination="false"
       data-show-export="true"
       data-single-select="true"
       >
       <thead>

     <tr>
       <th data-field="state" data-checkbox="true"></th>
        <th data-field="roleId">ID</th>
        <th data-field="roleName">角色名称</th>
        <th data-field="roleDescription">角色描述</th>
        <th data-field="menuList">拥有菜单权限</th>
        <th data-field="available" data-formatter="status_fr">状态</th>
        <th data-field="action" data-formatter="actionFormatter" data-events="actionEvents">操作</th>
    </tr>
    </thead>
    </table>
    
    
    
</div>


<!--新增  -->
<form id="add_role_form" action="" method="post">	
 <div id="addRole_modal" class="modal fade" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" onclick="resetModel('add_role_form')" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>角色名称</label>
                        <input type="text" class="form-control"  name="roleName" placeholder="请输入角色名称">
                    </div>
                    <div class="form-group">
                        <label>角色描述</label>
                        <input type="text" class="form-control"  name="roleDescription" placeholder="请输入角色描述">
                    </div>
                    <div class="form-group">
                        <label>菜单权限</label>
                        <div  class="form-inline">
                        <input type="text" id="citySel" value="" readOnly name="menuList" style="width:300px"/><a id="menuBtn" href="#" onclick="showMenu(); return false;">选择</a>
                    	</div>
                    </div>
                        <input type="hidden" class="form-control"  name="available" value="1">
                        <input type="hidden" class="form-control"  name="roleId" >  <!-- 主键ID -->
                        <input type="hidden" class="form-control" id="menuId" name="menuIds" >  <!-- 主键ID -->
                    <div id="menuContent" class="menuContent" style="display:none;">
							<ul id="treeDemo" class="ztree"></ul>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" onclick="resetModel('add_role_form')" data-dismiss="modal">取消</button>
                    <button type="submit" id="addRole_form" class="btn btn-primary submit">确定</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</form>	

	<SCRIPT type="text/javascript">
		
		var setting = {
			callback: {
				beforeClick: beforeClick,
				onCheck: onCheck
			},
			  check: {  
                enable: true
            }, 
            data: {
				simpleData: {
					enable: true
				}
			}
		};
		var code;
		
		var zNodes =${allMenu};
		<!-- 点击之前初始化-->
		function beforeClick(treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.checkNode(treeNode, !treeNode.checked, null, true);
			return false;
		}
		<!-- 选中时-->
		function onCheck(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			nodes = zTree.getCheckedNodes(true),
			<!-- 名字-->
			v = "";
			<!--栏目id-->
			v_menu_id = "";
			for (var i=0, l=nodes.length; i<l; i++) {
				if(nodes[i].isParent != true){
					v += nodes[i].name + ",";
					v_menu_id += nodes[i].id + ",";
				}
			}
			if (v.length > 0 ) v = v.substring(0, v.length-1);
			var cityObj = $("#citySel");
			var menuId = $("#menuId");
			cityObj.val(v);
			menuId.val(v_menu_id.substring(0,v_menu_id.length-1));
		}
		<!--显示下拉菜单树-->
		function showMenu() {
			var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
			treeObj.expandAll(true); 
			var cityObj = $("#citySel");
			var cityOffset = $("#citySel").offset();
			$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

			$("body").bind("mousedown", onBodyDown);
		}<!--隐藏下拉菜单树-->
		function hideMenu() {
			$("#menuContent").fadeOut("fast");
			$("body").unbind("mousedown", onBodyDown);
		}
		<!--点击其他区域触发-->
		function onBodyDown(event) {
			if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
				hideMenu();
			}
		}
		
		
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		});
	</SCRIPT>
