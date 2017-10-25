/**
 * 右侧内容根据左边菜单进行填充
 */
function dataList(url){
		$.ajax({
	        type: "post",
	        url: url,
	        data: {},
	        cache:false,
	        success: function(data){
	        	  var title = $(data).filter('title').text();
	        	  if(title.indexOf("登录")>=0){
	        		  window.location.href=path+"/user/login"
	        	  }else{
	        		  $("#m-main").html(data);    
	        	  }
	        }
	    });
	}


	//模态框验证重置
	function resetModel(mid){
		$('#'+mid+'').data('bootstrapValidator').destroy();
	}
	//日期格式化
	function date_fr(value, row, index){
		if(value == null){
			return "- -";
		}else{
			var d = new Date(value.time);
			return formatDate(d); 
		}
	}

	//创建补0函数
	function p(s) {
	    return s < 10 ? '0' + s: s;
	}
	//日期格式化
	function   formatDate(now){
	    var   year=( now.getYear() < 1900 ) ? ( 1900 + now.getYear() ) : now.getYear();  
	    var   month=p(now.getMonth()+1);     
	    var   date=p(now.getDate());     
	    var   hour=p(now.getHours());     
	    var   minute=p(now.getMinutes());     
	    var   second=p(now.getSeconds());   
	    return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;     
	 }
/**
 * 封装alert，config为bootstrap风格
 */
$(function () {
	 //改为同步处理，否则会造成其他页面js加载延迟问题
	 //AJax可以通过两种方法访问服务器,即同步(脚本会停留并等待服务器发送回复然后再继续) 和 异步（脚本允许页面继续基进程并处理可能的回复）
//	 $.ajaxSettings.async = false;
	 $.ajaxSetup({ cache: false }); 
	  window.Modal = function () {
	    var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
	    var alr = $("#ycf-alert");
	    var ahtml = alr.html();

	    //关闭时恢复 modal html 原样，供下次调用时 replace 用,不然重复调用会有问题
	    var _init = function () {
	    	alr.on("hidden.bs.modal", function (e) {
	    		$(this).html(ahtml);
	    	});
	    }();

	    var _alert = function (options) {
	    	_init;	// 复原
	      alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
	      alr.find('.cancel').hide();
	      _dialog(options);

	      return {
	        on: function (callback) {
	          if (callback && callback instanceof Function) {
	            alr.find('.ok').click(function () { callback(true) });
	          }
	        }
	      };
	    };

	    var _confirm = function (options) {
	    	_init;// 复原
	      alr.find('.ok').removeClass('btn-primary').addClass('btn-success');
	      alr.find('.cancel').show();
	      _dialog(options);

	      return {
	        on: function (callback) {
	          if (callback && callback instanceof Function) {
	            alr.find('.ok').click(function () { callback(true) });
	            alr.find('.cancel').click(function () { callback(false) });
	          }
	        }
	      };
	    };

	    var _dialog = function (options) {
	      var ops = {
	        msg: "提示内容",
	        title: "操作提示",
	        btnok: "确定",
	        btncl: "取消"
	      };

	      $.extend(ops, options);

	      console.log(alr);

	      var html = alr.html().replace(reg, function (node, key) {
	        return {
	          Title: ops.title,
	          Message: ops.msg,
	          BtnOk: ops.btnok,
	          BtnCancel: ops.btncl
	        }[key];
	      });
	      
	      alr.html(html);
	      alr.modal({
	        width: 200,
	        backdrop: 'static'
	      });
	    }

	    return {
	      alert: _alert,
	      confirm: _confirm
	    }

	  }();
	  
	  
//	  	var bro=$.browser;
//	    var binfo="";
//	    if(bro.msie) 
//	    {
//	        binfo= "Microsoft Internet Explorer " +bro.version;
//	        if(eval(parseInt($.browser.version))<9)
//	        {
//	               location.href='./browser.html'
//	        } else{
//	        	 alert(binfo);
//	        }         
//	    }
//	    if(bro.mozilla) 
//	    {
//	        binfo= "Mozilla Firefox "+bro.version;
//	    }
//	    if(bro.safari)
//	    {
//	        binfo= "Apple Safari "+bro.version;
//	    }
//	    if(bro.opera) 
//	    {
//	        binfo= "Opera "+bro.version;
//	    }
	  
	});


function editPwd(){
	$('#edit_password_form').bootstrapValidator({
	      fields: {
	    	  oldpwd: {
			      validators: {
				      notEmpty: {
				      	message: '原密码不能为空'
			     	  }
		      	}
		    },
		    newpwd:{
		    	validators: {
				      notEmpty: {
				      	message: '新密码不能为空'
			     	  },
			    different: {
			    	field: 'oldpwd', 
			    	message: '新密码不能与原密码相同'
			    }
		      	},
		    	
		    },
		    renewpwd:{
		    	validators: {
		    		notEmpty: {
		    			message: '新密码不能为空'
		    		},
			    identical: {
			    	field: 'newpwd', 
			    	message: '两次密码不一致'
			    }
		    	},
		    
		    },

	  }
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		var cpass=$("input[name='oldpwd']").val();
		var newPwd=$("input[name='newpwd']").val();
		$.ajax({
	        type: "post",
	        url: path+"/user/changePWD",
	        data: {"cpass":cpass,"newPwd":newPwd},
	        success: function(data){
	        	if(data==0){
		        	$("input").val(""); 
		        	$("#editpassword_modal").modal('hide');
		        	Modal.alert({msg: '修改成功',title: '提示',btnok: '确定'});
	        	}else{
	        		Modal.alert({msg: '您输入的密码不正确,修改失败',title: '提示',btnok: '确定'});
	        	}
	        	resetModel('edit_password_form');
	        }
	    });
    });
}
