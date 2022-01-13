let project_id = new URLSearchParams(window.location.search).get('id');
let project;
let isSignedIn = sessionStorage.getItem("isSignedIn");
let signedUser = JSON.parse(sessionStorage.getItem("signedUser"));

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
                <img class="d-block w-75" style="max-height: 80vh; margin-left:auto; margin-right:auto;" src="${project.image_1}" alt="First slide">
              </div>` : ""}
              ${project.image_2 !== "" ? `<div class="carousel-item">
                <img class="d-block w-75" style="max-height: 80vh; margin-left:auto; margin-right:auto;" src="${project.image_2}" alt="Second slide">
              </div>` : ""}
              ${project.image_3 !== "" ? `<div class="carousel-item">
                <img class="d-block w-75" style="max-height: 80vh; margin-left:auto; margin-right:auto;" src="${project.image_3}" alt="Third slide">
              </div>` : ""}
              ${project.image_4 !== "" ? `<div class="carousel-item">
                <img class="d-block w-75" style="max-height: 80vh; margin-left:auto; margin-right:auto;" src="${project.image_1}" alt="Fourth slide">
              </div>` : ""}
              
              ${project.image_1 === "" && project.image_2 === "" && project.image_3 === "" && project.image_4 === "" ? `<div class="carousel-item active">
                <img class="d-block w-75" style="max-height: 80vh; margin-left:auto; margin-right:auto;" src="../../../assets/img/projects/default.png" alt="First slide">
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
                    ${ project.facebook !== ""? `<a href="${ project.facebook }" class="btn btn-sm btn-primary float-left text-capitalize view-on-facebook-btn mt-5" target="_blank"><i class="icofont-facebook"></i>&nbsp;View on Facebook</a>`: "" }
                <pre class="text-secondary text-right float-right text-capitalize">Published By: <a class="published-user-name">${JSON.parse(project.published_by).name ? JSON.parse(project.published_by).name : JSON.parse(project.published_by).email}</a><br>Published date/time: ${project.published_date}</pre>
                    ${ renderProjectOperations(project) }
            `;
    renderCarosel(project);
    $('#project-content').html(project_html);
    removePreloader();
}

function renderProjectOperations(project) {
    if (isSignedIn && signedUser.authorisedFunctions.includes("projects")) {
        return "<br><br><br><div class=\"btn-group float-right\" role=\"group\" aria-label=\"Basic example\">\n              <button type=\"button\" class=\"btn btn-secondary\" onclick=\"edit_project('" + project.id + "')\"><i class=\"icofont-edit\"></i></button>\n              <button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteProject( '" + project.id + "', '" + project.title + "')\"><i class=\"icofont-ui-delete\"></i></button>\n            </div>";
    }
    return "";
}

function deleteProject(id, title) {
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
                        url: "../../../php/projects/deleteProject.php",
                        type: 'POST',
                        data: {
                            id: id,
                        },
                        success: function (response) {
                            if (response === 'success') {
                                $.alert({
                                    title: 'Project deleted',
                                    columnClass: 'medium',
                                    content: 'Project deleted Successfully!',
                                    theme: 'dark',
                                    type: "blue",
                                    buttons: {
                                        ok: {
                                            text: "OK",
                                            action: function () {
                                                window.location.href = `/pages/projects`;
                                            }
                                        }
                                    }
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
    window.location.href = `../edit?id=${id}`;
}

$.ajax({
    url: '../../../php/projects/getProject.php',
    type: 'GET',
    data: {
        id: project_id
    },
    success: function (response) {
        if (response !== "error") {
            project = JSON.parse(response);
            renderProject(project);
        } else {
            $('#project-content').html("<h5 class='text-center text-white text-capitalize'>Sorry! Project Not Found</h5>");
        }
    }
});

function removePreloader() {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
    }
}
