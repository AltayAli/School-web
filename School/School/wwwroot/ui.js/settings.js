import Model from "./general.js"
let FormCreater = {
    CreateForm: function (model) {
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
                                        document.getElementById("form-avatar").style.backgroundImage = `url(../../../users/${JSON.parse(e.request.response).fileName})`;
                                        

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
                        colCount: 2,
                        items: [{
                            dataField: "name",
                            label: { text: "Ad" },
                            validationRules: [{
                                type: "required",
                                message: "Ad daxil edilməlidir!"
                            }],
                        }, {
                            dataField: "surname",
                            label: { text: "Soyad" },
                            validationRules: [{
                                type: "required",
                                message: "Soyad daxil edilməlidir!"
                            }],
                            }, {
                                dataField: "password",
                                label: { text: "Parol" },
                                editorOptions: {
                                    mode: "password"
                                },
                                validationRules: [{
                                    type: "required",
                                    message: "Parol daxil edilməlidir!"
                                }]
                            }, {
                                label: {
                                    text: "Parolun təkrarı"
                                },
                                editorType: "dxTextBox",
                                editorOptions: {
                                    mode: "password"
                                },
                                validationRules: [{
                                    type: "required",
                                    message: "Parol-u təkrarlayın!"
                                }, {
                                    type: "compare",
                                    message: "Parol ilə eyni deyil!",
                                        comparisonTarget: function () {
                                            return form.option("formData").password;
                                    }
                                }]
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

        key = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        document.getElementById("form-avatar").style.backgroundImage = `url(../../../users/${model["photourl"]})`;
        

        $("#form").on("submit", function (e) {
            var data = form.option("formData");
            delete data.newLogo;
            Model.SendRequest(`/account/settings`, "post", true, JSON.stringify(data))
                .then(() => {
                    window.location.href = "/admin/home"
                });

            e.preventDefault();
        })
    }

}
export let Form = FormCreater;