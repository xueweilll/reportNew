package com.mj.report.model;

import java.util.List;

public class Menu {
    private Integer menuId;

    private Integer isLeaf;

    private String menuName;

    private String menuUrl;

    private String iconUrl;

	private Integer parentMenuId;
    
    private String parentMenuIds;
    
    private Integer isDefault; 
    
    private Integer available;

	public Integer getAvailable() {
		return available;
	}

	public void setAvailable(Integer available) {
		this.available = available;
	}

	public Integer getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(Integer isDefault) {
		this.isDefault = isDefault;
	}

	public String getParentMenuIds() {
		return parentMenuIds;
	}

	public void setParentMenuIds(String parentMenuIds) {
		this.parentMenuIds = parentMenuIds;
	}

	private List<Menu> children;  
    
    //拼装ids
    public String makeSelfAsParentIds() {
        return getParentMenuIds() +"-"+ getMenuId() + "-";
    }
    
    public List<Menu> getChildren() {
		return children;
	}

	public void setChildren(List<Menu> children) {
		this.children = children;
	}

	public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }

    public Integer getIsLeaf() {
        return isLeaf;
    }

    public void setIsLeaf(Integer isLeaf) {
        this.isLeaf = isLeaf;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName == null ? null : menuName.trim();
    }

    public String getMenuUrl() {
        return menuUrl;
    }

    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl == null ? null : menuUrl.trim();
    }

    public String getIconUrl() {
		return iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

    public Integer getParentMenuId() {
        return parentMenuId;
    }

    public void setParentMenuId(Integer parentMenuId) {
        this.parentMenuId = parentMenuId;
    }
}