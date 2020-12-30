import Model from "./general.js"
$(function () {
    $("#title").html("List of groups")
    $("#create-link").hide()
    $("#edit-link").hide()
    $("#detail-link").hide();

    Model.SendRequest(`/teacher/journals/getlist/${sessionStorage.getItem("l")}`, "GET")
        .then((items) => {
            var column = [];
            for (let i in items[0]["Value"]) {
                var name = items[0]["Value"][i];
                var obj = {
                    dataField: `${name}`,
                    caption: name == "Name" ? "Ad" : name,
                    allowEditing: name != "Name",
                    validationRules: [{ type: "required" }],
                    visible: name != "Id",
                    fixed: name == "Name",
                    width: name == "Name" ? 200 : 80
                };
                if (name!="Id"&&name!="Name") {
                    obj["lookup"] = {
                        dataSource: [
                            { 'ID': '1', "Name": "1" },
                            { 'ID': '2', "Name": "2" },
                            { 'ID': '3', "Name": "3" },
                            { 'ID': '4', "Name": "4" },
                            { 'ID': '5', "Name": "5" },
                            { 'ID': '6', "Name": "6" },
                            { 'ID': '7', "Name": "7" },
                            { 'ID': '8', "Name": "8" },
                            { 'ID': '9', "Name": "9" },
                            { 'ID': '10', "Name": "10" },
                            { 'ID': 'qb', "Name": "qb" },
                            { 'ID': 'de', "Name": "de" },
                        ],
                        displayExpr: "Name",
                        valueExpr: "ID"
                    }
                }
                column.push(obj);
            }
            var array = items[1]["Value"];
            $("#body").dxDataGrid({
                dataSource: new DevExpress.data.CustomStore({
                    key: "Id",
                    load: function () {
                        return array;
                    },
                    insert: function (values) {
                        console.log(values)
                        return Model.SendRequest("/admin/groupteachers/create", "POST", true, JSON.stringify(values));
                    },
                    update: function (key, values) {
                        console.log(key);
                        console.log(values);
                        return Model.SendRequest("/admin/groupteachers/update/" + key, "PUT", true, JSON.stringify(values));
                    },
                    remove: function (key) {
                        return Model.SendRequest("/admin/groupteachers/delete/" + key, "DELETE", true);
                    }
                }),
                editing: {
                    mode: "batch",
                    allowUpdating: true,
                },
                remoteOperations: false,
                columnHidingEnabled: false,
                allowColumnResizing: true,
                errorRowEnabled: false,
                showBorders: true,
                columns: column,
                paging: false,
                //onEditCanceled: function (e) {
                //    console.log(e)
                //},
                //onEditCanceling: function (e) {
                //    console.log(e)
                //}
            });
        });
    

});


let FormCreater = {
    CreateForm: function (model, isCreate) {

    }

}
export let Form = FormCreater;