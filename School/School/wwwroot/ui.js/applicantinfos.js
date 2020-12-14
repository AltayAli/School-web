import Model from "./general.js"
$(function () {
    $("#title").html("List of applications")
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "applicant_guid",
            load: function () {
                var url = `${Model.ApplicantInfosUrl}/getdevextremeList`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=1`, "GET", false);
            },
            remove: function (key) {
                var url = `${Model.ApplicantInfosUrl}/delete/${key}`;
                return Model.SendRequest(`/api/delete?url=${url}&check=1&origin=1`, "GET", true);
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
        editing: {
            mode: "popup",
            allowDeleting: true
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
        columns: [
            {
                dataField: "applicant_guid",
                caption: "Application guid",
            }, {
                dataField: "user_guid",
                caption: "User guid"
            }, {
                dataField: "prev_edu_type_name",
                caption: "Preview education type",
            }, {
                dataField: "prev_edu_name",
                caption: "Preview education degree",
            },
            {
                dataField: "prev_edu_grad",
                caption: "Preview education greduate"
            }, {
                dataField: "work_exp_duration",
                caption: "Work experience duration"
            }],

        scrolling: {
            mode: "standart"
        },
        showBorders: true,
    });
    function selection_changed(data) {
        if (data) {
            $("#edit-link").attr("href", `/forms/form/${Model.ApplicantInfosUrl}?isCreate=0&id=${data.applicant_guid}`);
            $("#detail-link").attr("href", `/forms/info/${Model.ApplicantInfosUrl}?id=${data.applicant_guid}`);
        }
    }


    
        
    $("#create-link").hide();
});

let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key = model != null ? model["applicant_guid"] : "";
        model["applications"] = model["applications"] == undefined ? [] : model["applications"];


        var programsDataStore = new DevExpress.data.AspNet.createStore({
            key: "code",
            loadMode:"raw",
            loadUrl: `/api/get?url=${Model.ProgramsUrl}/getdevextremeList&check=1&origin=1`
        })

        var treeView,dataGrid;
        function getApplicationOptions(phones) {
            var options = [];
            for (var i = 0; i < phones.length; i++) {
                options.push(generateNewApplicationOptions(i, phones[i]));
            }
            return options;
        }

        function generateNewApplicationOptions(index, data) {
            return {
                itemType: "group",
                colCount: 3,
                items: [{
                    dataField: "apps[" + index + "].status",
                    editorType: "dxSelectBox",
                    cssClass: "phone-editor",
                    editorOptions: {
                        onValueChanged: function (e) {
                            model["applications"][index].status = e.value;
                        },
                        value: data.status,
                        dataSource: [{ id: 0, type: "Approved" }, { id: 1, type: "Waiting" }, { id: 2, type: "Decline" }],
                        displayExpr: "type",
                        valueExpr: "id"
                    },
                    label: {
                        text: "Status " + (index + 1)
                    },
                }, {
                    dataField: "apps[" + index + "].edu_program_code",
                    editorType: "dxDropDownBox",
                        editorOptions: {
                            readOnly:true,
                            dataSource: programsDataStore,
                            displayExpr: "title_en",
                            valueExpr: "code",
                            placeholder: "Select...",
                            value: data?.edu_program_code,
                            contentTemplate: function (e) {
                                var value = e.component.option("value"),
                                    $dataGrid = $("<div>").dxDataGrid({
                                        dataSource: e.component.getDataSource(),
                                        columns: ["title_en"],
                                        hoverStateEnabled: true,
                                        paging: { enabled: true, pageSize: 10 },
                                        filterRow: { visible: true },
                                        selection: { mode: "single" },
                                        selectedRowKeys: [value],
                                        height: "100%",
                                        onSelectionChanged: function (selectedItems) {
                                            var keys = selectedItems.selectedRowKeys,
                                                hasSelection = keys.length;
                                            e.component.option("value", hasSelection ? keys[0] : null);
                                            model["applications"][index].edu_program_code = keys[0];
                                            e.component.close()
                                        }
                                    });

                                dataGrid = $dataGrid.dxDataGrid("instance");

                                e.component.on("valueChanged", function (args) {
                                    dataGrid.selectRows(args.value, false);
                                });

                                return $dataGrid;
                            }
                        },
                    label: {
                    text: "Program code " + (index + 1)
                }
                    }, {
                dataField: "apps[" + index + "].list_of_documents",
                editorType: "dxTextArea",
                cssClass: "phone-editor",
                readOnly: true,
                label: {
                    text: "Document list " + (index + 1)
                },
                        editorOptions: {
                            readOnly: true,
                    onValueChanged: function (e) {
                        model["applications"][index].list_of_documents = e.value;
                    },
                    value: data.list_of_documents
                }
            }]
        }
    }
        var prevEduTypeUrl;

        if (model.prev_edu_code == 2020101116121640) {
            prevEduTypeUrl = Model.EducationDegreesUrl;
        } else {
            prevEduTypeUrl = Model.FacultiesUrl;
        }

        var form = $("#form").dxForm({
        formData: model,
        labelLocation: "top",
        showColonAfterLabel: true,
        showValidationSummary: true,
        validationGroup: "customerData",
        items: [
            {
                itemType: "group",
                colCount: 2,
                items: [
                    {
                        colSpan: 4,
                        dataField: "prev_edu_type_code",
                        editorType: "dxSelectBox",
                        label: { text: "Education type" },
                        validationRules: [{
                            type: "required",
                            message: "Education type is required"
                        }],
                        value: model?.prev_edu_type_code,
                        editorOptions: {
                            readOnly: true,
                            dataSource: new DevExpress.data.AspNet.createStore({
                                key: "code",
                                loadMode: "raw",
                                loadUrl: `/api/get?url=${prevEduTypeUrl}/getdevextremeList&check=1&origin=1`
                            }),
                            elementAttr: {
                                id: "faculty",
                            },
                            grouped: true,
                            displayExpr: "name_en",
                            valueExpr: "code",
                            placeholder: "Select...",
                        },
                    },
                    {
                        colSpan: 4,
                        dataField: "prev_edu_code",
                        editorType: "dxSelectBox",
                        label: { text: "Education degree" },
                        validationRules: [{
                            type: "required",
                            message: "Education degree is required"
                        }],
                        value: model?.prev_edu_code, 
                        editorOptions: {
                            readOnly: true,
                            dataSource: DevExpress.data.AspNet.createStore({
                                key: "code",
                                loadUrl: `/api/get?url=${Model.EducationDegreeTypesUrl}/getdevextremeList&check=1&origin=1`
                            }),
                            displayExpr: Model.SelectBoxNameDisplayExp,
                            valueExpr: "code",
                            searchEnabled: true
                        }
                    },
                    {
                        colSpan: 4,
                        dataField: "prev_edu_grad",
                        editorOptions: {
                            readOnly: true,
                        },
                        editorType: "dxNumberBox",
                        label: { text: "Education graduate" },
                        validationRules: [{
                            type: "required",
                            message: "Education graduate is required"
                        }]
                    },
                    {
                        colSpan: 4,
                        dataField: "work_exp_duration",
                        readOnly: true,
                        editorType: "dxNumberBox",
                        label: { text: "Work experience duration" },
                        editorOptions: {
                            readOnly: true,
                        },
                        validationRules: [{
                            type: "required",
                            message: "Education graduate is required"
                        }]
                    }]
            },
            {
                itemType: "group",
                caption: "Language certificates",
                name: "language_certificates",
                items: [{
                    itemType: "group",
                    name: "language_certificate",
                    items: [{
                        itemType: "group",
                        colCount: 12,
                        items: [{
                            colSpan: 3,
                            dataField: "ielts_score",
                            editorOptions: {
                                readOnly: true,
                            },
                            editorType: "dxNumberBox",
                            label: { text:  "IELTS score" },
                            cssClass: "language-certificate-editor",

                        },{
                            colSpan: 3,
                                dataField: "toefl_score",
                                editorOptions: {
                                    readOnly: true,
                                },
                            editorType: "dxNumberBox",
                            label: { text: "TOEFL score" },
                            cssClass: "language-certificate-editor",

                        },{
                            colSpan: 3,
                                dataField: "sat_score",
                                editorOptions: {
                                    readOnly: true,
                                },
                            editorType: "dxNumberBox",
                            label: { text: "SAT score" },
                            cssClass: "language-certificate-editor",

                        },{
                            colSpan: 3,
                            dataField: "gre_score",
                                editorType: "dxNumberBox",
                                editorOptions: {
                                    readOnly: true,
                                },
                            label: { text:  "GRE score" },
                            cssClass: "language-certificate-editor",

                        },{
                            colSpan: 3,
                                dataField: "gmat_score",
                                editorOptions: {
                                    readOnly: true,
                                },
                            editorType: "dxNumberBox",
                            label: { text: "GMAT score" },
                            cssClass: "language-certificate-editor",

                        },{
                            colSpan: 3,
                                dataField: "telc_score",
                                editorOptions: {
                                    readOnly: true,
                                },
                            editorType: "dxNumberBox",
                            label: { text: "TELC score" },
                            cssClass: "language-certificate-editor",

                        },{
                            colSpan: 3,
                                dataField: "testdaf_score",
                                editorOptions: {
                                    readOnly: true,
                                },
                            editorType: "dxNumberBox",
                            label: { text: "TESTDAF score" },
                            cssClass: "language-certificate-editor",

                        },{
                            colSpan: 3,
                                dataField: "dsh_score",
                                editorOptions: {
                                    readOnly: true,
                                },
                            editorType: "dxNumberBox",
                            label: { text: "DSH score" },
                            cssClass: "language-certificate-editor",

                        }]
                    }]
                }]
            },
            {
                itemType: "group",
                caption: "Application",
                name: "applications",
                items: [{
                    itemType: "group",
                    name: "application",
                    items: getApplicationOptions(model["applications"])
                }]
            },
            {
                itemType: "button",
                horizontalAlignment: "left",
                buttonOptions: {
                    text: "Save",
                    type: "success",
                    useSubmitBehavior: true
                }
            }
        ]
        }).dxForm("instance");

        $("#form").on("submit", function (e) {

            var applicant_info =form.option("formData");
            delete applicant_info.apps;
            if (applicant_info["start_Date"] != undefined && applicant_info["start_Date"] != null) {
                try {
                    data["start_Date"] = ChangeToRequiredDate(data["start_Date"]);
                } catch (e) {

                }
            }

            if (applicant_info["end_Date"] != undefined && applicant_info["end_Date"] != null) {
                try {
                    data["end_Date"] = ChangeToRequiredDate(data["end_Date"]);
                } catch (e) {
                }
            }

            if (applicant_info["date"] != undefined && applicant_info["date"] != null) {
                try {
                    data["date"] = ChangeToRequiredDate(data["date"]);
                } catch (e) { }
            }
            var url = `${Model.ApplicantInfosUrl}/`;
            url += isCreate ? "create" : `update/${key}`;
            var method = isCreate ? "post" : "put";

            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=1`, "POST", true, JSON.stringify(applicant_info))
                .then(() => {
                    window.location.href = `/forms/index/${Model.ApplicantInfosUrl}`
                });

            e.preventDefault();
        })


        form.itemOption("applications.application", "items", getApplicationOptions(model["applications"]));
}
}

