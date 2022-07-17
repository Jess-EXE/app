// TODO: Add cancel button to update form , Ask Morgan to send Down Syndrome PDF and ADD it to conditions , debug all hide/show page functions
// Update forms and tables with correct db info + fix API , Add HIPPA warning with login , Add conditions page link and link animations
// Potentially Therapist and client specific navbar
// Note to self: some conditionspage functions are complete, keep an eye out for more

// Client Specific
var addClientSection = document.getElementById("add-client-section");
var clientHomeNavLink = document.getElementById("client-home-nav-link");
var dynamicClientRows = document.getElementById("dynamic-client-rows");
var submitClientButton = document.getElementById("submit-button-section");
var updateClientButton = document.getElementById("update-button-section");
var submitClientTitle = document.getElementById("submit-client-title");
var updateClientTitle = document.getElementById("update-client-title");
var clientPortfolioSection = document.getElementById("client-profile-section");
var clientLoginHome = document.getElementById("client-login-home");
//client profile section
var clientProfileFirstName = document.getElementById("client-profile-first-name");
var clientProfileLastName = document.getElementById("client-profile-last-name");
var clientProfileDateOfBirth = document.getElementById("client-profile-date-of-birth");

// Therapist Specific
var profileSection = document.getElementById("profile-section");
var therapistHomeNavLink = document.getElementById("therapist-home-nav-link");
var therapistLoginHome = document.getElementById("therapist-login-home");

// General
var loginSection = document.getElementById("login-section");
var logOutButton = document.getElementById("log-out-button")
var navItems = document.getElementById("nav-list-item");
var interventionSection = document.getElementById("interventions-section");
var resourcesNavLink = document.getElementById("resources-nav-link");
var failedLogIn = document.getElementById("failed-login");
var conditionsSection = document.getElementById("conditions-section");


function LogOut() {
    if (!profileSection.classList.contains("hidden")) {
        profileSection.classList.add("hidden");
    }
    if (!clientPortfolioSection.classList.contains("hidden")) {
        clientPortfolioSection.classList.add("hidden");
    }
    loginSection.classList.remove("hidden");
    logOutButton.classList.add("hidden");
    navItems.classList.add("hidden");
    if (therapistHomeNavLink.classList.contains("active"))
    {
        therapistHomeNavLink.classList.remove("active");
    }
    else if (clientHomeNavLink.classList.contains("active"))
    {
        clientHomeNavLink.classList.remove("active");
    }
    interventionSection.classList.add("hidden");
    addClientSection.classList.add("hidden");
    interventionSection.classList.add("hidden");
    conditionsSection.classList.add("hidden");
}


function ClientLogIn() {
    // Modify this to show profiles of clients that they can click on to view messages
}

// function ShowClientPortfolio() {
//     clientPortfolioSection.classList.remove("hidden")
//     clientLoginHome.classList.remove("hidden");
//     clientHomeNavLink.classList.add("active");
// }

function showConditionsSection() {
    if (therapistHomeNavLink.classList.contains("active"))
    {
        therapistHomeNavLink.classList.remove("active");
    }
    else if (clientHomeNavLink.classList.contains("active"))
    {
        clientHomeNavLink.classList.remove("active");
    }

    if (!profileSection.classList.contains("hidden")) {
        profileSection.classList.add("hidden");
    }
    if (!clientPortfolioSection.classList.contains("hidden")) {
        clientPortfolioSection.classList.add("hidden");
    }
    conditionsSection.classList.remove("hidden");
    resourcesNavLink.classList.add("active");
    interventionSection.classList.add("hidden");
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
    if (therapistHomeNavLink.classList.contains("active"))
    {
        therapistHomeNavLink.classList.remove("active");
    }
    else if (clientHomeNavLink.classList.contains("active"))
    {
        clientHomeNavLink.classList.remove("active");
    }

    if (!profileSection.classList.contains("hidden")) {
        profileSection.classList.add("hidden");
    }
    if (!clientPortfolioSection.classList.contains("hidden")) {
        clientPortfolioSection.classList.add("hidden");
    }
    resourcesNavLink.classList.add("active");
    addClientSection.classList.add("hidden");
    //updateClientSection.classList.add("hidden");
    conditionsSection.classList.add("hidden");
}

