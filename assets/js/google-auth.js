class GoogleAuth {
    auth;
    isSignedIn;
    signedUser = {
        id: null,
        name: null,
        img: null,
        email: null,
        authorisedFunctions: []
    };
    configFilePath = 'configs.json';
    allowedUsers = [];
    allowedUser = null;
    host = "";

    constructor() {
        this.isSignedIn = sessionStorage.getItem("isSignedIn");
        this.signedUser = JSON.parse(sessionStorage.getItem("signedUser"));

        if ($("title").text() !== 'A2 | Home') {
            if ($("title").text() === 'A2 | New Project' || $("title").text() === 'A2 | View Project' || $("title").text() === 'A2 | Edit Project') {
                this.configFilePath = '../../../' + this.configFilePath;
            } else {
                this.configFilePath = '../../' + this.configFilePath;
            }
        }

        $.getJSON(this.configFilePath, (json) => {
            this.allowedUsers = json['allowedUsers'];
            this.host = json['host'];
            sessionStorage.setItem("host", this.host);
        });

        if (!this.isSignedIn) {
            this.initialise();
        } else {
            $('#signed-user-img').attr('src', this.signedUser.img);
            $('#sign-in').hide();
            $('#sign-out').show();
            if (this.signedUser.authorisedFunctions.includes("notifications")) {
                $('#notifications-nav-item').show();
            }
        }
    }

    initialise() {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                clientId: '728777430762-o6gn7g9i3fepp449t6jflpu6enfbc0mk.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = gapi.auth2.getAuthInstance();
            });
        });
    }

    signIn() {
        if (this.auth && !this.isSignedIn && this.allowedUsers) {
            this.auth.signIn().then(() => {
                if (this.allowedUsers.some(item => item.email === this.auth.currentUser.get().getBasicProfile().getEmail())) {
                    this.allowedUser = this.allowedUsers.filter(item => {
                        return item.email === this.auth.currentUser.get().getBasicProfile().getEmail()
                    })[0];
                    if(this.allowedUser.authorisedFunctions.length > 0) {
                        this.signedUser = {
                            id: this.auth.currentUser.get().getId(),
                            name: this.auth.currentUser.get().getBasicProfile().getName(),
                            img: this.auth.currentUser.get().getBasicProfile().getImageUrl(),
                            email: this.auth.currentUser.get().getBasicProfile().getEmail(),
                            authorisedFunctions: this.allowedUser.authorisedFunctions
                        }
                        sessionStorage.setItem("isSignedIn", true);
                        sessionStorage.setItem("signedUser", JSON.stringify(this.signedUser));
                        $('#signed-user-img').attr('src', this.signedUser.img);
                        $('#sign-in').hide();
                        $('#sign-out').show();
                        if (this.signedUser.authorisedFunctions.includes("notifications")) {
                            $("#notifications-nav-item").show();
                        }
                        window.location.reload();
                    } else {
                        $.alert({
                            title: 'No Authorised functions',
                            columnClass: 'medium',
                            content: `Sorry! ${this.auth.currentUser.get().getBasicProfile().getName()} <br>You don't have any authorised functions on <b>Leo District 306 A2</b> official web site.<br> <div class="small-text">(*If you want to access please contact <a href="mailto:secretariat@leodistrict306a2.org" class="contact">secretariat@leodistrict306a2.org)</a></div>`,
                            theme: 'dark',
                            type: "blue"
                        });
                    }
                } else {
                    $.alert({
                        title: 'Unauthorised',
                        columnClass: 'medium',
                        content: `Sorry! ${this.auth.currentUser.get().getBasicProfile().getName()} <br>You are not allowed to access <b>Leo District 306 A2</b> official web site.<br> <div class="small-text">(*If you want to get access please contact <a href="mailto:secretariat@leodistrict306a2.org" class="contact">secretariat@leodistrict306a2.org)</a></div>`,
                        theme: 'dark',
                        type: "blue"
                    });
                }
            });
        }
    }

    signOut() {
        if (this.auth) {
            this.auth.signOut();
        }
        sessionStorage.removeItem('isSignedIn');
        sessionStorage.removeItem('signedUser');
        $('#sign-in').show();
        $('#sign-out').hide();
        $("#notifications-nav-item").hide();
        if ($("title").text() === 'A2 | Notifications') {
            window.location.replace(this.host);
        } else {
            window.location.reload();
        }
    }
}

const googleAuth = new GoogleAuth();

$("#sign-in").click(function () {
    googleAuth.signIn();
});

$("#sign-out").click(function () {
    $.confirm({
        title: 'Sign out',
        columnClass: 'medium',
        content: `Are you sure you want to sign out?`,
        theme: 'dark',
        type: "blue",
        buttons: {
            signOut: {
                text: 'Sign out',
                btnClass: 'btn-blue',
                keys: ['enter'],
                action: function () {
                    googleAuth.signOut();
                }
            },
            cancel: function () {
            }
        }
    });
});

