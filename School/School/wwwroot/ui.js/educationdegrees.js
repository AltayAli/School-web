import Model from "./general.js"
$(function () {
    $("#title").html("List of education degrees")
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "code",
            load: function () {
                var url = `${Model.EducationDegreesUrl}/getdevextremeList`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=1`, "GET", false);
            },
            remove: function (key) {
                var url = `${Model.EducationDegreesUrl}/delete/${key}`;
                return Model.SendRequest(`/api/delete?url=${url}&check=1&origin=1`, "GET", true);
            }
        }),
        keyExpr: "code",
        showBorders: true,
        errorRowEnabled: false,
        remoteOperations: false,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        onSelectionChanged: function (selectedItems) {
            selection_changed(selectedItems.selectedRowsData[0]);
        },
        hoverStateEnable: true,
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
        },{
            dataField: "type_code",
            caption: "Degree Types",
            visible: false,
            validationRules: [{ type: "required" }],
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "code",
                        loadUrl: `/api/get?url=${Model.EducationDegreeTypesUrl}/getdevextremelist&check=1&origin=1`
                    }),
                    valueExpr: "code",
                    displayExpr: Model.SelectBoxNameDisplayExp
            }
        }, {
            dataField: "name_az",
            caption: "Name (AZ)",
            validationRules: [{ type: "required" }]
        }, {
            dataField: "name_en",
            caption: "Name (EN)",
            validationRules: [{ type: "required" }]
        }, {
            dataField: "name_ru",
            caption: "Name (RU)",
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
            $("#edit-link").attr("href", `/forms/form/${Model.EducationDegreesUrl}?isCreate=0&id=${data.code}`);
        }
    }
    $("#detail-link").hide();
    $("#create-link").attr("href", `/forms/form/${Model.EducationDegreesUrl}?isCreate=1`);
});


let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key = model != null ? model["code"] : "";

        var form= $("#form").dxForm({
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
                        dataField: "type_code",
                        editorType: "dxSelectBox",
                        label: { text: "Degree Types" },
                        validationRules: [{
                            type: "required",
                            message: "Type is required"
                        }],
                        editorOptions: {
                            dataSource: new DevExpress.data.AspNet.createStore({
                                key: "code",
                                loadUrl: `/api/get?url=${Model.EducationDegreeTypesUrl}/getdevextremeList&check=1&origin=1`,
                                loadMode: "raw"
                            }),
                            elementAttr: {
                                id: "education_type",
                            },
                            deferRendering: false,
                            displayExpr: Model.SelectBoxNameDisplayExp,
                            valueExpr: "code",
                            value: model?.type_code,
                            searchEnabled: true
                        }
                    }, {
                            dataField: "name_az",
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }],
                            label: { text: "Name (AZ)" }
                        }]
                }, {
                    itemType: "group",
                    colCount: 2,
                    items: [{
                        dataField: "name_en",
                        validationRules: [{
                            type: "required",
                            message: "Name is required"
                        }],
                        label: { text: "Name (EN)" }
                    }, {
                        dataField: "name_ru",
                        validationRules: [{
                            type: "required",
                            message: "Name is required"
                        }],
                        label: { text: "Name (RU)" }
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
                                useSubmitBehavior: true,
                                type: "success",
                            }
                        }]
                }
            ]
        }).dxForm("instance");

        $("#form").on("submit", function (e) {
            let url = `${Model.EducationDegreesUrl}/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=1`,"POST", true, JSON.stringify(form.option("formData")))
                .then(() => {
                    window.location.href = `/forms/index/${Model.EducationDegreesUrl}`
                });

            e.preventDefault();
        })
    }

}
export let Form = FormCreater;