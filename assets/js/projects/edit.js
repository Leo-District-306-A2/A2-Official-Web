let project_id = new URLSearchParams(window.location.search).get('id');
let project;

$.ajax({
    url: '../../../php/projects/getProject.php',
    type: 'GET',
    data: {
        id: project_id
    },
    success: function (response) {
        project = JSON.parse(response);
        alert(response);
    }
});
