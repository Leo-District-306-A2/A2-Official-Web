
let page_number = new URLSearchParams(window.location.search).get('page');
let pageNumber = 1;
pageNumber = page_number ? page_number : 1
pageNumber = parseInt(pageNumber);
let isSignedIn = sessionStorage.getItem("isSignedIn");
let signedUser = JSON.parse(sessionStorage.getItem("signedUser"));
let projects = [];
let pageSize = 10;
let projectCount = 0;

function renderProjectOperations(project, index) {
    if (isSignedIn && signedUser.authorisedFunctions.includes("projects")) {
        return "<div class=\"btn-group float-right\" role=\"group\" aria-label=\"Basic example\">\n              <button type=\"button\" class=\"btn btn-secondary\" onclick=\"edit_project('" + project.id + "')\"><i class=\"icofont-edit\"></i></button>\n              <button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteProject( '" + project.id + "', '" + project.title + "', " + index + ")\"><i class=\"icofont-ui-delete\"></i></button>\n            </div>";
    }
    return "";
}

function renderCaurosal(project) {
    return `<div id="images-project-${project.id}" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              ${project.image_1 !== "" ? `<li data-target="#images-project-${project.id}" data-slide-to="0" class="active"></li>` : ""}
              ${project.image_2 !== "" ? `<li data-target="#images-project-${project.id}" data-slide-to="1"></li>` : ""}
              ${project.image_3 !== "" ? `<li data-target="#images-project-${project.id}" data-slide-to="2"></li>` : ""}
              ${project.image_4 !== "" ? `<li data-target="#images-project-${project.id}" data-slide-to="3"></li>` : ""}
              ${project.image_1 === "" && project.image_2 === "" && project.image_3 === "" && project.image_4 === "" ? `<li data-target="#images-project-${project.id}" data-slide-to="0" class="active"></li>` : ""}
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
                <img class="d-block w-100" src="${project.image_4}" alt="Fourth slide">
              </div>` : ""}
              
              ${project.image_1 === "" && project.image_2 === "" && project.image_3 === "" && project.image_4 === "" ? `<div class="carousel-item active">
                <img class="d-block w-100" src="../../assets/img/projects/default.png" alt="First slide">
              </div>` : ""}
            </div>
            <a class="carousel-control-prev" href="#images-project-${project.id}" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#images-project-${project.id}" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>`;
}

function renderProject(project, index) {
    return `<div class="row mb-3">
        <div class="col-md-4">
          ${renderCaurosal(project)}
        </div>
        <div class="col-md-8 project-clickable">
          <h3 class="font-weight-bold" onclick="view_project(${project.id})">${project.title}</h3>
          <p class="project-content text-justify" onclick="view_project(${project.id})">
            ${project.description.length > 650 ? project.description.substring(0, 647) + " ..." : project.description}
            </p>
            <pre class="text-secondary">Published by: ${JSON.parse(project.published_by).name ? JSON.parse(project.published_by).name : JSON.parse(project.published_by).email} | Published date: ${project.published_date}</pre>
          ${renderProjectOperations(project, index)}
        </div>
      </div>`;
}

function renderProjects(pageNumber) {
    let projects_html = "";
    // let page_projects = paginate(projects, pageNumber);
    $('#projects').html("");
    if (projects.length > 0) {
        for (i = 0; i < projects.length; i++) {
            projects_html += renderProject(projects[i], i);
        }
        $('#projects').html(projects_html);
        renderPagination(projects, pageNumber);
        removePreloader();
    } else {
        $('#projects').html("<h5 class='text-center text-white'>Sorry! No project available!</h5>");
    }
}

function renderPagination(projects, activePage) {
    let out_html = ``;
    if (projects.length > 0) {
        out_html = `<nav aria-label="Page navigation" class="d-flex justify-content-center">
        <ul class="pagination">
          <li class="page-item">
            <button class="page-link" aria-label="Previous" onclick="previousPageClicked()">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </button>
          </li>
          `;

        let pagesCount = Math.ceil(projectCount / pageSize);
        for (i = 0; i < pagesCount; i++) {
            if (i === activePage - 1) {
                out_html += `<li class="page-item"><button class="page-link page-link-active" onclick="navigateToPage(${i + 1})">${i + 1}</button></li>`;
            } else {
                out_html += `<li class="page-item"><button class="page-link" onclick="navigateToPage(${i + 1})">${i + 1}</button></li>`;
            }
        }

        out_html += `<li class="page-item">
            <button class="page-link" aria-label="Next" onclick="nextPageClicked()">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>`;

        $('#pagination').html(out_html);
    }
}

function previousPageClicked() {
    if (pageNumber !== 1) {
        pageNumber -= 1;
        window.location.href = `?page=${pageNumber}`;
        // renderProjects(pageNumber);
    }
}

function nextPageClicked() {
    if (pageNumber !== Math.ceil(projectCount / pageSize)) {
        pageNumber += 1;
        window.location.href = `?page=${pageNumber}`;
        // renderProjects(pageNumber);
    }
}

function navigateToPage(page) {
    pageNumber = page;
    window.location.href = `?page=${pageNumber}`;
    // renderProjects(pageNumber);
}

function paginate(array, page_number) {
    return array.slice((page_number - 1) * pageSize, page_number * pageSize);
}

function renderNewProjectBtn() {
    if (isSignedIn && signedUser.authorisedFunctions.includes("projects")) {
        $('#new-project').html(`<a href="new/index.html" class="new-project-btn"><i class="icofont-justify-left"></i> New Project</a>`);
    }
}

function deleteProject(id, title, index) {
    $.alert({
        title: 'Do you want to delete project?',
        columnClass: 'medium',
        content: `Please confirm to delete <b>${title}</b> project.`,
        theme: 'dark',
        type: "red",
        buttons: {
            delete: {
                text: "Delete",
                btnClass: "btn-red",
                keys: ['enter', 'delete'],
                action: function () {
                    $.ajax({
                        url: "../../php/projects/deleteProject.php",
                        type: 'POST',
                        data: {
                            id: id,
                        },
                        success: function (response) {
                            if (response === 'success') {
                                projects.splice(index, 1);
                                renderProjects(pageNumber);
                                $.alert({
                                    title: 'Project deleted',
                                    columnClass: 'medium',
                                    content: 'Project deleted Successfully!',
                                    theme: 'dark',
                                    type: "blue"
                                });
                            } else {
                                $.alert({
                                    title: 'Project not deleted',
                                    columnClass: 'medium',
                                    content: 'Error happened while deleting project!',
                                    theme: 'dark',
                                    type: "red"
                                });
                            }
                        }
                    });
                }
            },
            cancel: {
                text: "Cancel",
                action: function () {
                }
            }
        }
    });
}

function edit_project(id) {
    window.location.href = `edit?id=${id}`;
}

function view_project(id) {
    window.location.href = `view?id=${id}`;
}

function removePreloader() {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
    }
}

// execute when page load
$.ajax({
    url: '../../php/projects/getProjects.php',
    type: 'GET',
    data:{
        start: ( pageNumber -1 ) * pageSize,
        size: pageSize
    },
    success: function (response) {
        // console.log(response);
        projectDetails = JSON.parse(response);
        projects = projectDetails['projects'];
        projectCount = parseInt(projectDetails['count'][0]['project_count']);
        // console.log(pageNumber);
        renderProjects(pageNumber);
    }
});

renderNewProjectBtn();

