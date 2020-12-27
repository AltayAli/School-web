import Model from "./general.js"
$(function () {
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: function () {
                return Model.SendRequest("/admin/groupstudents/getlist");
            },
        }),
        keyExpr: "id",
        showBorders: true,
        remoteOperations: false,
        columnHidingEnabled: true,
        errorRowEnabled: false,
        columnAutoWidth: true,
        hoverStateEnable: true,
        onSelectionChanged: function (selectedItems) {
            selection_changed(selectedItems.selectedRowsData[0]);
        },
        selection: {
            mode: "single",
            defered: true
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
    $("#create-link").hide();
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
                        label: { text: "Qrup" },
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
                            valueExpr: "id",
                            deferRendering: false,
                            placeholder: "Tələbələri seçin...",
                            label: { text: `Tələbələr` },
                            displayExpr: null,
                            value :null,
                            showClearButton: true,
                            contentTemplate: function (e) {
                                var $dataGrid = $("<div>").dxDataGrid({
                                        dataSource: DevExpress.data.AspNet.createStore({
                                            key: "id",
                                            loadUrl: `/admin/users/getstudentslist`,
                                            onLoaded: function () {
                                                form.option("items[0].items[1].label.text", `Tələbələr(${model["studentsId"].length} tələbə seçilib)`);
                                            }
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
                                            dataField: "class_Id",
                                            caption: "Group",
                                            lookup: {
                                                dataSource: DevExpress.data.AspNet.createStore({
                                                    key: "id",
                                                    loadUrl: "/admin/groups/getlist"
                                                }),
                                                valueExpr: "id",
                                                displayExpr: "name"
                                            }
                                        }],
                                        searchPanel: {
                                            visible: true,
                                            width: 240,
                                            placeholder: "Tələbə axtar..."
                                        },
                                        selectAllModeOptions: {
                                            dataSource: ["allPages", "page"],
                                            bindingOptions: {
                                                value: "selectAllMode",
                                            }
                                        },
                                        hoverStateEnabled: true,
                                        paging: { enabled: true, pageSize: 10 },
                                        filterRow: { visible: true },
                                        scrolling: { mode: "infinite" },
                                        selection: { mode: "multiple" },
                                        selectedRowKeys: model["studentsId"],
                                        height: "100%",
                                    onSelectionChanged: function (selectedItems) {
                                            var keys = selectedItems.selectedRowKeys,
                                            hasSelection = keys.length;
                                            model["studentsId"] = keys;
                                            form.option("items[0].items[1].label.text", `Tələbələr(${keys.length} tələbə seçilib)`);
                                            e.component.option("value",/* hasSelection ? keys :*/ null);
                                           
                                        }
                                    });
                                dataGrid = $dataGrid.dxDataGrid("instance");

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
            Model.SendRequest(`/admin/groupstudents/update`, "post", true, JSON.stringify(data))
                .then(() => {
                    window.location.href = `/admin/groupstudents/index`
                });

            e.preventDefault();
        })
    }

}
export let Form = FormCreater;