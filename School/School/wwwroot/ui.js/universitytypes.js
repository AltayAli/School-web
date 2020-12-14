import Model from "./general.js"
$(function () {
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "code",
            load: function () {
                var url = `${Model.UniversityTypesUrl}/getdevextremelist?culture=az`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=1`, "GET", false);
            },
            remove: function (key) {
                var url = `${Model.UniversityTypesUrl}/delete/${key}`;
                return Model.SendRequest(`/api/delete?url=${url}&check=1&origin=1`, "GET", true);
            }
        }),
        keyExpr: "code",
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
        showBorders: true,
        errorRowEnabled: false,
        editing: {
            mode: "popup",
            allowDeleting: true
        },
        columns: [{
            dataField: "code",
            caption: "Code",
        }, {
            dataField: "name_az",
            caption: "Name (AZ)"
        }, {
            dataField: "name_en",
            caption: "Name (EN)"
        }, {
            dataField: "name_ru",
            caption: "Name (RU)"
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
            $("#edit-link").attr("href", `/forms/form/${Model.UniversityTypesUrl}?isCreate=0&id=${data.code}`);
        }
    }
    $("#title").html("List of university types");
    $("#detail-link").hide();
    $("#create-link").attr("href", `/forms/form/${Model.UniversityTypesUrl}?isCreate=1`);
});

let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key = model != null ? model["code"] : "";
       var form = $("#form").dxForm({
            formData: model,
            labelLocation: "top",
            validationGroup: "customerData",
            showColonAfterLabel: true,
            showValidationSummary: true,
            items: [{
                    itemType: "group",
                    colCount: 3,
                    items: [{
                        dataField: "name_az",
                        validationRules: [{
                            type: "required",
                            message: "Name is required"
                        }],
                        label: { text: "Name (AZ)" }
                    },{
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
                                type: "success",
                                useSubmitBehavior: true
                            }
                        }]
                }
            ]
        }).dxForm("instance");

        $("#form").on("submit", function (e) {

            let url = `${Model.UniversityTypesUrl}/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=1`,"POST", true, JSON.stringify(form.option("formData")))
                .then(() => {
                    window.location.href = `/forms/index/${Model.UniversityTypesUrl}`
                });

            e.preventDefault();
        })
    }

}
export let Form = FormCreater;