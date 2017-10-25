//新增窗口定义
var $modal = $('#adddetails2_modal').modal({
    show: false
});
//手动定义排序规则
var gz = ['transport_order_date', 'transport_order_time', 'truck_pickup_date', 'truck_arrival_time', 'truck_left_time', 'loading_duration_time', 'loading_duration_breakdown', 'truck_plate', 'trucktype1', 'sap_delivery_order', 'actual_arrival_customer_date', 'customer_complain', 'customer_signed_recipt_request_return_date', 'customer_signed_recipt_actual_return_date'];
//$modal_excel = $('#add_excel_form').modal({show: false}),
//定义当前表格
$table = $('#details2_table');

/**状态定义
	 * @param value
	 * @param row
	 * @param index
	 * @returns {String}
	 */
function status_fr(value, row, index) {
    if (value == 0) {
        return '启用';
    } else {
        return '停用';
    }
}

function actionFormatter(value, row, index) {
    return '<a class="update" href="javascript:" title="处理"><button type="button"  class="btn btn-primary">处理</button></a>&nbsp;&nbsp;';
}

function detailFormatter(index, row) {
    var html = [];
    $.each(gz,
    function(key, value) {
        if (row.hasOwnProperty(value)) {
            html.push('<p><b>' + value + ':</b> ' + row[value] + '</p>');
        } else {
            html.push('<p><b>' + value + ':</b>----</p>');
        }

    });

    return html.join('');
}

window.actionEvents = {
    //修改操作
    'click .update': function(e, value, row) {
        $("input").val("");
        showModal($(this).attr('title'), row);
    }
};
//显示模态窗口,
function showModal(title, row) {
    row = row || {
        id: 0,
        cs_request_date: '',
        tranportation_number: '',
        type: '',
        customer: '',
        ship_to_location: '',
        city_province: '',
        request_exw_date: '',
        pick_up_location: '',
        request_arrival_date: '',
        forwarder_name: '',
        trucktype: '',
        vehicle_planttime: '00:00'
    };
    $modal.data('id', row.id);
    $modal.find('.modal-title').text(title);
    for (var name in row) { //表格循环赋值
        $modal.find('input[id="' + name + '"]').val(row[name]);
    }
    $modal.find('.modal-title').text(title);
    $modal.modal('show');
    //新增、修改数据
    $('#add_details2_form').bootstrapValidator({
        fields: {
            transportOrderDate: {
                validators: {
                    notEmpty: {
                        message: '运输下单日期不能为空'
                    },
                    date: {
                        format: 'YYYY-MM-DD',
                        message: '日期格式不正确'
                    }
                }
            },
            transportOrderTime: {
                validators: {
                    notEmpty: {
                        message: '运输下单时间不能为空'
                    }
                }
            },
            truckPickupDate: {
                validators: {
                    notEmpty: {
                        message: '装货日期不能为空'
                    },
                    date: {
                        format: 'YYYY-MM-DD',
                        message: '日期格式不正确'
                    }
                }
            },
            truckArrivalTime: {
                validators: {
                    notEmpty: {
                        message: '货车抵达时间不能为空'
                    }
                }
            },
            truckLeftTime: {
                validators: {
                    notEmpty: {
                        message: '货车离开时间不能为空'
                    }
                }
            },
            loadingDurationTime: {
                validators: {
                    notEmpty: {
                        message: '货车装货耗时不能为空'
                    }
                }
            },
            loadingDurationBreakdown: {
                validators: {
                    notEmpty: {
                        message: '货车装货结果不能为空'
                    },
                    stringLength: {
                        max: 10,
                        message: '仓库名称长度不能超过10'
                    }
                }
            },
            truckPlate: {
                validators: {
                    notEmpty: {
                        message: '货车车牌不能为空'
                    }
                }
            },
            trucktype1: {
                validators: {
                    notEmpty: {
                        message: '货车类型不能为空'
                    }
                }
            },
            sapDeliveryOrder: {
                validators: {
                    notEmpty: {
                        message: 'SAP编号不能为空'
                    },
                    stringLength: {
                        max: 10,
                        message: 'SAP编号长度不能超过20'
                    }
                }
            }
        }
    }).on('success.form.bv',
    function(e) {
        e.preventDefault();
        //获取当前表单元素
        $.ajax({
            type: "post",
            url: path + "/details/treateFirst2",
            data: $("#add_details2_form").serialize(),
            success: function(data) {
                if (data) {
                    $table.bootstrapTable('refresh');
                    $("input").val("");
                    $modal.modal('hide');
                    resetModel('add_details2_form');
                    Modal.alert({
                        msg: '操作成功',
                        title: '提示',
                        btnok: '确定'
                    });
                } else {
                    Modal.alert({
                        msg: '操作失败',
                        title: '提示',
                        btnok: '确定'
                    });
                }
            }
        });
    });
}
/**
		 * 选中行
		 */
function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'),
    function(row) {
        return row;
    });
}

//列表传参
function paginationParam(params) {
    return {
        cs_request_date_search: $("#cs_request_date_search").val(),
        tranportation_number_search: $("#tranportation_number_search").val(),
        type_search: $("#type_search").val(),
        sap_delivery_order_search: $("#sap_delivery_order_search").val()
    };
}

//页面初始化加载
$(document).ready(function() {
    //日期控件框初始化
    $('.date-picker').datepicker({
        language: 'zh-CN',
        autoclose: true
    });

    $("button[id$='_details']").click(function() {
        $table.bootstrapTable('refresh', {
            url: path + '/details/getFirstList'
        })
    });

    $('input[name$="Date"]').datepicker({
        language: "zh-CN",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true,
        /*endDate : new Date(),*/
        format: "yyyy-mm-dd"
    }).on('hide',
    function(e) {
        $('#add_details2_form').data('bootstrapValidator').updateStatus(this.name, 'NOT_VALIDATED', null).validateField(this.name);
    });

    //日期控件框初始化
    $('input[name$="Time"]').timepicker({
        defaultTime: '00:00',
        minuteStep: 5,
        showSeconds: false,
        showMeridian: false
    }).on('hide.timepicker',
    function(e) {
        $(this).focus();
    });
    //隐藏用户ID
    $table.bootstrapTable('hideColumn', 'id');
    //绑定触发事件
    /*$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
				//删除按钮
		        $del.prop('disabled', !$table.bootstrapTable('getSelections').length);
		        //编辑按钮
		        $upd.prop('disabled', !$table.bootstrapTable('getSelections').length);
		 	});*/

});