let InfoCreater = {
    CreateForm: function (model) {

        var programsDataStore = new DevExpress.data.AspNet.createStore({
            key: "code",
            loadMode: "raw",
            loadUrl: `/api/get?url=${Model.ProgramsUrl}/getdevextremeList&check=1&origin=1`
        })
        function getApplicationOptions(applications) {
            var options = [];
            for (var i = 0; i < applications.length; i++) {
                options.push(generateNewApplicationOptions(i, applications[i]));
            }
            return options;
        }

        function generateNewApplicationOptions(index, data) {
            var array = [];
            data.list_of_documents.split(',').map((x, i) => {
                array.push({
                    status: data.status,
                    program_code: data.edu_program_code,
                    name: x,
                    link: `/api/GetPhysicalFile?fileName=${x}&path=documents&check=1&origin=0`
                });
            })
            return {
                itemType: "group",
                items: [ {
                        dataField: "apps[" + index + "].list_of_documents",
                        editorType: "dxDataGrid",
                        editorOptions: {
                            dataSource: array,
                            errorRowEnabled: false,
                            showBorders: true,
                            groupPanel: {
                                visible: true
                            },
                            grouping: {
                                autoExpandAll: true,
                            },
                            columns: [
                                {
                                    dataField: "program_code",
                                    caption: "Program",
                                    groupIndex: 1,
                                    lookup: {
                                        dataSource: programsDataStore,
                                        valueExpr: "code",
                                        displayExpr: Model.SelectBoxTitleDisplayExp
                                    }
                                },
                                {
                                    dataField: "status",
                                    caption: "Status",
                                    groupIndex: 0,
                                    lookup: {
                                        dataSource: [{ id: 0, type: "Approved" }, { id: 1, type: "Waiting" }, { id: 2, type: "Decline" }],
                                        displayExpr: "type",
                                        valueExpr: "id"
                                    }
                                },
                                { dataField: "name"},
                                {
                                    cellTemplate: function (container, options) {
                                    $("<div>")
                                        .append($(`<a href="${options.key.link}" class="btn" download="${options.key.name}"><i class="icon-download"></i></a>`))
                                        .appendTo(container);
                                    },
                                    width: 60
                                }]
                            ,
                    },
                    label: {
                        text: "Document list " + (index + 1)
                    },
                }]
            }
        }

        var prevEduTypeUrl;
        if (model.prev_edu_code == 2020101116121640) {
            prevEduTypeUrl = Model.EducationDegreesUrl;
        } else {
            prevEduTypeUrl = Model.FacultiesUrl;
        }
        $("#info").dxForm({
            formData: model,
            items: [{
                itemType: "group",
                colCount: 2,
                items: [
                    {
                        colSpan: 4,
                        dataField: "prev_edu_type_code",
                        editorType: "dxSelectBox",
                        label: { text: "Education type" },
                        validationRules: [{
                            type: "required",
                            message: "Education type is required"
                        }],
                        value: model?.prev_edu_type_code,
                        editorOptions: {
                            readOnly: true,
                            dataSource: new DevExpress.data.AspNet.createStore({
                                key: "code",
                                loadMode: "raw",
                                loadUrl: `/api/get?url=${prevEduTypeUrl}/getdevextremeList&check=1&origin=1`
                            }),
                            elementAttr: {
                                id: "faculty",
                            },
                            grouped: true,
                            displayExpr: "name_en",
                            valueExpr: "code",
                            value: model?.faculty_code,
                            placeholder: "Select...",
                        },
                    },
                    {
                        colSpan: 4,
                        dataField: "prev_edu_code",
                        editorType: "dxSelectBox",
                        label: { text: "Education degree" },
                        validationRules: [{
                            type: "required",
                            message: "Education degree is required"
                        }],
                        editorOptions: {
                            readOnly: true,
                            dataSource: DevExpress.data.AspNet.createStore({
                                key: "code",
                                loadUrl: `/api/get?url=${Model.EducationDegreeTypesUrl}/getdevextremeList&check=1&origin=1`
                            }),
                            displayExpr: Model.SelectBoxNameDisplayExp,
                            valueExpr: "code",
                            searchEnabled: true
                        }
                    },
                    {
                        colSpan: 4,
                        dataField: "prev_edu_grad",
                        editorOptions: {
                            readOnly: true,
                        },
                        editorType: "dxNumberBox",
                        label: { text: "Education graduate" },
                        validationRules: [{
                            type: "required",
                            message: "Education graduate is required"
                        }]
                    },
                    {
                        colSpan: 4,
                        dataField: "work_exp_duration",
                        readOnly: true,
                        editorType: "dxNumberBox",
                        label: { text: "Work experience duration" },
                        editorOptions: {
                            readOnly: true,
                        },
                        validationRules: [{
                            type: "required",
                            message: "Education graduate is required"
                        }]
                    }]
            }, {
                    itemType: "group",
                    caption: "Language certificates",
                    name: "language_certificates",
                    items: [{
                        itemType: "group",
                        name: "language_certificate",
                        items: [{
                            itemType: "group",
                            colCount: 12,
                            items: [{
                                colSpan: 3,
                                editorOptions: {
                                    readOnly: true
                                },
                                dataField: "ielts_score",
                                editorType: "dxNumberBox",
                                label: { text: "IELTS score" },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                editorOptions: {
                                    readOnly: true
                                },
                                dataField: "toefl_score",
                                editorType: "dxNumberBox",
                                label: { text: "TOEFL score" },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                editorOptions: {
                                    readOnly: true
                                },
                                dataField: "sat_score",
                                editorType: "dxNumberBox",
                                label: { text: "SAT score" },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                editorOptions: {
                                    readOnly: true
                                },
                                dataField: "gre_score",
                                editorType: "dxNumberBox",
                                label: { text: "GRE score" },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                editorOptions: {
                                    readOnly: true
                                },
                                dataField: "gmat_score",
                                editorType: "dxNumberBox",
                                label: { text: "GMAT score" },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                editorOptions: {
                                    readOnly: true
                                },
                                dataField: "telc_score",
                                editorType: "dxNumberBox",
                                label: { text: "TELC score" },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                editorOptions: {
                                    readOnly: true
                                },
                                dataField: "testdaf_score",
                                editorType: "dxNumberBox",
                                label: { text: "TESTDAF score" },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                editorOptions: {
                                    readOnly: true
                                },
                                dataField: "dsh_score",
                                editorType: "dxNumberBox",
                                label: { text: "DSH score" },
                                cssClass: "language-certificate-editor",

                            }]
                        }]
                    }]
                }, {
                    colSpan: 2,
                    itemType: "group",
                    caption: "Application",
                    name: "applications",
                    items: [{
                        itemType: "group",
                        name: "application",
                        items: getApplicationOptions(model["applications"])
                    }]
                }]
        })
}
}


export let Form = FormCreater, Info = InfoCreater;