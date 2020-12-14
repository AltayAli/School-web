import Model from "./general.js"
$(function () {
    $("#title").html("Home page");
    $("#create-link").hide() 
    $("#edit-link").hide()
    $("#detail-link").hide();

    var icons = {
        "programs_count": "icon-list-unordered",
        "universities_count": "icon-library2",
        "scholarships_count": "icon-coin-dollar",
        "faculties_count": "icon-bookmark",
        "apps_count": "icon-address-book",
        "user_count":"icon-users"
    }
    var colors = {
        "programs_count": "primary",
        "universities_count": "secondary",
        "scholarships_count": "success",
        "faculties_count": "danger",
        "apps_count": "warning",
        "user_count": "indigo-400"
    }

    $("#body").append(`
                        <div class="row" id = "body-content">
                        </div>
                `)

    Model.SendRequest(`/api/get?url=${Model.SummariesUrl}/getdevextremeList&check=1&origin=1`, "GET")
        .then((items) => {
            for (var item in items[0]) {
                $("#body-content").append(`
                    <div class="col-12 col-sm-6 col-xl-4">
						<div class="card card-body bg-${colors[item]} has-bg-image">
							<div class="media">
								<div class="mr-3 align-self-center">
									<i class="${icons[item]} icon-2x opacity-75"></i>
								</div>

								<div class="media-body text-right">
									<h3 class="mb-0">${items[0][item]}</h3>
									<span class="text-uppercase font-size-xs">${capitalizeFirstLetter(item.substring(0, item.indexOf('_')))}</span>
								</div>
							</div>
						</div>
					</div>
                `)
            }

            Model.SendRequest(`/api/get?url=${Model.AdminUsersUrl}/GetUsersCount&check=1&origin=2`, "GET")
                .then((items) => {
                    $("#body-content").append(`
                    <div class="col-12 col-sm-6 col-xl-4">
						<div class="card card-body bg-${colors["user_count"]} has-bg-image">
							<div class="media">
								<div class="mr-3 align-self-center">
									<i class="${icons["user_count"]} icon-2x opacity-75"></i>
								</div>

								<div class="media-body text-right">
									<h3 class="mb-0">${items[0]["count"]}</h3>
									<span class="text-uppercase font-size-xs">Users</span>
								</div>
							</div>
						</div>
					</div>
                `)

                });
        });

    

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

let FormCreater = {
    CreateForm: function (model, isCreate) {},
};
export let Form = FormCreater;
