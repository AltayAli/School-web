import Model from "./general.js"
$(function () {
    $("#title").html("Jurnal")
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
                    allowEditing: name != "Name" ,
                    validationRules: [{ type: "required" }],
                    visible: name != "Id",
                    fixed: name == "Name",
                    width: name == "Name" ? 200 : 100
                };
                if (name != "Id" && name != "Name") {
                    let months = {
                        "Jan":0,
                        "Feb":1,
                        "Mar":2,
                        "Apr":3,
                        "May":4,
                        "Jun":5,
                        "Jul":6,
                        "Aug":7,
                        "Sep":8,
                        "Oct":9,
                        "Nov":10,
                        "Dec":11,
                    }
                    let day = parseInt(name.substring(0, 2));
                    let year = parseInt(name.substring(5, 9));
                    let hour = parseInt(name.substring(9, 11));
                    let minute = parseInt(name.substring(11));
                    let month = months[name.substring(2, 5)];
                    var startDate = new Date( year, month, day, hour, minute);
                    var endDate = new Date( year, month, day, hour+5, minute);
                    var now = new Date();

                    obj["allowEditing"] = startDate.getTime() >= now.getTime() && startDate.getTime() <= endDate.getTime();
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
                        return Model.SendRequest("/admin/groupteachers/create", "POST", true, JSON.stringify(values));
                    },
                    update: function (key, values) {
                        var object = {};
                        for (var i in values) {
                            object["date"] = i.toString();
                            object["score"] = values[i];
                        }
                        for (var i in array) {
                            if (array[i]["Id"] == key) {

                                array[i][object["date"]] = object["score"];
                                break;
                            }
                        }
                        return Model.SendRequest("/teacher/journals/update/" + key, "PUT", true, JSON.stringify(object));
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