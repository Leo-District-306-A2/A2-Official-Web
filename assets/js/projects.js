const fileInput = document.getElementById("projectImage");
const previewContainer = document.getElementById("image-preview")
const previreImage = previewContainer.querySelector(".image-preview-image");
const previreDefaultText = previewContainer.querySelector(".image-preview-default-text");


fileInput.addEventListener("change", function(){
    const file = this.files[0];
    console.log(file);
    if(file){
        const reader = new FileReader();
        previreDefaultText.style.display = "none";
        previreImage.style.display = "block";

        reader.addEventListener("load", function(){
            console.log(this);
            previreImage.setAttribute("src", this.result);
        });

        reader.readAsDataURL(file);
    }
});
