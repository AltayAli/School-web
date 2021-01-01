import Model from "./general.js"
$(function () {
    $("#title").html("List of groups")
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: function () {
                return Model.SendRequest(`/teacher/lessons/getlist/${sessionStorage.getItem("l")}`);
            },
            remove: function (key) {
                return Model.SendRequest(`/teacher/lessons/delete?groupId=${sessionStorage.getItem("l")}&lessonId=` + key, "DELETE", true);
            }
        }),
        keyExpr: "id",
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
            dataField: "startDate",
            caption: "Tarix",
            dataType: "date",
            format: "dd.MM.yyyy",
            formItem: {
                colSpan: 2,
            },
            validationRules: [{ type: "required" }]
        }, {
            dataField: "startDate",
            caption: "Baslama saatı",
            dataType: "date",
            format: "HH:mm",
            formItem: {
                colSpan: 2,
            },
            validationRules: [{ type: "required" }]
        }, {
            dataField: "endDate",
            caption: "Bitmə saatı",
            dataType: "date",
            format: "HH:mm",
            formItem: {
                colSpan: 2,
            },
            validationRules: [{ type: "required" }]
            }, {
                cellTemplate: function (container, options) {
                    $("<div>")
                        .append($(`<a href="/lessons/${options.data["file_Name"]}" class="btn" download="${options.data["file_Name"]}"><i class="icon-download"></i>Mühazirəni yüklə</a>`))
                        .appendTo(container);
                },
                width: 150
            },{
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
    });
    function selection_changed(data) {
        if (data) {
            $("#edit-link").attr("href", `/teacher/lessons/update/${data.id}`);
        }
    }

    $("#detail-link").attr("href", `/teacher/journals/index`);
    $("#create-link").attr("href", `/teacher/lessons/create`);
});


let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key = "";
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
                    itemType: "group",
                    colSpan: 4,
                    items: [{
                        itemType: "group",
                        colCount: 7,
                        items: [
                            {
                                colSpan: 1,
                                dataField: "newLogo",
                                editorType: "dxFileUploader",
                                label: { text: "Fayl" },
                                editorOptions: {
                                    selectButtonText: "Faylı seç",
                                    labelText: "",
                                    name: "upload",
                                    allowedFileExtensions: [".pdf", ".txt"],
                                    maxFileSize: 4000000,
                                    uploadMode: "instantly",
                                    uploadUrl: `/files/upload?path=lessons`,
                                    onUploaded: function (e) {
                                        form.option("items[0].items[0].items[0].items[1].editorOptions.value", JSON.parse(e.request.response).fileName);
                                    },
                                }
                            }, {
                                colSpan: 2,
                                dataField: "fileName",
                                editorType: "dxTextBox",
                                editorOptions: {
                                    readOnly: true
                                }
                            }, {
                                colSpan: 2,
                                dataField: "name",
                                validationRules: [{
                                    type: "required",
                                    message: "Ad daxil edilməlidir!"
                                }],
                            }, {
                                colSpan: 2,
                                dataField: "startDate",
                                editorType: "dxDateBox",
                                validationRules: [{
                                    type: "required",
                                    message: "Tarix daxil edilməlidir!"
                                }],
                            }
                        ]
                    }, {
                        itemType: "group",
                        colCount: 4,
                        items: [{
                            dataField: "startHour",
                            editorType: "dxNumberBox",
                            editorOptions: {
                                min: 0,
                                max: 23,
                            },
                            validationRules: [{
                                type: "required",
                                message: "Başlama saatı daxil edilməlidir!"
                            }],
                        }, {
                            dataField: "startMinute",
                            editorType: "dxNumberBox",
                            editorOptions: {
                                min: 0,
                                max: 59,
                            },
                            validationRules: [{
                                type: "required",
                                message: "Başlama dəqiqəsi daxil edilməlidir!"
                            }],
                        },{
                            dataField: "endHour",
                            editorType: "dxNumberBox",
                            editorOptions: {
                                min: 0,
                                max: 23,
                            },
                            validationRules: [{
                                type: "required",
                                message: "Bitmə saatı daxil edilməlidir!"
                            }],
                        }, {
                            dataField: "endMinute",
                            editorType: "dxNumberBox",
                            editorOptions: {
                                min: 0,
                                max: 59,
                            },
                            validationRules: [{
                                type: "required",
                                message: "Bitmə dəqiqəsi daxil edilməlidir!"
                            }],
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
        }

        $("#form").on("submit", function (e) {
            var data = form.option("formData");
            data["groupId"] = parseInt(sessionStorage.getItem("l"));
            let url = `/teacher/lessons/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(url, method, true, JSON.stringify(data))
                .then(() => {
                    window.location.href = `/teacher/lessons/index`
                });

            e.preventDefault();
        })
    }

}
export let Form = FormCreater;