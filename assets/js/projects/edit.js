let isSignedIn = sessionStorage.getItem("isSignedIn");
let signedUser = JSON.parse(sessionStorage.getItem("signedUser"));

let project_id = new URLSearchParams(window.location.search).get('id');
let project;

const fileInput1 = document.getElementById("image_1_uploader");
const previewContainer1 = document.getElementById("image-preview-1")
const previreImage1 = previewContainer1.querySelector(".image-preview-image");
const previreDefaultText1 = previewContainer1.querySelector(".image-preview-default-text");

const fileInput2 = document.getElementById("image_2_uploader");
const previewContainer2 = document.getElementById("image-preview-2")
const previreImage2 = previewContainer2.querySelector(".image-preview-image");
const previreDefaultText2 = previewContainer2.querySelector(".image-preview-default-text");

const fileInput3 = document.getElementById("image_3_uploader");
const previewContainer3 = document.getElementById("image-preview-3")
const previreImage3 = previewContainer3.querySelector(".image-preview-image");
const previreDefaultText3 = previewContainer3.querySelector(".image-preview-default-text");

const fileInput4 = document.getElementById("image_4_uploader");
const previewContainer4 = document.getElementById("image-preview-4")
const previreImage4 = previewContainer4.querySelector(".image-preview-image");
const previreDefaultText4 = previewContainer4.querySelector(".image-preview-default-text");

$.ajax({
    url: '../../../php/projects/getProject.php',
    type: 'GET',
    data: {
        id: project_id
    },
    success: function (response) {
        project = JSON.parse(response);
        let publishedData = ` <pre class="text-secondary text-left float-left text-capitalize">Published By: <a class="published-user-name">${JSON.parse(project.published_by).name ? JSON.parse(project.published_by).name : JSON.parse(project.published_by).email}</a><br>Published date/time: ${project.published_date}</pre>`;
        $('#title').val(project.title);
        $('#description').val(project.description);
        $('#facebook').val(project.facebook);
        $('#published-details').html(publishedData);

        if (project.image_1 !== "") {
            $('#image-1-section').show();
            previreDefaultText1.style.display = "none";
            previreImage1.style.display = "block";
            $('#image-preview-src-1').attr('src', project.image_1);
        }
        if (project.image_2 !== "") {
            $('#image-2-section').show();
            previreDefaultText2.style.display = "none";
            previreImage2.style.display = "block";
            $('#image-preview-src-2').attr('src', project.image_2);
        }
        if (project.image_3 !== "") {
            $('#image-3-section').show();
            previreDefaultText3.style.display = "none";
            previreImage3.style.display = "block";
            $('#image-preview-src-3').attr('src', project.image_3);
        }
        if (project.image_4 !== "") {
            $('#image-4-section').show();
            previreDefaultText4.style.display = "none";
            previreImage4.style.display = "block";
            $('#image-preview-src-4').attr('src', project.image_4);
        }



    }
});

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



function edit() {
    let title = $('#title').val();
    let description = $('#description').val();
    let facebook = $('#facebook').val();
    let image_1 = $('#image-preview-src-1').attr('src');
    let image_2 = $('#image-preview-src-2').attr('src');
    let image_3 = $('#image-preview-src-3').attr('src');
    let image_4 = $('#image-preview-src-4').attr('src');
    let published_by = JSON.stringify(signedUser);

    if (isValidated(title, description, facebook)) {
        $.ajax({
            url: '../../../php/projects/editProject.php',
            type: 'POST',
            data: {
                id:project_id,
                title: title,
                description: description,
                facebook: facebook,
                image_1: image_1,
                image_2: image_2,
                image_3: image_3,
                image_4: image_4,
                published_by: published_by
            },
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
    } else if (description.length > 2500) {
        isDescriptionValidated = false;
        $("#description-error").html("Invalid input: Max length 2500 charactors");
    } else  {
        isDescriptionValidated = true;
        $("#description-error").html("");
    }

    // facebook validations
    if (facebook !== "") {
        console.log("aaa");
        if (facebook.length > 500) {
            isFacebookValidated = false;
            $("#facebook-error").html("Invalid input: Max length 2500 charactors");
        } else if (!facebook.startsWith("https://www.facebook.com")) {
            console.log("aaa");
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

function deleteImage(imageIndex){
    if(imageIndex === '1'){
        previreImage1.setAttribute("src", '');
        $('#image-preview-src-1').hide();
        previreDefaultText1.style.display = "block";
    }else if(imageIndex === '2'){
        previreImage2.setAttribute("src", '');
        $('#image-preview-src-2').hide();
        previreDefaultText2.style.display = "block";
    }else if(imageIndex === '3'){
        previreImage3.setAttribute("src", '');
        $('#image-preview-src-3').hide();
        previreDefaultText3.style.display = "block";
    }else if(imageIndex === '4'){
        previreImage4.setAttribute("src", '');
        $('#image-preview-src-4').hide();
        previreDefaultText4.style.display = "block";
    }
}