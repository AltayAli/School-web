import Model from "./general.js"
$(function () {
    $("#title").html("List of programs")
    $("#detail-link").hide();
    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "code",
            load: function () {
                var url = `${Model.ProgramsUrl}/getdevextremeList`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=1`, "GET", false);
            },
            remove: function (key) {
                var url = `${Model.ProgramsUrl}/delete/${key}`;
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
        columns: [{
            dataField: "code",
            caption: "Code",
        }, {
            dataField: "title_az",
            label: {
                text: "Title (AZ)"
            }
        }, {
            dataField: "title_en",
            label: {
                text: "Title (En)"
            }
        }, {
            dataField: "title_ru",
            label: {
                text: "Title (Ru)"
            }
        }, {
            dataField: "university_code",
            caption: "University",
            lookup: {
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "code",
                    loadUrl: `/api/get?url=${Model.UniversitiesUrl}/getdevextremelist&check=1&origin=1`
                }),
                valueExpr: "code",
                displayExpr: Model.SelectBoxNameDisplayExp
            }
        }],

        scrolling: {
            mode: "standart"
        },
        showBorders: true,
    });

    function selection_changed(data) {
        if (data) {
            $("#code").attr("value", data.code);
            $("#edit-link").attr("href", `/forms/form/${Model.ProgramsUrl}?isCreate=0&id=${data.code}`);
        }
    }

    $("#create-link").attr("href", `/forms/form/${Model.ProgramsUrl}?isCreate=1`);
});


let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key = "", countryCode = "", treeView, dataGrid;

        if (model != null) {
            key = model["code"];
            countryCode = model["country_code"];
        }

        var form = $("#form").dxForm({
            formData: model,
            labelLocation: "top",
            showColonAfterLabel: true,
            showValidationSummary: true,
            validationGroup: "customerData",
            items: [{
                itemType: "group",
                colCount: 13,
                items: [{
                    colSpan: 4,
                    dataField: "title_az",
                    editorType: "dxTextBox",
                    validationRules: [{
                        type: "required",
                        message: "Title is required"
                    }],
                    label: {
                        text: "Title (Az)"
                    }
                },
                {
                    colSpan: 4,
                    dataField: "title_en",
                    editorType: "dxTextBox",
                    validationRules: [{
                        type: "required",
                        message: "Title is required"
                    }],
                    label: {
                        text: "Title (En)"
                    }
                },
                {
                    colSpan: 4,
                    dataField: "title_ru",
                    editorType: "dxTextBox",
                    validationRules: [{
                        type: "required",
                        message: "Title is required"
                    }],
                    label: {
                        text: "Title (Ru)"
                    }
                }, {
                    colSpan: 1,
                    dataField: "visibility",
                    label: {
                        text: "Visibility"
                    },
                    value: model == null ? true : model?.visibility,
                    editorType: "dxCheckBox",
                }
                ]
            },
            {
                itemType: "group",
                colCount: 13,
                items: [{
                    colSpan: 4,
                    dataField: "subtitle_az",
                    editorType: "dxTextBox",
                    validationRules: [{
                        type: "required",
                        message: "Subtitle is required"
                    }],
                    label: {
                        text: "Subtitle (Az)"
                    }
                },
                {
                    colSpan: 4,
                    dataField: "subtitle_en",
                    editorType: "dxTextBox",
                    validationRules: [{
                        type: "required",
                        message: "Subtitle is required"
                    }],
                    label: {
                        text: "Subtitle (En)"
                    }
                },
                {
                    colSpan: 4,
                    dataField: "subtitle_ru",
                    editorType: "dxTextBox",
                    validationRules: [{
                        type: "required",
                        message: "Subtitle is required"
                    }],
                    label: {
                        text: "Subtitle (Ru)"
                    }
                }
                ]
            },
            {
                itemType: "group",
                colCount: 12,
                items: [{
                    colSpan: 3,
                    dataField: "country_code",
                    editorType: "dxSelectBox",
                    label: {
                        text: "Country"
                    },
                    validationRules: [{
                        type: "required",
                        message: "Country is required"
                    }],
                    editorOptions: {
                        dataSource: new DevExpress.data.AspNet.createStore({
                            key: "code",
                            loadMode: "raw",
                            loadUrl: `/api/get?url=${Model.CountriesUrl}/getdevextremeList&check=1&origin=1`
                        }),
                        elementAttr: {
                            id: "country_code",
                        },
                        deferRendering: false,
                        displayExpr: Model.SelectBoxNameDisplayExp,
                        valueExpr: "code",
                        value: model?.countryCode,
                        searchEnabled: true,
                        onValueChanged: function (data) {
                            Model.SendRequest(`/api/get?url=${Model.CitiesUrl}/GetDevExtremeListByCountryCode/${data.value}&check=1&origin=1`, "GET", false)
                                .then((x) => {
                                    $("#city_code").dxSelectBox({
                                        dataSource: x
                                    });
                                })

                        },
                    }
                }, {
                    colSpan: 3,
                    dataField: "city_code",
                    editorType: "dxSelectBox",
                    label: {
                        text: "City"
                    },
                    validationRules: [{
                        type: "required",
                        message: "City is required"
                    }],
                    editorOptions: {
                        elementAttr: {
                            id: "city",
                        },
                        dataSource: new DevExpress.data.AspNet.createStore({
                            key: "code",
                            loadMode: "raw",
                            loadUrl: `/api/get?url=${Model.CitiesUrl}/GetDevExtremeListByCountryCode/${countryCode}&check=1&origin=1`
                        }),
                        elementAttr: {
                            id: "city_code",
                        },
                        deferRendering: false,
                        displayExpr: Model.SelectBoxNameDisplayExp,
                        valueExpr: "code",
                        searchEnabled: true
                    }
                },
                {
                    colSpan: 3,
                    dataField: "university_code",
                    editorType: "dxDropDownBox",
                    label: {
                        text: "University"
                    },
                    validationRules: [{
                        type: "required",
                        message: "University is required"
                    }],
                    editorOptions: {
                        dataSource: new DevExpress.data.AspNet.createStore({
                            key: "code",
                            loadMode: "raw",
                            loadUrl: `/api/get?url=${Model.UniversitiesUrl}/getdevextremeList&check=1&origin=1`,
                        }),
                        elementAttr: {
                            id: "university_code",
                        },
                        deferRendering: false,
                        displayExpr: Model.SelectBoxNameDisplayExp,
                        placeholder: "Select...",
                        valueExpr: "code",
                        value: model?.university_code,
                        contentTemplate: function (e) {
                            var value = e.component.option("value"),
                                $dataGrid = $("<div>").dxDataGrid({
                                    dataSource: e.component.getDataSource(),
                                    columns: [Model.SelectBoxNameDisplayExp],
                                    hoverStateEnabled: true,
                                    paging: {
                                        enabled: true,
                                        pageSize: 10
                                    },
                                    filterRow: {
                                        visible: true
                                    },
                                    selection: {
                                        mode: "single"
                                    },
                                    selectedRowKeys: [value],
                                    height: "100%",
                                    onSelectionChanged: function (selectedItems) {
                                        var keys = selectedItems.selectedRowKeys,
                                            hasSelection = keys.length;
                                        e.component.option("value", hasSelection ? keys[0] : null);
                                        $("#university_code").dxDropDownBox("instance").close();
                                    }
                                });

                            dataGrid = $dataGrid.dxDataGrid("instance");

                            e.component.on("valueChanged", function (args) {
                                dataGrid.selectRows(args.value, false);
                            });

                            return $dataGrid;
                        },
                        searchEnabled: true
                    }
                },
                {
                    colSpan: 3,
                    dataField: "faculty_code",
                    editorType: "dxDropDownBox",
                    label: {
                        text: "Faculty"
                    },
                    validationRules: [{
                        type: "required",
                        message: "Faculty is required"
                    }],
                    editorOptions: {
                        elementAttr: {
                            id: "faculty",
                        },
                        dataSource: new DevExpress.data.AspNet.createStore({
                            key: "code",
                            loadUrl: `/api/get?url=${Model.FacultiesUrl}/getdevextremeList&check=1&origin=1`,
                            loadMode: "raw"
                        }),
                        grouped: true,
                        displayExpr: Model.SelectBoxNameDisplayExp,
                        valueExpr: "code",
                        value: model?.faculty_code,
                        placeholder: "Select...",
                        contentTemplate: function (e) {
                            var value = e.component.option("value"),
                                $treeView = $("<div>").dxTreeList({
                                    dataSource: e.component.getDataSource(),
                                    dataStructure: "plain",
                                    keyExpr: "code",
                                    parentIdExpr: "parent_faculty_code",
                                    selection: {
                                        mode: "single",
                                        allowSelectAll: false,
                                        recursive: false
                                    },
                                    displayExpr: Model.SelectBoxNameDisplayExp,
                                    columns: [{
                                        dataField: "name_en",
                                        caption: "Faculties"
                                    }],
                                    paging: {
                                        enabled: true,
                                        pageSize: 10
                                    },
                                    filterRow: {
                                        visible: true
                                    },
                                    scrolling: {
                                        mode: "standard"
                                    },
                                    rootValue: 0,
                                    selectByClick: true,
                                    selectNodesRecursive: false,
                                    onSelectionChanged: function (selectedItems) {
                                        var keys = selectedItems.selectedRowKeys,
                                            hasSelection = keys.length;
                                        e.component.option("value", hasSelection ? keys[0] : null);
                                        $("#faculty").dxDropDownBox("instance").close();
                                    }
                                });

                            treeView = $treeView.dxTreeList("instance");

                            e.component.on("valueChanged", function (args) {
                                treeView.selectRows(args.value, false);
                            });

                            return $treeView;
                        }
                    }
                }
                ]
            },
            {
                itemType: "group",
                colCount: 12,
                items: [{
                    colSpan: 3,
                    dataField: "education_language_code",
                    editorType: "dxSelectBox",
                    validationRules: [{
                        type: "required",
                        message: "Education language is required"
                    }],
                    label: {
                        text: "Education language"
                    },
                    editorOptions: {
                        dataSource: new DevExpress.data.AspNet.createStore({
                            key: "code",
                            loadMode: "raw",
                            loadUrl: `/api/get?url=${Model.EducationLanguagesUrl}/getdevextremeList&check=1&origin=1`,
                        }),
                        elementAttr: {
                            id: "education_language_code",
                        },
                        deferRendering: false,
                        displayExpr: Model.SelectBoxNameDisplayExp,
                        valueExpr: "code",
                        searchEnabled: true
                    }
                },
                {
                    colSpan: 3,
                    dataField: "education_variant_code",
                    editorType: "dxSelectBox",
                    validationRules: [{
                        type: "required",
                        message: "Education type is required"
                    }],
                    label: {
                        text: "Education type"
                    },
                    editorOptions: {
                        dataSource: new DevExpress.data.AspNet.createStore({
                            key: "code",
                            loadMode: "raw",
                            loadUrl: `/api/get?url=${Model.EducationVariantsUrl}/getdevextremeList&check=1&origin=1`
                        }),
                        elementAttr: {
                            id: "education_variant_code",
                        },
                        deferRendering: false,
                        displayExpr: Model.SelectBoxNameDisplayExp,
                        valueExpr: "code",
                        searchEnabled: true
                    }
                },
                {
                    colSpan: 3,
                    dataField: "education_location_code",
                    editorType: "dxSelectBox",
                    validationRules: [{
                        type: "required",
                        message: "Education location is required"
                    }],
                    label: {
                        text: "Education location"
                    },
                    editorOptions: {
                        dataSource: new DevExpress.data.AspNet.createStore({
                            key: "code",
                            loadMode: "raw",
                            loadUrl: `/api/get?url=${Model.EducationLocationsUrl}/getdevextremeList&check=1&origin=1`
                        }),
                        deferRendering: false,
                        displayExpr: Model.SelectBoxNameDisplayExp,
                        valueExpr: "code",
                        searchEnabled: true
                    }
                },
                {
                    colSpan: 3,
                    dataField: "education_degree_code",
                    editorType: "dxSelectBox",
                    validationRules: [{
                        type: "required",
                        message: "Education degree is required"
                    }],
                    label: {
                        text: "Education degree"
                    },
                    editorOptions: {
                        dataSource: new DevExpress.data.AspNet.createStore({
                            key: "code",
                            loadMode: "raw",
                            loadUrl: `/api/get?url=${Model.EducationDegreesUrl}/getdevextremeList&check=1&origin=1`
                        }),
                        deferRendering: false,
                        displayExpr: Model.SelectBoxNameDisplayExp,
                        valueExpr: "code",
                        searchEnabled: true
                    }
                }
                ]
            },
            {
                itemType: "group",
                colCount: 15,
                items: [{
                    colSpan: 3,
                    dataField: "start_date",
                    editorType: "dxDateBox",
                    validationRules: [{
                        type: "required",
                        message: "Start date is required"
                    }],
                    label: {
                        text: "Start Date"
                    },
                    editorOptions: {
                        displayFormat: "dd-MM-yyyy",
                        value: new Date(),
                        width: "100%"
                    }
                },
                {
                    colSpan: 3,
                    dataField: "end_date",
                    editorType: "dxDateBox",
                    validationRules: [{
                        type: "required",
                        message: "End date is required"
                    }],
                    label: {
                        text: "End Date"
                    },
                    editorOptions: {
                        displayFormat: "dd-MM-yyyy",
                        value: new Date(),
                        width: "100%"
                    }
                },
                {
                    colSpan: 3,
                    dataField: "last_apply_date",
                    label: {
                        text: "Last apply date"
                    },
                    editorType: "dxDateBox",
                    validationRules: [{
                        type: "required",
                        message: "Last apply date is required"
                    }],
                    editorOptions: {
                        displayFormat: "dd-MM-yyyy",
                        value: new Date(),
                        width: "100%"
                    }
                },
                {
                    colSpan: 3,
                    dataField: "international_Application_Deadline",
                    editorType: "dxDateBox",
                    validationRules: [{
                        type: "required",
                        message: "International application deadline is required"
                    }],
                    label: {
                        text: "International deadline"
                    },
                    editorOptions: {
                        displayFormat: "dd-MM-yyyy",
                        value: new Date(),
                        width: "100%"
                    }
                },
                {
                    colSpan: 3,
                    dataField: "general_application_deadline",
                    editorType: "dxDateBox",
                    validationRules: [{
                        type: "required",
                        message: "General application deadline is required"
                    }],
                    label: {
                        text: "General deadline"
                    },
                    editorOptions: {
                        displayFormat: "dd-MM-yyyy",
                        value: new Date(),
                        width: "100%"
                    }
                }
                ]
            },
            {
                itemType: "group",
                colCount: 15,
                items: [{
                    colSpan: 3,
                    dataField: "duration",
                    label: {
                        text: "Duration"
                    },
                    validationRules: [{
                        type: "required",
                        message: "Duration is required"
                    }],
                    editorType: "dxNumberBox"
                }, {
                    colSpan: 3,
                    dataField: "duration_period_code",
                    editorType: "dxSelectBox",
                    validationRules: [{
                        type: "required",
                        message: "Duration period is required"
                    }],
                    label: {
                        text: "Duration period"
                    },
                    editorOptions: {
                        dataSource: new DevExpress.data.AspNet.createStore({
                            key: "code",
                            loadMode: "raw",
                            loadUrl: `/api/get?url=${Model.DurationPeriodsUrl}/getdevextremeList&check=1&origin=1`
                        }),
                        elementAttr: {
                            id: "duration_period_code",
                        },
                        deferRendering: false,
                        displayExpr: Model.SelectBoxNameDisplayExp,
                        valueExpr: "code",
                        searchEnabled: true
                    }
                }, {
                    colSpan: 3,
                    dataField: "payment_amount",
                    editorType: "dxNumberBox",
                    validationRules: [{
                        type: "required",
                        message: "Amount is required"
                    }],
                    label: {
                        text: "Amount"
                    }
                }, {
                    colSpan: 3,
                    dataField: "payment_period_code",
                    editorType: "dxSelectBox",
                    validationRules: [{
                        type: "required",
                        message: "Payment period is required"
                    }],
                    label: {
                        text: "Payment period"
                    },
                    editorOptions: {
                        dataSource: new DevExpress.data.AspNet.createStore({
                            key: "code",
                            loadMode: "raw",
                            loadUrl: `/api/get?url=${Model.PaymentPeriodsUrl}/getdevextremeList&check=1&origin=1`
                        }),
                        elementAttr: {
                            id: "payment_period_code",
                        },
                        deferRendering: false,
                        displayExpr: Model.SelectBoxNameDisplayExp,
                        valueExpr: "code",
                        searchEnabled: true
                }
                }, {
                    colSpan: 3,
                    dataField: "credit",
                    editorType: "dxNumberBox",
                    validationRules: [{
                        type: "required",
                        message: "Credit is required"
                    }],
                    label: {
                        text: "Credit"
                    }
                }]
            },
            {
                itemType: "group",
                colCount: 1,
                items: [{
                    editorType: "dxTextArea",
                    dataField: "description_az",
                    validationRules: [{
                        type: "required",
                        message: "Description is required"
                    }],
                    label: {
                        text: "Description (Az)"
                    }
                },
                {
                    editorType: "dxTextArea",
                    validationRules: [{
                        type: "required",
                        message: "Description is required"
                    }],
                    dataField: "description_en",
                    label: {
                        text: "Description (En)"
                    }
                },
                {
                    editorType: "dxTextArea",
                    validationRules: [{
                        type: "required",
                        message: "Description is required"
                    }],
                    dataField: "description_ru",
                    label: {
                        text: "Description (Ru)"
                    }
                }
                ]
                },
                {
                    itemType: "group",
                    colCount: 1,
                    items: [{
                        editorType: "dxTextArea",
                        dataField: "note_az",
                        validationRules: [{
                            type: "required",
                            message: "Note is required"
                        }],
                        label: {
                            text: "Note (Az)"
                        }
                    },
                    {
                        editorType: "dxTextArea",
                        validationRules: [{
                            type: "required",
                            message: "Note is required"
                        }],
                        dataField: "note_en",
                        label: {
                            text: "Note (En)"
                        }
                    },
                    {
                        editorType: "dxTextArea",
                        validationRules: [{
                            type: "required",
                            message: "Note is required"
                        }],
                        dataField: "note_ru",
                        label: {
                            text: "Note (Ru)"
                        }
                    }
                    ]
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
                        name: "language_certificate",
                        items: [{
                            itemType: "group",
                            colCount: 12,
                            items: [{
                                colSpan: 3,
                                dataField: "ielts_score",
                                editorType: "dxNumberBox",
                                label: {
                                    text: "IELTS score"
                                },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                dataField: "toefl_score",
                                editorType: "dxNumberBox",
                                label: {
                                    text: "TOEFL score"
                                },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                dataField: "sat_score",
                                editorType: "dxNumberBox",
                                label: {
                                    text: "SAT score"
                                },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                dataField: "gre_score",
                                editorType: "dxNumberBox",
                                label: {
                                    text: "GRE score"
                                },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                dataField: "gmat_score",
                                editorType: "dxNumberBox",
                                label: {
                                    text: "GMAT score"
                                },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                dataField: "telc_score",
                                editorType: "dxNumberBox",
                                label: {
                                    text: "TELC score"
                                },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                dataField: "testdaf_score",
                                editorType: "dxNumberBox",
                                label: {
                                    text: "TESTDAF score"
                                },
                                cssClass: "language-certificate-editor",

                            }, {
                                colSpan: 3,
                                dataField: "dsh_score",
                                editorType: "dxNumberBox",
                                label: {
                                    text: "DSH score"
                                },
                                cssClass: "language-certificate-editor",

                            }]
                        }]
                    }]
                }]
            },
            {
                itemType: "button",
                horizontalAlignment: "left",
                buttonOptions: {
                    text: "Save",
                    type: "success",
                    useSubmitBehavior: true,
                }
            }
            ]
        }).dxForm("instance");

        $("#form").on("submit", function (e) {
            var programs = form.option("formData");

            if (programs["start_Date"] != undefined && programs["start_Date"] != null) {
                try {
                    data["start_Date"] = ChangeToRequiredDate(data["start_Date"]);
                } catch (e) {

                }
            }

            if (programs["end_Date"] != undefined && programs["end_Date"] != null) {
                try {
                    data["end_Date"] = ChangeToRequiredDate(data["end_Date"]);
                } catch (e) { }
            }

            if (programs["date"] != undefined && programs["date"] != null) {
                try {
                    data["date"] = ChangeToRequiredDate(data["date"]);
                } catch (e) { }
            }

            var url = `${Model.ProgramsUrl}/`;
            url += isCreate ? "create" : `update/${key}`;
            var method = isCreate ? "post" : "put";

            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=1`, "POST", true, JSON.stringify(programs))
                .then(() => {
                    window.location.href = `/forms/index/${Model.ProgramsUrl}`
                });


            e.preventDefault();
        })
    }
}

export let Form = FormCreater;