import Model from "./general.js"
$(function () {
    $("#title").html("Ana səhifə");
    $("#create-link").hide() 
    $("#edit-link").hide()
    $("#detail-link").hide();

    var icons = {
        "Adminlər": "icon-users",
        "Qruplar": "icon-make-group",
        "Müəllimlər": "icon-user-tie",
        "Tələbələr": "icon-users4",
    }
    var colors = {
        "Adminlər": "primary",
        "Qruplar": "secondary",
        "Müəllimlər": "success",
        "Tələbələr": "danger",
    }

    $("#body").append(`
                        <div class="row" id = "body-content">
                        </div>
                `)

    Model.SendRequest(`/admin/home/getsummary`, "GET")
        .then((items) => {
            for (var item in items) {
                $("#body-content").append(`
                    <div class="col-12 col-sm-6 col-xl-4">
						<div class="card card-body bg-${colors[items[item]["Key"]]} has-bg-image">
							<div class="media">
								<div class="mr-3 align-self-center">
									<i class="${icons[items[item]["Key"]]} icon-2x opacity-75"></i>
								</div>

								<div class="media-body text-right">
									<h3 class="mb-0">${items[item]["Key"]}</h3>
									<span style="font-size:20px">Sayı : ${items[item]["Value"]}</span>
								</div>
							</div>
						</div>
					</div>
                `)
            }
        });
});
