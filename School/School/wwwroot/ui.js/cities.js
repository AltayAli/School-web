import Model from "./general.js";
$(function () {
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "code",
            load: function () {
                var url = `${Model.CitiesUrl}/getdevextremelist?culture=az`;
                return Model.SendRequest(
                    `/api/get?url=${url}&check=1&origin=1`,
                    "GET",
                    false
                );
            },
            remove: function (key) {
                var url = `${Model.CitiesUrl}/delete/${key}`;
                return Model.SendRequest(
                    `/api/delete?url=${url}&check=1&origin=1`,
                    "GET",
                    true
                );
            },
        }),
        onSelectionChanged: function (selectedItems) {
            selection_changed(selectedItems.selectedRowsData[0]);
        },
        keyExpr: "code",
        remoteOperations: false,
        columnHidingEnabled: true,
        errorRowEnabled: false,
        columnAutoWidth: true,
        hoverStateEnable: true,
        selection: {
            mode: "single",
            defered: true,
        },
        showBorders: true,
        editing: {
            mode: "popup",
            allowDeleting: true,
        },
        columns: [
            {
                dataField: "code",
                caption: "Code",
            },
            {
                dataField: "country_code",
                caption: "Country",
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "code",
                        loadUrl: `/api/get?url=${Model.CountriesUrl}/getdevextremelist&check=1&origin=1`
                    }),
                    valueExpr: "code",
                    displayExpr: Model.SelectBoxNameDisplayExp,
                },
            },
            {
                dataField: "name_az",
                caption: "Name (Az)",
            },
            {
                dataField: "name_en",
                caption: "Name (En)",
            },
            {
                dataField: "name_ru",
                caption: "Name (Ru)",
            },
        ],
        paging: {
            pageSize: 10,
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true,
        },
    });
    function selection_changed(data) {
        if (data) {
            $("#edit-link").attr(
                "href",
                `/forms/form/${Model.CitiesUrl}?isCreate=0&id=${data.code}`
            );
        }
    }
    $("#title").html("List of cities");
    $("#create-link").attr(
        "href",
        `/forms/form/${Model.CitiesUrl}?isCreate=1`
    );
    $("#detail-link").hide();
});

let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key = model != null ? model["code"] : "";
        var dataGrid;
        var form =  $("#form")
            .dxForm({
                formData: model,
                labelLocation: "top",
                validationGroup: "customerData",
                showColonAfterLabel: true,
                showValidationSummary: true,
                items: [
                    {
                        itemType: "group",
                        colCount: 2,
                        items: [
                            {
                                dataField: "country_code",
                                editorType: "dxSelectBox",
                                label: { text: "Country" },
                                validationRules: [{
                                    type: "required",
                                    message: "Country is required"
                                }],
                                editorOptions: {
                                    dataSource: DevExpress.data.AspNet.createStore({
                                        key: "code",
                                        loadMode: "raw",
                                        loadUrl: `/api/get?url=${Model.CountriesUrl}/getdevextremeList&check=1&origin=1`
                                    }),
                                    elementAttr: {
                                        id: "type_code",
                                    },
                                    displayExpr: Model.SelectBoxNameDisplayExp,
                                    valueExpr: "code",
                                    searchEnabled: true
                                },
                            },
                            {
                                dataField: "name_az",
                                validationRules: [{
                                    type: "required",
                                    message: "Name is required"
                                }],
                                label: { text: "Name (Az)" },
                            },
                        ],
                    },
                    {
                        itemType: "group",
                        colCount: 2,
                        items: [
                            {
                                dataField: "name_en",
                                validationRules: [{
                                    type: "required",
                                    message: "Name is required"
                                }],
                                label: { text: "Name (EN)" },
                            },
                            {
                                dataField: "name_ru",
                                validationRules: [{
                                    type: "required",
                                    message: "Name is required"
                                }],
                                label: { text: "Name (RU)" },
                            },
                        ],
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
                                },
                            },
                        ],
                    },
                ],
            })
            .dxForm("instance");

        $("#form").on("submit", function (e) {
             var model = form.option("formData");
            let url = `${Model.CitiesUrl}/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=1`,"POST", true, JSON.stringify(model)
            ).then(() => {
                window.location.href = `/forms/index/${Model.CitiesUrl}`
            });
            e.preventDefault();
        })
    },
};
export let Form = FormCreater;
