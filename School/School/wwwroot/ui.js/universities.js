import Model from "./general.js"
$(function () {
    $("#title").html("List of universities");

    $("#detail-link").hide();
    $("#popup").dxPopup({
        closeOnOutsideClick: true,
        onContentReady: function (e) {
            var $contentElement = e.component.content();
            $contentElement.addClass("photo-popup-content");
        }
    });
    var grid = $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "code",
            load: function () {
                var url = `${Model.UniversitiesUrl}/getdevextremelist`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=1`, "GET", false);
            },
            remove : function (key) {
                var url = `${Model.UniversitiesUrl}/delete/${key}`;
                return Model.SendRequest(`/api/delete?url=${url}&check=1&origin=1`, "GET", true);
            }
        }),
        remoteOperations: false,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        errorRowEnabled: false,
        hoverStateEnable: true,
        selection: {
            mode: "single",
            defered: true
        },
        editing: {
            allowDeleting: true
        },
        onSelectionChanged: function (selectedItems) {
            selection_changed(selectedItems.selectedRowsData[0]);
        },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            pageSize: 10
        },
        columns: [{
            dataField: "code",
            caption: "Code",
        }, {
                dataField: "logo",
                caption: "Logo",
                visible:false
            }, {
                caption: "Image",
                type: "buttons",
                width: 110,
                buttons: [{
                    hint: "Show image",
                    icon: "image",
                    text: "Show image",
                    visible: true,
                    onClick: function (e) {
                        var popup = $("#popup").dxPopup("instance");
                        popup.option({
                            "title": e.row.data[Model.SelectBoxNameDisplayExp],
                            "contentTemplate": `<img style="max-width:100%;max-height:100%"  src="/api/GetPhysicalFile?fileName=${e.row.data.logo}&path=${Model.UniversitiesUrl}&check=1&origin=0" class="photo-popup-image" />`
                        });
                        popup.show();
                    }
                }]

            },{
            dataField: "name_az",
            caption: "Name (Az)",
        }, {
            dataField: "name_en",
            caption: "Name (En)",
        }, {
            dataField: "name_ru",
            caption: "Name (Ru)",
        }, {
                type: "buttons",
                buttons: [{name:"delete"}]

        }],
        scrolling: {
            mode: "standart"
        },
        showBorders: true,
   }).dxDataGrid("instance");


    function selection_changed(data) {
        if (data) {
            $("#edit-link").attr("href", `/forms/form/${Model.UniversitiesUrl}?isCreate=0&id=${data.code}`);
            $("#pictureID").val(data.code);
        }
    }

    $("#delete-picture").click(() => {
        var url = `${Model.UniversitiesUrl}/deleteimage/${$("#pictureID").val()}`;
        Model.SendRequest(`/api/delete?url=${url}&check=1&origin=1`, "GET", true);
        grid.refresh();
    })

    $("#create-link").attr("href", `/forms/form/${Model.UniversitiesUrl}?isCreate=1`);
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
            items: [
                {
                    itemType: "group",
                    colCount: 12,
                    items: [
                         {
                            colSpan: 4,
                            dataField: "newLogo",
                            label: { text: "Logo" },
                            editorType: "dxFileUploader",
                            editorOptions: {
                                selectButtonText: "Select photo",
                                labelText: "",
                                name: "upload",
                                accept: "image/*",
                                maxFileSize: 1048576,
                                uploadMode: "instantly",
                                uploadUrl: `/api/postfile?url=${Model.FilesUrl}/upload&path=${Model.UniversitiesUrl}&check=1&origin=0`,
                                onUploaded: function (e) {
                                        form.option("items[0].items[1].editorOptions.value", JSON.parse(e.request.response).fileName);
                                        form.option("formData").logo = JSON.parse(e.request.response).fileName;
                                }
                            }
                        }, {
                            colSpan: 4,
                            dataField: "logo",
                            editorType: "dxTextBox",
                            validationRules: [{
                                type: "required",
                                message: "Logo is required"
                            }],
                            editorOptions: {
                                readOnly: true
                            }
                        }, {
                            colSpan: 4,
                            dataField: "type_code",
                            caption: "Type",
                            editorType: "dxSelectBox",
                            validationRules: [{
                                type: "required",
                                message: "Type is required"
                            }],
                            label: { text: "Type" },
                            validationRules: [{ type: "required" }],
                            editorOptions: {
                                dataSource: DevExpress.data.AspNet.createStore({
                                    key: "code",
                                    loadMode: "raw",
                                    loadUrl: `/api/get?url=${Model.UniversityTypesUrl}/getdevextremeList&check=1&origin=1`,
                                    onLoaded: function (e) {
                                        console.log(model,e)
                                    }
                                }),
                                elementAttr: {
                                    id: "type_code",
                                },
                                displayExpr: Model.SelectBoxNameDisplayExp,
                                valueExpr: "code",
                                searchEnabled: true
                            }
                        }],
                }, 
                {
                    itemType: "group",
                    colCount: 12,
                    items: [{
                            colSpan: 4,
                            dataField: "name_az",
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }],
                            label: { text: "Name (Az) " },
                            editorType: "dxTextBox"
                    }, {
                            colSpan: 4,
                            dataField: "name_en",
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }],
                            label: { text: "Name (En)" },
                            editorType: "dxTextBox"
                        }, {
                            colSpan: 4,
                            dataField: "name_ru",
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }],
                            label: { text: "Name (Ru)" },
                            editorType: "dxTextBox"
                        }],
                }, {
                    dataField: "description_az",
                    validationRules: [{
                        type: "required",
                        message: "Description is required"
                    }],
                    label: { text: "Description (Az) " },
                    validationRules: [{
                        type: "required",
                        message: "Description is required"
                    }],
                    editorType: "dxTextArea",
                }, {
                    dataField: "description_en",
                    label: { text: "Description (En) " },
                    validationRules: [{
                        type: "required",
                        message: "Description is required"
                    }],
                    editorType: "dxTextArea",
                }, {
                    dataField: "description_ru",
                    label: { text: "Description (Ru) " },
                    validationRules: [{
                        type: "required",
                        message: "Description is required"
                    }],
                    editorType: "dxTextArea",
                }, {
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
                },

            ]
        }).dxForm("instance");

        $("#form").on("submit", function (e) {
            let url = `${Model.UniversitiesUrl}/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=1`,"POST", true, JSON.stringify(form.option("formData")))
                .then(() => {
                    window.location.href = `/forms/index/${Model.UniversitiesUrl}`
                });

            e.preventDefault();
        })
    }
}

export let Form = FormCreater;