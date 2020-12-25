import Model from "./general.js"
$(function () {
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: function () {
                return Model.SendRequest("/admin/groupstudents/getlist");
            },
            insert: function (values) {
                console.log(values)
                return Model.SendRequest("/admin/groupstudents/create", "POST", true, JSON.stringify(values));
            },
            update: function (key, values) {
                return Model.SendRequest("/admin/groupstudents/update/" + key, "PUT", true, JSON.stringify(values));
            },
        }),
        keyExpr: "id",
        showBorders: true,
        remoteOperations: false,
        columnHidingEnabled: true,
        errorRowEnabled: false,
        columnAutoWidth: true,
        hoverStateEnable: true,
        selection: {
            mode: "single",
            defered: true
        },
        editing: {
            mode: "popup",
            allowDeleting: true,
        },
        columns: [{
            dataField: "groupName",
            caption: "Group name",
        }, {
            dataField: "studentsCount",
            caption: "Student count",
        }],
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true
        }
    });
    $("#title").html("Grouplar & Tələbələr");

    function selection_changed(data) {
        if (data) {
            $("#edit-link").attr("href", `/admin/groupstudents/update/${data.id}`);
        }
    }

    $("#detail-link").hide();
    $("#create-link").attr("href", `/admin/groupstudents/create`);
});



let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key = "", dataGrid;
        var form = $("#form").dxForm({
            formData: model,
            labelLocation: "top",
            showColonAfterLabel: true,
            showValidationSummary: true,
            items: [{
                itemType: "group",
                cssClass: "first-group",
                items: [
                    {
                        dataField: "groupId",
                        editorType: "dxSelectBox",
                        colSpan: 6,
                        editorOptions: {
                            dataSource: DevExpress.data.AspNet.createStore({
                                key: "id",
                                loadUrl: "/admin/groups/getlist",
                            }),
                            displayExpr: "name",
                            valueExpr: "id"
                        }
                    },
                    {
                        dataField: "studentsId",
                        editorType: "dxDropDownBox",
                        colSpan: 6,
                        editorOptions: {
                            valueExpr: "Id",
                            deferRendering: false,
                            placeholder: "Tələbələri seçin...",
                            displayExpr: function (item) {
                                return item && item.Name;
                            },
                            showClearButton: true,
                            contentTemplate: function (e) {
                                var value = e.component.option("value"),
                                    $dataGrid = $("<div>").dxDataGrid({
                                        dataSource: DevExpress.data.AspNet.createStore({
                                            key: "id",
                                            loadUrl: `/admin/users/getstudentslist`,
                                        }),
                                        columns: [{
                                            dataField: "id",
                                            caption: "ID",
                                            fixed: true,
                                            visible: false,
                                            fixedPosition: "left"
                                        }, {
                                            dataField: "name",
                                            caption: "ADI"
                                        }, {
                                            dataField: "surname",
                                            caption: "Soyadı"
                                        }, {
                                            dataField: "classId",
                                            caption: "Group",
                                            editorOptions: {
                                                dataSource: DevExpress.data.AspNet.createStore({
                                                    key: "id",
                                                    loadUrl: "/admin/groups/getlist",
                                                }),
                                                displayExpr: "name",
                                                valueExpr: "id"
                                            }
                                        }],
                                        selectAllModeOptions: {
                                            dataSource: ["allPages", "page"],
                                            bindingOptions: {
                                                value: "selectAllMode",
                                            }
                                        },
                                        hoverStateEnabled: true,
                                        allowSelectedAll: true,
                                        paging: { enabled: true, pageSize: 10 },
                                        filterRow: { visible: true },
                                        scrolling: { mode: "infinite" },
                                        selection: { mode: "multiple" },
                                        selectedRowKeys: [value],
                                        height: "100%",
                                        onSelectionChanged: function (selectedItems) {
                                            var keys = selectedItems.selectedRowKeys,
                                                hasSelection = keys.length;
                                            $("#code").val(keys)
                                            e.component.option("value", hasSelection ? keys : null);
                                        }
                                    });
                                dataGrid = $dataGrid.dxDataGrid("instance");
                                dataGrid.text = "";
                                e.component.on("valueChanged", function (args) {
                                    dataGrid.selectRows(args.value, false);
                                });
                                return $dataGrid;
                            }
                        }
                    }
                ]
            },
            {
                itemType: "group",
                colCount: 1,
                items: [
                    {
                        itemType: "button",
                        horizontalAlignment: "left",
                        buttonOptions: {
                            text: "Save",
                            type: "success",
                            useSubmitBehavior: true
                        }
                    }]
            }
            ]
        }).dxForm("instance");

        if (!isCreate) {
            key = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
            //document.getElementById("form-avatar").style.backgroundImage = `url(../../../users/${model["photourl"]})`;
        }

        $("#form").on("submit", function (e) {
            var data = form.option("formData");
            let url = `/admin/groupstudents/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(url, method, true, JSON.stringify(data))
                .then(() => {
                    window.location.href = `/admin/groupstudents/index`
                });

            e.preventDefault();
        })
    }

}
export let Form = FormCreater;