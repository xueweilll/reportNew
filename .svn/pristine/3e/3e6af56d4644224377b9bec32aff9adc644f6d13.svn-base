
    <link rel="stylesheet" href="${req.contextPath}/styles/admin/ztree/css/metroStyle/metroStyle.css" type="text/css">
<script src="${req.contextPath}/styles/admin/bootstrapTable/js/bootstrap-table.js"></script>
<script src="${req.contextPath}/styles/admin/js/menu.js"></script>
<script src="${req.contextPath}/styles/admin/ztree/js/jquery.ztree.core.js"></script>
<script src="${req.contextPath}/styles/admin/ztree/js/jquery.ztree.excheck.js"></script>
<script src="${req.contextPath}/styles/admin/ztree/js/jquery.ztree.exedit.js"></script>
<script src="${req.contextPath}/styles/admin/bootstrapTable/js/bootstrap-table-zh-CN.js"></script>


	<SCRIPT type="text/javascript">
		var setting = {
			edit: {
				enable: true,
				showRemoveBtn: false,
				showRenameBtn: false
			},
			callback: {
				onClick: onCheck,
				onDrop: onDrop  
			},
            data: {
				simpleData: {
					enable: true
				}
			}
		};
		var zNodes =${allMenu};
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting,zNodes);
			var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
			treeObj.expandAll(true);
		});
		
		function onCheck(e, treeId, treeNode) {
			$("#re_send_add").removeAttr("disabled");
			$("#re_send_del").removeAttr("disabled");
			$("#re_send_up").removeAttr("disabled");
		}
		
		//拖拽
		 function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {  
		        //拖拽结束之后  
// 		      alert("拖拽节点的id:"+JSON.stringify(treeNodes[0]));  
// 		      alert("拖拽节点的新父节点的id:"+targetNode.id);  
		        //更新拖拽节点的父级目录id  
		        $.ajax({  
		            type:'post',        
		            url: "${req.contextPath}/menu/dragMenu",  
		            dataType: "text",
		            data:{"menuId":treeNodes[0].id,"parentMenuId":targetNode.id,"parentMenuIds":treeNodes[0].mids},
		            async: false,  
		            success: function (data) {  
		            },  
		            error: function (msg) {              
		            }  
		        });  
		    }  
		
	</SCRIPT>
	<!-- 头部提示信息 -->
	<#include "/admin/layout/list_top_info.ftl"/>
		
	<div class="container">
		<div id="toolbar" class="fixed-table-toolbar" >
		    <button type="button" id="re_send_add" class="btn btn-success" disabled>新增</button>
		    <button type="button" id="re_send_del" class="btn btn-danger" disabled>删除</button>
		    <button type="button" id="re_send_up" class="btn btn-primary" disabled>修改</button>
		</div>
    
    <div>
    <ul id="treeDemo" class="ztree"></ul>

<!--新增  -->
<form id="add_menu_form" action="" method="post">	
 <div id="addMenu_modal" class="modal fade" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" onclick="resetModel('add_menu_form')" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>菜单名称</label>
                        <input type="text" class="form-control"  name="menuName" placeholder="请输入菜单名称">
                    </div>
                    <div class="form-group">
                        <label>菜单URL</label>
                        <input type="text" class="form-control"  name="menuUrl" placeholder="请输入描述">
                    </div>
                    <div class="form-group">
                        <label>图标URL</label>
                        <input type="text" class="form-control"  name="iconUrl" placeholder="请输入图标url">
                    </div>
                        <input type="hidden" class="form-control"  name="available" value="1">
                        <input type="hidden" class="form-control" id="menuId" name="menuId" >  <!-- 主键ID -->
                        <input type="hidden" class="form-control"  name="isLeaf" > 
                        <input type="hidden" class="form-control"  name="parentMenuId" > 
                        <input type="hidden" class="form-control"  name="parentMenuIds" > 
                        
                    <div id="menuContent" class="menuContent" style="display:none;">
							<ul id="treeDemo" class="ztree"></ul>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" onclick="resetModel('add_menu_form')" data-dismiss="modal">取消</button>
                    <button type="submit" id="addRole_form" class="btn btn-primary submit">确定</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</form>	
