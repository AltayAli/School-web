import Model from "./general.js"
$(function () {
    $("#title").html("List of groups")
    $("#create-link").hide()
    $("#edit-link").hide()
    $("#detail-link").hide();
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: function () {
                return Model.SendRequest("/admin/groups/getlist");
            },
            insert: function (values) {
                console.log(values)
                return Model.SendRequest("/admin/groups/create", "POST", true, JSON.stringify(values));
            },
            update: function (key, values) {
                return Model.SendRequest("/admin/groups/update/" + key, "PUT", true, JSON.stringify(values));
            },
            remove: function (key) {
                return Model.SendRequest("/admin/groups/delete/" + key, "DELETE", true);
            }
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
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: true,
            popup: {
                title: "Group Info",
                showTitle: true,
                width: "auto",
                height: "auto",
                position: {
                    my: "top",
                    at: "top",
                    of: window
                }
            },
            form: {
                items: [{
                    dataField: "name",
                    colSpan: 2
                }]
            }
        },
        columns: [{
            dataField: "id",
            caption: "ID",
            visible: false,
            formItem: {
                visible: false,
            },
            validationRules: [{ type: "required" }]
        }, {
            dataField: "name",
            caption: "Name",
            formItem: {
                colSpan: 2,
            },
            validationRules: [{ type: "required" }]
        }, {
            dataField: "startdate",
            caption: "StartDate",
            formItem: {
                colSpan: 2,
            },
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

    //function selection_changed(data) {
    //    if (data) {
    //        $("#edit-link").attr("href", `/forms/form/${Model.PaymentPeriodsUrl}?isCreate=0&id=${data.code}`);
    //    }
    //}
    //$("#create-link").attr("href", `/forms/form/${Model.PaymentPeriodsUrl}?isCreate=1`);
});


let FormCreater = {
    CreateForm: function (model, isCreate) {

    }

}
export let Form = FormCreater;