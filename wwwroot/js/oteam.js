var loginSection = document.getElementById("login-section");
var profileSection = document.getElementById("profile-section");
var logOutButton = document.getElementById("log-out-button")
var navItems = document.getElementById("nav-list-item");
var addClientSection = document.getElementById("add-client-section");
var interventionSection = document.getElementById("interventions-section");
var homeNavLink = document.getElementById("home-nav-link")
var resourcesNavLink = document.getElementById("resources-nav-link")
var dynamicClientRows = document.getElementById("dynamic-client-rows");
//var updateClientSection = document.getElementById("update-client-section");
var submitClientButton = document.getElementById("submit-button-section");
var updateClientButton = document.getElementById("update-button-section");
var submitClientTitle = document.getElementById("submit-client-title");
var updateClientTitle = document.getElementById("update-client-title");


function LogOut() {
    profileSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
    logOutButton.classList.add("hidden");
    navItems.classList.add("hidden");
    homeNavLink.classList.remove("active");
    interventionSection.classList.add("hidden");
    //updateClientSection.classList.add("hidden");
    addClientSection.classList.add("hidden");
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
    submitClientButton.classList.remove("hidden");
    submitClientTitle.classList.remove("hidden");
}

function ShowUpdateClientSection(event) {
    addClientSection.classList.remove("hidden");
    document.getElementById("client-id").value = event.target.dataset.clientId;
    document.getElementById("client-first-name").value = event.target.dataset.firstName;
    document.getElementById("client-last-name").value = event.target.dataset.lastName;
    document.getElementById("date").value = event.target.dataset.dateOfBirth;
    //updateClientSection.classList.remove("hidden");
    profileSection.classList.add("hidden");
    updateClientButton.classList.remove("hidden");
    updateClientTitle.classList.remove("hidden");
}

function SubmitAdd() {
    addClientSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    submitClientButton.classList.add("hidden");
    submitClientTitle.classList.add("hidden");
    insertClient();
}

function SubmitUpdate() {
    //updateClientSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    updateClientButton.classList.add("hidden");
    updateClientTitle.classList.add("hidden");
    addClientSection.classList.add("hidden");
    updateClient();
}

function ShowInterventions() {
    profileSection.classList.add("hidden");
    interventionSection.classList.remove("hidden");
    homeNavLink.classList.remove("active");
    resourcesNavLink.classList.add("active");
    addClientSection.classList.add("hidden");
    //updateClientSection.classList.add("hidden");
}

function ShowHome() {
    resourcesNavLink.classList.remove("active");
    homeNavLink.classList.add("active");
    interventionSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    addClientSection.classList.add("hidden");
    //updateClientSection.classList.add("hidden");
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
        clientRows += '<td class="hidden">' + client.clientId + '</td>';
        clientRows += '<td>' + client.firstName + '</td>';
        clientRows += '<td>' + client.lastName + '</td>';
        clientRows += '<td>' + client.dateOfBirth + '</td>'
        clientRows += '<td>' + '<button data-client-id="' + client.clientId + '" data-first-name="' + client.firstName + '" data-last-name="' + client.lastName + '" data-date-of-birth="' + client.dateOfBirth + '" type="button" class="btn-client-update btn btn-outline-success btn-sm">Update</button>' + '</td>';
        clientRows += '<td>' + '<button data-client-id="' + client.clientId + '" type="button" class="btn-client-delete btn btn-outline-danger btn-sm">Delete</button>' + '</td>';
        clientRows += '</tr>';
    }

    dynamicClientRows.innerHTML = clientRows;

    var clientDeleteButtons = document.getElementsByClassName("btn-client-delete");

    for (var i = 0; i < clientDeleteButtons.length; i++) {
        var button = clientDeleteButtons[i];
        button.addEventListener("click", deleteClient);
    }

    var clientUpdateButtons = document.getElementsByClassName("btn-client-update");

    for (var i = 0; i < clientUpdateButtons.length; i++) {
        var button = clientUpdateButtons[i];
        button.addEventListener("click", ShowUpdateClientSection);
    }
}

function insertClient() {
    var inputFirstName = document.getElementById("client-first-name");
    var inputLastName = document.getElementById("client-last-name");
    var inputDateOfBirth = document.getElementById("date");

    var firstName = inputFirstName.value;
    var lastName = inputLastName.value;
    var dateOfBirth = inputDateOfBirth.value;

    var baseURL = "https://localhost:5001/InsertClient";
    var queryString = "?firstName=" + firstName + "&lastName=" + lastName + "&dateOfBirth=" + dateOfBirth;

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

function updateClient() {
    var inputClientId = document.getElementById("client-id");
    var inputClientFirstName = document.getElementById("client-first-name");
    var inputClientLastName = document.getElementById("client-last-name");
    var inputDateOfBirth = document.getElementById("date");

    var clientId = inputClientId.value;
    var clientFirstName = inputClientFirstName.value;
    var clientLastName = inputClientLastName.value;
    var clientDateOfBirth = inputDateOfBirth.value;

    var baseURL = "https://localhost:5001/UpdateClient";
    var queryString = "?clientId=" + clientId + "&firstName=" + clientFirstName + "&lastName=" + clientLastName + "&dateOfBirth=" + clientDateOfBirth;

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
                    inputClientId.value = "";
                    inputClientFirstName.value = "";
                    inputClientLastName.value = "";
                    inputDateOfBirth.value = "";
                    //document.getElementById("form-employee-update").classList.add("my-hidden");
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }
}

function deleteClient(event) {
    var clientId = event.target.dataset.clientId;

    var baseURL = "https://localhost:5001/DeleteClient";
    
    var queryString = "?clientId=" + clientId;

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
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }
}