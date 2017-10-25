//新增窗口定义
	var $modal = $('#addMenu_modal').modal({show: false}),
	//删除按钮
	$del = $('#re_send_del');
	$upd = $("#re_send_up");
	//状态
	function status_fr(value, row, index){
		return  value=="1"?"正常":"<font color='#d15b47'>不可用</font>";
	}
   //显示模态窗口,
	function showModal(title, row) {
		$("input").val(""); 
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var nodes = zTree.getSelectedNodes();
		var currNode = nodes[0];
		if(currNode){
//			if(currNode.pId > 0){
//				Modal.alert({msg: '暂不支持改级目录的操作',title: '提示',btnok: '确定'});
//			}else{
			if(title == "修改"){
				row = row || {
					 menuId: currNode.id,
					 menuName:currNode.name,
					 menuUrl:currNode.murl,
					 iconUrl:currNode.iconUrl
			    };
			}else{
				row = row || {
					 menuId: 0,
					 parentMenuId:currNode.id,
					 parentMenuIds:currNode.mids,
					 isLeaf:1
			    };
			}
				
		        $modal.find('.modal-title').text(title);
		        for (var name in row) {//表格循环赋值
		            $modal.find('input[name="' + name + '"]').val(row[name]);
		        }
			       
			    $modal.find('.modal-title').text(title);
			    $modal.modal('show');
			    //新增、修改数据
			  $('#add_menu_form').bootstrapValidator({
				      fields: {
				    	  menuName: {
						      validators: {
							      notEmpty: {
							      	message: '菜单名不能为空'
						     	  }
					      	}
					    }
					
				  }
				}).on('success.form.bv', function(e) {
					//获取父页面选中的菜单信息
					var zTree = window.parent.$.fn.zTree.getZTreeObj("treeDemo");
					var nodes = zTree.getSelectedNodes();
					var currNode = nodes[0];
					e.preventDefault();
					//获取当前表单元素
		            var $form = $(e.target),
		            //初始化中的元素
		            validator = $form.data('bootstrapValidator');
		            //输入的文本信息
					var treeName = validator.getFieldElements('menuName').val();
					$.ajax({
				        type: "post",
				        url: path+"/menu/editMenu?oper=addORedit",
				        data: $("#add_menu_form").serialize(),
				        success: function(data){
				        	var flag = eval('('+data+')');
				        	if(flag.success){
					        	$modal.modal('hide');
					        	//初始化菜单树
					        	if(flag.oper == "add"){
					        		zTree.addNodes(currNode, {id:flag.mid_new, pId:currNode.id, name:treeName,iconUrl:flag.menu.iconUrl,murl:flag.menu.menuUrl});
					        	}else{
					        		currNode.name=treeName;
					        		currNode.murl=flag.menu.iconUrl;
					        		currNode.iconUrl = flag.menu.iconUrl;
					        		zTree.updateNode(currNode);
					        	}
					        	Modal.alert({msg: '操作成功',title: '提示',btnok: '确定'});
					        	resetModel('add_menu_form');
				        	}else{
				        		Modal.alert({msg: '操作失败',title: '提示',btnok: '确定'});
				        	}
				        }
				    });
		      });
//			}
		}else{
			Modal.alert({msg: '请先选中其中一级菜单进行操作',title: '提示',btnok: '确定'});
		}
	}
	function getIdSelections() {
	     return $.map($table.bootstrapTable('getSelections'), function (row) {
	         return row.roleId;
	     });
	 }

//页面初始化加载
$(document).ready(function() {
	//显示窗口
	$('#re_send_add').click(function () {
        showModal($(this).text());
    });
	//显示窗口
	$('#re_send_up').click(function () {
		showModal($(this).text());
	});
	//删除
	$del.click(function(){
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var nodes = zTree.getSelectedNodes();
		var currNode = nodes[0];
		var preNode=null;
		if(currNode){
			preNode = currNode.getNextNode();
			if(currNode.pId == 0 || currNode.isDefault){
				Modal.alert({msg: '改目录不允许删除',title: '提示',btnok: '确定'});
			}else{
				Modal.confirm({msg: "是否确定删除？"}).on( 
					function (e) {
						  if(e){
							  $.ajax({
							        type: "post",
							        url: path+"/menu/editMenu?ids="+currNode.id+"",
							        data: {"oper":"del"},
							        success: function(data){
							            if(data){
//							            	$.fn.zTree.init($("#treeDemo"), setting);
							            	zTree.removeNode(currNode);
							            	Modal.alert({msg: '删除成功',title: '提示',btnok: '确定'});
							            }
							        }
							  });
						  }
					  });
			}
		}else{
			Modal.alert({msg: '请选中一级操作',title: '提示',btnok: '确定'});
		}
	});
	  
	});