// TODO: Add cancel button to update form , Ask Morgan to send Down Syndrome PDF and ADD it to conditions , debug all hide/show page functions
// Update forms and tables with correct db info + fix API , Add HIPPA warning with login , Add conditions page link and link animations
// Potentially Therapist and client specific navbar
// Note to self: some conditionspage functions are complete, keep an eye out for more

var therapistLoggedIn = false;
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
var currentPrimaryContactIdNumber;
// var currentPrimaryContactId;
//client profile dynamic update section
var clientProfileFirstName = document.getElementById("client-profile-first-name");
var clientProfileLastName = document.getElementById("client-profile-last-name");
var clientProfileDateOfBirth = document.getElementById("client-profile-date-of-birth");

// Therapist Specific
var profileSection = document.getElementById("profile-section");
var therapistHomeNavLink = document.getElementById("therapist-home-nav-link");
var therapistLoginHome = document.getElementById("therapist-login-home");
var currentLoggedInID;

// General
var loginSection = document.getElementById("login-section");
var logOutButton = document.getElementById("log-out-button")
var navItems = document.getElementById("nav-list-item");
var interventionSection = document.getElementById("interventions-section");
var resourcesNavLink = document.getElementById("resources-nav-link");
var failedLogIn = document.getElementById("failed-login");
var conditionsSection = document.getElementById("conditions-section");

var dynamicMessageRows = document.getElementById("dynamic-message-rows");

var clientIdForMessages;
var therapistIdForMessages;
var primaryContactIdForMessages;

var tableCount = 1;


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
    if (therapistHomeNavLink.classList.contains("active")) {
        therapistHomeNavLink.classList.remove("active");
    }
    else if (clientHomeNavLink.classList.contains("active")) {
        clientHomeNavLink.classList.remove("active");
    }
    interventionSection.classList.add("hidden");
    addClientSection.classList.add("hidden");
    interventionSection.classList.add("hidden");
    conditionsSection.classList.add("hidden");
    currentTherapistId = null;
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
    if (therapistHomeNavLink.classList.contains("active")) {
        therapistHomeNavLink.classList.remove("active");
    }
    else if (clientHomeNavLink.classList.contains("active")) {
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
    GetCurrentPrimaryContactIdNumber();
}

function ShowUpdateClientSection(event) {
    addClientSection.classList.remove("hidden");
    document.getElementById("client-id").value = event.target.dataset.clientId;
    document.getElementById("client-first-name").value = event.target.dataset.firstName;
    document.getElementById("client-last-name").value = event.target.dataset.lastName;
    document.getElementById("primary-contact-first-name").value = event.target.dataset.primaryContactFirstName;
    document.getElementById("primary-contact-last-name").value = event.target.dataset.primaryContactLastName;
    document.getElementById("client-date-of-birth").value = event.target.dataset.dateOfBirth;
    document.getElementById("address").value = event.target.dataset.address;
    document.getElementById("city").value = event.target.dataset.city;
    document.getElementById("zip").value = event.target.dataset.zipcode;
    document.getElementById("state").value = event.target.dataset.stateId;
    document.getElementById("phone").value = event.target.dataset.phone;
    document.getElementById("email").value = event.target.dataset.emailAddress;


    //updateClientSection.classList.remove("hidden");
    profileSection.classList.add("hidden");
    updateClientButton.classList.remove("hidden");
    updateClientTitle.classList.remove("hidden");
    clientPortfolioSection.classList.add("hidden");
}

function SubmitAdd() {
    addClientSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    submitClientButton.classList.add("hidden");
    submitClientTitle.classList.add("hidden");
    insertClient();
}

function SubmitUpdate() {
    //event.preventDefault();
    //updateClientSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    updateClientButton.classList.add("hidden");
    updateClientTitle.classList.add("hidden");
    addClientSection.classList.add("hidden");
    // Un comment below once you move update to client profile
    //clientPortfolioSection.classList.remove("hidden");
    updateClient();
}

function ShowInterventions() {
    profileSection.classList.add("hidden");
    interventionSection.classList.remove("hidden");
    if (therapistHomeNavLink.classList.contains("active")) {
        therapistHomeNavLink.classList.remove("active");
    }
    else if (clientHomeNavLink.classList.contains("active")) {
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
    clientPortfolioSection.classList.add("hidden");
}

function ShowClientHome() {
    resourcesNavLink.classList.remove("active");
    interventionSection.classList.add("hidden");
    profileSection.classList.add("hidden");
    clientPortfolioSection.classList.remove("hidden");
    addClientSection.classList.add("hidden");
    //updateClientSection.classList.add("hidden");
    conditionsSection.classList.add("hidden");

    const interval = setInterval(function() {
        selectMessages();
      }, 5000);

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
    therapistLoggedIn = true;
    selectClients();
}

function logInAsParent() {
    clientPortfolioSection.classList.remove("hidden")
    loginSection.classList.add("hidden");
    navItems.classList.remove("hidden");
    logOutButton.classList.remove("hidden");
    clientLoginHome.classList.remove("hidden");
    clientHomeNavLink.classList.add("active");
    selectClients();
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
                    currentLoggedInID = logIn.id;
                    logInAsTherapist();
                } else if (logIn.result === "Parent") {
                    inputUsername.value = "";
                    inputPassword.value = "";
                    currentLoggedInID = logIn.id;
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

function GetCurrentPrimaryContactIdNumber() {
    var baseURL = "https://localhost:5001/CurrentPrimaryContactIdNumber";
    var queryString = "";

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = doAfterGetCurrentContactNumber;

    xhr.open("GET", baseURL + queryString, true);
    xhr.send();

    function doAfterGetCurrentContactNumber() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok


                var client = JSON.parse(xhr.responseText);

                var currentNumber = client.currentPrimaryContactId;
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }

            currentPrimaryContactIdNumber = currentNumber;
            alert(currentPrimaryContactIdNumber);
        }
    }
}

