import Model from "./general.js"
$(function () {
    $("#popup").dxPopup({
        closeOnOutsideClick: true,
        onContentReady: function (e) {
            var $contentElement = e.component.content();
            $contentElement.addClass("photo-popup-content");
        }
    });
    let data = $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "code",
            load: function () {
                var url = `${Model.CountriesUrl}/getdevextremelist`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=1`, "GET", false);
            },
            remove: function (key) {
                var url = `${Model.CountriesUrl}/delete/${key}`;
                return Model.SendRequest(`/api/delete?url=${url}&check=1&origin=1`, "GET", true);
            }
        }),
        onSelectionChanged: function (selectedItems) {
            selection_changed(selectedItems.selectedRowsData[0]);
        },
        keyExpr: "code",
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
            dataField: "code",
            caption: "Code"
        },{
            dataField: "image",
            caption: "Image",
            visible: false
        },{
                caption: "Image",
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
                            "contentTemplate": `<img style="max-width:100%;max-height:100%" src="/api/GetPhysicalFile?fileName=${e.row.data.image}&path=${Model.CountriesUrl}&check=1&origin=0" class="photo-popup-image" />`
                        });
                        popup.show();
                    }
                }]
            
            },
            {
                dataField: "type_code",
                caption: "Country Type",
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "code",
                        loadUrl: `/api/get?url=${Model.CountryTypesUrl}/getdevextremelist&check=1&origin=1`
                    }),
                    valueExpr: "code",
                    displayExpr: "name_en"
                }
            },{
                dataField: "name_az",
                caption: "Name (Az)"
            }, {
                dataField: "name_en",
                caption: "Name (En)"
            }, {
                dataField: "name_ru",
                caption: "Name (Ru)"
            }, {
                type: "buttons",
                buttons: [{name:"delete"}]
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
    $("#title").html("List of countries");

    function selection_changed(data) {
        if (data) {
            $("#edit-link").attr("href", `/forms/form/${Model.CountriesUrl}?isCreate=0&id=${data.code}`);
        }
    }

    $("#detail-link").hide();
    $("#create-link").attr("href", `/forms/form/${Model.CountriesUrl}?isCreate=1`);
});



let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key = model != null ? model["code"] : "";
        var required_Documents = [];

        if (!isCreate) {
            Model.SendRequest(`/api/get?url=${Model.CountriesUrl}/GetRequiredDocumentsDevExtremeList/${key}&check=1&origin=1`, "GET", false)
                .then((x) => {
                    required_Documents = x;
                    form.itemOption("documents-container.documents", "items", GetRequiredDocumentOptions(required_Documents));
                })
        } 

        var form = $("#form").dxForm({
            formData: model,
            labelLocation: "top",
            showColonAfterLabel: true,
            showValidationSummary: true,
            items: [{
                itemType: "group",
                colCount: 3,
                items: [{
                        dataField: "newLogo",
                        editorType: "dxFileUploader",
                        label: { text: "Image" },
                        editorOptions: {
                            selectButtonText: "Choose image",
                            labelText: "",
                            name: "upload",
                            accept: "image/*",
                            maxFileSize: 4000000,
                            uploadMode: "instantly",
                            uploadUrl: `/api/postfile?url=${Model.FilesUrl}/upload&path=${Model.CountriesUrl}&check=1&origin=0`,
                            onUploaded: function (e) {
                                if (isCreate) {
                                    form.option("items[0].items[1].editorOptions.value", JSON.parse(e.request.response).fileName);
                                } else {
                                    form.option("items[0].items[1].editorOptions.value", JSON.parse(e.request.response).fileName);
                                    form.option("formData").image = JSON.parse(e.request.response).fileName;
                                }
                            },
                        }
                }, {
                        dataField: "image",
                        editorType: "dxTextBox",
                        validationRules: [{
                            type: "required",
                            message: "Image is required"
                        }],
                        editorOptions: {
                            readOnly: true
                        }
                    },{
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
                                loadUrl: `/api/get?url=${Model.CountryTypesUrl}/getdevextremeList&check=1&origin=1`
                            }),
                            elementAttr: {
                                id: "type_code",
                            },
                            displayExpr: "name_en",
                            valueExpr: "code",
                            searchEnabled: true
                        }
                    }]
            }, {
                    itemType: "group",
                    colCount: 3,
                    items: [{
                        dataField: "name_az",
                        label: { text: "Name (AZ)" },
                        validationRules: [{
                            type: "required",
                            message: "Name is required"
                        }],
                    }, {
                        dataField: "name_en",
                            label: { text: "Name (EN)" },
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }],
                    }, {
                        dataField: "name_ru",
                        label: { text: "Name (RU)" },
                        validationRules: [{
                            type: "required",
                            message: "Name is required"
                        }],
                    }, ]
                },
                {
                    itemType: "group",
                    caption: "Required documents",
                    name: "documents-container",
                    items: [
                        {
                            itemType: "group",
                            name: "documents",
                            items: GetRequiredDocumentOptions(required_Documents)
                        },
                        {
                            itemType: "button",
                            horizontalAlignment: "left",
                            cssClass: "add-phone-button",
                            buttonOptions: {
                                icon: "add",
                                text: "Add document",
                                onClick: function () {
                                    required_Documents.push({ "name_az": "", "name_en": "", "name_ru": "", "document_example": "" } );
                                    form.itemOption("documents-container.documents", "items", GetRequiredDocumentOptions(required_Documents));
                                }
                            }
                        }
                    ]
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

        function GetRequiredDocumentOptions(documents) {
            var options = [];
            if (documents.length>0) {
                for (var i = 0; i < documents.length; i++) {
                    options.push(GenerateDocumentsOptions(i, documents[i]));
                }
            }
            return options;
        }

        function GenerateDocumentsOptions(index, data) {
            return {
                itemType: "group",
                colCount: 12,
                items: [
                    {
                        itemType: "group",
                        colCount: 1,
                        colSpan: 4,
                        items: [{
                            dataField: "Doc[" + index + "].name_az",
                            value: data?.name_az,
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }],
                            label: { text: (index + 1) + ".Name (AZ)" },
                            editorOptions: {
                                value: data?.name_az,
                                onValueChanged: function (e) {
                                    required_Documents[index].name_az = e.value
                                }
                            }
                        }, {
                            dataField: "Doc[" + index + "].name_en",
                            value: data?.name_en,
                            validationRules: [{
                                type: "required",
                                message: "Name is required"
                            }],
                            label: { text: (index + 1) + ".Name (EN)" },
                            editorOptions: {
                                value: data?.name_en,
                                onValueChanged: function (e) {
                                    required_Documents[index].name_en = e.value
                                }
                            }
                        },]
                    },
                    {
                        itemType: "group",
                        colCount: 1,
                        colSpan: 4,
                        items: [
                            {
                                dataField: "Doc[" + index + "].name_ru",
                                label: { text: (index + 1) + ".Name (RU)" },
                                validationRules: [{
                                    type: "required",
                                    message: "Name is required"
                                }],
                                editorOptions: {
                                    value: data?.name_ru,
                                    onValueChanged: function (e) {
                                        required_Documents[index].name_ru = e.value
                                    },
                                }
                            },
                            {
                                dataField: "Doc[" + index + "].document_example",
                                value: data?.document_example,
                                validationRules: [{
                                    type: "required",
                                    message: "Name is required"
                                }],
                                label: { text: (index + 1) + ".Document example" },
                                editorOptions: {
                                    readOnly: true,
                                    value: data?.document_example,
                                    onValueChanged: function (e) {
                                        required_Documents[index].document_example = e.value
                                    }
                                }
                            }]
                    },
                    {
                        colSpan: 3,
                        dataField: "newLogo",
                        editorType: "dxFileUploader",
                        label: { text: (index + 1) + ".Uploder" },
                        editorOptions: {
                            selectButtonText: "Choose file",
                            labelText: "",
                            name: "upload",
                            maxFileSize: 4000000,
                            uploadMode: "instantly",
                            uploadUrl: `/api/postfile?url=${Model.FilesUrl}/upload&path=$requireddocuments&check=1&origin=0`,
                            showFileList: false,
                            onUploaded: function (e) {
                                form.option(`items[2].items[0].items[${index}].items[1].items[1].editorOptions.value`, JSON.parse(e.request.response).fileName);
                            }
                        }
                    }, {
                        colSpan: 1,
                        itemType: "button",
                        horizontalAlignment: "left",
                        cssClass: "add-phone-button",
                        buttonOptions: {
                            icon: "close",
                            text: "",
                            onClick: function () {
                                required_Documents.splice(index, 1);
                                form.itemOption("documents-container.documents", "items", GetRequiredDocumentOptions(required_Documents));
                            }
                        }
                    }],

            };
        }



        $("#form").on("submit", function (e) {
            var data = form.option("formData");
            data.required_documents = required_Documents;
            delete data.Doc;
            let url = `${Model.CountriesUrl}/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=1`,"POST", true, JSON.stringify(data))
                .then(() => {
                    window.location.href = `/forms/index/${Model.CountriesUrl}`
                });

            e.preventDefault();
        })
    }

}
export let Form = FormCreater;