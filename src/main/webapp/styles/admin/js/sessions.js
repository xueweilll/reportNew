	
	var $table = $("#session_table");
	//状态
	function status_fr(value, row, index){
		return  value==true?"是":"否";
	}
	function actionFormatter(value, row, index) {
		var lock_btn;
		if(row['onlineUser'] == row['currName'] || row['currName'] == 'admin'){
			lock_btn= '- -'
		}else if(row['isKickedOut']){
			lock_btn = '已踢出'
		}else{
			lock_btn = '<a class="kickout" href="javascript:"><button type="button"  class="btn btn-danger">强制退出</button></a>'
		}
		return [lock_btn].join('');
	}
 	window.actionEvents = {
        //踢出用户
        'click .kickout': function (e, value, row) {
        	Modal.confirm({msg: "是否确定踢出该账户？"}).on(
        		function(e){
	        		if(e){
	        			$.ajax({
	        				type:"post",
	        				url:path+"/sessions/"+row['id']+"/forceLogout",
	        				data:{},
	        				success:function(data){
	        					if(data){
	        						Modal.alert({msg: '操作成功',title: '提示',btnok: '确定'});
	        						$table.bootstrapTable('refresh');
	        					}
	        				}
	        			});
	        		}
        	});
        }
    };