function loadClientProfile(event) {
    var clientId = document.getElementById("client-id").value = event.target.dataset.clientId;
    // Do this for messages then reset value in Message function
    clientIdForMessages = clientId;
    //var currentPrimaryContactId = document.getElementById("primary-contact-id").value = event.target.dataset.primaryContactId;
    //primaryContactIdForMessages = currentPrimaryContactId;

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
                clientProfileFirstName.innerHTML = client.clientFirstName;
                clientProfileLastName.innerHTML = client.clientLastName;
                clientProfileDateOfBirth.innerHTML = client.clientDateOfBirth;
                selectMessages();

            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }
}

function selectClients() {
    var baseURL = "https://localhost:5001/selectclients";
    var queryString = "?currentLoggedInID=" + currentLoggedInID;

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
        clientRows += '<td>' + client.clientFirstName + '</td>';
        clientRows += '<td>' + client.clientLastName + '</td>';
        clientRows += '<td>' + client.clientDateOfBirth + '</td>';
        clientRows += '<td>' + '<button data-client-id="' + client.clientId + '" type="button" class="btn-client-profile btn btn-outline-primary btn-sm">Profile</button>' + '</td>';
        clientRows += '<td>' + '<button data-client-id="' + client.clientId + '" data-first-name="' + client.clientFirstName + '" data-last-name="' + client.clientLastName + '" data-date-of-birth="' + client.clientDateOfBirth + '" data-primary-contact-id="' + client.primaryContactId + '" data-primary-contact-first-name="' + client.primaryContactFirstName + '" data-primary-contact-last-name="' + client.primaryContactLastName + '" data-address="' + client.address + '" data-city="' + client.city + '" data-state-id="' + client.stateId + '" data-zipcode="' + client.zipcode + '" data-phone="' + client.phone + '" data-email-address="' + client.emailAddress + '"type="button" class="btn-client-update btn btn-outline-success btn-sm">Update</button>' + '</td>';
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
    var inputContactFirstName = document.getElementById("primary-contact-first-name");
    var inputContactLastName = document.getElementById("primary-contact-last-name");
    var inputContactState = document.getElementById("primary-contact-state");
    var inputContactAddress = document.getElementById("primary-contact-address");
    var inputContactZip = document.getElementById("primary-contact-zip");
    var inputContactPhone = document.getElementById("primary-contact-phone");
    var inputContactEmail = document.getElementById("primary-contact-email");
    var inputContactCity = document.getElementById("primary-contact-city");

    var firstName = inputFirstName.value;
    var lastName = inputLastName.value;
    var dateOfBirth = inputDateOfBirth.value;
    var contactFirstName = inputContactFirstName.value;
    var contactLastName = inputContactLastName.value;
    var contactAddress = inputContactAddress.value;
    var contactZip = inputContactZip.value;
    var contactPhone = inputContactPhone.value;
    var contactEmail = inputContactEmail.value;
    var contactCity = inputContactCity.value;
    var contactState = inputContactState.value;

    var baseURL = "https://localhost:5001/InsertClient";
    var queryString = "?primaryContactId=" + currentPrimaryContactIdNumber + "&therapistId=" + currentLoggedInID + "&primaryContactFirstName=" + contactFirstName + "&primaryContactLastName=" + contactLastName + "&address=" + contactAddress + "&city=" + contactCity + "&stateId=" + contactState + "&zipCode=" + contactZip + "&phone=" + contactPhone + "&emailAddress=" + contactEmail + "&clientFirstName=" + firstName + "&clientLastName=" + lastName + "&clientDateOfBirth=" + dateOfBirth;

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
                    inputContactFirstName.value = "";
                    inputContactLastName.value = "";
                    inputContactAddress.value = "";
                    inputContactZip.value = "";
                    inputContactPhone.value = "";
                    inputContactEmail.value = "";
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
    var inputPrimaryContactFirstName = document.getElementById("primary-contact-first-name");
    var primaryContactLastName = document.getElementById("primary-contact-last-name");
    var inputClientFirstName = document.getElementById("client-first-name");
    var inputDateOfBirth = document.getElementById("client-date-of-birth");
    var inputAddress = document.getElementById("address");
    var inputCity = document.getElementById("city");
    var inputZipcode = document.getElementById("zipcode");
    var inputStateId = document.getElementById("state-id");
    var inputPhone = document.getElementById("phone");
    var inputEmailAddress = document.getElementById("email-address");

    var clientId = inputClientId.value;
    var clientFirstName = inputClientFirstName.value;
    var clientLastName = inputClientLastName.value;
    var clientDateOfBirth = inputDateOfBirth.value;
    var primaryContactFirstName = inputPrimaryContactFirstName.value;
    var primaryContactLastName = inputPrimaryContactLastName.value;
    var address = inputAddress.value;
    var city = inputCity.value;
    var zipcode = inputZipcode.value;
    var stateId = inputStateId.value;
    var phone = inputPhone.value;
    var emailAddress = inputEmailAddress.value;

    var baseURL = "https://localhost:5001/UpdateClient";
    // var queryString = "?clientId=" + clientId + "&clientFirstName=" + clientFirstName + "&clientLastName=" + clientLastName + "&clientDateOfBirth=" + clientDateOfBirth + "&dateOfBirth=" + clientDateOfBirth;
    var queryString = "?primaryContactId=" + currentPrimaryContactIdNumber + "&primaryContactFirstName=" + primaryContactFirstName + "&primaryContactLastName=" + primaryContactLastName + "&address=" + address + "&city=" + city + "&stateId=" + stateId + "&zipCode=" + zipcode + "&phone=" + phone + "&emailAddress=" + emailAddress + "&clientId=" + clientId + "&clientFirstName=" + clientFirstName + "&clientLastName=" + clientLastName + "&clientDateOfBirth=" + clientDateOfBirth;

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

function selectMessages() {



    var baseURL = "https://localhost:5001/selectmessages";
    var queryString = "?clientId=" + clientIdForMessages;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = doAfterGetMessages;

    xhr.open("GET", baseURL + queryString, true);
    xhr.send();


    function doAfterGetMessages() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok



                var response = JSON.parse(xhr.responseText);
                if (response.result === "success") {
                    refreshMessageTable(response.userDbMessages);
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }
}

function refreshMessageTable(userDbMessages) {

    var messageRows = '';

    for (var i = 0; i < userDbMessages.length; i++) {
        var message = userDbMessages[i];
        messageRows += '<tr>';
        //messageRows += '<td class="hidden">' + message.messageId + '</td>';
        //MessageRows += '<td class="hidden">' + client.clientId + '</td>';
        messageRows += '<td>' + message.fromUser + '</td>';
        messageRows += '<td>' + message.messageText + '</td>';
        messageRows += '<td>' + message.timeSent + '</td>';
        //MessageRows += '<td>' + client.clientLastName + '</td>';
        //MessageRows += '<td>' + client.clientDateOfBirth + '</td>';
        //MessageRows += '<td>' + '<button data-client-id="' + client.clientId + '" type="button" class="btn-client-profile btn btn-outline-primary btn-sm">Profile</button>' + '</td>';
        //MessageRows += '<td>' + '<button data-client-id="' + client.clientId + '" data-first-name="' + client.clientFirstName + '" data-last-name="' + client.clientLastName + '" data-date-of-birth="' + client.clientDateOfBirth + '"type="button" class="btn-client-update btn btn-outline-success btn-sm">Update</button>' + '</td>';
        //MessageRows += '<td>' + '<button data-client-id="' + client.clientId + '" type="button" class="btn-client-delete btn btn-outline-danger btn-sm">Delete</button>' + '</td>';
        messageRows += '</tr>';
    }

    dynamicMessageRows.innerHTML = messageRows;
    while (tableCount <= 1)
    {
        createTable()
        tableCount++;
    }
    
    
    
}

function insertMessage() {
    var inputMessage = document.getElementById("new-message");
    var sentFromId;

        sentFromId = currentLoggedInID;

    var clientIdInputMessage = clientIdForMessages;

    var messageToSend = inputMessage.value;


    var baseURL = "https://localhost:5001/InsertMessage";
    var queryString = "?clientId=" + clientIdInputMessage + "&sentFromId=" + sentFromId + "&messageText=" + messageToSend;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = doAfterSendMessage;

    xhr.open("GET", baseURL + queryString, true);
    xhr.send();

    function doAfterSendMessage() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok

                var response = JSON.parse(xhr.responseText);

                if (response.result === "success") {
                    refreshMessageTable(response.userDbMessages);
                    inputMessage.value = "";
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }
}

// function calculateAge (birthDate, otherDate) {
//     birthDate = new Date(birthDate);
//     otherDate = new Date(otherDate);

//     var years = (otherDate.getFullYear() - birthDate.getFullYear());

//     if (otherDate.getMonth() < birthDate.getMonth() || 
//         otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
//         years--;
//     }

//     return years;
// }

function createTable() {
    $('#message-table').DataTable( {
        "lengthChange": false,
        "pageLength": 8,
        "searching": false
    });
}

// MODIFY FUNCTION BELOW TO REFRESH MESSAGE TABLE WHERE NEEDED
// var number = 0;


// const interval = setInterval(function() {
//     selectMessages();
//   }, 5000);
