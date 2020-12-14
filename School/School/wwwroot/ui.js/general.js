//import { json } from "/d3"

let Model = {
    get CountryTypesUrl() { return `countrytypes` },
    get CitiesUrl() { return `cities` },
    get CountriesUrl() { return `countries` },
    get EducationDegreesUrl() { return `educationdegrees` },
    get EducationDegreeTypesUrl() { return `educationdegreetypes` },
    get EducationLanguagesUrl() { return `educationlanguages` },
    get EducationLocationsUrl() { return `educationlocations` },
    get EducationVariantsUrl() { return `educationvariants` },
    get FacultiesUrl() { return `faculties` },
    get ProgramsUrl() { return `programs` },
    get UniversitiesUrl() { return `universities` },
    get UniversityTypesUrl() { return `universitytypes` },
    get LanguageCertificatesUrl() { return `languagecertificates` },
    get ScholarShipsUrl() { return `scholarships` },
    get StaticPagesUrl() { return `staticpages` },
    get DurationPeriodsUrl() { return `durationperiods` },
    get PaymentPeriodsUrl() { return `paymentperiods` },
    get EmailsUrl() { return `emails` },
    get DocumentsUrl() { return `requireddocuments` },
    get ApplicantInfosUrl() { return `applicantinfos` },
    get ApplicationsUrl() { return `applications` },
    get RegisterUserUrl() { return `registration` },
    get AdminUsersUrl() { return `adminusers` },
    get SummariesUrl() { return `summaries` },
    get UsersUrl() { return `users` },
    get FilesUrl() { return "files" },


    get SelectBoxNameDisplayExp() { return "name_en" },
    get SelectBoxTitleDisplayExp() { return "title_en" },
    SendRequest: function (url, method, showStatus,obj) {
        var d = $.Deferred();

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
                DevExpress.ui.notify({ message: "Operation result : Success!" }, "success", 1000);

        }).fail(function (xhr) {

            d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
            var error = JSON.parse(xhr?.responseText).errors.error;
            if (showStatus) {
                var errorMessage = "";
                try {
                    errorMessage = error != undefined ? error : 'Something get wrong! Please try again!';
                } catch (e) {
                    errorMessage = 'Something get wrong! Please try again!';
                }
                finally {
                    DevExpress.ui.notify({ message: `Operation result : ${errorMessage}` }, "error", 1000);
                }
            }
        });

        return d.promise();
    }
}

export default Model;