let project_id = new URLSearchParams(window.location.search).get('id');
let project;

function renderCarosel(project) {
    let html_out = `<div id="carouselIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              ${project.image_1 !== "" ? `<li data-target="#carousel-indicators" data-slide-to="0" class="active"></li>` : ""}
              ${project.image_2 !== "" ? `<li data-target="#carousel-indicators" data-slide-to="1"></li>` : ""}
              ${project.image_3 !== "" ? `<li data-target="#carousel-indicators" data-slide-to="2" ></li>` : ""}
              ${project.image_4 !== "" ? `<li data-target="#carousel-indicators" data-slide-to="3"></li>` : ""}
              ${project.image_1 === "" && project.image_2 === "" && project.image_3 === "" && project.image_4 === "" ? `<li data-target="#carousel-indicators" data-slide-to="0" class="active"></li>` : ""}
            </ol>
            <div class="carousel-inner">
                ${project.image_1 !== "" ? `<div class="carousel-item active">
                <img class="d-block w-100" src="${project.image_1}" alt="First slide">
              </div>` : ""}
              ${project.image_2 !== "" ? `<div class="carousel-item">
                <img class="d-block w-100" src="${project.image_2}" alt="Second slide">
              </div>` : ""}
              ${project.image_3 !== "" ? `<div class="carousel-item">
                <img class="d-block w-100" src="${project.image_3}" alt="Third slide">
              </div>` : ""}
              ${project.image_4 !== "" ? `<div class="carousel-item">
                <img class="d-block w-100" src="${project.image_1}" alt="Fourth slide">
              </div>` : ""}
              
              ${project.image_1 === "" && project.image_2 === "" && project.image_3 === "" && project.image_4 === "" ? `<div class="carousel-item active">
                <img class="d-block w-100" src="../../../assets/img/projects/default.png" alt="First slide">
              </div>` : ""}
            </div>
            <a class="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>`;

    $('#project-carousel').html(html_out);
}

function renderProject(project) {
    let project_html = `<h4 class="text-white font-weight-bold">${project.title}</h4>
                <p class="text-justify">
                ${project.description}
                    </p>
                <pre class="text-secondary text-right float-right text-capitalize">Published By: <a class="published-user-name">Thilina Jayathilaka</a><br>Published date/time: ${project.published_date}</pre>
            `;
    renderCarosel(project);
    $('#project-content').html(project_html);
}

$.ajax({
    url: '../../../php/projects/getProject.php',
    type: 'GET',
    data: {
        id: project_id
    },
    success: function (response) {
        project = JSON.parse(response);
        renderProject(project);
    }
});
