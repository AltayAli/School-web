import Model from "./general.js"
$(function () {
    $("#title").html("Dərslər")
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "name",
            load: function () {
                return Model.SendRequest("/teacher/monitorings/getlist/" + parseInt(sessionStorage.getItem("l")));
            },
            insert: function (values) {
                values["groupID"] = parseInt(sessionStorage.getItem("l"));
                return Model.SendRequest("/teacher/monitorings/create", "POST", true, JSON.stringify(values));
            },
            update: function (key, values) {
                values["groupID"] = parseInt(sessionStorage.getItem("l"));
                return Model.SendRequest("/teacher/monitorings/update/" + key, "PUT", true, JSON.stringify(values));
            },
            remove: function (key) {
                return Model.SendRequest("/teacher/monitorings/delete?oldName=" + key + "&groupId=" + parseInt(sessionStorage.getItem("l")), "DELETE", true);
            }
        }),
        keyExpr: "name",
        showBorders: true,
        remoteOperations: false,
        columnHidingEnabled: true,
        errorRowEnabled: false,
        columnAutoWidth: true,
        onSelectionChanged: function (selectedItems) {
            Model.SendRequest(`/teacher/monitorings/getuserslist?name=` + selectedItems.selectedRowsData[0].name + "&groupId=" + parseInt(sessionStorage.getItem("l")), "GET")
                .then((items) => {
                    console.log(items)
                    $("#body-2").dxDataGrid({
                        dataSource: new DevExpress.data.CustomStore({
                            key: "id",
                            load: function () {
                                return items;
                            },
                            update: function (key, values) {
                                for (var i in items) {
                                    if (items[i]["id"] == key) {

                                        items[i]["score"] = values["score"];
                                        break;
                                    }
                                }
                                return Model.SendRequest("/teacher/monitorings/updatescore/" + key, "PUT", true, JSON.stringify(values));
                            }
                        }),
                        keyExpr: "id",
                        showBorders: true,
                        remoteOperations: false,
                        columnHidingEnabled: true,
                        errorRowEnabled: false,
                        columnAutoWidth: true,
                        onSelectionChanged: function (selectedItems) {

                        },
                        grouping: {
                            autoExpandAll: true,
                        },
                        groupPanel: {
                            visible: true
                        },
                        hoverStateEnable: true,
                        selection: {
                            mode: "single",
                            defered: true
                        },
                        editing: {
                            mode: "batch",
                            allowUpdating: true,
                            selectTextOnEditStart: true,
                            startEditAction: "click"
                        },
                        columns: [{
                            dataField: "id",
                            caption: "ID",
                            visible: false,
                            allowEditing: false,
                            validationRules: [{ type: "required" }]
                        }, {
                            dataField: "studentName", 
                            caption: "Tələbə",
                            allowEditing: false,
                        }, {
                            dataField: "score",
                            caption: "Nəticə",
                            width:100
                        }, {
                            cellTemplate: function (container, options) {
                                if (options.data["path"])
                                    $("<div>")
                                        .append($(`<a href="/monitorings/${options.data["path"]}" class="btn" download="${options.data["path"]}"><i class="icon-download"></i>Faylı yüklə</a>`))
                                        .appendTo(container);
                            },
                            width: 150,
                            formItem: {
                                visible: false
                            },
                        }, {
                            type: "buttons",
                            buttons: [{ name: "delete" }, { name: "edit" }]
                        }],
                        paging: {
                            pageSize: 10
                        },
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 20, 50],
                            showInfo: true
                        }
                    });
                });
                   
        },
        hoverStateEnable: true,
        selection: {
            mode: "single",
            defered: true
        },
        editing: {
            mode: "popup",
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: true,
            popup: {
                title: "Sərbəst iş",
                showTitle: true,
                width: "auto",
                height: "auto",
                position: {
                    my: "top",
                    at: "top",
                    of: window
                }
            }
        },
        columns: [{
            dataField: "name",
            caption: "OldName",
            visible: false,
            formItem: {
                visible:false
            },
            validationRules: [{ type: "required" }]
        },{
            dataField: "name",
            caption: "Ad",
            formItem: {
                colSpan: 2,
            },
            validationRules: [{ type: "required" }]
        },{
            dataField: "deadLine",
            caption: "Bitmə vaxtı",
            dataType: "date",
            format: "dd.MM.yyyy",
            formItem: {
                colSpan: 2,
            },
            validationRules: [{ type: "required" }]
        }, {
            type: "buttons",
                buttons: [{ name: "edit" },{ name: "delete" }]
        }],
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 20, 50],
            showInfo: true
        }
    });
});
