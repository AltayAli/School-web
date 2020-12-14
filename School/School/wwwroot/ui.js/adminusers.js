import Model from "./general.js"

$(function () {
    $("#title").html("List of admins")
    $("#detail-link").hide();

    $("#body").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "user_guid",
            load: function () {
                var url = `${Model.AdminUsersUrl}/getadminsdevextremelist`;
                return Model.SendRequest(`/api/get?url=${url}&check=1&origin=2`, "GET", false);
            },
            remove: function (key) {
                var url = `${Model.AdminUsersUrl}/delete/${key}`;
                return Model.SendRequest(`/api/delete?url=${url}&check=1&origin=2`, "GET", true);
            },
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
            dataField: "user_guid",
            caption: "User guid",
        }, {
            dataField: "email",
            caption: "Email",
        }, {
            dataField: "surname",
            caption: "Surname",
        }, {
            dataField: "name",
            caption: "Name",
        }],

        scrolling: {
            mode: "standart"
        },
        showBorders: true,
    });

    function selection_changed(data) {
        if (data) {
            $("#edit-link").attr("href", `/forms/form/${Model.AdminUsersUrl}?isCreate=0&id=${data.user_guid}&origin=2`);
        }
    }

    $("#create-link").attr("href", `/forms/form/${Model.RegisterUserUrl}?isCreate=1`);
});

let FormCreater = {
    CreateForm: function (model, isCreate) {
        var key = model != null ? model["id"] : "";
        var form = $("#form").dxForm({
            formData: model,
            labelLocation: "top",
            showColonAfterLabel: true,
            showValidationSummary: true,
            validationGroup: "customerData",
            items: [
                {
                    itemType: "group",
                    colCount: 3,
                    items: [{
                        dataField: "id",
                        visible: false,
                    }, {
                        dataField: "email",
                        caption: "Email",
                        validationRules: [{
                            type: "required",
                            message: "Email is required"
                        }, {
                            type: "email",
                            message: "Email is invalid"
                        },]
                    }, {
                        dataField: "name",
                        caption: "Name",
                        validationRules: [{
                            type: "required",
                            message: "Name is required"
                        }]
                    }, {
                        dataField: "surname",
                        caption: "Surname",
                        validationRules: [{
                            type: "required",
                            message: "Surname is required"
                        }]
                    }]
                },
                {
                    itemType: "group",
                    colCount: 2,
                    items: [{
                        dataField: "birth_date",
                        caption: "Birth Date",
                        editorType: "dxDateBox",
                        validationRules: [{
                            type: "required",
                            message: "Birth Date is required"
                        }],
                        editorOptions: {
                            displayFormat: "dd-MM-yyyy",
                            value: new Date(),
                            width: "100%"
                        }
                    }, {
                        dataField: "nationality_code",
                        editorType: "dxSelectBox",
                        label: { text: "Nationality code" },
                        editorOptions: {
                            dataSource: DevExpress.data.AspNet.createStore({
                                key: "code",
                                loadMode: "raw",
                                loadUrl: `/api/get?url=Defaults/GetNationalitiesList&check=1&origin=2`
                            }),
                            elementAttr: {
                                id: "type_code",
                            },
                            displayExpr: "name",
                            valueExpr: "code",
                            searchEnabled: true
                        },
                        validationRules: [{
                            type: "required",
                            message: "Nationality code is required"
                        }]

                    }]
                },
                {
                    itemType: "group",
                    colCount: isCreate == 0 ? 3 : 2,
                    items: [
                        {
                            dataField: "mobile",
                        },
                        {
                            dataField: "password",
                            label: { text: isCreate == 0 ? "Old password" : "Password" },
                            editorOptions: {
                                mode: "password"
                            },
                            validationRules: [{
                                type: "required",
                                message: isCreate == 0 ? "Old password is required" : "Password is required"
                            },
                            {
                                type: "pattern",
                                pattern: "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})",
                                message: `Minimum one uppercase letter (A-Z), one lowercase letter (a-z) and one number (0-9) or special character (!@#$%^&*) should be used.
                                        Password of user. Must contain at least three of one uppercase, one lowcase, one number and one special symbol`
                            }
                            ]
                        },
                        {
                            dataField: "new_password",
                            visible: isCreate == 0,
                            editorOptions: {
                                mode: "password"
                            },
                            validationRules: [{
                                type: "required",
                                message: "New password is required"
                            }, {
                                type: "pattern",
                                pattern: "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})",
                                message: `Minimum one uppercase letter (A-Z), one lowercase letter (a-z) and one number (0-9) or special character (!@#$%^&*) should be used.
                                        Password of user. Must contain at least three of one uppercase, one lowcase, one number and one special symbol`
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
                                useSubmitBehavior: true,
                            }
                        }]
                }
            ]
        }).dxForm("instance");
        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        $("#form").on("submit", function (e) {
            var model = form.option("formData");
            model.platform = uuidv4();
            let method = isCreate ? "post" : "put";
            let url = isCreate ? `${Model.RegisterUserUrl}/registeradminuser` : `${Model.AdminUsersUrl}/edit/${key}`;
            Model.SendRequest(`/api/${method}?url=${url}&check=1&origin=2`, "POST", true, JSON.stringify(model))
                .then(() => {
                    window.location.href = `/forms/index/${Model.RegisterUserUrl}`
                });
            e.preventDefault();
        })
    }

}
export let Form = FormCreater;