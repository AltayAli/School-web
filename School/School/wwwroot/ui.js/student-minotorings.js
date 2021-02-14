import Model from "./general.js";
$(function () {
    var sendedModel = {

    }
    $("#popup").dxPopup({
        maxWidth: 250,
        maxHeight: 300,
        closeOnOutsideClick: true,
        onContentReady: function (e) {
            $("#fileUploader").dxFileUploader({
                selectButtonText: "Fayl yüklə",
                labelText: "",
                name: "upload",
                accept: "image/*",
                maxFileSize: 4000000,
                uploadMode: "useButtons",
                uploadUrl: `/files/upload?path=monitorings`,
                onUploaded: function (e) {
                    sendedModel["path"] = JSON.parse(e.request.response).fileName;

                    Model.SendRequest("/student/monitorigns/addfile",
                        "POST",
                        true,
                        JSON.stringify(sendedModel));

                }
            });
        }
    });
    
    $("#title").html("Sərbəst işlərin siyahısı")
    $("#create-link").hide()
    $("#edit-link").hide()
    $("#detail-link").hide();
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: function () {
                return Model.SendRequest("/student/monitorigns/GetMonitorings");
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
            caption: "Ad",
            formItem: {
                visible: false,
            },
            validationRules: [{ type: "required" }]
        }, {
            dataField: "score",
            caption: "Nəticə",
            formItem: {
                    visible: false,
            },
            validationRules: [{ type: "required" }]
        }, {
            dataField: "deadLine",
            caption: "Bitmə tarixi",
            formItem: {
                visible:false,
            },
            validationRules: [{ type: "required" }]
            }, {
            cellTemplate: function (container, options) {
                if (options.data["path"])
                    $("<div>")
                        .append($(`<a href="/monitorings/${options.data["path"]}" class="btn" download="${options.data["path"]}"><i class="icon-download"></i>Faylı yüklə</a>`))
                        .appendTo(container);
            },
            width: 150,
            }, {
            type: "buttons",
            buttons: [{
                hint: "Add file",
                icon: "file",
                text: "Add file",
                visible: true,
                onClick: function (e) {
                    console.log(e);
                    var popup = $("#popup").dxPopup("instance");
                    sendedModel["id"] = e.row.key;
                    popup.show();
                }
            }]
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

