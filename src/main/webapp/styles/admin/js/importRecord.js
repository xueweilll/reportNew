//新增窗口定义
	var $table = $('#importR_table'),
	//选中行
	$select = $('#re_send_selected'),
	$modal_excel = $('#add_excel_form').modal({show: false}),
	//删除按钮
	$del = $('#re_send_del');
	
	//列表传参
	function paginationParam(params) {
	    return {
	    	//每页条数
	    	limit: params.limit,
	        offset: params.offset,
	        pageIndex:params.pageNum,
	        userName:$("#userName").val(),
	        mobileNum:$("#datatype").val(),
	        startDate:$("#startDate").val(),
	        endDate:$("#endDate").val()
	    };
	}
	
	//状态
	function status_fr(value, row, index){
		switch(value){
			case 0:
			  return "等待解析";
			  break;
			case 1:
			  return "正在解析";
			  break;
			default:
			  return "导入成功";
		}
	}
	//备注信息
	function comment_fr(value, row, index){
		if(value.length > 80){
			return value.substring(0,80)+"..."
		}
	}
	
	 function detailFormatter(index, row) {
        var html = [];
        $.each(row, function (key, value) {
            html.push('<p><b>' + key + ':</b> ' + value + '</p>');
        });
        return html.join('');
	   }
	
	function getIdSelections() {
	     return $.map($table.bootstrapTable('getSelections'), function (row) {
	         return row.userId;
	     });
	 }
//页面初始化加载
$(document).ready(function() {
	//日期控件框初始化
	$('.date-picker').datepicker({language: 'zh-CN',autoclose:true});
	//搜索
	$("#searche_record").click(function(){
//		JSON.stringify($table.bootstrapTable('getOptions').totalRows)
		 $table.bootstrapTable('refresh', {url: path+'/irecord/iRecordlist'});
		
	});
	//导入窗口
	$('#re_send_excel').click(function () {
		$modal_excel.find('.modal-title').text("导入Excel");
		$modal_excel.modal('show');
	});
	  //导入exel数据
	  $('#uploadForm').bootstrapValidator({
	        fields: {
	            filePath: {
	                validators: {
	                	notEmpty: {
					    	  message: '请选择Excel类型表格'
				     	  },
	                    file: {
	                        extension: 'xls,xlsx',
	                        maxSize: 2048 * 1024 * 5,   // 10 MB
	                        message: '文件大小不能超过10M'
	                    }
	                }
	            }
	        }
	    }).on('success.form.bv', function(e) {
			e.preventDefault();
			var formData = new FormData($( "#uploadForm" )[0]);  
			$.ajax({
		        type: "post",
		        url: path+"/user/importUser?data_type=user",
		        beforeSend: function () {
		        	var btn=$("#user_excel_im");
		        	btn.html("正在导入...");
		        },
		        data: formData,  
		        async: false,  
		        cache: false,  
		        contentType: false,  
		        processData: false,
		        success: function(data){
		        	if(data){
		        		$table.bootstrapTable('refresh');
			        	$("input").val(""); 
			        	$modal_excel.modal('hide');
			        	Modal.alert({msg: '上传成功,正在解析',title: '提示',btnok: '确定'});
		        	}else{
		        		Modal.alert({msg: '数据出错',title: '提示',btnok: '确定'});
		        	}
		        	$("#user_excel_im").html("提交");
		        	$("#user_excel_im").removeAttr("disabled");
		        },  
              error: function (data, status, e){  
              	Modal.alert({msg: '导入失败',title: '提示',btnok: '确定'});
              	$("#user_excel_im").removeAttr("disabled");
             }  
		    });
	    });
	  		
	
	});