function ShowTherapistHome() {
    resourcesNavLink.classList.remove("active");
    therapistHomeNavLink.classList.add("active");
    therapistLoginHome.classList.remove("hidden");
    interventionSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    addClientSection.classList.add("hidden");
    //updateClientSection.classList.add("hidden");
    conditionsSection.classList.add("hidden");
}

function ShowClientHome() {
    resourcesNavLink.classList.remove("active");
    clientLoginHome.classList.remove("hidden");
    clientHomeNavLink.classList.add("active");
    interventionSection.classList.add("hidden");
    profileSection.classList.add("hidden");
    clientPortfolioSection.classList.remove("hidden");
    addClientSection.classList.add("hidden");
    //updateClientSection.classList.add("hidden");
    conditionsSection.classList.add("hidden");
}

function logInAsTherapist() {
    loginSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    logOutButton.classList.remove("hidden");
    navItems.classList.remove("hidden");
    therapistLoginHome.classList.remove("hidden");
    therapistHomeNavLink.classList.add("active");
    if (!failedLogIn.classList.contains("hidden")) {
        failedLogIn.classList.add("hidden");
    }
    selectClients();
}

function logInAsParent() {
    clientPortfolioSection.classList.remove("hidden")
    loginSection.classList.add("hidden");
    navItems.classList.remove("hidden");
    logOutButton.classList.remove("hidden");
    clientLoginHome.classList.remove("hidden");
    clientHomeNavLink.classList.add("active");
    if (!failedLogIn.classList.contains("hidden")) {
        failedLogIn.classList.add("hidden");
    }
}

function logInFailed() {
    if (failedLogIn.classList.contains("hidden")) {
        failedLogIn.classList.remove("hidden");
    }
}
function logIn() {
    var inputUsername = document.getElementById("typeEmailX-2");
    var inputPassword = document.getElementById("typePasswordX-2")

    var username = inputUsername.value;
    var password = inputPassword.value;

    var baseURL = "https://localhost:5001/AttemptLogIn";
    var queryString = "?username=" + username + "&password=" + password;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = doAfterLogIn;

    xhr.open("GET", baseURL + queryString, true);
    xhr.send();

    function doAfterLogIn() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok

                // alert(xhr.responseText);

                var logIn = JSON.parse(xhr.responseText);

                if (logIn.result === "Therapist") {
                    inputUsername.value = "";
                    inputPassword.value = "";
                    logInAsTherapist();
                } else if (logIn.result === "Parent") {
                    inputUsername.value = "";
                    inputPassword.value = "";
                    logInAsParent();
                } else {
                    logInFailed();
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
             }
        }
    }
}

function loadClientProfile(event) {
    var clientId = document.getElementById("client-id").value = event.target.dataset.clientId;

    var baseURL = "https://localhost:5001/LoadClientProfile";
    var queryString = "?clientId=" + clientId;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = doAfterLoadClientProfile;

    xhr.open("GET", baseURL + queryString, true);
    xhr.send();

    function doAfterLoadClientProfile() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok

                var client = JSON.parse(xhr.responseText);
                ShowClientHome();
                clientProfileFirstName.innerHTML = client.firstName;
                clientProfileLastName.innerHTML = client.lastName;
                clientProfileDateOfBirth.innerHTML = client.dateOfBirth;
                
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }
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
        clientRows += '<td>' + client.dateOfBirth + '</td>';
        clientRows += '<td>' + '<button data-client-id="' + client.clientId + '" type="button" class="btn-client-profile btn btn-outline-primary btn-sm">Profile</button>' + '</td>';
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

    var clientUpdateButtons = document.getElementsByClassName("btn-client-profile");

    for (var i = 0; i < clientUpdateButtons.length; i++) {
        var button = clientUpdateButtons[i];
        button.addEventListener("click", loadClientProfile);
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