class GoogleAuth {
    auth;
    isSignedIn;
    signedUser = {
        id: null,
        name: null,
        img: null,
        email: null
    };
    configFilePath = 'configs.json';
    allowedUsers = [];

    constructor() {
        this.isSignedIn = sessionStorage.getItem("isSignedIn");
        this.signedUser = JSON.parse(sessionStorage.getItem("signedUser"));

        if($("title").text() !== 'A2 | Home') {
            this.configFilePath = '../../' + this.configFilePath;
        }

        $.getJSON(this.configFilePath, (json) => {
            this.allowedUsers = json['allowedUsers'];
        });

        if (!this.isSignedIn) {
            this.initialise();
        } else {
            $('#signed-user-img').attr('src', this.signedUser.img);
            $('#sign-in').hide();
            $('#sign-out').show();
        }
    }

    initialise() {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                clientId: '99556617939-4belcg2tv7rai57le0akt7kans93l83u.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = gapi.auth2.getAuthInstance();
            });
        });
    }

    signIn() {
        if (this.auth && !this.isSignedIn && this.allowedUsers) {
            this.auth.signIn().then(() => {
                if(this.allowedUsers.indexOf(this.auth.currentUser.get().getBasicProfile().getEmail()) >= 0) {
                    this.signedUser = {
                        id: this.auth.currentUser.get().getId(),
                        name: this.auth.currentUser.get().getBasicProfile().getName(),
                        img: this.auth.currentUser.get().getBasicProfile().getImageUrl(),
                        email: this.auth.currentUser.get().getBasicProfile().getEmail()
                    }
                    sessionStorage.setItem("isSignedIn", true);
                    sessionStorage.setItem("signedUser", JSON.stringify(this.signedUser));
                    $('#signed-user-img').attr('src', this.signedUser.img);
                    $('#sign-in').hide();
                    $('#sign-out').show();
                } else {
                    $.alert({
                        title: 'Unauthorised',
                        columnClass: 'medium',
                        content: `Sorry! ${ this.auth.currentUser.get().getBasicProfile().getName() } <br>You are not allowed to access <b>Leo District 306 A2</b> official web site.<br> <div class="small-text">(*If you want to get access please contact <a href="secretariat@leodistrict306a2.org" class="contact">secretariat@leodistrict306a2.org)</a></div>`,
                        theme: 'dark',
                        type:"blue"
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
        type:"blue",
        buttons: {
            signOut: {
                text: 'Sign out',
                btnClass: 'btn-blue',
                keys: ['enter'],
                action: function(){
                    googleAuth.signOut();
                }
            },
            cancel: function () {}
        }
    });
});

