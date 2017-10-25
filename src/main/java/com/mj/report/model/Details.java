package com.mj.report.model;


public class Details {
    private Integer id;

    private String csRequestDate;

    private String tranportationNumber;

    private String type;

    private String customer;

    private String shipToLocation;

    private String cityProvince;

    private String requestExwDate;

    private String pickUpLocation;

    private String requestArrivalDate;

    private String forwarderName;

    private String trucktype;

    private String transportOrderDate;

    private String transportOrderTime;

    private String vehiclePlanttime;

    private String truckPickupDate;

    private String truckArrivalTime;

    private String truckLeftTime;

    private String loadingDurationTime;

    private String loadingDurationBreakdown;

    private String truckPlate;

    private String trucktype1;

    private String sapDeliveryOrder;

    private String actualArrivalCustomerDate;

    private String customerComplain;

    private String customerSignedReciptRequestReturnDate;

    private String customerSignedReciptActualReturnDate;

  

    private byte[] createtime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCsRequestDate() {
        return csRequestDate;
    }

    public void setCsRequestDate(String csRequestDate) {
        this.csRequestDate = csRequestDate == null ? null : csRequestDate.trim();
    }

    public String getTranportationNumber() {
        return tranportationNumber;
    }

    public void setTranportationNumber(String tranportationNumber) {
        this.tranportationNumber = tranportationNumber == null ? null : tranportationNumber.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer == null ? null : customer.trim();
    }

    public String getShipToLocation() {
        return shipToLocation;
    }

    public void setShipToLocation(String shipToLocation) {
        this.shipToLocation = shipToLocation == null ? null : shipToLocation.trim();
    }

    public String getCityProvince() {
        return cityProvince;
    }

    public void setCityProvince(String cityProvince) {
        this.cityProvince = cityProvince == null ? null : cityProvince.trim();
    }

    public String getRequestExwDate() {
        return requestExwDate;
    }

    public void setRequestExwDate(String requestExwDate) {
        this.requestExwDate = requestExwDate == null ? null : requestExwDate.trim();
    }

    public String getPickUpLocation() {
        return pickUpLocation;
    }

    public void setPickUpLocation(String pickUpLocation) {
        this.pickUpLocation = pickUpLocation == null ? null : pickUpLocation.trim();
    }

    public String getRequestArrivalDate() {
        return requestArrivalDate;
    }

    public void setRequestArrivalDate(String requestArrivalDate) {
        this.requestArrivalDate = requestArrivalDate == null ? null : requestArrivalDate.trim();
    }

    public String getForwarderName() {
        return forwarderName;
    }

    public void setForwarderName(String forwarderName) {
        this.forwarderName = forwarderName == null ? null : forwarderName.trim();
    }

    public String getTrucktype() {
        return trucktype;
    }

    public void setTrucktype(String trucktype) {
        this.trucktype = trucktype == null ? null : trucktype.trim();
    }

    public String getTransportOrderDate() {
        return transportOrderDate;
    }

    public void setTransportOrderDate(String transportOrderDate) {
        this.transportOrderDate = transportOrderDate == null ? null : transportOrderDate.trim();
    }

    public String getTransportOrderTime() {
        return transportOrderTime;
    }

    public void setTransportOrderTime(String transportOrderTime) {
        this.transportOrderTime = transportOrderTime == null ? null : transportOrderTime.trim();
    }

    public String getVehiclePlanttime() {
        return vehiclePlanttime;
    }

    public void setVehiclePlanttime(String vehiclePlanttime) {
        this.vehiclePlanttime = vehiclePlanttime == null ? null : vehiclePlanttime.trim();
    }

    public String getTruckPickupDate() {
        return truckPickupDate;
    }

    public void setTruckPickupDate(String truckPickupDate) {
        this.truckPickupDate = truckPickupDate == null ? null : truckPickupDate.trim();
    }

    public String getTruckArrivalTime() {
        return truckArrivalTime;
    }

    public void setTruckArrivalTime(String truckArrivalTime) {
        this.truckArrivalTime = truckArrivalTime == null ? null : truckArrivalTime.trim();
    }

    public String getTruckLeftTime() {
        return truckLeftTime;
    }

    public void setTruckLeftTime(String truckLeftTime) {
        this.truckLeftTime = truckLeftTime == null ? null : truckLeftTime.trim();
    }


    public String getLoadingDurationTime() {
		return loadingDurationTime;
	}

	public void setLoadingDurationTime(String loadingDurationTime) {
		this.loadingDurationTime = loadingDurationTime;
	}

	public String getLoadingDurationBreakdown() {
        return loadingDurationBreakdown;
    }

    public void setLoadingDurationBreakdown(String loadingDurationBreakdown) {
        this.loadingDurationBreakdown = loadingDurationBreakdown == null ? null : loadingDurationBreakdown.trim();
    }

    public String getTruckPlate() {
        return truckPlate;
    }

    public void setTruckPlate(String truckPlate) {
        this.truckPlate = truckPlate == null ? null : truckPlate.trim();
    }

    public String getTrucktype1() {
        return trucktype1;
    }

    public void setTrucktype1(String trucktype1) {
        this.trucktype1 = trucktype1 == null ? null : trucktype1.trim();
    }

    public String getSapDeliveryOrder() {
        return sapDeliveryOrder;
    }

    public void setSapDeliveryOrder(String sapDeliveryOrder) {
        this.sapDeliveryOrder = sapDeliveryOrder == null ? null : sapDeliveryOrder.trim();
    }

    public String getActualArrivalCustomerDate() {
        return actualArrivalCustomerDate;
    }

    public void setActualArrivalCustomerDate(String actualArrivalCustomerDate) {
        this.actualArrivalCustomerDate = actualArrivalCustomerDate == null ? null : actualArrivalCustomerDate.trim();
    }

    public String getCustomerComplain() {
        return customerComplain;
    }

    public void setCustomerComplain(String customerComplain) {
        this.customerComplain = customerComplain == null ? null : customerComplain.trim();
    }

    public String getCustomerSignedReciptRequestReturnDate() {
        return customerSignedReciptRequestReturnDate;
    }

    public void setCustomerSignedReciptRequestReturnDate(String customerSignedReciptRequestReturnDate) {
        this.customerSignedReciptRequestReturnDate = customerSignedReciptRequestReturnDate == null ? null : customerSignedReciptRequestReturnDate.trim();
    }

    public String getCustomerSignedReciptActualReturnDate() {
        return customerSignedReciptActualReturnDate;
    }

    public void setCustomerSignedReciptActualReturnDate(String customerSignedReciptActualReturnDate) {
        this.customerSignedReciptActualReturnDate = customerSignedReciptActualReturnDate == null ? null : customerSignedReciptActualReturnDate.trim();
    }



    public byte[] getCreatetime() {
        return createtime;
    }

    public void setCreatetime(byte[] createtime) {
        this.createtime = createtime;
    }
}