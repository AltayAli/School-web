import Model from "./general.js"
$(function () {
    $("#title").html("List of scholarships")
    $("#detail-link").hide();
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "code",
            load: function () {
                var url = `${Model.ScholarShipsUrl}/getdevextremeList`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=1`, "GET", false);
            },
            remove: function (key) {
                var url = `${Model.ScholarShipsUrl}/delete/${key}`;
                return Model.SendRequest(`/api/delete?url=${url}&check=1&origin=1`, "GET", true);
            }
        }),
        keyExpr: "code",
        onSelectionChanged: function (selectedItems) {
            selection_changed(selectedItems.selectedRowsData[0]);
        },
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
            allowDeleting: true
        },
        columns: [{
            dataField: "code",
            caption: "Code",
        },{
            dataField: "program_code",
            caption: "Program depends",
            validationRules: [{ type: "required" }],
            lookup: {
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "code",
                    loadUrl: `/api/get?url=${Model.ProgramsUrl}/getdevextremeList&check=1&origin=1`
                }),
                valueExpr: "code",
                displayExpr: Model.SelectBoxTitleDisplayExp
            }
        }, {
            dataField: "name_az",
            caption: "Name (Az)"
        }, {
            dataField: "name_en",
            caption: "Name (En)"
        }, {
            dataField: "name_ru",
            caption: "Name (Ru)",
            validationRules: [{ type: "required" }]
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
            $("#edit-link").attr("href", `/forms/form/${Model.ScholarShipsUrl}?isCreate=0&id=${data.code}`);
        }
    }

    $("#create-link").attr("href", `/forms/form/${Model.ScholarShipsUrl}?isCreate=1`);
});


let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key = model != null ? model["code"] : "";
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
                            dataField: "program_code",
                            caption: "Program depends",
                            editorType: "dxSelectBox",
                            label: { text: "Program depends" },
                            validationRules: [{
                                type: "required",
                                message: "Program depends is required"
                            }],
                            editorOptions: {
                                dataSource: new DevExpress.data.AspNet.createStore({
                                    key: "code",
                                    loadUrl: `/api/get?url=${Model.ProgramsUrl}/getdevextremeList&check=1&origin=1`,
                                    loadMode: "raw",
                                }),
                                elementAttr: {
                                    id: "program_code",
                                },
                                deferRendering: false,
                                displayExpr: Model.SelectBoxTitleDisplayExp,
                                valueExpr: "code",
                                searchEnabled: true
                            }
                    }, {
                            dataField: "name_az",
                            caption: "Name (Az)",
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }]
                        }]
                },
                {
                    itemType: "group",
                    colCount: 2,
                    items: [{
                            dataField: "name_en",
                            caption: "Name (En)",
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }]
                        }, {
                            dataField: "name_ru",
                            caption: "Name (Ru)",
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }],
                        }]
                },
                {
                    itemType: "group",
                    colCount: 1,
                    items: [{
                        dataField: "description_az",
                        editorType: "dxTextArea",
                        label: { text: "Description (Az)" },
                        validationRules: [{
                            type: "required",
                            message: "Description is required"
                        }]
                        
                    }, {
                            dataField: "description_en",
                            editorType: "dxTextArea",
                            label: { text: "Description (En)" },
                            validationRules: [{
                                type: "required",
                                message: "Description is required"
                            }]
                        }, {
                            dataField: "description_ru",
                            editorType: "dxTextArea",
                            label: { text: "Description (Ru)" },
                            validationRules: [{
                                type: "required",
                                message: "Description is required"
                            }]
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
                }
            ]
        }).dxForm("instance");

        $("#form").on("submit", function (e) {
            let url = `${Model.ScholarShipsUrl}/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=1`,
                "POST", true, JSON.stringify(form.option("formData")))
                .then(() => {
                    window.location.href = `/forms/index/${Model.ScholarShipsUrl}`
                });

            e.preventDefault();
        })
    }

}

export let Form = FormCreater;