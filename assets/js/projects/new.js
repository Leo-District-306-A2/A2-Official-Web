let isSignedIn =  sessionStorage.getItem("isSignedIn");
let signedUser =  JSON.parse(sessionStorage.getItem("signedUser"));
let host = "";
$.getJSON("../../../configs.json", (json) => {
    host = (json['host']);
});

if (!isSignedIn || !signedUser.authorisedFunctions.includes("projects")) {
    window.onload = function() {
        // similar behavior as an HTTP redirect
        window.location.replace(host);
    }
}


const fileInput1 = document.getElementById("image_1_uploader");
const previewContainer1 = document.getElementById("image-preview-1")
const previreImage1 = previewContainer1.querySelector(".image-preview-image");
const previreDefaultText1 = previewContainer1.querySelector(".image-preview-default-text");


fileInput1.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        previreDefaultText1.style.display = "none";
        previreImage1.style.display = "block";

        reader.addEventListener("load", function(){
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


fileInput2.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        previreDefaultText2.style.display = "none";
        previreImage2.style.display = "block";

        reader.addEventListener("load", function(){
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


fileInput3.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        previreDefaultText3.style.display = "none";
        previreImage3.style.display = "block";

        reader.addEventListener("load", function(){
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


fileInput4.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        previreDefaultText4.style.display = "none";
        previreImage4.style.display = "block";

        reader.addEventListener("load", function(){
            previreImage4.setAttribute("src", this.result);
        });

        reader.readAsDataURL(file);
    }
});

function saveProject() {
    let title = $('#title').val();
    let description = $('#description').val();
    let facebook = $('#facebook').val();
    let image_1 = $('#image-preview-src-1').attr('src');
    let image_2 = $('#image-preview-src-2').attr('src');
    let image_3 = $('#image-preview-src-3').attr('src');
    let image_4 = $('#image-preview-src-4').attr('src');
    let published_by = JSON.stringify(signedUser);

    if(isValidated()) {
        $.ajax({
            url: '../../../php/projects/addProject.php',
            type: 'POST',
            data: {
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

function isValidated() {
    return true;
}
