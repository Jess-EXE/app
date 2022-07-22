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
var clientProfileSection = document.getElementById("client-profile-section");
var clientLoginHome = document.getElementById("client-login-home");
var currentPrimaryContactIdNumber;
var clientProfileCard = document.getElementById("client-card-view");
var hippaSection = document.getElementById("hippa-section");
// var currentPrimaryContactId;

// client profile dynamic update section
var clientProfileFirstName = document.getElementById("client-profile-first-name");
var clientProfileLastName = document.getElementById("client-profile-last-name");
var clientProfileDateOfBirth = document.getElementById("client-profile-date-of-birth");

var therapistProfileClientFirstName = document.getElementById("therapist-profile-client-first-name");
var therapistProfileClientLastName = document.getElementById("therapist-profile-client-last-name");
var therapistProfileClientDateOfBirth = document.getElementById("client-profile-date-of-birth");
var therapistProfileClientPrimaryContactFirstName = document.getElementById("therapist-profile-primary-contact-first-name");
var therapistProfileClientPrimaryContactLastName = document.getElementById("therapist-profile-primary-contact-last-name");
var therapistProfileClientPrimaryContactPhone = document.getElementById("therapist-profile-primary-contact-phone");
var therapistProfileClientPrimaryContactEmail = document.getElementById("therapist-profile-primary-contact-email");

var clientProfileTherapistFirstName = document.getElementById("client-profile-therapist-first-name");
var clientProfileTherapistLastName = document.getElementById("client-profile-therapist-last-name");
var clientProfileTherapistTitle = document.getElementById("client-profile-therapist-title");
var clientProfileTherapistPhone = document.getElementById("client-profile-therapist-phone");
// END client profile dynamic update section

// Dynamic client variables updated every time profile loads

var profileClientId;
var profileClientFirstName;
var profileClientLastName;
var profileClientDateOfBirth;
var profilePrimaryContactId;
var profilePrimaryContactFirstName;
var profilePrimaryContactLastName;
var profilePrimaryContactAddress;
var profilePrimaryContactCity;
var profilePrimaryContactZipcode;
var profilePrimaryContactStateId;
var profilePrimaryContactPhone;
var profilePrimaryContactEmailAddress;

// END Dynamic client variables updated every time profile loads

// Therapist Specific
var profileSection = document.getElementById("profile-section");
var therapistHomeNavLink = document.getElementById("therapist-home-nav-link");
var therapistLoginHome = document.getElementById("therapist-login-home");
var therapistProfileCard = document.getElementById("therapist-card-view")


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

var currentLoggedInID;


