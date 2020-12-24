import Model from "./general.js"
$(function () {
    $("#popup").dxPopup({
        closeOnOutsideClick: true,
        maxWidth: "30%",
        onContentReady: function (e) {
            var $contentElement = e.component.content();
            $contentElement.addClass("photo-popup-content");
        }
    });
    let data = $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: function () {
                return Model.SendRequest("/admin/users/getstudentslist");
            },
            remove: function (key) {
                return Model.SendRequest("/admin/users/delete/" + key, "DELETE", true);
            }
        }),
        onSelectionChanged: function (selectedItems) {
            selection_changed(selectedItems.selectedRowsData[0]);
        },
        keyExpr: "id",
        columnHidingEnabled: true,
        columnAutoWidth: true,
        hoverStateEnable: true,
        errorRowEnabled: false,
        showBorders: true,
        selection: {
            mode: "single",
            defered: true
        },
        editing: {
            mode: "popup",
            allowDeleting: true
        },
        columns: [{
            dataField: "photourl",
            caption: "Image",
            visible: false
        }, {
            caption: "Şəkil",
            type: "buttons",
            buttons: [{
                hint: "Show image",
                icon: "image",
                text: "Show image",
                visible: true,
                onClick: function (e) {
                    var popup = $("#popup").dxPopup("instance");
                    popup.option({
                        "title": e.row.data.name_az,
                        "contentTemplate": `<img style="max-width:100%;max-height:100%" src="/users/${e.row.data.photourl}" class="photo-popup-image" />`
                    });
                    popup.show();
                }
            }]

        },
        {
            dataField: "role",
            caption: "Hesabın tipi",
            lookup: {
                dataSource: [{ "code": 0, "name": "Admin" }, { "code": 1, "name": "Teacher" }, { "code": 2, "name": "Student" }],
                valueExpr: "code",
                displayExpr: "name"
            }
        }, {
            dataField: "name",
            caption: "Ad"
        }, {
            dataField: "surname",
            caption: "Soyad"
        }, {
            dataField: "username",
            caption: "Sistemdə adı"
        }, {
            type: "buttons",
            buttons: [{ name: "delete" }]
        }],
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true
        }
    }).dxDataGrid("instance");
    $("#title").html("İstifadəçilər siyahısı");

    function selection_changed(data) {
        if (data) {
            $("#edit-link").attr("href", `/admin/users/update/${data.id}`);
        }
    }

    $("#detail-link").hide();
    $("#create-link").attr("href", `/admin/users/create`);
});
