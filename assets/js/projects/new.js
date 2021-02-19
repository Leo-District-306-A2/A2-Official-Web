let isSignedIn = sessionStorage.getItem("isSignedIn");
let signedUser = JSON.parse(sessionStorage.getItem("signedUser"));
let host = "";

$.getJSON("../../../configs.json", (json) => {
    host = (json['host']);
})
;

if (!isSignedIn || !signedUser.authorisedFunctions.includes("projects")) {
    window.onload = function () {
        // similar behavior as an HTTP redirect
        window.location.replace(host);
    }
}

const fileInput1 = document.getElementById("image_1_uploader");
const previewContainer1 = document.getElementById("image-preview-1")
const previreImage1 = previewContainer1.querySelector(".image-preview-image");
const previreDefaultText1 = previewContainer1.querySelector(".image-preview-default-text");


fileInput1.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        previreDefaultText1.style.display = "none";
        previreImage1.style.display = "block";

        reader.addEventListener("load", function () {
            previreImage1.setAttribute("src", this.result);
        });
        $('#image-2-section').show();
        reader.readAsDataURL(file);

    }
});

const fileInput2 = document.getElementById("image_2_uploader");
const previewContainer2 = document.getElementById("image-preview-2")
const previreImage2 = previewContainer2.querySelector(".image-preview-image");
const previreDefaultText2 = previewContainer2.querySelector(".image-preview-default-text");


fileInput2.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        previreDefaultText2.style.display = "none";
        previreImage2.style.display = "block";

        reader.addEventListener("load", function () {
            previreImage2.setAttribute("src", this.result);
        });
        $('#image-3-section').show();
        reader.readAsDataURL(file);
    }
});


const fileInput3 = document.getElementById("image_3_uploader");
const previewContainer3 = document.getElementById("image-preview-3")
const previreImage3 = previewContainer3.querySelector(".image-preview-image");
const previreDefaultText3 = previewContainer3.querySelector(".image-preview-default-text");


fileInput3.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        previreDefaultText3.style.display = "none";
        previreImage3.style.display = "block";

        reader.addEventListener("load", function () {
            previreImage3.setAttribute("src", this.result);
        });
        $('#image-4-section').show();
        reader.readAsDataURL(file);
    }
});

const fileInput4 = document.getElementById("image_4_uploader");
const previewContainer4 = document.getElementById("image-preview-4")
const previreImage4 = previewContainer4.querySelector(".image-preview-image");
const previreDefaultText4 = previewContainer4.querySelector(".image-preview-default-text");

fileInput4.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        previreDefaultText4.style.display = "none";
        previreImage4.style.display = "block";

        reader.addEventListener("load", function () {
            previreImage4.setAttribute("src", this.result);
        });

        reader.readAsDataURL(file);
    }
});

function saveProject() {
    let title = $('#title').val();
    let description = $('#description').val();
    let facebook = $('#facebook').val();
    let image_1 = $('#image_1_uploader').prop('files')[0];
    let image_2 = $('#image_2_uploader').prop('files')[0];
    let image_3 = $('#image_3_uploader').prop('files')[0];
    let image_4 = $('#image_4_uploader').prop('files')[0];
    let published_by = JSON.stringify(signedUser);

    let upload_count = 0;
    if (image_1) {
        upload_count+=1;
    }
    if (image_2) {
        upload_count+=1;
    }
    if (image_3) {
        upload_count+=1;
    }
    if (image_4) {
        upload_count+=1;
    }

    if (isValidated(title, description, facebook)) {
        const form_data = new FormData();
        form_data.append('title', title);
        form_data.append('description', description);
        form_data.append('facebook', facebook);
        form_data.append('upload_count', upload_count.toString());
        form_data.append('image_1', image_1 !== null? image_1: "");
        form_data.append('image_2', image_2? image_2: "");
        form_data.append('image_3', image_3? image_3: "");
        form_data.append('image_4', image_4? image_4: "");
        form_data.append('published_by', published_by);
        $.ajax({
            url: '../../../php/projects/addProject.php',
            type: 'POST',
            data: form_data,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response === 'success') {
                    $.alert({
                        title: 'Project Saved',
                        columnClass: 'medium',
                        content: 'Project Saved Successfully!',
                        theme: 'dark',
                        type: "blue"
                    });
                } else {
                    $.alert({
                        title: 'Project not Saved',
                        columnClass: 'medium',
                        content: 'Error happened while saving project!',
                        theme: 'dark',
                        type: "red"
                    });
                }

            }
        });
    }
}

function isValidated(title, description, facebook) {
    let isTitleValidated = true;
    let isDescriptionValidated = true;
    let isFacebookValidated = true;

    // title validations
    if (title === "") {
        isTitleValidated = false;
        $("#title-error").html("Invalid input: Cannot be empty!");
    } else if (title.length > 500) {
        isTitleValidated = false;
        $("#title-error").html("Invalid input: Max length 500 charactors");
    } else {
        isTitleValidated = true;
        $("#title-error").html("");
    }

    // description validations
    if (description === "") {
        isDescriptionValidated = false;
        $("#description-error").html("Invalid input: Cannot be empty!");
    } else if (description.length > 5000) {
        isDescriptionValidated = false;
        $("#description-error").html("Invalid input: Max length 2500 charactors");
    } else {
        isDescriptionValidated = true;
        $("#description-error").html("");
    }

    // facebook validations
    if (facebook !== "") {
        if (facebook.length > 500) {
            isFacebookValidated = false;
            $("#facebook-error").html("Invalid input: Max length 2500 charactors");
        } else if (!facebook.startsWith("https://www.facebook.com")) {
            isFacebookValidated = false;
            $("#facebook-error").html("Invalid input: Not a facebook url. (Url must like with https://www.facebook.com/xxxxx)");
        } else {
            isFacebookValidated = true;
            $("#facebook-error").html("");
        }
    } else {
        isFacebookValidated = true;
        $("#facebook-error").html("");
    }

    return isTitleValidated && isDescriptionValidated && isFacebookValidated;
}