function LogOut() {
    if (!profileSection.classList.contains("hidden")) {
        profileSection.classList.add("hidden");
    }
    if (!clientProfileSection.classList.contains("hidden")) {
        clientProfileSection.classList.add("hidden");
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
    therapistLoggedIn = false;
    dynamicMessageRows.innerHTML = "";
    therapistHomeNavLink.classList.add("hidden");
    clientLoginHome.classList.add("hidden");
}


// function ClientLogIn() {
//     // Modify this to show profiles of clients that they can click on to view messages
// }

function ShowClientPortfolio() {
    clientProfileSection.classList.remove("hidden")
    clientLoginHome.classList.remove("hidden");
    clientHomeNavLink.classList.add("active");
}

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
    if (!clientProfileSection.classList.contains("hidden")) {
        clientProfileSection.classList.add("hidden");
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

function ShowUpdateClientSection() {
    updateClientButton.classList.remove("hidden");
    updateClientTitle.classList.remove("hidden");
    clientProfileSection.classList.add("hidden");
    addClientSection.classList.remove("hidden");

    document.getElementById("client-id").value = profileClientId;
    document.getElementById("primary-contact-id").value = profilePrimaryContactId;
    document.getElementById("client-first-name").value = profileClientFirstName;
    document.getElementById("client-last-name").value = profileClientLastName;
    document.getElementById("date").value = profileClientDateOfBirth;
    document.getElementById("primary-contact-first-name").value = profilePrimaryContactLastName;
    document.getElementById("primary-contact-last-name").value = profilePrimaryContactFirstName;
    document.getElementById("primary-contact-address").value = profilePrimaryContactAddress;
    document.getElementById("primary-contact-city").value = profilePrimaryContactCity;
    document.getElementById("primary-contact-zip").value = profilePrimaryContactZipcode;
    document.getElementById("primary-contact-state").value = profilePrimaryContactStateId;
    document.getElementById("primary-contact-phone").value = profilePrimaryContactPhone;
    document.getElementById("primary-contact-email").value = profilePrimaryContactEmailAddress;
}

function CancelUpdate() {
    updateClientButton.classList.add("hidden");
    updateClientTitle.classList.add("hidden");
    clientProfileSection.classList.remove("hidden");
    addClientSection.classList.add("hidden");
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
    clientProfileSection.classList.remove("hidden");
    updateClientButton.classList.add("hidden");
    updateClientTitle.classList.add("hidden");
    addClientSection.classList.add("hidden");
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
    if (!clientProfileSection.classList.contains("hidden")) {
        clientProfileSection.classList.add("hidden");
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
    clientProfileSection.classList.add("hidden");
}

function ShowClientHome(event) {
    resourcesNavLink.classList.remove("active");
    interventionSection.classList.add("hidden");
    profileSection.classList.add("hidden");
    clientProfileSection.classList.remove("hidden");
    addClientSection.classList.add("hidden");
    //updateClientSection.classList.add("hidden");
    conditionsSection.classList.add("hidden");

    
    // const interval = setInterval(function() {
    //     selectMessages();
    //   }, 5000);

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

        clientProfileCard.classList.add("hidden");

    selectClients();
}

function logInAsParent() {
    hippaSection.classList.add("hidden");
    clientProfileSection.classList.remove("hidden");
    loginSection.classList.add("hidden");
    navItems.classList.remove("hidden");
    logOutButton.classList.remove("hidden");
    clientLoginHome.classList.remove("hidden");
    clientHomeNavLink.classList.add("active");
    //setTimeout(function() {
    loadProfileAsClient();
    //  }, 5000);
    //  setTimeout(function() {
    selectMessages();
    //  }, 5000);    
    
    // loadProfileAsClient();
    //     selectMessages();

    if (!failedLogIn.classList.contains("hidden")) {
        failedLogIn.classList.add("hidden");
    }
    therapistLoginHome.classList.add("hidden");
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
                    loginSection.classList.add("hidden");
                    hippaSection.classList.remove("hidden");
                    selectClients();
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
        }
    }
}

function loadClientProfile(event) {
    //var clientId = document.getElementById("client-id").value = event.target.dataset.clientId;
    therapistProfileCard.classList.remove("hidden");
    profileClientId = event.target.dataset.clientId;
    profilePrimaryContactId = event.target.dataset.primaryContactId;
    profileClientFirstName = event.target.dataset.firstName;
    profileClientLastName = event.target.dataset.lastName;
    profilePrimaryContactFirstName = event.target.dataset.primaryContactFirstName;
    profilePrimaryContactLastName = event.target.dataset.primaryContactLastName;
    profileClientDateOfBirth = event.target.dataset.dateOfBirth;
    profilePrimaryContactAddress = event.target.dataset.address;
    profilePrimaryContactCity = event.target.dataset.city;
    profilePrimaryContactZipcode = event.target.dataset.zipcode;
    profilePrimaryContactStateId = event.target.dataset.stateId;
    profilePrimaryContactPhone = event.target.dataset.phone;
    profilePrimaryContactEmailAddress = event.target.dataset.emailAddress;

    therapistProfileClientFirstName.innerHTML = profileClientFirstName;
    therapistProfileClientLastName.innerHTML = profileClientLastName;
    therapistProfileClientDateOfBirth.innerHTML = profileClientDateOfBirth;
    therapistProfileClientPrimaryContactFirstName.innerHTML = profilePrimaryContactFirstName;
    therapistProfileClientPrimaryContactLastName.innerHTML = profilePrimaryContactLastName;
    therapistProfileClientPrimaryContactEmail.innerHTML = profilePrimaryContactEmailAddress;
    
    // Do this for messages then reset value in Message function
    clientIdForMessages = profileClientId;
    //var currentPrimaryContactId = document.getElementById("primary-contact-id").value = event.target.dataset.primaryContactId;
    //primaryContactIdForMessages = currentPrimaryContactId;

    var baseURL = "https://localhost:5001/LoadClientProfile";
    var queryString = "?clientId=" + profileClientId;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = doAfterLoadClientProfile;

    xhr.open("GET", baseURL + queryString, true);
    xhr.send();

    function doAfterLoadClientProfile() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok

                var client = JSON.parse(xhr.responseText);
                ShowClientHome();
                clientHomeNavLink.classList.add("hidden");
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

function loadProfileAsClient() {

    var baseURL = "https://localhost:5001/LoadClientProfile";
    var queryString = "?clientId=" + clientIdForMessages;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = doAfterLoadClientProfile;

    xhr.open("GET", baseURL + queryString, true);
    xhr.send();

    function doAfterLoadClientProfile() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok

                var client = JSON.parse(xhr.responseText);
                ShowClientHome();
                clientProfileCard.classList.remove("hidden");
                clientProfileFirstName.innerHTML = client.clientFirstName;
                clientProfileLastName.innerHTML = client.clientLastName;
                clientProfileDateOfBirth.innerHTML = client.clientDateOfBirth;
                clientProfileTherapistFirstName.innerHTML = client.therapistFirstName
                clientProfileTherapistLastName.innerHTML = client.therapistLastName
                clientProfileTherapistTitle.innerHTML = client.therapistTitle
                clientProfileTherapistPhone.innerHTML = client.therapistOfficePhone
                therapistHomeNavLink.classList.add("hidden");
                //selectMessages();

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
                    if (therapistLoggedIn) {
                        refreshClientTable(response.clients);
                    } else {
                            var thisClient = response.clients[0];
                            clientIdForMessages = thisClient.clientId;
                    }
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }
}

// function refreshClientProfile(clients) {
//     var thisClient = clients[0];

//     clientIdForMessages = thisClient.clientId;
//     ShowClientHome();
//     clientProfileCard.classList.remove("hidden");
//     clientProfileFirstName.innerHTML = thisClient.clientFirstName;
//     clientProfileLastName.innerHTML = thisClient.clientLastName;
//     clientProfileDateOfBirth.innerHTML = thisClient.clientDateOfBirth;
//     clientProfileTherapistFirstName.innerHTML = thisClient.therapistFirstName
//     clientProfileTherapistLastName.innerHTML = thisClient.therapistLastName
//     clientProfileTherapistTitle.innerHTML = thisClient.therapistTitle
//     clientProfileTherapistPhone.innerHTML = thisClient.therapistOfficePhone
// }

function refreshClientTable(clients) {

    var clientRows = '';

    for (var i = 0; i < clients.length; i++) {
        var client = clients[i];
        clientRows += '<tr>';
        clientRows += '<td class="hidden">' + client.clientId + '</td>';
        clientRows += '<td class="hidden">' + client.primaryContactId + '</td>';
        clientRows += '<td class="hidden">' + client.primaryContactFirstName + '</td>';
        clientRows += '<td class="hidden">' + client.primaryContactLastName + '</td>';
        clientRows += '<td class="hidden">' + client.address + '</td>';
        clientRows += '<td class="hidden">' + client.city + '</td>';
        clientRows += '<td class="hidden">' + client.zipcode + '</td>';
        clientRows += '<td class="hidden">' + client.stateId + '</td>';
        clientRows += '<td class="hidden">' + client.phone + '</td>';
        clientRows += '<td class="hidden">' + client.emailAddress + '</td>';
        clientRows += '<td>' + client.clientFirstName + '</td>';
        clientRows += '<td>' + client.clientLastName + '</td>';
        clientRows += '<td>' + client.clientDateOfBirth + '</td>';
        clientRows += '<td>' + '<button data-client-id="' + client.clientId + '" data-primary-contact-id="' + client.primaryContactId + '" data-first-name="' + client.clientFirstName + '" data-last-name="' + client.clientLastName + '" data-date-of-birth="' + client.clientDateOfBirth + '" data-primary-contact-first-name="' + client.primaryContactFirstName + '" data-primary-contact-last-name="' + client.primaryContactLastName + '" data-address="' + client.address + '" data-city="' + client.city + '" data-state-id="' + client.stateId + '" data-zipcode="' + client.zipcode + '" data-phone="' + client.phone + '" data-email-address="' + client.emailAddress +  '" type="button" class="btn-client-profile btn btn-outline-primary btn-sm">Profile</button>' + '</td>';

        // clientRows += '<td>' + '<button data-client-id="' + client.clientId + '" data-primary-contact-id="' + client.primaryContactId + '" data-first-name="' + client.clientFirstName + '" data-last-name="' + client.clientLastName + '" data-date-of-birth="' + client.clientDateOfBirth + '" data-primary-contact-first-name="' + client.primaryContactFirstName + '" data-primary-contact-last-name="' + client.primaryContactLastName + '" data-address="' + client.address + '" data-city="' + client.city + '" data-state-id="' + client.stateId + '" data-zipcode="' + client.zipcode + '" data-phone="' + client.phone + '" data-email-address="' + client.emailAddress + '"type="button" class="btn-client-update btn btn-outline-success btn-sm">Update</button>' + '</td>';

        // clientRows += '<td>' + '<button data-client-id="' + client.clientId + '" type="button" class="btn-client-delete btn btn-outline-danger btn-sm">Delete</button>' + '</td>';
        clientRows += '</tr>';
    }

    dynamicClientRows.innerHTML = clientRows;

    // var clientDeleteButtons = document.getElementsByClassName("btn-client-delete");

    // for (var i = 0; i < clientDeleteButtons.length; i++) {
    //     var button = clientDeleteButtons[i];
    //     button.addEventListener("click", deleteClient);
    // }

    // var clientUpdateButtons = document.getElementsByClassName("btn-client-update");

    // for (var i = 0; i < clientUpdateButtons.length; i++) {
    //     var button = clientUpdateButtons[i];
    //     button.addEventListener("click", ShowUpdateClientSection);
    // }

    var clientProfileButtons = document.getElementsByClassName("btn-client-profile");

    for (var i = 0; i < clientProfileButtons.length; i++) {
        var button = clientProfileButtons[i];
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
    var contactCity = inputContactCity.value;
    var contactZip = inputContactZip.value;
    var contactState = inputContactState.value;
    var contactPhone = inputContactPhone.value;
    var contactEmail = inputContactEmail.value;

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
    var inputPrimaryContactLastName = document.getElementById("primary-contact-last-name");
    var inputDateOfBirth = document.getElementById("date");
    var inputAddress = document.getElementById("primary-contact-address");
    var inputCity = document.getElementById("primary-contact-city");
    var inputZipcode = document.getElementById("primary-contact-zip");
    var inputStateId = document.getElementById("primary-contact-state");
    var inputPhone = document.getElementById("primary-contact-phone");
    var inputEmailAddress = document.getElementById("primary-contact-email");
    var inputPrimaryContactId = document.getElementById("primary-contact-id");

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
    var primaryContactId = inputPrimaryContactId.value;

    profileClientFirstName = inputClientFirstName.value;
    profileClientLastName = inputClientLastName.value;
    profileClientDateOfBirth = inputDateOfBirth.value;
    profilePrimaryContactFirstName = inputPrimaryContactFirstName.value;
    profilePrimaryContactLastName = inputPrimaryContactLastName.value;
    profilePrimaryContactAddress = inputAddress.value;
    profilePrimaryContactCity = inputCity.value;
    profilePrimaryContactZipcode = inputZipcode.value;
    profilePrimaryContactStateId = inputStateId.value;
    profilePrimaryContactPhone = inputPhone.value;
    profilePrimaryContactEmailAddress = inputEmailAddress.value;

    var baseURL = "https://localhost:5001/UpdateClient";
    // var queryString = "?clientId=" + clientId + "&clientFirstName=" + clientFirstName + "&clientLastName=" + clientLastName + "&clientDateOfBirth=" + clientDateOfBirth + "&dateOfBirth=" + clientDateOfBirth;
    var queryString = "?primaryContactId=" + primaryContactId + "&primaryContactFirstName=" + primaryContactFirstName + "&primaryContactLastName=" + primaryContactLastName + "&address=" + address + "&city=" + city + "&stateId=" + stateId + "&zipCode=" + zipcode + "&phone=" + phone + "&emailAddress=" + emailAddress + "&clientId=" + clientId + "&clientFirstName=" + clientFirstName + "&clientLastName=" + clientLastName + "&clientDateOfBirth=" + clientDateOfBirth;

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
                    inputPrimaryContactFirstName.value = "";
                    inputPrimaryContactLastName.value = "";
                    inputAddress.value = "";
                    inputCity.value = "";
                    inputZipcode.value = "";
                    inputStateId.value = "";
                    inputPhone.value = "";
                    inputEmailAddress.value = "";
                    inputPrimaryContactId.value = "";
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

function deleteClient() {
    //var clientId = profileClientId;
    ShowTherapistHome()

    var baseURL = "https://localhost:5001/DeleteClient";

    var queryString = "?clientId=" + profileClientId;

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
        messageRows += '<td class="hidden">' + message.messageId + '</td>';
        messageRows += '<td>' + message.fromUser + '</td>';
        messageRows += '<td>' + message.messageText + '</td>';
        messageRows += '<td>' + message.timeSent + '</td>';
        if (therapistLoggedIn) {
            messageRows += '<td>' + '<button data-message-id="' + message.messageId + '" type="button" class="delete-a-message btn btn-outline-danger btn-sm">Delete</button>' + '</td>';
        } else {
            if (message.fromTherapist == "FALSE")
            {
                messageRows += '<td>' + '<button data-message-id="' + message.messageId + '" type="button" class="delete-a-message btn btn-outline-danger btn-sm">Delete</button>' + '</td>';
            } else {
                messageRows += '<td>' +'</td>';
            }
        }
        //MessageRows += '<td>' + client.clientLastName + '</td>';
        //MessageRows += '<td>' + client.clientDateOfBirth + '</td>';
        //MessageRows += '<td>' + '<button data-client-id="' + client.clientId + '" type="button" class="btn-client-profile btn btn-outline-primary btn-sm">Profile</button>' + '</td>';
        //MessageRows += '<td>' + '<button data-client-id="' + client.clientId + '" data-first-name="' + client.clientFirstName + '" data-last-name="' + client.clientLastName + '" data-date-of-birth="' + client.clientDateOfBirth + '"type="button" class="btn-client-update btn btn-outline-success btn-sm">Update</button>' + '</td>';
        //MessageRows += '<td>' + '<button data-client-id="' + client.clientId + '" type="button" class="btn-client-delete btn btn-outline-danger btn-sm">Delete</button>' + '</td>';
        messageRows += '</tr>';
    }

    dynamicMessageRows.innerHTML = messageRows;

    var messageDeleteButtons = document.getElementsByClassName("delete-a-message");

    for (var i = 0; i < messageDeleteButtons.length; i++) {
        var button = messageDeleteButtons[i];
        button.addEventListener("click", deleteMessage);
    }

    
    // while (tableCount <= 1)
    // {
    //     createTable()
    //     tableCount++;
    // }
    
    
    
}



function insertMessage() {
    var inputMessage = document.getElementById("new-message");
    var sentFromId;

        sentFromId = currentLoggedInID;

    var clientIdInputMessage = clientIdForMessages;

    var messageToSend = inputMessage.value;

    var fromTherapist

    if (therapistLoggedIn) {
        fromTherapist = "TRUE";
    } else {
        fromTherapist = "FALSE";
    }
    


    var baseURL = "https://localhost:5001/InsertMessage";
    var queryString = "?clientId=" + clientIdInputMessage + "&sentFromId=" + sentFromId + "&messageText=" + messageToSend + "&fromTherapist=" + fromTherapist;

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

function deleteMessage(event) {
    var messageId = event.target.dataset.messageId;

    var baseURL = "https://localhost:5001/DeleteMessage";

    var queryString = "?clientId=" + clientIdForMessages + "&messageId=" + messageId;

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

// function createTable() {
//     $('#message-table').DataTable( {
//         "lengthChange": false,
//         "pageLength": 8,
//         "searching": false
//     });
// }

// MODIFY FUNCTION BELOW TO REFRESH MESSAGE TABLE WHERE NEEDED
// var number = 0;


// const interval = setInterval(function() {
//     selectMessages();
//   }, 5000);

// setTimeout(function() {
//     selectMessages();
//   }, 5000);


// function hideUpdateSectionValues(); {

// }