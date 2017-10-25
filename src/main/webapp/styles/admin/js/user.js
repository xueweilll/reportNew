//新增窗口定义
	var $modal = $('#addUser_modal').modal({show: false}),
	 $tmodal = $('#tab_modal').modal({show: false}),
	//导入excel
	$modal_excel = $('#add_excel_form').modal({show: false}),
	//定义当前表格
	$table = $('#userGrid'),
	//选中行
	$select = $('#re_send_selected'),
	//删除按钮
	$del = $('#re_send_del'),
	//修改
	$upd = $("#re_send_up"),
	//导入excel按钮
	$excel = $("#re_send_excel"),
	//多标签页demo
	$tabs = $("#tabs_mode");
	//用户个人信息
	
	//列表传参
	function paginationParam(params) {
	    return {
	    	//每页条数
	    	limit: params.limit,
	        offset: params.offset,
	        pageIndex:params.pageNum,
	        userName:$("#userName").val(),
	        mobileNum:$("#mobileNum").val(),
	        startDate:$("#startDate").val(),
	        endDate:$("#endDate").val()
	    };
	}
	//状态
	function status_fr(value, row, index){
		return  value=="1"?"正常":"<font color='#d15b47'>已冻结</font>";
	}
	//操作栏
	function actionFormatter(value, row, index) {
		var lock_btn;
		if(row["status"] == 1){//已经被冻结
			lock_btn = '<a class="locked" href="javascript:" title="冻结">冻结</a>';
		}else{
			lock_btn = '<a class="locked" href="javascript:" style="color:#d15b47" title="解冻">解冻</a>'
		}
	    return [
	            '<a class="update" href="javascript:" title="修改">编辑</a>&nbsp;&nbsp;',lock_btn
	    ].join('');
	}
 	window.actionEvents = {
 		//查看数据	
	    'click .resend': function (e, value, row, index) {
	        alert('当前行数据, 用户名: ' + JSON.stringify(row));
	            console.log(value, row, index);
        },
    	//修改操作
        'click .update': function (e, value, row) {
            showModal($(this).attr('title'), row);
        },
        //冻结账户
        'click .locked': function (e, value, row) {
        	var lock_info = $(this).attr('title');
        	
    	layer.confirm("是否确定"+lock_info+"该账户？", {
		  btn: ['确认','取消'] //按钮
  		}, 
  		function(){
  			$.ajax({
				type:"post",
				url:path+"/user/toLockUser",
				data:{"status":row["status"],"userId":row["userId"]},
				success:function(data){
					if(data){
						layer.msg(lock_info+'成功',{time: 1000});
						$table.bootstrapTable('refresh');
					}
				}
			});
  		});
        	
        }
    };
   //显示模态窗口（修改删除）,
	function showModal(title, row) {
		 row = row || {
			 	userId: 0,
			 	username: '',
			 	name: '',
			 	mobileNumber: '',
			 	email: '',
			 	comment: '无'
	        }; 
	        $modal.data('id', row.id);
	        $modal.find('.modal-title').text(title);
	        $("#rol_select").val(row['roleId']);//角色值选中
	        for (var name in row) {//表格循环赋值
	            $modal.find('input[name="' + name + '"]').val(row[name]);
	        }
	    $modal.find('.modal-title').text(title);
	    $modal.modal('show');
	    
	   //新增、修改数据
	  $('#add_user_form').bootstrapValidator({
		      fields: {
			      username: {
				      validators: {
					      notEmpty: {
					      	message: '用户名不能为空'
				     	  },
					      stringLength: {
						      min: 4,
						      max: 8,
						      message: '用户名长度在4~8位'
					      },
					      regexp: {
						      regexp: /^[a-zA-Z0-9_\.]+$/,
						      message: '用户名只能由字母、数字、数字和下划线组成'
					      },
					      remote: {
	                         message: '用户名已存在',
	                         url: path+"/user/isExistsUser",
	                         data: function(validator) {
	                             return {
	                                 userId: validator.getFieldElements('userId').val()
	                             };
	                         }
					      }
			      	}
			    },
			    name:{
			    	validators: {
					      notEmpty: {
					      	message: '姓名不能为空'
				     	  },
				     	  regexp: {
				     		  regexp: /^[\u4e00-\u9fa5]{2,6}$/,
				     		  message: '姓名不合法,2~6个中文字'
		                   },
			      	}
			    	
			    },
			    roleId:{
			    	validators: {
			    		notEmpty: {
			    			message: '请选择角色类型'
			    		}
			    	}
			    
			    },
			    mobileNumber:{
			    	validators: {
					      notEmpty: {
					    	  message: '手机号不能为空'
				     	  },
				     	  regexp:{
				     		  regexp:/^1[34578]\d{9}$/,
				     		  message:'手机号格式有误'
				     	  }
			      	}
			    	 
			    },
			    email: {
	                validators: {
	                	 notEmpty: {
						    message: '邮件不能为空'
	                	 },
	                	 emailAddress: {
	                        message: '请输入有效的email地址'
	                	 }
	                }
	            }
	  
		  }
		}).on('success.form.bv', function(e) {
			e.preventDefault();
			$.ajax({
		        type: "post",
		        url: path+"/user/editUser?oper=addORedit",
		        data: $("#add_user_form").serialize(),
		        success: function(data){
		        	if(data){
		        		$table.bootstrapTable('refresh');
			        	$modal.modal('hide');
			        	layer.msg('已添加',{time: 1000});
		        	}else{
		        		layer.msg('操作失败',{time: 1000});
		        	}
		        	resetModel('add_user_form');
		        }
		    });
	      });
	}
	//获取当前行
	function getIdSelections() {
	     return $.map($table.bootstrapTable('getSelections'), function (row) {
	         return row.userId;
	     });
	 }
	//页面初始化加载
	$(document).ready(function() {
		//多标签页demo
		$tabs.click(function(){
			$tmodal.modal('show');
		});
		//日期控件框初始化
		$('.date-picker').datepicker({language: 'zh-CN',autoclose:true});
		//搜索
		$("#searche_user").click(function(){
			 $table.bootstrapTable('refresh', {url: path+'/user/userlist'});
		});
		
		$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
			//未选中状态禁用删除按钮，
	        $del.prop('disabled', !$table.bootstrapTable('getSelections').length);
	 	});
		//显示窗口
		$('#re_send_add').click(function () {
	        showModal($(this).text());
	    });
		//导入窗口
		$('#re_send_excel').click(function () {
			$modal_excel.find('.modal-title').text("导入Excel");
			$modal_excel.modal('show');
		});
		//导出
		$('#re_send_export').click(function () {
			window.location.href=path+"/user/exportUser";
		});
		
		//删除
		$del.click(function(){
			var ids = getIdSelections();
			layer.confirm('确认删除该信息?', {
				  btn: ['确认','取消'] //按钮
			}, 
			function(){
				$.ajax({
			        type: "post",
			        url: path+"/user/editUser?ids="+ids+"",
			        data: {"oper":"del"},
			        success: function(data){
			            if(data){
			            	$table.bootstrapTable('remove', {
				                field: 'userId',
				                values: ids
				            });
			            	layer.msg('已删除',{time: 1000});
			            }
			        }
				})   
			});
			
		});
		
		  
	});