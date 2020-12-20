import Model from "./general.js"
$(function () {
    $("#popup").dxPopup({
        closeOnOutsideClick: true,
        maxWidth:"30%",
        onContentReady: function (e) {
            var $contentElement = e.component.content();
            $contentElement.addClass("photo-popup-content");
        }
    });
    let data = $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: function () {
                return Model.SendRequest("/admin/users/getlist");
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



let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key =  "";
        var form = $("#form").dxForm({
            formData: model,
            labelLocation: "top",
            showColonAfterLabel: true,
            showValidationSummary: true,
            items: [{
                itemType: "group",
                cssClass: "first-group",
                colCount: 4,
                items: [{
                    template: "<div id='form-avatar'></div>"
                }, {
                    itemType: "group",
                    colSpan: 3,
                    items: [{
                        itemType: "group",
                        colCount: 3,
                        items: [
                            {
                                colSpan: 1,
                                dataField: "newLogo",
                                editorType: "dxFileUploader",
                                label: { text: "Şəkil" },
                                editorOptions: {
                                    selectButtonText: "Şəkil seç",
                                    labelText: "",
                                    name: "upload",
                                    accept: "image/*",
                                    maxFileSize: 4000000,
                                    uploadMode: "instantly",
                                    uploadUrl: `/files/upload?path=users`,
                                    onUploaded: function (e) {
                                        form.option("items[0].items[1].items[0].items[1].editorOptions.value", JSON.parse(e.request.response).fileName);
                                        if (isCreate) {
                                            document.getElementById("form-avatar").style.backgroundImage = `url(../../users/${JSON.parse(e.request.response).fileName})`;
                                        } else {
                                            document.getElementById("form-avatar").style.backgroundImage = `url(../../../users/${JSON.parse(e.request.response).fileName})`;
                                        }
                                        
                                    },
                                }
                            }, {
                                colSpan: 2,
                                dataField: "photourl",
                                editorType: "dxTextBox",
                                editorOptions: {
                                    readOnly: true
                                }
                            }
                        ]
                    }, {
                            itemType: "group",
                            colCount: 3,
                            items: [{
                                dataField: "name",
                                validationRules: [{
                                    type: "required",
                                    message: "Ad daxil edilməlidir!"
                                }],
                            }, {
                                    dataField: "surname",
                                    validationRules: [{
                                        type: "required",
                                        message: "Soyad daxil edilməlidir!"
                                    }],
                                }, {
                                    dataField: "role",
                                    caption: "Hesabın tipi",
                                    editorType: "dxSelectBox",
                                    validationRules: [{
                                        type: "required",
                                        message: "Hesabın tipi seçilməlidir!"
                                    }],
                                    label: { text: "Hesabın tipi" },
                                    editorOptions: {
                                        dataSource: [{ "code": 0, "name": "Admin" }, { "code": 1, "name": "Teacher" }, { "code": 2, "name": "Student" }],
                                        valueExpr: "code",
                                        displayExpr: "name"
                                    }
                                }]
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

        if (!isCreate) {
            key = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
            document.getElementById("form-avatar").style.backgroundImage = `url(../../../users/${model["photourl"]})`;
        }

        $("#form").on("submit", function (e) {
            var data = form.option("formData");
            let url = `/admin/users/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(url, method, true, JSON.stringify(data))
                .then(() => {
                    window.location.href = `/admin/users/index`
                });

            e.preventDefault();
        })
    }

}
export let Form = FormCreater;