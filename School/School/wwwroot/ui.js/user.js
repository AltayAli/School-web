import Model from "./general.js"

$(function () {
    $("#title").html("List of users")

    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "user_guid",
            load: function () {
                var url = `${Model.AdminUsersUrl}/getusersdevextremelist`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=2`, "GET", false);
            }
        }),
        remoteOperations: false,
        columnHidingEnabled: true,
        errorRowEnabled: false,
        columnAutoWidth: true,
        hoverStateEnable: true,
        selection: {
            mode: "single",
            defered: true
        },
        onSelectionChanged: function (selectedItems) {
            selection_changed(selectedItems.selectedRowsData[0]);
        },
        pager: {
            allowedPageSizes: [5, 10, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            pageSize: 10
        },
        columns: [{
            dataField: "user_guid",
            caption: "User guid",
        }, {
                dataField: "email",
                caption: "Email",
            }, {
                dataField: "surname",
                caption: "Full name",
            }, {
                dataField: "name",
                caption: "Name",
            }],

        scrolling: {
            mode: "standart"
        },
        showBorders: true,
    });

    function selection_changed(data) {
        if (data) {
            $("#code").attr("value", data.code);
        }
    }

    $("#edit-link").hide();
    $("#create-link").hide();
    $("#detail-link").hide();
});

let FormCreater = {
    CreateForm: function (model, isCreate) {}

}
export let Form = FormCreater;