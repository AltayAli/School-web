import Model from "./general.js"
$(function () {
    $("#title").html("Ana səhifə");
    $("#create-link").hide()
    $("#edit-link").hide()
    $("#detail-link").hide();

    var colors = ["primary", "secondary","success", "danger", "warning", "indigo-400"]

    $("#body").append(`
                        <div class="row" id = "body-content">
                        </div>
                `)
   //a href="javascript:void(0)" id="${items["id"]}"
    Model.SendRequest(`/teacher/home/getgroups`, "GET")
        .then((items) => {
            for (var item of items) {
                $("#body-content").append(`
                        <div class="lessons col-12 col-sm-6 col-md-4 col-lg-3" id="${item["id"]}" data-id="${item["id"]}" data-url="/teacher/lessons/index">
						    <div class="card card-body bg-${colors[Math.floor(Math.random() * colors.length)]} has-bg-image">
							    <div class="media">
								    <div class="mr-3 align-self-center">
									    <i class="icon-users icon-2x opacity-75"></i>
								    </div>

								    <div class="media-body text-right">
									    <h3 class="mb-0">${item["name"]}</h3>
									    <span class="text-uppercase font-size-xs">Student count : ${item["studentCount"]}</span>
								    </div>
							    </div>
						    </div>
					    </div>
                `)
                var i = item["id"]

                $(`#${i}`).on("click", function (e) {
                    sessionStorage.setItem("l", this.id)
                   window.location.href = $(`#${i}`).data("url");
                });
            }
        });

    //capitalizeFirstLetter(item.substring(0, item.indexOf('_')))

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

let FormCreater = {
    CreateForm: function (model, isCreate) { },
};
export let Form = FormCreater;
