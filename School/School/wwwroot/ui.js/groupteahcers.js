import Model from "./general.js"
$(function () {
    $("#title").html("Qruplar və Müəllimlər")
    $("#create-link").hide()
    $("#edit-link").hide()
    $("#detail-link").hide();
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: function () {
                return Model.SendRequest("/admin/groupteachers/getlist");
            },
            insert: function (values) {
                console.log(values)
                return Model.SendRequest("/admin/groupteachers/create", "POST", true, JSON.stringify(values));
            },
            update: function (key, values) {
                return Model.SendRequest("/admin/groupteachers/update/" + key, "PUT", true, JSON.stringify(values));
            },
            remove: function (key) {
                return Model.SendRequest("/admin/groupteachers/delete/" + key, "DELETE", true);
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
            //form: {
            //    items: [{
            //        dataField: "name",
            //        colSpan: 2
            //    }]
            //}
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
            dataField: "groupid",
            caption: "Group name",
            lookup: {
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "id",
                    loadUrl: `/admin/groups/getlist`
                }),
                valueExpr: "id",
                displayExpr: "name"
            },
            formItem: {
                colSpan: 2,
            },
            validationRules: [{ type: "required" }]
        },{
            dataField: "teacherid",
            caption: "Teacher name",
            lookup: {
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "id",
                    loadUrl: `/admin/users/getteacherslist`
                }),
                valueExpr: "id",
                displayExpr: "name"
            },
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
});


let FormCreater = {
    CreateForm: function (model, isCreate) {

    }

}
export let Form = FormCreater;