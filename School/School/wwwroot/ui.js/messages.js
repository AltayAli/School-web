import Model from "/ui.js/general.js";

$(document).ready(() => {
    function GetMessage(photo, name) {
        return `<div class="chatBox" id="chatBox">
                                    <div class="card">
                                        <header class="card-header header-title">
                                            <p class="card-header-title">
                                                <i class="fa fa-circle is-online"></i><img src="/users/${photo}" style="width: 30px;">&nbsp;${name}
                                            </p>
                                            <a class="card-header-icon mb-2 close-icon">
                                                <span id="close-icon">
                                                    <i class="fa fa-close"></i>
                                                </span>
                                            </a>
                                        </header>
                                         <div id="chatbox-area">
                                          <div class="card-content chat-content">
                                            <div class="content">
                                            </div>
                                          </div>
                                          </div>
                                                <footer class="card-footer" id="chatBox-textbox">
                                                    <div style="width: 63%">
                                                        <textarea id="chatTextarea" class="chat-textarea" placeholder="Mesaj"></textarea>
                                                    </div>
                                                    <div class="has-text-centered" style="width: 37%">
                                                        <a class="button is-white" id="send-message">send</a>
                                                    </div>
                                                </footer>
                                            </div>
                                    </div>
                                    </div>
                                </div>
`;
    }

    $(".m").click(function () {
        $("#chatBox").remove();
        $("#chatApp").append(`${GetMessage($(this).data().photo, $(this).data().name)}`);

        $("#close-icon").click(function(){
            $(this).parents("#chatBox").remove();
        });

        $("#send-message").click(() => {

            var data = {
                Content: $("#chatTextarea").val(),
                To  : $(".media").data().id
            };

            Model.SendRequest(`/messages/send`, "post", true, JSON.stringify(data))
                .then((result) => {
                    $("#chatBox #chatbox-area .content").append(`
                                    <div class="chat-message-group writer-user">
                                        <div class="chat-messages">
                                            <div class="message">${data.Content}</div>
                                            <div class="from">${result.date}</div>
                                        </div>
                                    </div>
                            `);
                    $("#chatTextarea").val("");
                })
        });
        Model.SendRequest(`/messages/getusermessages/${$(this).data().id}`, "get")
            .then((items) => {
                for (var i in items) {
                    for (var j = 0; j < items[i].length; j++) {
                        if (items[i][j].writerId == $(this).data().i) {
                            $("#chatBox #chatbox-area .content").append(`
                                    <div class="chat-message-group writer-user">
                                        <div class="chat-messages">
                                            <div class="message">${items[i][j]["content"]}</div>
                                            <div class="from">${items[i][j]["date"]}</div>
                                        </div>
                                    </div>
                            `);
                        } else {
                            $("#chatBox #chatbox-area .content").append(`
                                <div class="chat-message-group">
                                            <div class="chat-thumb">
                                                <figure class="image is-32x32">
                                                    <img src="/users/${$(this).data().photo}">
                                                </figure>
                                            </div>
                                            <div class="chat-messages">
                                                <div class="message">${items[i][j]['content']}</div>
                                                <div class="from">${items[i][j]['date']}</div>
                                            </div>
                                        </div>
                            `)
                        }
                    }
                }
            });
    })

    $("#show-users-list").click(function () {
        Model.SendRequest(`/messages/getuserslist`, "get")
            .then((result) => {
                $(".usersChatList").remove();
                $("#chatApp").append(`
                  <div class="usersChatList">
                      <div class="card">
                        <a>
                        <header class="card-header header-title">
                            <p class="card-header-title">
                            <span class="tag is-primary">${result.length}</span>&nbsp;İstifadəçilər
                            </p>
                            <a class="card-header-icon mb-2 close-icon">
                                <span id="close">
                                    <i class="fa fa-close"></i>
                                </span>
                            </a>
                        </header>
                        </a>
                        <div id="userListBox" class="card-content thumb-user-list">
                        </div>
                      </div>
                    </div>
                `);
                $("#close").click(function () {
                    $(this).parents(".usersChatList").remove();
                });
                for (var i in result) {
                    $(".usersChatList .card #userListBox").append(`
                                    <article class="media" data-id="${result[i].id}" data-photo="${result[i].photo}" data-name="${result[i].fullName}">
                                      <figure class="media-left">
                                        <p class="image is-32x32">
                                          <img src="/users/${result[i].photo}">
                                        </p>
                                      </figure>
                                      <div class="media-content">
                                        <div class="content">
                                          <p>
                                            <strong>${result[i].fullName}</strong>
                                            <br>
                                          </p>
                                        </div>
                                      </div>
                                    </article>
                            `);
                }

                $(".media").click(function () {
                    $("#chatBox").remove();
                    $("#chatApp").append(`${GetMessage($(this).data().photo, $(this).data().name)}`);

                    $("#close-icon").click(function () {
                        $("#chatBox").remove();
                    });

                    $("#send-message").click(() => {

                        var data = {
                            Content: $("#chatTextarea").val(),
                            To: $(this).data().id
                        };

                        Model.SendRequest(`/messages/send`, "post", true, JSON.stringify(data))
                            .then((result) => {
                                $("#chatBox #chatbox-area .content").append(`
                                    <div class="chat-message-group writer-user">
                                        <div class="chat-messages">
                                            <div class="message">${data.Content}</div>
                                            <div class="from">${result.date}</div>
                                        </div>
                                    </div>
                            `);
                                $("#chatTextarea").val("");
                            })
                    });
                    Model.SendRequest(`/messages/getusermessages/${$(this).data().id}`, "get")
                        .then((items) => {
                            for (var i in items) {
                                for (var j = 0; j < items[i].length; j++) {
                                    if (items[i][j].writerId == $("#m").data().i) {
                                        $("#chatBox #chatbox-area .content").append(`
                                    <div class="chat-message-group writer-user">
                                        <div class="chat-messages">
                                            <div class="message">${items[i][j]["content"]}</div>
                                            <div class="from">${items[i][j]["date"]}</div>
                                        </div>
                                    </div>
                            `);
                                    } else {
                                        $("#chatBox #chatbox-area .content").append(`
                                            <div class="chat-message-group">
                                                        <div class="chat-thumb">
                                                            <figure class="image is-32x32">
                                                                <img src="/users/${$(this).data().photo}">
                                                            </figure>
                                                        </div>
                                                        <div class="chat-messages">
                                                            <div class="message">${items[i][j]['content']}</div>
                                                            <div class="from">${items[i][j]['date']}</div>
                                                        </div>
                                                    </div>
                                        `)
                                    }
                                }
                            }
                        });
                })
            })
    })
})