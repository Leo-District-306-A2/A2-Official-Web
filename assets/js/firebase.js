let firebaseConfig = {
    apiKey: "AIzaSyBifc6O22LeC_XhoZhmSdX1-91QHcERHGw",
    authDomain: "a2directory.firebaseapp.com",
    databaseURL: "https://a2directory.firebaseio.com",
    projectId: "a2directory",
    storageBucket: "a2directory.appspot.com",
    messagingSenderId: "900343174951",
    appId: "1:900343174951:web:6f5d0833c190e863e7bb02",
    measurementId: "G-NVENMR209J"
};
// Initialize Firebase
let defaultProject = firebase.initializeApp(firebaseConfig);

// ******************** NOTIFICATION SECTION *************************
let notifications = firebase.firestore().collection('notifications');

/*
Notification must be json with below template
    notificationTemplate = {
        title: "",
        body: "",
        icon: "",
        sentBy: "",
        timeCreated: ""
    }
*/
function saveNotification(notification) {
    let notificationId = 'not-'+$.MD5(JSON.stringify(notification));
    return notifications.doc(notificationId).set(notification);
}

function sendToFCM(notification) {
    let notificationToFCM = {
        notification:{
            title: notification.title,
            body: notification.body,
            icon:notification.icon,
            click_action: "FCM_PLUGIN_ACTIVITY"
        },
        data:{
            icon:notification.icon
        },
        to: "/topics/general"
    }

    $.ajax({
        url: 'https://fcm.googleapis.com/fcm/send',
        type: 'POST',
        data: JSON.stringify(notificationToFCM),
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'key=AAAA0aCilyc:APA91bE0UjWpbPGmRzSBpjPhCmOqA44W0qtqd3-ufLtNNRo6J0rLfaeUOPUF4Qh5U2SPlxyRigTy-cUN6TAScC2dbrWonvgv0sIdcNrK7FB1QCf-J6esQ1SCEBhReYescOSmKj0agQJn'
        },
        success: function () {
            $.alert({
                title: 'Send successfully',
                columnClass: 'medium',
                content: 'Notification sent successfully!',
                theme: 'dark',
                type:"blue"
            });
            clearFields();
        }
    });
}

function sendNotification(notification) {
    saveNotification(notification).then(() => {
        sendToFCM(notification);
    });
}

function validateURL(str) {
    var httpsPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    var httpPattern = new RegExp('^(http?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return !!httpsPattern.test(str) || !!httpPattern.test(str);
}

function getNotificationFromInput() {
    let title = $('#notification-title').val();
    let icon = $('#notification-icon').val();
    let body = $('#notification-body').val();

    if(icon && !validateURL(icon)) {
        $('#invalid-url').fadeIn();
        return;
    } else {
        $('#invalid-url').fadeOut();
    }

    if(title && body) {
        return {
            title: title,
            body: body,
            icon: icon,
            sentBy: JSON.parse(sessionStorage.getItem('signedUser')),
            datetime: (new Date().toString())
        }
    }
}

function clearFields() {
    $('#notification-title').val('');
    $('#notification-icon').val('');
    $('#notification-body').val('');
}

$('#send-notification').click(() => {
    let notification = getNotificationFromInput();
    if(notification) {
        $.confirm({
            title: 'Confirm',
            columnClass: 'medium',
            content: `Are you sure you want to send this?`,
            theme: 'dark',
            type:"blue",
            buttons: {
                confirm: {
                    text: 'Yes',
                    btnClass: 'btn-blue',
                    keys: ['enter'],
                    action: function(){
                        sendNotification(notification);                    }
                },
                no: function () {}
            }
        });
    }
});


// ************************ USERS SECTION *******************************
/*
/!*

let users = firebase.firestore().collection('users');
User should be json with below template
    userTemplate = {
        email: "",
        auth-level : "",
    }

    auth-levels as below
    Administrator - 1
    Moderator - 2
    Viewer - 3
 *!/
function saveUser(user) {
    let userId = 'user-'+$.MD5(JSON.stringify(user));
    return users.doc(userId).set(user);
}

let usersList = [];
function getUsers() {
    usersList.get().then((a) => {
        a.forEach((doc) => {
            usersList.push(doc);
        })
    });
}*/


