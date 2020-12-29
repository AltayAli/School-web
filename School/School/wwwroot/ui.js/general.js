let Model = {
    SendRequest: function (url, method, showStatus,obj) {
        var d = $.Deferred();
        console.log(obj)
        method = method || "GET";
        $.ajax(url, {
            method: method || "GET",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false
        }).done(function (result) {
            d.resolve(method === "GET"  ? result.data : result);
            if (showStatus)
                DevExpress.ui.notify({ message: "Əməliyyat uğurludur!" }, "success", 2000);

        }).fail(function (xhr) {

            if (showStatus) {
                var errorMessage = "";
                try {
                    d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
                    var error = xhr?.responseText;
                    errorMessage = error != undefined ? error : 'Something get wrong! Please try again!';
                } catch (e) {
                    errorMessage = 'Something get wrong! Please try again!';
                }
                finally {
                    DevExpress.ui.notify({ message: `${errorMessage}` }, "error", 2000);
                }
            }
        });

        return d.promise();
    }
}

export default Model;