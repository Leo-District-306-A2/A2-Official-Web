// ************************** This is only for notifications page

let isSignedIn =  sessionStorage.getItem("isSignedIn");
let signedUser = JSON.parse(sessionStorage.getItem("signedUser"));
let host = "";
$.getJSON("../../configs.json", (json) => {
    host = (json['host']);
});

if (!isSignedIn || !signedUser.authorisedFunctions.includes("notifications")) {
    window.onload = function() {
        // similar behavior as an HTTP redirect
        window.location.replace(host);
    }
}

function addNotificationIcon(img) {
    $('#notification-icon').val(host + "/assets/img/notifications/logos/" + img);
}
