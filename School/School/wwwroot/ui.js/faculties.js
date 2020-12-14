import Model from "./general.js"
$(function () {
    $("#title").html("List of faculties")
    $("#detail-link").hide();
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "code",
            load: function () {
                var url = `${Model.FacultiesUrl}/GetDevExtremeList`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=1`, "GET", false);
            },
            remove: function (key) {
                var url = `${Model.FacultiesUrl}/delete/${key}`;
                return Model.SendRequest(`/api/delete?url=${url}&check=1&origin=1`, "GET", true);
            }
        }),
        onSelectionChanged: function (selectedItems) {
            selection_changed(selectedItems.selectedRowsData[0]);
        },
        keyExpr: "code",
        showBorders: true,
        allowColumnReordering: true,
        errorRowEnabled: false,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        hoverStateEnable: true,
        grouping: {
            autoExpandAll: true,
        },
        groupPanel: {
            visible: true
        },
        selection: {
            mode: "single",
            defered: true
        },
        editing: {
            mode: "popup",
            allowDeleting: true
        },
        columns: [{
            dataField: "code",
            caption: "Code",
        }, {
            dataField: "name_az",
            caption: "Name (Az)",
            validationRules: [{ type: "required" }]
        }, {
            dataField: "name_en",
            caption: "Name (En)",
            validationRules: [{ type: "required" }]
        }, {
            dataField: "name_ru",
            caption: "Name (Ru)",
            validationRules: [{ type: "required" }]
        },{
            dataField: "parent_faculty_code",
                caption: "Faculty depends",
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "code",
                        loadUrl: `/api/get?url=${Model.FacultiesUrl}/getdevextremelist&check=1&origin=1`
                    }),
                    valueExpr: "code",
                    displayExpr: Model.SelectBoxNameDisplayExp,
                },
            groupIndex: 0,
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
    function selection_changed(data) {
        if (data) {
            $("#edit-link").attr("href", `/forms/form/${Model.FacultiesUrl}?isCreate=0&id=${data.code}`);
        }
    }

    $("#create-link").attr("href", `/forms/form/${Model.FacultiesUrl}?isCreate=1`);

});

let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key = "", parent_code = null, treeView;
        if (model != null) {
            parent_code = model.parent_faculty_code == 0 ? null : model.parent_faculty_code;
            key = model["code"];
        }

        var form = $("#form").dxForm({
            formData: model,
            labelLocation: "top",
            showColonAfterLabel: true,
            showValidationSummary: true,
            validationGroup: "customerData",
            items: [
                {
                    itemType: "group",
                    colCount: 2,
                    items: [{
                        dataField: "parent_faculty_code",
                        editorType: "dxDropDownBox",
                        label: { text: "Faculty" },
                        editorOptions: {
                            elementAttr: {
                                id: "faculty",
                            },
                            dataSource: new DevExpress.data.AspNet.createStore({
                                key: "code",
                                loadUrl: `/api/get?url=${Model.FacultiesUrl}/getdevextremeList&check=1&origin=1`,
                                loadMode: "raw"
                            }),
                            grouped: true,
                            displayExpr: Model.SelectBoxNameDisplayExp,
                            valueExpr: "code",
                            value: parent_code,
                            placeholder: "Select...",
                            contentTemplate: function (e) {
                                var value = e.component.option("value"),
                                    $treeView = $("<div>").dxTreeList({
                                        dataSource: e.component.getDataSource(),
                                        dataStructure: "plain",
                                        keyExpr: "code",
                                        parentIdExpr: "parent_faculty_code",
                                        selection: {
                                            mode: "single",
                                            allowSelectAll: false,
                                            recursive: false
                                        },
                                        displayExpr: Model.SelectBoxNameDisplayExp,
                                        columns: [{ dataField: "name_en", caption: "Faculties" }],
                                        paging: {
                                            enabled: true,
                                            pageSize: 10
                                        },
                                        filterRow: { visible: true },
                                        scrolling: {
                                            mode: "standard"
                                        },
                                        selectByClick: true,
                                        selectNodesRecursive: false,
                                        onSelectionChanged: function (selectedItems) {
                                            var keys = selectedItems.selectedRowKeys,
                                                hasSelection = keys.length;
                                            e.component.option("value", hasSelection ? keys[0] : null);
                                            $("#faculty").dxDropDownBox("instance").close();
                                        }
                                    });

                                treeView = $treeView.dxTreeList("instance");

                                e.component.on("valueChanged", function (args) {
                                    treeView.selectRows(args.value, false);
                                });

                                return $treeView;
                            }
                        }
                        }, {
                            dataField: "name_az",
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }],
                            label: { text: "Name (Az)" },
                        }
                    ]
                }, {
                    itemType: "group",
                    colCount: 2,
                    items: [{
                            dataField: "name_en",
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }],
                            label: { text: "Name (En)" },
                    }, {
                            dataField: "name_ru",
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }],
                            label: { text: "Name (Ru)" },
                    }]
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
                }]
        }).dxForm("instance");

        $("#form").on("submit", function (e) {
            let url = `${Model.FacultiesUrl}/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=1`,"POST", true, JSON.stringify(form.option("formData")))
                .then(() => {
                    window.location.href = `/forms/index/${Model.FacultiesUrl}`
                });
            e.preventDefault();
        })
    }

}
export let Form = FormCreater;