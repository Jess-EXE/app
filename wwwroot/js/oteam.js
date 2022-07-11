var loginSection = document.getElementById("login-section");
var profileSection = document.getElementById("profile-section");
var logOutButton = document.getElementById("log-out-button")
var navItems = document.getElementById("nav-list-item");
var addClientSection = document.getElementById("add-client-section");
var interventionSection = document.getElementById("interventions-section");
var homeNavLink = document.getElementById("home-nav-link")
var resourcesNavLink = document.getElementById("resources-nav-link")
var dynamicClientRows = document.getElementById("dynamic-client-rows");

function LogOut() {
    profileSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
    logOutButton.classList.add("hidden");
    navItems.classList.add("hidden");
    homeNavLink.classList.remove("active");
    interventionSection.classList.add("hidden");
}

function LogIn() {
    loginSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    logOutButton.classList.remove("hidden");
    navItems.classList.remove("hidden");
    homeNavLink.classList.add("active");
    selectClients();
    
}

function ShowAddClientSection() {
    addClientSection.classList.remove("hidden");
    profileSection.classList.add("hidden");
}

function SubmitAdd() {
    addClientSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    insertClient();
}

function ShowInterventions() {
    profileSection.classList.add("hidden");
    interventionSection.classList.remove("hidden");
    homeNavLink.classList.remove("active");
    resourcesNavLink.classList.add("active");
    addClientSection.classList.add("hidden");
}

function ShowHome() {
    resourcesNavLink.classList.remove("active");
    homeNavLink.classList.add("active");
    interventionSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    addClientSection.classList.add("hidden");
}



function selectClients() {
    var baseURL = "https://localhost:5001/selectclients";
    var queryString = "";

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = doAfterGetClients;

    xhr.open("GET", baseURL + queryString, true);
    xhr.send();

    function doAfterGetClients() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok

                // alert(xhr.responseText);

                var response = JSON.parse(xhr.responseText);

                if (response.result === "success") {
                    refreshClientTable(response.clients);
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
             }
        }
    }
}

function refreshClientTable(clients) {

    var clientRows = '';

    for (var i = 0; i < clients.length; i++) {
        var client = clients[i];
        clientRows += '<tr>';
        //clientRows += '<td>' + client.clientId + '</td>';
        clientRows += '<td>' + client.firstName + '</td>';
        clientRows += '<td>' + client.lastName + '</td>';
        clientRows += '<td>' + client.dateOfBirth + '</td>'
        //clientRows += '<td>' + '<button data-client-id="' + client.clientId + '" type="button" class="btn-client-delete btn btn-outline-secondary btn-sm">Delete</button>' + '</td>'
        //clientRows += '<td>' + '<button data-client-id="' + client.clientId + '" type="button" class="btn-client-update btn btn-outline-success btn-sm">Update</button>' + '</td>'
        clientRows += '</tr>';
    }

    dynamicClientRows.innerHTML = clientRows;

    // var clientDeleteButtons = document.getElementsByClassName("btn-client-delete");

    // for (var i = 0; i < clientDeleteButtons.length; i++) {
    //     var button = clientDeleteButtons[i];
    //     button.addEventListener("click", deleteclient);
    // }

    // var clientDeleteButtons = document.getElementsByClassName("btn-client-update");

    // for (var i = 0; i < clientDeleteButtons.length; i++) {
    //     var button = clientDeleteButtons[i];
    //     button.addEventListener("click", showUpdateForm);
    // }
}

function insertClient() {
    var inputFirstName = document.getElementById("client-first-name");
    var inputLastName = document.getElementById("client-last-name");
    var inputDateOfBirth = document.getElementById("date-of-birth");

    var firstName = inputFirstName.value;
    var lastName = inputLastName.value;
    var dateOfBirth = inputDateOfBirth.value;
    //Convert.toDateTime(dateOfBirth);

    var baseURL = "https://localhost:5001/InsertClient";
    var queryString = "?firstName=" + firstName + "&lastName=" + lastName; + "&dateOfBirth=" + dateOfBirth;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = doAfterGetClients;

    xhr.open("GET", baseURL + queryString, true);
    xhr.send();

    function doAfterGetClients() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok

                var response = JSON.parse(xhr.responseText);

                if (response.result === "success") {
                    refreshClientTable(response.clients);
                    inputFirstName.value = "";
                    inputLastName.value = "";
                    inputDateOfBirth.value = "";
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }
}