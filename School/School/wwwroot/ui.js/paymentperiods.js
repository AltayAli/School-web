import Model from "./general.js"
$(function () {
    $("#title").html("List of payment periods")
    $("#detail-link").hide();
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "code",
            load: function () {
                var url = `${Model.PaymentPeriodsUrl}/getdevextremeList`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=1`, "GET", false);
            },
            remove: function (key) {
                var url = `${Model.PaymentPeriodsUrl}/delete/${key}`;
                return Model.SendRequest(`/api/delete?url=${url}&check=1&origin=1`, "GET", true);
            }
        }),
        keyExpr: "code",
        showBorders: true,
        remoteOperations: false,
        columnHidingEnabled: true,
        errorRowEnabled: false,
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
            $("#edit-link").attr("href", `/forms/form/${Model.PaymentPeriodsUrl}?isCreate=0&id=${data.code}`);
        }
    }
    $("#create-link").attr("href", `/forms/form/${Model.PaymentPeriodsUrl}?isCreate=1`);
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
            items: [{
                itemType: "group",
                colCount: 3,
                items: [{
                    dataField: "name_az",
                    validationRules: [{
                        type: "required",
                        message: "Name is required"
                    }],
                    label: { text: "Name (En)" }
                }, {
                    dataField: "name_en",
                    validationRules: [{
                        type: "required",
                        message: "Name is required"
                    }],
                    label: { text: "Name (En)" }
                }, {
                    dataField: "name_ru",
                    validationRules: [{
                        type: "required",
                        message: "Name is required"
                    }],
                    label: { text: "Name (Ru)" }
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
                            useSubmitBehavior: true,
                        }
                    }]
            }
            ]
        }).dxForm("instance");

        $("#form").on("submit", function (e) {
            let url = `${Model.PaymentPeriodsUrl}/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=1`,"POST", true, JSON.stringify(form.option("formData")))
                .then(() => {
                    window.location.href = `/forms/index/${Model.PaymentPeriodsUrl}`
                });
            e.preventDefault();
        })
    }

}
export let Form = FormCreater;