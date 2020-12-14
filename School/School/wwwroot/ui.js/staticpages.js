import Model from "./general.js";

$(function () {
    $("#title").html("List of static pages")
    $("#detail-link").hide();
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "code",
            load: function () {
                var url = `${Model.StaticPagesUrl}/getdevextremelist?culture=az`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=1`, "GET", false);
            },
            remove: function (key) {
                var url = `${Model.StaticPagesUrl}/delete/${key}`;
                return Model.SendRequest(`/api/delete?url=${url}&check=1&origin=1`, "GET", true);
            }
        }),
        onSelectionChanged: function (selectedItems) {
            selection_changed(selectedItems.selectedRowsData[0]);
        },
        keyExpr: "code",
        remoteOperations: false,
        columnHidingEnabled: true,
        errorRowEnabled: false,
        columnAutoWidth: true,
        hoverStateEnable: true,
        selection: {
            mode: "single",
            defered: true
        },
        showBorders: true,
        editing: {
            mode: "popup",
            allowDeleting: true,
        },
        columns: [{
            dataField: "code",
            caption: "Code",
        },{
            dataField: "title_az",
            caption: "Title (Az)",
        }, {
            dataField: "title_en",
            caption: "Title (En)",
        }, {
            dataField: "title_ru",
            caption: "Title (Ru)",
        }, {
            dataField: "slug_az",
            caption: "Slug (Az)",
        }, {
            dataField: "slug_en",
            caption: "Slug (En)",
        }, {
            dataField: "slug_ru",
            caption: "Slug (Ru)",
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
            $("#edit-link").attr("href", `/forms/form/${Model.StaticPagesUrl}?isCreate=0&id=${data.code}`);
        }
    }

    $("#create-link").attr("href", `/forms/form/${Model.StaticPagesUrl}?isCreate=1`);
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
                    colCount: 4,
                    items: [{
                        dataField: "title_az",
                        validationRules: [{
                            type: "required",
                            message: "Title is required"
                        }],
                        label: { text: "Title (Az)" }
                    }, {
                            dataField: "title_en",
                            validationRules: [{
                                type: "required",
                                message: "Title is required"
                            }],
                        label: { text: "Title (En)" }
                    }, {
                            dataField: "title_ru",
                            validationRules: [{
                                type: "required",
                                message: "Title is required"
                            }],
                            label: { text: "Title (Ru)" }
                        }, {
                            dataField: "is_seen_in_menu",
                            label: { text: "Is seen in menu" },
                            editorType: "dxCheckBox",
                        }]
                },
                //File manager Popups
                {
                    colSpan: 1,
                    editorType: "dxPopup",
                    height:600,
                    editorOptions: {
                        elementAttr: {
                            id: "popupAz",
                        },
                        contentTemplate: function (contentElement) {
                            $("<div>")
                                .appendTo(contentElement)
                                .dxFileManager({
                                    elementAttr: {
                                        id: "fileManager",
                                    },
                                    height: 300,
                                    name: "fileManager",
                                    fileSystemProvider: new DevExpress.fileManagement.RemoteFileSystemProvider({
                                        endpointUrl: `/api/FileSystem?path=${Model.StaticPagesUrl}&check=1&origin=0`
                                    }),
                                    permissions: {
                                        download: true,
                                    },
                                    onSelectedFileOpened: function (e) {
                                        var str = 'http://api.unibroad.turn.az/api/files/Files/GetPhysicalFile?fileName=' + e.file.name + '&path=' + Model.StaticPagesUrl + '&check=1&origin=0';
                                        var popup = $("#imagePopupAz").dxPopup("instance");
                                        popup.option({
                                            "title": "Image",
                                            "contentTemplate": function () {
                                                return $("<div />").append(
                                                    $("<div />").dxButton({
                                                        text: "Add to editor",
                                                        onClick: function () {
                                                            var editor = $("#htmlEditorAz").dxHtmlEditor("instance");
                                                            var range = editor.getSelection();
                                                            var index = range && range.index || 0;
                                                            editor.insertEmbed(index, "extendedImage", {
                                                                src: str,
                                                                width: "200px"
                                                            });
                                                            popup.hide();
                                                        }
                                                    }),
                                                    $("<br />"),
                                                    $(`<div><img src="${str}"/></div>`));
                                            }
                                        });
                                        popup.show();
                                    },
                                    currentPath: Model.StaticPagesUrl,
                                    itemView: {
                                        details: {
                                            columns: [
                                                "thumbnail", "name",
                                                {
                                                    dataField: "category",
                                                    caption: "Category",
                                                    width: 95
                                                },
                                                "dateModified", "size"
                                            ]
                                        },
                                        showParentFolder: false
                                    },
                                    toolbar: {
                                        items: [
                                            {
                                                name: "showNavPane",
                                                visible: true
                                            },
                                            "separator", "create",
                                            {
                                                widget: "dxMenu",
                                                location: "before",
                                                options: {
                                                    items: [],
                                                    onItemClick: onItemClick
                                                }
                                            },
                                            "refresh",
                                            {
                                                name: "separator",
                                                location: "after"
                                            },
                                            "switchView"
                                        ],
                                    }
                                });
                            $("<div>")
                                .appendTo(contentElement)
                                .dxFileUploader({
                                    elementAttr: {
                                        id: "fileUploader",
                                    },
                                    selectButtonText: "Upload photo",
                                    labelText: "",
                                    name: "upload",
                                    accept: "image/*",
                                    maxFileSize: 1048576,
                                    uploadUrl: `/api/postfile?url=${Model.FilesUrl}/upload&path=${Model.StaticPagesUrl}&check=1&origin=0`,
                                    uploadMode: "useButtons",
                                    allowedFileExtensions: [".jpg", ".jpeg", ".gif", ".png"],
                                    onUploaded: function (e) {
                                        $("#fileManager").dxFileManager("instance").refresh();
                                    }
                                });

                        }
                    }
                },
                {
                    colSpan: 1,
                    editorType: "dxPopup",
                    height:600,
                    editorOptions: {
                        elementAttr: {
                            id: "popupEn",
                        },
                        contentTemplate: function (contentElement) {
                            $("<div>")
                                .appendTo(contentElement)
                                .dxFileManager({
                                    elementAttr: {
                                        id: "fileManager",
                                    },
                                    height: 300,
                                    name: "fileManager",
                                    fileSystemProvider: new DevExpress.fileManagement.RemoteFileSystemProvider({
                                        endpointUrl: `/api/FileSystem?path=${Model.StaticPagesUrl}&check=1&origin=0`
                                    }), 
                                    permissions: {
                                        download: true,
                                    },
                                    onSelectedFileOpened: function (e) {
                                        var popup = $("#imagePopupEn").dxPopup("instance");
                                        var str = 'http://api.unibroad.turn.az/api/files/Files/GetPhysicalFile?fileName=' + e.file.name + '&path=' + Model.StaticPagesUrl + '&check=1&origin=0';
                                        popup.option({
                                            "title": "Image",
                                            "contentTemplate": function () {
                                                return $("<div />").append(
                                                    $("<div />").dxButton({
                                                        text: "Add to editor",
                                                        onClick: function () {
                                                            var editor = $("#htmlEditorEn").dxHtmlEditor("instance");
                                                            var range = editor.getSelection();
                                                            var index = range && range.index || 0;
;                                                            editor.insertEmbed(index, "extendedImage", {
                                                                src: str,
                                                                width: "200px"
                                                            });
                                                            popup.hide();
                                                        }
                                                    }),
                                                    $("<br />"),
                                                    $(`<div><img src="${str}"/></div>`));
                                                
                                            }
                                        });
                                        popup.show();
                                    },
                                    currentPath: Model.StaticPagesUrl,
                                    itemView: {
                                        details: {
                                            columns: [
                                                "thumbnail", "name",
                                                {
                                                    dataField: "category",
                                                    caption: "Category",
                                                    width: 95
                                                },
                                                "dateModified", "size"
                                            ]
                                        },
                                        showParentFolder: false
                                    },
                                    toolbar: {
                                        items: [
                                            {
                                                name: "showNavPane",
                                                visible: true
                                            },
                                            "separator", "create",
                                            {
                                                widget: "dxMenu",
                                                location: "before",
                                                options: {
                                                    items: [],
                                                    onItemClick: onItemClick
                                                }
                                            },
                                            "refresh",
                                            {
                                                name: "separator",
                                                location: "after"
                                            },
                                            "switchView"
                                        ],
                                    }
                                });
                            $("<div>")
                                .appendTo(contentElement)
                                .dxFileUploader({
                                    elementAttr: {
                                        id: "fileUploader",
                                    },
                                    selectButtonText: "Upload photo",
                                    labelText: "",
                                    name: "upload",
                                    accept: "image/*",
                                    maxFileSize: 1048576,
                                    uploadUrl: `/api/postfile?url=${Model.FilesUrl}/upload&path=${Model.StaticPagesUrl}&check=1&origin=0`,
                                    uploadMode: "useButtons",
                                    allowedFileExtensions: [".jpg", ".jpeg", ".gif", ".png"],
                                    onUploaded: function (e) {
                                        $("#fileManager").dxFileManager("instance").refresh();
                                    }
                                });

                        }
                    }
                },
                {
                    colSpan: 1,
                    editorType: "dxPopup",
                    height:600,
                    editorOptions: {
                        elementAttr: {
                            id: "popupRu",
                        },
                        contentTemplate: function (contentElement) {
                            $("<div>")
                                .appendTo(contentElement)
                                .dxFileManager({
                                    elementAttr: {
                                        id: "fileManager",
                                    },
                                    height: 300,
                                    name: "fileManager",
                                    fileSystemProvider: new DevExpress.fileManagement.RemoteFileSystemProvider({
                                        endpointUrl: `/api/FileSystem?path=${Model.StaticPagesUrl}&check=1&origin=0`
                                    }),
                                    permissions: {
                                        download: true,
                                    },
                                    onSelectedFileOpened: function (e) {
                                        var str = 'http://api.unibroad.turn.az/api/files/Files/GetPhysicalFile?fileName=' + e.file.name + '&path=' + Model.StaticPagesUrl + '&check=1&origin=0';
                                        var popup = $("#imagePopupRu").dxPopup("instance");
                                        popup.option({
                                            "title": "Image",
                                            "contentTemplate": function () {
                                                return $("<div />").append(
                                                    $("<div />").dxButton({
                                                        text: "Add to editor",
                                                        onClick: function () {
                                                            var editor = $("#htmlEditorRu").dxHtmlEditor("instance");
                                                            var range = editor.getSelection();
                                                            var index = range && range.index || 0;
                                                            editor.insertEmbed(index, "extendedImage", {
                                                                src: str,
                                                                width: "200px"
                                                            });
                                                            popup.hide();
                                                        }
                                                    }),
                                                    $("<br />"),
                                                    $(`<div><img src="${str}"/></div>`));
                                            }
                                        });
                                        popup.show();
                                    },
                                    currentPath: Model.StaticPagesUrl,
                                    itemView: {
                                        details: {
                                            columns: [
                                                "thumbnail", "name",
                                                {
                                                    dataField: "category",
                                                    caption: "Category",
                                                    width: 95
                                                },
                                                "dateModified", "size"
                                            ]
                                        },
                                        showParentFolder: false
                                    },
                                    toolbar: {
                                        items: [
                                            {
                                                name: "showNavPane",
                                                visible: true
                                            },
                                            "separator", "create",
                                            {
                                                widget: "dxMenu",
                                                location: "before",
                                                options: {
                                                    items: [],
                                                    onItemClick: onItemClick
                                                }
                                            },
                                            "refresh",
                                            {
                                                name: "separator",
                                                location: "after"
                                            },
                                            "switchView"
                                        ],
                                    }
                                });
                            $("<div>")
                                .appendTo(contentElement)
                                .dxFileUploader({
                                    elementAttr: {
                                        id: "fileUploader",
                                    },
                                    selectButtonText: "Upload photo",
                                    labelText: "",
                                    name: "upload",
                                    accept: "image/*",
                                    maxFileSize: 1048576,
                                    uploadUrl: `/api/postfile?url=${Model.FilesUrl}/upload&path=${Model.StaticPagesUrl}&check=1&origin=0`,
                                    uploadMode: "useButtons",
                                    allowedFileExtensions: [".jpg", ".jpeg", ".gif", ".png"],
                                    onUploaded: function (e) {
                                        $("#fileManager").dxFileManager("instance").refresh();
                                    }
                                });

                        }
                    }
                },
                //File manager Popups
                //Image Popups
                {
                    colSpan: 1,
                    editorType: "dxPopup",
                    height:600,
                    editorOptions: {
                        elementAttr: {
                            id: "imagePopupAz",
                        }
                    }
                },
                {
                    colSpan: 1,
                    editorType: "dxPopup",
                    height:600,
                    editorOptions: {
                        elementAttr: {
                            id: "imagePopupEn",
                        }
                    }
                },
                {
                    colSpan: 1,
                    editorType: "dxPopup",
                    height:600,
                    editorOptions: {
                        elementAttr: {
                            id: "imagePopupRu",
                        }
                    }
                },
                //Image Popups
                //Html editors
                {
                    dataField: "body_az",
                    validationRules: [{
                        type: "required",
                        message: "Body is required"
                    }],
                    editorType: "dxHtmlEditor",
                    label: { text: "Main part (Az)" },
                    editorOptions: {
                        elementAttr: {
                            id: "htmlEditorAz",
                        },
                        height: 550,
                        toolbar: {
                            items: [
                                "undo", "redo", "separator",
                            {
                                formatName: "size",
                                formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"]
                            },
                            {
                                formatName: "font",
                                formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
                            },
                                "separator", "bold", "italic", "strike", "underline", "separator",
                                "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                                "orderedList", "bulletList", "separator",
                            {
                                formatName: "header",
                                formatValues: [false, 1, 2, 3, 4, 5]
                            }, "separator",
                                "color", "background", "separator",
                                "link", {
                                    widget: "dxButton",
                                    options: {
                                        icon: "image",
                                        onClick: function () {
                                            $("#popupAz").dxPopup("instance").show();
                                        }
                                    }
                                }, "separator",
                                "clear", "codeBlock", "blockquote"
                            ]
                        },
                        mediaResizing: {
                            enabled: true
                        }
                    }
                },
                {
                    dataField: "body_en",
                    validationRules: [{
                        type: "required",
                        message: "Body is required"
                    }],
                    editorType: "dxHtmlEditor",
                    label: { text: "Main part (En)" },
                    editorOptions: {
                        elementAttr: {
                            id: "htmlEditorEn",
                        },
                        height: 550,
                        toolbar: {
                            items: [
                                "undo", "redo", "separator",
                            {
                                formatName: "size",
                                formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"]
                            },
                            {
                                formatName: "font",
                                formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
                            },
                                "separator", "bold", "italic", "strike", "underline", "separator",
                                "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                                "orderedList", "bulletList", "separator",
                            {
                                formatName: "header",
                                formatValues: [false, 1, 2, 3, 4, 5]
                            }, "separator",
                                "color", "background", "separator",
                                "link", {
                                    widget: "dxButton",
                                    options: {
                                        icon: "image",
                                        onClick: function () {
                                            $("#popupEn").dxPopup("instance").show();
                                        }
                                    }
                                }, "separator",
                                "clear", "codeBlock", "blockquote"
                            ]
                        },
                        mediaResizing: {
                            enabled: true
                        }
                    }
                },
                {
                    dataField: "body_ru",
                    validationRules: [{
                        type: "required",
                        message: "Body is required"
                    }],
                    editorType: "dxHtmlEditor",
                    label: { text: "Main part (Ru)" },
                    editorOptions: {
                        elementAttr: {
                            id: "htmlEditorRu",
                        },
                        height: 550,
                        toolbar: {
                            items: [
                                "undo", "redo", "separator",
                            {
                                formatName: "size",
                                formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"]
                            },
                            {
                                formatName: "font",
                                formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
                            },
                                "separator", "bold", "italic", "strike", "underline", "separator",
                                "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                                "orderedList", "bulletList", "separator",
                            {
                                formatName: "header",
                                formatValues: [false, 1, 2, 3, 4, 5]
                            }, "separator",
                                "color", "background", "separator",
                                "link", {
                                    widget: "dxButton",
                                    options: {
                                        icon: "image",
                                        onClick: function () {
                                            $("#popupRu").dxPopup("instance").show();
                                        }
                                    }
                                }, "separator",
                                "clear", "codeBlock", "blockquote"
                            ]
                        },
                        mediaResizing: {
                            enabled: true
                        }
                    }
                },
                //Html editors
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

        $("#photo-popup").dxPopup({
            maxHeight: 600,
            closeOnOutsideClick: true,
            onContentReady: function (e) {
                var $contentElement = e.component.content();
                $contentElement.addClass("photo-popup-content");
            }
        });

        $("#form").on("submit", function (e) {
            let url = `${Model.StaticPagesUrl}/`;
            url += isCreate ? "create" : `update/${key}`;
            let method = isCreate ? "post" : "put";
            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=1`,"POST", true, JSON.stringify(form.option("formData")))
                .then(() => {

                    window.location.href = `/forms/index/${Model.StaticPagesUrl}`

                });
            e.preventDefault();
        })

        function onItemClick(args) {
            var updated = false;

            if (args.itemData.extension) {
                updated = createFile(args.itemData.extension, args.fileSystemItem);
            } else if (args.itemData.category !== undefined) {
                updated = updateCategory(args.itemData.category, args.fileSystemItem, args.viewArea);
            }

            if (updated) {
                fileManager.refresh();
            }
        }
    }

}

export let Form = FormCreater;