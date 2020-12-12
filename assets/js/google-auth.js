class GoogleAuth {
    auth;
    isSignedIn;
    signedUser = {
        id: null,
        name: null,
        img: null,
        email: null
    };

    constructor() {
        this.isSignedIn = sessionStorage.getItem("isSignedIn");
        this.signedUser = JSON.parse(sessionStorage.getItem("signedUser"));
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
        if (this.auth && !this.isSignedIn) {
            this.auth.signIn().then(() => {
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
    googleAuth.signOut();
});
