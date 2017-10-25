<link rel="stylesheet" href="${req.contextPath}/styles/admin/assets/css/bootstrap-timepicker.css" type="text/css"/>
<script src="${req.contextPath}/styles/admin/bootstrapTable/js/bootstrap-table.js"></script>
<script src="${req.contextPath}/styles/admin/js/details3.js"></script>
<script src="${req.contextPath}/styles/admin/bootstrapTable/js/bootstrap-table-zh-CN.js"></script>
<script src="${req.contextPath}/styles/admin/assets/js/date-time/bootstrap-datepicker.min.js"></script>
<script src="${req.contextPath}/styles/admin/assets/js/date-time/bootstrap-datepicker.zh-CN.js"></script>
<script src="${req.contextPath}/styles/admin/assets/js/date-time/bootstrap-timepicker.min.js"></script>


<!-- 页面列表高度（要加在最后加载） -->
<script src="${req.contextPath}/styles/admin/js/pageHeight.js"></script>
	<#include "/admin/layout/list_top_info.ftl"/>
	<div class="container">
		<div id="toolbar" class="form-inline" style="margin-bottom: 10px;margin-top:10px">
		  <div class="form-group" style="margin-left:50px"> 
		   	<span>Cs_Request_Date</span>
		   	<span style="position: relative;"><input style="width:40%" type="text" id="cs_request_date_search" class="input-sm form-control date-picker"   data-date-format="yyyy-mm-dd"/></span>
		 </div>
		 <div class="form-group"> 
		   	<span>Tranportation_Number</span>
		   	<input style="width:40%"type="text" id="tranportation_number_search" class="input-sm form-control" > 
		 </div>    
		
		  <div class="form-group"> 
		   	<span>Type</span>
		   	<input style="width:40%"  type="text" id="type_search" class="input-sm form-control" > 
		 </div> 
		  <div class="form-group"> 
		   	<span>Sap_Delivery_Order</span>
		   	<input style="width:40%"  type="text" id="sap_delivery_order_search" class="input-sm form-control" > 
		 </div> 
		  <button id="search_details" type="button" class="btn btn-default">搜索</button>
		 <button id="refresh_details" name="refresh" title="刷新" type="button" class="btn btn-default" >刷新</button>
	</div>
    <table id="details3_table"
       data-toolbar="#toolbar"
       data-toggle="table"
       data-url="${req.contextPath}/details/getFirstList"
       data-row-style="rowStyle"
       data-pagination="true"
       data-query-params="paginationParam"
       data-striped="true"
       data-page-size="30"
       data-page-list="[10, 30, 60, 100]"
       data-only-info-pagination="false"
       data-show-export="true"
       data-single-select="true"
       data-detail-view="true"
       data-detail-formatter="detailFormatter"
       >
       <thead>
	     	<tr>
		        <th data-field="id">ID</th>
		        <th data-field="cs_request_date">CS_Request_Date</th>
		        <th data-field="tranportation_number">Tranportation_On_Number</th>
		        <th data-field="type">Type</th>
		        <th data-field="customer">Customer</th>
		        <th data-field="ship_to_location">Ship_To_Location</th>
		        <th data-field="city_province">City_Province</th>
		        <th data-field="request_exw_date">Request_EXW_Date</th>
		        <th data-field="pick_up_location">Pick_Up_Location</th>
		        <th data-field="request_arrival_date">Request_Arrival_Date</th>  
		        <th data-field="forwarder_name">Forwarder_Name</th>  
		        <th data-field="trucktype">TruckType</th>
		        <th data-field="vehicle_planttime">要求车辆到厂时间点</th>   
		        <th data-field="action" data-formatter="actionFormatter" data-events="actionEvents">操作</th>
		    </tr>
    	</thead>
    </table>
</div>


<!--新增  -->
<form id="add_details3_form" action="" method="post">	
 <div id="adddetails3_modal" class="modal fade" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog_1">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" onclick="resetModel('add_details3_form')"  data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                      <label>Actual_Arrival_Customer_Date</label>
                      <span style="position: relative; z-index: 9999;"><input type="text" id="actual_arrival_customer_date" name="actualArrivalCustomerDate" class="input-sm form-control" placeholder="客户收货时间"/></span>
                    </div>
                    
                    <div class="form-group">
                        <label>Customer_Complain</label>
                        <input type="text" id="customer_complain" class="form-control"  name="customerComplain" placeholder="客户意见"/>

                    </div>
                      <div class="form-group">
                      <label>Customer_Signed_Recipt_Request_Return_Date</label>
                      <span style="position: relative; z-index: 9999;"><input type="text" id="customer_signed_recipt_request_return_date" name="customerSignedReciptRequestReturnDate" class="input-sm form-control" placeholder="客户签收时间"/></span>
                    </div>
                      <div class="form-group">
                      <label>Customer_Signed_Recipt_Actual_Return_Date</label>
                      <span style="position: relative; z-index: 9999;"><input type="text" id="customer_signed_recipt_actual_return_date" name="customerSignedReciptActualReturnDate" class="input-sm form-control" placeholder="客户实际签收时间"/></span>
                    </div>
                    <input type="hidden" class="form-control" id="id"  name="id" >  <!-- 主键ID -->       
            </div><!-- /.modal-content -->
                    <div class="modal-footer">
                    <button type="button" class="btn btn-default" onclick="resetModel('add_details3_form')"  data-dismiss="modal">取消</button>
                    <button type="submit" id="addDeteils2_form" class="btn btn-primary submit">确定</button>
                </div>
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</form>	


