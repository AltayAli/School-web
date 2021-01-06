import Model from "./general.js"
$(function () {
    $("#title").html("Home page");
    $("#create-link").hide()
    $("#edit-link").hide()
    $("#detail-link").hide();

  
    Model.SendRequest(`/student/home/getcalendar`, "GET")
        .then((items) => {
            console.log(items)
            $("#body").dxScheduler({
                //timeZone: "America/Los_Angeles",
                dataSource: items,
                views: ["day", "week", "workWeek", "month"],
                currentView: "day",
                currentDate: new Date(),
                startDayHour: 9,
                height: 600
            });
        });



    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});