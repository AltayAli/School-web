import Model from "./general.js"
$(function () {
    $("#title").html("Dərslər")
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: function () {
                return Model.SendRequest(`/student/lessons/getlist`);
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
    });

});