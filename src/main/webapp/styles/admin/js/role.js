//新增窗口定义
	var $modal = $('#addRole_modal').modal({show: false}),
	//定义当前表格
	$table = $('#role_table'),
	//删除按钮
	$del = $('#re_send_del');
	$upd = $("#re_send_up");
	//状态
	function status_fr(value, row, index){
		return  value=="1"?"正常":"<font color='#d15b47'>不可用</font>";
	}
	
	function actionFormatter(value, row, index) {
		var lock_btn;
//		if(row["status"] == 1){//已经被冻结
//			lock_btn = '<a class="locked" href="javascript:" title="停用"><button type="button"  class="btn btn-inverse">停用</button></a>';
//		}else{
//			lock_btn = '<a class="locked" href="javascript:" title="启用"><button type="button"  class="btn btn-danger">启用</button></a>'
//		}
	    return [
	            '<a class="update" href="javascript:" title="修改"><button type="button"  class="btn btn-primary">修改</button></a>&nbsp;&nbsp;',lock_btn
	    ].join('');
	}
 	window.actionEvents = {
    	//修改操作
        'click .update': function (e, value, row) {
            showModal($(this).attr('title'), row);
        },
        //
        'click .locked': function (e, value, row) {
        	var lock_info = $(this).attr('title');
        	Modal.confirm({msg: "是否确定"+lock_info+"该账户？"}).on(
        		function(e){
	        		if(e){
	        			$.ajax({
	        				type:"post",
	        				url:path+"/user/toLockUser",
	        				data:{"status":row["status"],"userId":row["userId"]},
	        				success:function(data){
	        					if(data){
	        						Modal.alert({msg: lock_info+'成功',title: '提示',btnok: '确定'});
	        						$table.bootstrapTable('refresh');
	        					}
	        				}
	        			});
	        		}
        	});
        }
    };
   //显示模态窗口,
	function showModal(title, row) {
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		 row = row || {
			 	roleId: 0,
			 	roleName: '',
			 	roleDescription: '',
			 	menuList: '',
			 	menuIds: ''	,
			 	available:1
	        }; 
	        $modal.data('id', row.id);
	        $modal.find('.modal-title').text(title);
	        for (var name in row) {//表格循环赋值
	            $modal.find('input[name="' + name + '"]').val(row[name]);
	        }
	        if(title =="修改"){
	        	
	        	//根据值，默认勾选
	        	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	        	var mId = $("#menuId").val();
	        	if(mId != ""){
	        		var datas = mId.split(',');
		        	for(var i = 0;i<datas.length;i++){
		        	    var node = treeObj.getNodeByParam("id",datas[i]);
		        	    treeObj.checkNode(node,true,true);
		        	}  
	        	}
	        }
	    $modal.find('.modal-title').text(title);
	    $modal.modal('show');
	    //新增、修改数据
	  $('#add_role_form').bootstrapValidator({
		      fields: {
		    	  roleName: {
				      validators: {
					      notEmpty: {
					      	message: '角色名不能为空'
				     	  },
					      stringLength: {
						      min: 3,
						      max: 20,
						      message: '角色名长度在3~20位'
					      },
					      regexp: {
						      regexp: /^[a-z\.]+$/,
						      message: '角色名只能由字母组成'
					      },
					      remote: {
		                         message: '角色名已存在',
		                         url: path+"/role/isExistsRole",
		                         data: function(validator) {
		                             return {
		                            	 roleId: validator.getFieldElements('roleId').val()
		                             };
		                         }
						      }
			      	}
			    },
			    roleDescription:{
			    	validators: {
					      notEmpty: {
					      	message: '角色描述不能为空'
				     	  }
			      	}
			    	
			    }
		  }
		}).on('success.form.bv', function(e) {
			e.preventDefault();
			$.ajax({
		        type: "post",
		        url: path+"/role/editRole?oper=addORedit",
		        data: $("#add_role_form").serialize(),
		        success: function(data){
		        	if(data){
		        		$table.bootstrapTable('refresh');
			        	$("input").val(""); 
			        	$modal.modal('hide');
			        	Modal.alert({msg: '操作成功',title: '提示',btnok: '确定'});
			        	resetModel('add_role_form');
		        	}else{
		        		Modal.alert({msg: '操作失败',title: '提示',btnok: '确定'});
		        	}
		        }
		    });
	      });
	}
	function getIdSelections() {
	     return $.map($table.bootstrapTable('getSelections'), function (row) {
	         return row.roleId;
	     });
	 }

//页面初始化加载
$(document).ready(function() {
	$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        $del.prop('disabled', !$table.bootstrapTable('getSelections').length);
 	});
	//显示窗口
	$('#re_send_add').click(function () {
		//初始化菜单树
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
        showModal($(this).text());
    });
	//删除
	$del.click(function(){
		var ids = getIdSelections();
		Modal.confirm({msg: "是否确定删除？同时该角色下的用户也将被删除！"}).on( 
			function (e) {
				  if(e){
					  $.ajax({
					        type: "post",
					        url: path+"/role/editRole?ids="+ids+"",
					        data: {"oper":"del"},
					        success: function(data){
					            if(data){
					            	$table.bootstrapTable('remove', {
						                field: 'roleId',
						                values: ids
						            });
					            	Modal.alert({msg: '删除成功',title: '提示',btnok: '确定'});
					            }
					        }
					  });
				  }
			  });
		
	});
	  
	});