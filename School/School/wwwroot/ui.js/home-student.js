import Model from "./general.js"
$(function () {
    $("#title").html("Ana səhifə");
    $("#create-link").hide()
    $("#edit-link").hide()
    $("#detail-link").hide();

  
    Model.SendRequest(`/student/home/getcalendar`, "GET")
        .then((items) => {
            $("#body").dxScheduler({
                //timeZone: "America/Los_Angeles",
                dataSource: items,
                views: ["day", "week", "workWeek", "month"],
                currentView: "week",
                currentDate: new Date(),
                startDayHour: 9,
                height: 600
            });
        });

});