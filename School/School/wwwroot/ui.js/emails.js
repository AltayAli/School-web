import Model from "./general.js";
$(function () {
    $("#popup").dxPopup({
        maxWidth: 400,
        closeOnOutsideClick: true,
        onContentReady: function (e) {
            var $contentElement = e.component.content();
            $contentElement.addClass("photo-popup-content");
        }
    });
    $("#detail-link").hide();
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "code",
            load: function () {
                var url = `${Model.EmailsUrl}/getdevextremelist`;
                return Model.SendRequest(
                    `/api/get?url=${url}&check=1&origin=1`,
                    "GET",
                    false
                );
            },
            remove: function (key) {
                var url = `${Model.EmailsUrl}/delete/${key}`;
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
        errorRowEnabled: false,
        remoteOperations: false,
        columnHidingEnabled: true,
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
                dataField: "name",
                caption: "Name"
            },
            {
                dataField: "surname",
                caption: "Surname",
            },
            {
                dataField: "email",
                caption: "Email",
            },
            {
                caption: "Email content",
                type: "buttons",
                buttons: [{
                    hint: "Email content",
                    icon: "search",
                    text: "Email content",
                    visible: true,
                    onClick: function (e) {
                        var popup = $("#popup").dxPopup("instance");
                        popup.option({
                            "title": e.row.data.subject,
                            "contentTemplate": `<p>${e.row.data.body}</p>`
                        });
                        popup.show();
                    }
                }]

            }
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
            $("#edit-link").hide();
        }
    }
    $("#title").html("List of emails");
    $("#create-link").hide();
    $("#edit-link").hide();
});