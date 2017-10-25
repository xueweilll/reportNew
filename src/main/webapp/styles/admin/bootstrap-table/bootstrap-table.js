/*
* bootstrap-table - v1.6.0 - 2015-03-26
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2015 zhixin wen
* Licensed MIT License
*/
!
function(a) {
    "use strict";
    var b = 37,
    c = function(a) {
        var b = arguments,
        c = !0,
        d = 1;
        return a = a.replace(/%s/g,
        function() {
            var a = b[d++];
            return "undefined" == typeof a ? (c = !1, "") : a
        }),
        c ? a: ""
    },
    d = function(b, c, d, e) {
        var f = "";
        return a.each(b,
        function(a, b) {
            return b[c] === e ? (f = b[d], !1) : !0
        }),
        f
    },
    e = function(b, c) {
        var d = -1;
        return a.each(b,
        function(a, b) {
            return b.field === c ? (d = a, !1) : !0
        }),
        d
    },
    f = null,
    g = function() {
        if (null === f) {
            var b, c, d = a("<p/>").addClass("fixed-table-scroll-inner"),
            e = a("<div/>").addClass("fixed-table-scroll-outer");
            e.append(d),
            a("body").append(e),
            b = d[0].offsetWidth,
            e.css("overflow", "scroll"),
            c = d[0].offsetWidth,
            b === c && (c = e[0].clientWidth),
            e.remove(),
            f = b - c
        }
        return f
    },
    h = function(b, c, d, e) {
        if ("string" == typeof c) {
            var f = c.split(".");
            f.length > 1 ? (c = window, a.each(f,
            function(a, b) {
                c = c[b]
            })) : c = window[c]
        }
        return "object" == typeof c ? c: "function" == typeof c ? c.apply(b, d) : e
    },
    i = function(a) {
        return "string" == typeof a ? a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : a
    },
    j = function(b, c) {
        this.options = c,
        this.$el = a(b),
        this.$el_ = this.$el.clone(),
        this.timeoutId_ = 0,
        this.timeoutFooter_ = 0,
        this.init()
    };
    j.DEFAULTS = {
        classes: "table table-hover",
        height: void 0,
        undefinedText: "-",
        sortName: void 0,
        sortOrder: "asc",
        striped: !1,
        columns: [],
        data: [],
        method: "get",
        url: void 0,
        cache: !0,
        contentType: "application/json",
        dataType: "json",
        ajaxOptions: {},
        queryParams: function(a) {
            return a
        },
        queryParamsType: "limit",
        responseHandler: function(a) {
            return a
        },
        pagination: !1,
        sidePagination: "client",
        totalRows: 0,
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        paginationHAlign: "right",
        paginationVAlign: "bottom",
        paginationDetailHAlign: "left",
        paginationDetailVAlign: "bottom",
        search: !1,
        searchAlign: "right",
        selectItemName: "btSelectItem",
        showHeader: !0,
        showFooter: !1,
        showColumns: !1,
        showPaginationSwitch: !1,
        showRefresh: !1,
        showToggle: !1,
        buttonsAlign: "right",
        smartDisplay: !0,
        minimumCountColumns: 1,
        idField: void 0,
        cardView: !1,
        trimOnSearch: !0,
        clickToSelect: !1,
        singleSelect: !1,
        toolbar: void 0,
        toolbarAlign: "left",
        checkboxHeader: !0,
        sortable: !0,
        maintainSelected: !1,
        searchTimeOut: 500,
        keyEvents: !1,
        searchText: "",
        iconSize: void 0,
        iconsPrefix: "glyphicon",
        icons: {
            paginationSwitchDown: "glyphicon-collapse-down icon-chevron-down",
            paginationSwitchUp: "glyphicon-collapse-up icon-chevron-up",
            refresh: "glyphicon-refresh icon-refresh",
            toggle: "glyphicon-list-alt icon-list-alt",
            columns: "glyphicon-th icon-th"
        },
        rowStyle: function() {
            return {}
        },
        rowAttributes: function() {
            return {}
        },
        onAll: function() {
            return ! 1
        },
        onClickRow: function() {
            return ! 1
        },
        onDblClickRow: function() {
            return ! 1
        },
        onSort: function() {
            return ! 1
        },
        onCheck: function() {
            return ! 1
        },
        onUncheck: function() {
            return ! 1
        },
        onCheckAll: function() {
            return ! 1
        },
        onUncheckAll: function() {
            return ! 1
        },
        onLoadSuccess: function() {
            return ! 1
        },
        onLoadError: function() {
            return ! 1
        },
        onColumnSwitch: function() {
            return ! 1
        },
        onPageChange: function() {
            return ! 1
        },
        onSearch: function() {
            return ! 1
        },
        onPreBody: function() {
            return ! 1
        },
        onPostBody: function() {
            return ! 1
        },
        onPostHeader: function() {
            return ! 1
        }
    },
    j.LOCALES = [],
    j.LOCALES["en-US"] = {
        formatLoadingMessage: function() {
            return "Loading, please wait..."
        },
        formatRecordsPerPage: function(a) {
            return c("%s records per page", a)
        },
        formatShowingRows: function(a, b, d) {
            return c("Showing %s to %s of %s rows", a, b, d)
        },
        formatSearch: function() {
            return "Search"
        },
        formatNoMatches: function() {
            return "No matching records found"
        },
        formatPaginationSwitch: function() {
            return "Hide/Show pagination"
        },
        formatRefresh: function() {
            return "Refresh"
        },
        formatToggle: function() {
            return "Toggle"
        },
        formatColumns: function() {
            return "Columns"
        },
        formatAllRows: function() {
            return "All"
        }
    },
    a.extend(j.DEFAULTS, j.LOCALES["en-US"]),
    j.COLUMN_DEFAULTS = {
        radio: !1,
        checkbox: !1,
        checkboxEnabled: !0,
        field: void 0,
        title: void 0,
        "class": void 0,
        align: void 0,
        halign: void 0,
        falign: void 0,
        valign: void 0,
        width: void 0,
        sortable: !1,
        order: "asc",
        visible: !0,
        switchable: !0,
        clickToSelect: !0,
        formatter: void 0,
        footerFormatter: void 0,
        events: void 0,
        sorter: void 0,
        cellStyle: void 0,
        searchable: !0,
        cardVisible: !0
    },
    j.EVENTS = {
        "all.bs.table": "onAll",
        "click-row.bs.table": "onClickRow",
        "dbl-click-row.bs.table": "onDblClickRow",
        "sort.bs.table": "onSort",
        "check.bs.table": "onCheck",
        "uncheck.bs.table": "onUncheck",
        "check-all.bs.table": "onCheckAll",
        "uncheck-all.bs.table": "onUncheckAll",
        "load-success.bs.table": "onLoadSuccess",
        "load-error.bs.table": "onLoadError",
        "column-switch.bs.table": "onColumnSwitch",
        "page-change.bs.table": "onPageChange",
        "search.bs.table": "onSearch",
        "pre-body.bs.table": "onPreBody",
        "post-body.bs.table": "onPostBody",
        "post-header.bs.table": "onPostHeader"
    },
    j.prototype.init = function() {
        this.initContainer(),
        this.initTable(),
        this.initHeader(),
        this.initData(),
        this.initFooter(),
        this.initToolbar(),
        this.initPagination(),
        this.initBody(),
        this.initServer(),
        this.initKeyEvents()
    },
    j.prototype.initContainer = function() {
        this.$container = a(['<div class="bootstrap-table">', '<div class="fixed-table-toolbar"></div>', '<div class="fixed-table-container">', '<div class="fixed-table-header"><table></table></div>', '<div class="fixed-table-body">', '<div class="fixed-table-loading">', this.options.formatLoadingMessage(), "</div>", "</div>", '<div class="fixed-table-footer"><table><tr></tr></table></div>', '<div class="fixed-table-pagination"></div>', "</div>", "</div>"].join("")),
        this.$container.insertAfter(this.$el),
        this.$container.find(".fixed-table-body").append(this.$el),
        this.$container.after('<div class="clearfix"></div>'),
        this.$loading = this.$container.find(".fixed-table-loading"),
        this.$el.addClass(this.options.classes),
        this.options.striped && this.$el.addClass("table-striped")
    },
    j.prototype.initTable = function() {
        var b = this,
        c = [],
        d = [];
        this.$header = this.$el.find("thead"),
        this.$header.length || (this.$header = a("<thead></thead>").appendTo(this.$el)),
        this.$header.find("tr").length || this.$header.append("<tr></tr>"),
        this.$header.find("th").each(function() {
            var b = a.extend({},
            {
                title: a(this).html(),
                "class": a(this).attr("class")
            },
            a(this).data());
            c.push(b)
        }),
        this.options.columns = a.extend([], c, this.options.columns),
        a.each(this.options.columns,
        function(c, d) {
            b.options.columns[c] = a.extend({},
            j.COLUMN_DEFAULTS, {
                field: c
            },
            d)
        }),
        this.options.data.length || (this.$el.find("tbody tr").each(function() {
            var c = {};
            c._id = a(this).attr("id"),
            c._class = a(this).attr("class"),
            a(this).find("td").each(function(d) {
                var e = b.options.columns[d].field;
                c[e] = a(this).html(),
                c["_" + e + "_id"] = a(this).attr("id"),
                c["_" + e + "_class"] = a(this).attr("class"),
                c["_" + e + "_data"] = a(this).data()
            }),
            d.push(c)
        }), this.options.data = d)
    },
    j.prototype.initHeader = function() {
        var d = this,
        e = [],
        f = [];
        this.header = {
            fields: [],
            styles: [],
            classes: [],
            formatters: [],
            events: [],
            sorters: [],
            cellStyles: [],
            clickToSelects: [],
            searchables: []
        },
        a.each(this.options.columns,
        function(a, b) {
            {
                var g = "",
                h = "",
                i = "",
                j = "",
                k = c(' class="%s"', b["class"]);
                d.options.sortOrder || b.order
            }
            b.visible && (!d.options.cardView || b.cardVisible) && (h = c("text-align: %s; ", b.halign ? b.halign: b.align), i = c("text-align: %s; ", b.align), j = c("vertical-align: %s; ", b.valign), j += c("width: %spx; ", b.checkbox || b.radio ? 36 : b.width), e.push(b), d.header.fields.push(b.field), d.header.styles.push(i + j), d.header.classes.push(k), d.header.formatters.push(b.formatter), d.header.events.push(b.events), d.header.sorters.push(b.sorter), d.header.cellStyles.push(b.cellStyle), d.header.clickToSelects.push(b.clickToSelect), d.header.searchables.push(b.searchable), f.push("<th", b.checkbox || b.radio ? c(' class="bs-checkbox %s"', b["class"] || "") : k, c(' style="%s"', h + j), ">"), f.push(c('<div class="th-inner %s">', d.options.sortable && b.sortable ? "sortable": "")), g = b.title, d.options.sortName === b.field && d.options.sortable && b.sortable && (g += d.getCaretHtml()), b.checkbox && (!d.options.singleSelect && d.options.checkboxHeader && (g = '<input name="btSelectAll" type="checkbox" />'), d.header.stateField = b.field), b.radio && (g = "", d.header.stateField = b.field, d.options.singleSelect = !0), f.push(g), f.push("</div>"), f.push('<div class="fht-cell"></div>'), f.push("</th>"))
        }),
        this.$header.find("tr").html(f.join("")),
        this.$header.find("th").each(function(b) {
            a(this).data(e[b])
        }),
        this.$container.off("click", "th").on("click", "th",
        function(b) {
            d.options.sortable && a(this).data().sortable && d.onSort(b)
        }),
        !this.options.showHeader || this.options.cardView ? (this.$header.hide(), this.$container.find(".fixed-table-header").hide(), this.$loading.css("top", 0)) : (this.$header.show(), this.$container.find(".fixed-table-header").show(), this.$loading.css("top", b + "px")),
        this.$selectAll = this.$header.find('[name="btSelectAll"]'),
        this.$container.off("click", '[name="btSelectAll"]').on("click", '[name="btSelectAll"]',
        function() {
            var b = a(this).prop("checked");
            d[b ? "checkAll": "uncheckAll"]()
        })
    },
    j.prototype.initFooter = function() {
        this.$footer = this.$container.find(".fixed-table-footer"),
        !this.options.showFooter || this.options.cardView ? this.$footer.hide() : this.$footer.show()
    },
    j.prototype.resetFooter = function() {
        var b = this,
        d = b.getData(),
        e = [];
        this.options.showFooter && !this.options.cardView && (a.each(b.options.columns,
        function(a, b) {
            var f = "",
            g = "",
            i = c(' class="%s"', b["class"]);
            b.visible && (!that.options.cardView || b.cardVisible) && (f = c("text-align: %s; ", b.falign ? b.falign: b.align), g = c("vertical-align: %s; ", b.valign), e.push("<td", i, c(' style="%s"', f + g), ">"), e.push(h(b, b.footerFormatter, [d], "&nbsp;") || "&nbsp;"), e.push("</td>"))
        }), b.$footer.find("tr").html(e.join("")), clearTimeout(b.timeoutFooter_), b.timeoutFooter_ = setTimeout(a.proxy(b.fitFooter, b), b.$el.is(":hidden") ? 100 : 0))
    },
    j.prototype.fitFooter = function() {
        var b, c, d, e, f = this;
        return clearTimeout(f.timeoutFooter_),
        f.$el.is(":hidden") ? void(f.timeoutFooter_ = setTimeout(a.proxy(f.fitFooter, f), 100)) : (b = f.$container.find(".fixed-table-body"), d = f.$el.css("width"), e = d > b.width() ? g() : 0, f.$footer.css({
            "margin-right": e
        }).find("table").css("width", d).attr("class", f.$el.attr("class")), c = f.$footer.find("td"), void b.find("tbody tr:first-child:not(.no-records-found) > td").each(function(b) {
            c.eq(b).outerWidth(a(this).outerWidth())
        }))
    },
    j.prototype.initData = function(a, b) {
        this.data = "append" === b ? this.data.concat(a) : "prepend" === b ? [].concat(a).concat(this.data) : a || this.options.data,
        this.options.data = this.data,
        "server" !== this.options.sidePagination && this.initSort()
    },
    j.prototype.initSort = function() {
        var b = this,
        c = this.options.sortName,
        d = "desc" === this.options.sortOrder ? -1 : 1,
        e = a.inArray(this.options.sortName, this.header.fields); - 1 !== e && this.data.sort(function(f, g) {
            var i = f[c],
            j = g[c],
            k = h(b.header, b.header.sorters[e], [i, j]);
            return void 0 !== k ? d * k: void 0 !== k ? d * k: ((void 0 === i || null === i) && (i = ""), (void 0 === j || null === j) && (j = ""), a.isNumeric(i) && a.isNumeric(j) ? (i = parseFloat(i), j = parseFloat(j), j > i ? -1 * d: d) : i === j ? 0 : ("string" != typeof i && (i = i.toString()), -1 === i.localeCompare(j) ? -1 * d: d))
        })
    },
    j.prototype.onSort = function(b) {
        var c = a(b.currentTarget),
        d = this.$header.find("th").eq(c.index());
        return this.$header.add(this.$header_).find("span.order").remove(),
        this.options.sortName === c.data("field") ? this.options.sortOrder = "asc" === this.options.sortOrder ? "desc": "asc": (this.options.sortName = c.data("field"), this.options.sortOrder = "asc" === c.data("order") ? "desc": "asc"),
        this.trigger("sort", this.options.sortName, this.options.sortOrder),
        c.add(d).data("order", this.options.sortOrder).find(".th-inner").append(this.getCaretHtml()),
        "server" === this.options.sidePagination ? void this.initServer() : (this.initSort(), void this.initBody())
    },
    j.prototype.initToolbar = function() {
        var b, d, e = this,
        f = [],
        g = 0,
        i = 0;
        this.$toolbar = this.$container.find(".fixed-table-toolbar").html(""),
        "string" == typeof this.options.toolbar && a(c('<div class="bars pull-%s"></div>', this.options.toolbarAlign)).appendTo(this.$toolbar).append(a(this.options.toolbar)),
        f = [c('<div class="columns columns-%s btn-group pull-%s">', this.options.buttonsAlign, this.options.buttonsAlign)],
        "string" == typeof this.options.icons && (this.options.icons = h(null, this.options.icons)),
        this.options.showPaginationSwitch && f.push(c('<button class="btn btn-default" type="button" name="paginationSwitch" title="%s">', this.options.formatPaginationSwitch()), c('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.paginationSwitchDown), "</button>"),
        this.options.showRefresh && f.push(c('<button class="btn btn-default' + (void 0 === this.options.iconSize ? "": " btn-" + this.options.iconSize) + '" type="button" name="refresh" title="%s">', this.options.formatRefresh()), c('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.refresh), "</button>"),
        this.options.showToggle && f.push(c('<button class="btn btn-default' + (void 0 === this.options.iconSize ? "": " btn-" + this.options.iconSize) + '" type="button" name="toggle" title="%s">', this.options.formatToggle()), c('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.toggle), "</button>"),
        this.options.showColumns && (f.push(c('<div class="keep-open btn-group" title="%s">', this.options.formatColumns()), '<button type="button" class="btn btn-default' + (void 0 == this.options.iconSize ? "": " btn-" + this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', c('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.columns), ' <span class="caret"></span>', "</button>", '<ul class="dropdown-menu" role="menu">'), a.each(this.options.columns,
        function(a, b) {
            if (! (b.radio || b.checkbox || e.options.cardView && !b.cardVisible)) {
                var d = b.visible ? ' checked="checked"': "";
                b.switchable && (f.push(c('<li><label><input type="checkbox" data-field="%s" value="%s"%s> %s</label></li>', b.field, a, d, b.title)), i++)
            }
        }), f.push("</ul>", "</div>")),
        f.push("</div>"),
        (this.showToolbar || f.length > 2) && this.$toolbar.append(f.join("")),
        this.options.showPaginationSwitch && this.$toolbar.find('button[name="paginationSwitch"]').off("click").on("click", a.proxy(this.togglePagination, this)),
        this.options.showRefresh && this.$toolbar.find('button[name="refresh"]').off("click").on("click", a.proxy(this.refresh, this)),
        this.options.showToggle && this.$toolbar.find('button[name="toggle"]').off("click").on("click",
        function() {
            e.options.cardView = !e.options.cardView,
            e.initHeader(),
            e.initToolbar(),
            e.initBody()
        }),
        this.options.showColumns && (b = this.$toolbar.find(".keep-open"), i <= this.options.minimumCountColumns && b.find("input").prop("disabled", !0), b.find("li").off("click").on("click",
        function(a) {
            a.stopImmediatePropagation()
        }), b.find("input").off("click").on("click",
        function() {
            var b = a(this);
            e.toggleColumn(b.val(), b.prop("checked"), !1),
            e.trigger("column-switch", a(this).data("field"), b.prop("checked"))
        })),
        this.options.search && (f = [], f.push('<div class="pull-' + this.options.searchAlign + ' search">', c('<input class="form-control' + (void 0 === this.options.iconSize ? "": " input-" + this.options.iconSize) + '" type="text" placeholder="%s">', this.options.formatSearch()), "</div>"), this.$toolbar.append(f.join("")), d = this.$toolbar.find(".search input"), d.off("keyup").on("keyup",
        function(a) {
            clearTimeout(g),
            g = setTimeout(function() {
                e.onSearch(a)
            },
            e.options.searchTimeOut)
        }), "" !== this.options.searchText && (d.val(this.options.searchText), clearTimeout(g), g = setTimeout(function() {
            d.trigger("keyup")
        },
        e.options.searchTimeOut)))
    },
    j.prototype.onSearch = function(b) {
        var c = a.trim(a(b.currentTarget).val());
        this.options.trimOnSearch && a(b.currentTarget).val(c),
        c !== this.searchText && (this.searchText = c, this.options.pageNumber = 1, this.initSearch(), this.updatePagination(), this.trigger("search", c))
    },
    j.prototype.initSearch = function() {
        var b = this;
        if ("server" !== this.options.sidePagination) {
            var c = this.searchText && this.searchText.toLowerCase(),
            d = a.isEmptyObject(this.filterColumns) ? null: this.filterColumns;
            this.data = d ? a.grep(this.options.data,
            function(a) {
                for (var b in d) if (a[b] !== d[b]) return ! 1;
                return ! 0
            }) : this.options.data,
            this.data = c ? a.grep(this.data,
            function(d, e) {
                for (var f in d) {
                    f = a.isNumeric(f) ? parseInt(f, 10) : f;
                    var g = d[f];
                    g = h(b.header, b.header.formatters[a.inArray(f, b.header.fields)], [g, d, e], g);
                    var i = a.inArray(f, b.header.fields);
                    if ( - 1 !== i && b.header.searchables[i] && ("string" == typeof g || "number" == typeof g) && -1 !== (g + "").toLowerCase().indexOf(c)) return ! 0
                }
                return ! 1
            }) : this.data
        }
    },
    j.prototype.initPagination = function() {
        if (this.$pagination = this.$container.find(".fixed-table-pagination"), !this.options.pagination) return void this.$pagination.hide();
        this.$pagination.show();
        var b, d, e, f, g, h, i, j, k, l = this,
        m = [],
        n = !1,
        o = this.getData();
        "server" !== this.options.sidePagination && (this.options.totalRows = o.length),
        this.totalPages = 0,
        this.options.totalRows && (this.options.pageSize === this.options.formatAllRows() && (this.options.pageSize = this.options.totalRows, n = !0), this.totalPages = ~~ ((this.options.totalRows - 1) / this.options.pageSize) + 1, this.options.totalPages = this.totalPages),
        this.totalPages > 0 && this.options.pageNumber > this.totalPages && (this.options.pageNumber = this.totalPages),
        this.pageFrom = (this.options.pageNumber - 1) * this.options.pageSize + 1,
        this.pageTo = this.options.pageNumber * this.options.pageSize,
        this.pageTo > this.options.totalRows && (this.pageTo = this.options.totalRows),
        m.push('<div class="pull-' + this.options.paginationDetailHAlign + ' pagination-detail">', '<span class="pagination-info">', this.options.formatShowingRows(this.pageFrom, this.pageTo, this.options.totalRows), "</span>"),
        m.push('<span class="page-list">');
        var p = ['<span class="btn-group dropup">', '<button type="button" class="btn btn-default ' + (void 0 === this.options.iconSize ? "": " btn-" + this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', '<span class="page-size">', n ? this.options.formatAllRows() : this.options.pageSize, "</span>", ' <span class="caret"></span>', "</button>", '<ul class="dropdown-menu" role="menu">'],
        q = this.options.pageList;
        if ("string" == typeof this.options.pageList) {
            var r = this.options.pageList.replace("[", "").replace("]", "").replace(/ /g, "").split(",");
            q = [],
            a.each(r,
            function(a, b) {
                q.push(b.toUpperCase() === l.options.formatAllRows().toUpperCase() ? l.options.formatAllRows() : +b)
            })
        }
        for (a.each(q,
        function(a, b) {
            if (!l.options.smartDisplay || 0 === a || q[a - 1] <= l.options.totalRows) {
                var d;
                d = n ? b === l.options.formatAllRows() ? ' class="active"': "": b === l.options.pageSize ? ' class="active"': "",
                p.push(c('<li%s><a href="javascript:void(0)">%s</a></li>', d, b))
            }
        }), p.push("</ul></span>"), m.push(this.options.formatRecordsPerPage(p.join(""))), m.push("</span>"), m.push("</div>", '<div class="pull-' + this.options.paginationHAlign + ' pagination">', '<ul class="pagination' + (void 0 === this.options.iconSize ? "": " pagination-" + this.options.iconSize) + '">', '<li class="page-first"><a href="javascript:void(0)">&lt;&lt;</a></li>', '<li class="page-pre"><a href="javascript:void(0)">&lt;</a></li>'), this.totalPages < 5 ? (d = 1, e = this.totalPages) : (d = this.options.pageNumber - 2, e = d + 4, 1 > d && (d = 1, e = 5), e > this.totalPages && (e = this.totalPages, d = e - 4)), b = d; e >= b; b++) m.push('<li class="page-number' + (b === this.options.pageNumber ? " active": "") + '">', '<a href="javascript:void(0)">', b, "</a>", "</li>");
        m.push('<li class="page-next"><a href="javascript:void(0)">&gt;</a></li>', '<li class="page-last"><a href="javascript:void(0)">&gt;&gt;</a></li>', "</ul>", "</div>"),
        this.$pagination.html(m.join("")),
        f = this.$pagination.find(".page-list a"),
        g = this.$pagination.find(".page-first"),
        h = this.$pagination.find(".page-pre"),
        i = this.$pagination.find(".page-next"),
        j = this.$pagination.find(".page-last"),
        k = this.$pagination.find(".page-number"),
        this.options.pageNumber <= 1 && (g.addClass("disabled"), h.addClass("disabled")),
        this.options.pageNumber >= this.totalPages && (i.addClass("disabled"), j.addClass("disabled")),
        this.options.smartDisplay && (this.totalPages <= 1 && this.$pagination.find("div.pagination").hide(), (q.length < 2 || this.options.totalRows <= q[0]) && this.$pagination.find("span.page-list").hide(), this.$pagination[this.getData().length ? "show": "hide"]()),
        n && (this.options.pageSize = this.options.formatAllRows()),
        f.off("click").on("click", a.proxy(this.onPageListChange, this)),
        g.off("click").on("click", a.proxy(this.onPageFirst, this)),
        h.off("click").on("click", a.proxy(this.onPagePre, this)),
        i.off("click").on("click", a.proxy(this.onPageNext, this)),
        j.off("click").on("click", a.proxy(this.onPageLast, this)),
        k.off("click").on("click", a.proxy(this.onPageNumber, this))
    },
    j.prototype.updatePagination = function(b) {
        b && a(b.currentTarget).hasClass("disabled") || (this.options.maintainSelected || this.resetRows(), this.initPagination(), "server" === this.options.sidePagination ? this.initServer() : this.initBody(), this.trigger("page-change", this.options.pageNumber, this.options.pageSize))
    },
    j.prototype.onPageListChange = function(b) {
        var c = a(b.currentTarget);
        c.parent().addClass("active").siblings().removeClass("active"),
        this.options.pageSize = c.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ? this.options.formatAllRows() : +c.text(),
        this.$toolbar.find(".page-size").text(this.options.pageSize),
        this.updatePagination(b)
    },
    j.prototype.onPageFirst = function(a) {
        this.options.pageNumber = 1,
        this.updatePagination(a)
    },
    j.prototype.onPagePre = function(a) {
        this.options.pageNumber--,
        this.updatePagination(a)
    },
    j.prototype.onPageNext = function(a) {
        this.options.pageNumber++,
        this.updatePagination(a)
    },
    j.prototype.onPageLast = function(a) {
        this.options.pageNumber = this.totalPages,
        this.updatePagination(a)
    },
    j.prototype.onPageNumber = function(b) {
        this.options.pageNumber !== +a(b.currentTarget).text() && (this.options.pageNumber = +a(b.currentTarget).text(), this.updatePagination(b))
    },
    j.prototype.initBody = function(b) {
        var f = this,
        g = [],
        j = this.getData();
        this.trigger("pre-body", j),
        this.$body = this.$el.find("tbody"),
        this.$body.length || (this.$body = a("<tbody></tbody>").appendTo(this.$el)),
        this.options.pagination && "server" !== this.options.sidePagination || (this.pageFrom = 1, this.pageTo = j.length);
        for (var k = this.pageFrom - 1; k < this.pageTo; k++) {
            var l, m = j[k],
            n = {},
            o = [],
            p = {},
            q = [];
            if (n = h(this.options, this.options.rowStyle, [m, k], n), n && n.css) for (l in n.css) o.push(l + ": " + n.css[l]);
            if (p = h(this.options, this.options.rowAttributes, [m, k], p)) for (l in p) q.push(c('%s="%s"', l, i(p[l])));
            g.push("<tr", c(" %s", q.join(" ")), c(' id="%s"', a.isArray(m) ? void 0 : m._id), c(' class="%s"', n.classes || (a.isArray(m) ? void 0 : m._class)), c(' data-index="%s"', k), ">"),
            this.options.cardView && g.push(c('<td colspan="%s">', this.header.fields.length)),
            a.each(this.header.fields,
            function(b, i) {
                var j = "",
                l = m[i],
                p = "",
                q = {},
                r = "",
                s = f.header.classes[b],
                t = "",
                u = f.options.columns[e(f.options.columns, i)];
                if (n = c('style="%s"', o.concat(f.header.styles[b]).join("; ")), l = h(f.header, f.header.formatters[b], [l, m, k], l), m["_" + i + "_id"] && (r = c(' id="%s"', m["_" + i + "_id"])), m["_" + i + "_class"] && (s = c(' class="%s"', m["_" + i + "_class"])), q = h(f.header, f.header.cellStyles[b], [l, m, k], q), q.classes && (s = c(' class="%s"', q.classes)), q.css) {
                    var v = [];
                    for (var w in q.css) v.push(w + ": " + q.css[w]);
                    n = c('style="%s"', v.concat(f.header.styles[b]).join("; "))
                }
                m["_" + i + "_data"] && !a.isEmptyObject(m["_" + i + "_data"]) && a.each(m["_" + i + "_data"],
                function(a, b) {
                    "index" !== a && (t += c(' data-%s="%s"', a, b))
                }),
                u.checkbox || u.radio ? (p = u.checkbox ? "checkbox": p, p = u.radio ? "radio": p, j = [f.options.cardView ? '<div class="card-view">': '<td class="bs-checkbox">', "<input" + c(' data-index="%s"', k) + c(' name="%s"', f.options.selectItemName) + c(' type="%s"', p) + c(' value="%s"', m[f.options.idField]) + c(' checked="%s"', l === !0 || l && l.checked ? "checked": void 0) + c(' disabled="%s"', !u.checkboxEnabled || l && l.disabled ? "disabled": void 0) + " />", f.options.cardView ? "</div>": "</td>"].join("")) : (l = "undefined" == typeof l || null === l ? f.options.undefinedText: l, j = f.options.cardView ? ['<div class="card-view">', f.options.showHeader ? c('<span class="title" %s>%s</span>', n, d(f.options.columns, "field", "title", i)) : "", c('<span class="value">%s</span>', l), "</div>"].join("") : [c("<td%s %s %s %s>", r, s, n, t), l, "</td>"].join(""), f.options.cardView && f.options.smartDisplay && "" === l && (j = "")),
                g.push(j)
            }),
            this.options.cardView && g.push("</td>"),
            g.push("</tr>")
        }
        g.length || g.push('<tr class="no-records-found">', c('<td colspan="%s">%s</td>', this.header.fields.length, this.options.formatNoMatches()), "</tr>"),
        this.$body.html(g.join("")),
        b || this.scrollTo(0),
        this.$body.find("> tr > td").off("click").on("click",
        function() {
            var b = a(this).parent();
            f.trigger("click-row", f.data[b.data("index")], b),
            f.options.clickToSelect && f.header.clickToSelects[b.children().index(a(this))] && b.find(c('[name="%s"]', f.options.selectItemName))[0].click()
        }),
        this.$body.find("tr").off("dblclick").on("dblclick",
        function() {
            f.trigger("dbl-click-row", f.data[a(this).data("index")], a(this))
        }),
        this.$selectItem = this.$body.find(c('[name="%s"]', this.options.selectItemName)),
        this.$selectItem.off("click").on("click",
        function(b) {
            b.stopImmediatePropagation();
            var c = a(this).prop("checked"),
            d = f.data[a(this).data("index")];
            d[f.header.stateField] = c,
            f.trigger(c ? "check": "uncheck", d),
            f.options.singleSelect && (f.$selectItem.not(this).each(function() {
                f.data[a(this).data("index")][f.header.stateField] = !1
            }), f.$selectItem.filter(":checked").not(this).prop("checked", !1)),
            f.updateSelected()
        }),
        a.each(this.header.events,
        function(b, c) {
            if (c) {
                "string" == typeof c && (c = h(null, c));
                for (var d in c) f.$body.find("tr").each(function() {
                    var e = a(this),
                    g = e.find(f.options.cardView ? ".card-view": "td").eq(b),
                    h = d.indexOf(" "),
                    i = d.substring(0, h),
                    j = d.substring(h + 1),
                    k = c[d];
                    g.find(j).off(i).on(i,
                    function(a) {
                        var c = e.data("index"),
                        d = f.data[c],
                        g = d[f.header.fields[b]];
                        k.apply(this, [a, g, d, c])
                    })
                })
            }
        }),
        this.updateSelected(),
        this.resetView(),
        this.trigger("post-body")
    },
    j.prototype.initServer = function(b, c) {
        var d = this,
        e = {},
        f = {
            pageSize: this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows: this.options.pageSize,
            pageNumber: this.options.pageNumber,
            searchText: this.searchText,
            sortName: this.options.sortName,
            sortOrder: this.options.sortOrder
        };
        this.options.url && ("limit" === this.options.queryParamsType && (f = {
    		limit:f.pageSize,
            search: f.searchText,
            sort: f.sortName,
            order: f.sortOrder,
            pageNum:f.pageNumber
        },
        this.options.pagination && (f.limit = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows: this.options.pageSize, f.offset = this.options.pageSize === this.options.formatAllRows() ? 0 : this.options.pageSize * (this.options.pageNumber - 1))), e = h(this.options, this.options.queryParams, [f], e), a.extend(e, c || {}), e !== !1 && (b || this.$loading.show(), a.ajax(a.extend({},
        h(null, this.options.ajaxOptions), {
            type: this.options.method,
            url: this.options.url,
            data: "application/json" === this.options.contentType && "post" === this.options.method ? JSON.stringify(e) : e,
            cache: this.options.cache,
            contentType: this.options.contentType,
            dataType: this.options.dataType,
            success: function(a) {
                a = h(d.options, d.options.responseHandler, [a], a),
                d.load(a),
                d.trigger("load-success", a)
            },
            error: function(a) {
                d.trigger("load-error", a.status)
            },
            complete: function() {
                b || d.$loading.hide()
            }
        }))))
    },
    j.prototype.initKeyEvents = function() {
        if (this.options.keyEvents) {
            var b = this;
            a(document).off("keypress").on("keypress",
            function(a) {
                if (b.options.search) switch (a.keyCode) {
                case 115:
                case 83:
                    var c = b.$toolbar.find(".search input");
                    return document.activeElement === c.get(0) ? !0 : (c.focus(), !1)
                }
            })
        }
    },
    j.prototype.getCaretHtml = function() {
        return ['<span class="order' + ("desc" === this.options.sortOrder ? "": " dropup") + '">', '<span class="caret" style="margin: 10px 5px;"></span>', "</span>"].join("")
    },
    j.prototype.updateSelected = function() {
        var b = this.$selectItem.filter(":enabled").length === this.$selectItem.filter(":enabled").filter(":checked").length;
        this.$selectAll.add(this.$selectAll_).prop("checked", b),
        this.$selectItem.each(function() {
            a(this).parents("tr")[a(this).prop("checked") ? "addClass": "removeClass"]("selected")
        })
    },
    j.prototype.updateRows = function(b) {
        var c = this;
        this.$selectItem.each(function() {
            c.data[a(this).data("index")][c.header.stateField] = b
        })
    },
    j.prototype.resetRows = function() {
        var b = this;
        a.each(this.data,
        function(a, c) {
            b.$selectAll.prop("checked", !1),
            b.$selectItem.prop("checked", !1),
            c[b.header.stateField] = !1
        })
    },
    j.prototype.trigger = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        b += ".bs.table",
        this.options[j.EVENTS[b]].apply(this.options, c),
        this.$el.trigger(a.Event(b), c),
        this.options.onAll(b, c),
        this.$el.trigger(a.Event("all.bs.table"), [b, c])
    },
    j.prototype.resetHeader = function() {
        this.$el.css("margin-top", -this.$header.height()),
        clearTimeout(this.timeoutId_),
        this.timeoutId_ = setTimeout(a.proxy(this.fitHeader, this), this.$el.is(":hidden") ? 100 : 0)
    },
    j.prototype.fitHeader = function() {
        var b, c, d, e = this;
        return e.$el.is(":hidden") ? void(e.timeoutFooter_ = setTimeout(a.proxy(e.fitHeader, e), 100)) : (b = e.$container.find(".fixed-table-header"), c = e.$container.find(".fixed-table-body"), d = e.$el.width() > c.width() ? g() : 0, e.$header_ = e.$header.clone(!0, !0), e.$selectAll_ = e.$header_.find('[name="btSelectAll"]'), b.css({
            "margin-right": d
        }).find("table").css("width", e.$el.css("width")).html("").attr("class", e.$el.attr("class")).append(e.$header_), e.$header.find("th").each(function(b) {
            e.$header_.find("th").eq(b).data(a(this).data())
        }), e.$body.find("tr:first-child:not(.no-records-found) > *").each(function(b) {
            e.$header_.find("div.fht-cell").eq(b).width(a(this).innerWidth())
        }), c.off("scroll").on("scroll",
        function() {
            b.scrollLeft(a(this).scrollLeft())
        }), void e.trigger("post-header"))
    },
    j.prototype.toggleColumn = function(a, b, d) {
        if ( - 1 !== a && (this.options.columns[a].visible = b, this.initHeader(), this.initSearch(), this.initPagination(), this.initBody(), this.options.showColumns)) {
            var e = this.$toolbar.find(".keep-open input").prop("disabled", !1);
            d && e.filter(c('[value="%s"]', a)).prop("checked", b),
            e.filter(":checked").length <= this.options.minimumCountColumns && e.filter(":checked").prop("disabled", !0)
        }
    },
    j.prototype.toggleRow = function(a, b) { - 1 !== a && this.$selectItem.filter(c('[data-index="%s"]', a)).parents("tr")[b ? "show": "hide"]()
    },
    j.prototype.resetView = function(a) {
        var c = this,
        d = 0,
        e = c.$container.find(".fixed-table-container");
        if (a && a.height && (this.options.height = a.height), this.$selectAll.prop("checked", this.$selectItem.length > 0 && this.$selectItem.length === this.$selectItem.filter(":checked").length), this.options.height) {
            var f = +this.$toolbar.children().outerHeight(!0),
            g = +this.$pagination.children().outerHeight(!0),
            h = this.options.height - f - g;
            e.css("height", h + "px")
        }
        return this.options.cardView ? (c.$el.css("margin-top", "0"), void e.css("padding-bottom", "0")) : (this.options.showHeader && this.options.height ? (this.resetHeader(), d += b) : this.trigger("post-header"), this.options.showFooter && (this.resetFooter(), this.options.height && (d += b)), void e.css("padding-bottom", d + "px"))
    },
    j.prototype.getData = function() {
        return this.searchText || !a.isEmptyObject(this.filterColumns) ? this.data: this.options.data
    },
    j.prototype.load = function(b) {
        var c = !1;
        "server" === this.options.sidePagination ? (this.options.totalRows = b.total, c = b.fixedScroll, b = b.rows) : a.isArray(b) || (c = b.fixedScroll, b = b.data),
        this.initData(b),
        this.initSearch(),
        this.initPagination(),
        this.initBody(c)
    },
    j.prototype.append = function(a) {
        this.initData(a, "append"),
        this.initSearch(),
        this.initPagination(),
        this.initBody(!0)
    },
    j.prototype.prepend = function(a) {
        this.initData(a, "prepend"),
        this.initSearch(),
        this.initPagination(),
        this.initBody(!0)
    },
    j.prototype.remove = function(b) {
        var c, d, e = this.options.data.length;
        if (b.hasOwnProperty("field") && b.hasOwnProperty("values")) {
            for (c = e - 1; c >= 0; c--) d = this.options.data[c],
            d.hasOwnProperty(b.field) && -1 !== a.inArray(d[b.field], b.values) && this.options.data.splice(c, 1);
            e !== this.options.data.length && (this.initSearch(), this.initPagination(), this.initBody(!0))
        }
    },
    j.prototype.insertRow = function(a) {
        a.hasOwnProperty("index") && a.hasOwnProperty("row") && (this.data.splice(a.index, 0, a.row), this.initBody(!0))
    },
    j.prototype.updateRow = function(b) {
        b.hasOwnProperty("index") && b.hasOwnProperty("row") && (a.extend(this.data[b.index], b.row), this.initBody(!0))
    },
    j.prototype.showRow = function(a) {
        this.toggleRow(a, !0)
    },
    j.prototype.hideRow = function(a) {
        this.toggleRow(a, !1)
    },
    j.prototype.mergeCells = function(b) {
        var c, d, e = b.index,
        f = a.inArray(b.field, this.header.fields),
        g = b.rowspan || 1,
        h = b.colspan || 1,
        i = this.$body.find("tr"),
        j = i.eq(e).find("td").eq(f);
        if (! (0 > e || 0 > f || e >= this.data.length)) {
            for (c = e; e + g > c; c++) for (d = f; f + h > d; d++) i.eq(c).find("td").eq(d).hide();
            j.attr("rowspan", g).attr("colspan", h).show()
        }
    },
    j.prototype.getOptions = function() {
        return this.options
    },
    j.prototype.getSelections = function() {
        var b = this;
        return a.grep(this.data,
        function(a) {
            return a[b.header.stateField]
        })
    },
    j.prototype.checkAll = function() {
        this.checkAll_(!0)
    },
    j.prototype.uncheckAll = function() {
        this.checkAll_(!1)
    },
    j.prototype.checkAll_ = function(a) {
        var b;
        a || (b = this.getSelections()),
        this.$selectItem.filter(":enabled").prop("checked", a),
        this.updateRows(a),
        this.updateSelected(),
        a && (b = this.getSelections()),
        this.trigger(a ? "check-all": "uncheck-all", b)
    },
    j.prototype.check = function(a) {
        this.check_(!0, a)
    },
    j.prototype.uncheck = function(a) {
        this.check_(!1, a)
    },
    j.prototype.check_ = function(a, b) {
        this.$selectItem.filter(c('[data-index="%s"]', b)).prop("checked", a),
        this.data[b][this.header.stateField] = a,
        this.updateSelected(),
        this.trigger(a ? "check": "uncheck", this.data[b])
    },
    j.prototype.checkBy = function(a) {
        this.checkBy_(!0, a)
    },
    j.prototype.uncheckBy = function(a) {
        this.checkBy_(!1, a)
    },
    j.prototype.checkBy_ = function(b, d) {
        if (d.hasOwnProperty("field") && d.hasOwnProperty("values")) {
            var e = this;
            a.each(this.options.data,
            function(f, g) {
                return g.hasOwnProperty(d.field) ? void( - 1 !== a.inArray(g[d.field], d.values) && (e.$selectItem.filter(c('[data-index="%s"]', f)).prop("checked", b), g[e.header.stateField] = b, e.trigger(b ? "check": "uncheck", g))) : !1
            }),
            this.updateSelected()
        }
    },
    j.prototype.destroy = function() {
        this.$el.insertBefore(this.$container),
        a(this.options.toolbar).insertBefore(this.$el),
        this.$container.next().remove(),
        this.$container.remove(),
        this.$el.html(this.$el_.html()).css("margin-top", "0").attr("class", this.$el_.attr("class") || "")
    },
    j.prototype.showLoading = function() {
        this.$loading.show()
    },
    j.prototype.hideLoading = function() {
        this.$loading.hide()
    },
    j.prototype.togglePagination = function() {
        this.options.pagination = !this.options.pagination;
        var a = this.$toolbar.find('button[name="paginationSwitch"] i');
        this.options.pagination ? a.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchDown) : a.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchUp),
        this.updatePagination()
    },
    j.prototype.refresh = function(a) {
        a && a.url && (this.options.url = a.url, this.options.pageNumber = 1),
        this.initServer(a && a.silent, a && a.query)
    },
    j.prototype.showColumn = function(a) {
        this.toggleColumn(e(this.options.columns, a), !0, !0)
    },
    j.prototype.hideColumn = function(a) {
        this.toggleColumn(e(this.options.columns, a), !1, !0)
    },
    j.prototype.filterBy = function(b) {
        this.filterColumns = a.isEmptyObject(b) ? {}: b,
        this.options.pageNumber = 1,
        this.initSearch(),
        this.updatePagination()
    },
    j.prototype.scrollTo = function(a) {
        var b = this.$container.find(".fixed-table-body");
        "string" == typeof a && (a = "bottom" === a ? b[0].scrollHeight: 0),
        "number" == typeof a && b.scrollTop(a)
    },
    j.prototype.selectPage = function(a) {
        a > 0 && a <= this.options.totalPages && (this.options.pageNumber = a, this.updatePagination())
    },
    j.prototype.prevPage = function() {
        this.options.pageNumber > 1 && (this.options.pageNumber--, this.updatePagination())
    },
    j.prototype.nextPage = function() {
        this.options.pageNumber < this.options.totalPages && (this.options.pageNumber++, this.updatePagination())
    },
    j.prototype.toggleView = function() {
        this.options.cardView = !this.options.cardView,
        this.initHeader(),
        this.initToolbar(),
        this.initBody()
    };
    var k = ["getOptions", "getSelections", "getData", "load", "append", "prepend", "remove", "insertRow", "updateRow", "showRow", "hideRow", "mergeCells", "checkAll", "uncheckAll", "check", "uncheck", "checkBy", "uncheckBy", "refresh", "resetView", "destroy", "showLoading", "hideLoading", "showColumn", "hideColumn", "filterBy", "scrollTo", "selectPage", "prevPage", "nextPage", "togglePagination", "toggleView"];
    a.fn.bootstrapTable = function(b, c) {
        var d;
        return this.each(function() {
            var e = a(this),
            f = e.data("bootstrap.table"),
            g = a.extend({},
            j.DEFAULTS, e.data(), "object" == typeof b && b);
            if ("string" == typeof b) {
                if (a.inArray(b, k) < 0) throw "Unknown method: " + b;
                if (!f) return;
                d = f[b](c),
                "destroy" === b && e.removeData("bootstrap.table")
            }
            f || e.data("bootstrap.table", f = new j(this, g))
        }),
        "undefined" == typeof d ? this: d
    },
    a.fn.bootstrapTable.Constructor = j,
    a.fn.bootstrapTable.defaults = j.DEFAULTS,
    a.fn.bootstrapTable.columnDefaults = j.COLUMN_DEFAULTS,
    a.fn.bootstrapTable.locales = j.LOCALES,
    a.fn.bootstrapTable.methods = k,
    a(function() {
        a('[data-toggle="table"]').bootstrapTable()
    })
} (jQuery);