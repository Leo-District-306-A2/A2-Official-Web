let clubs_data = {};

$.getJSON("assets/js/home/clubs_data.json", (json) => {
    clubs_data = json;
});

function changeDistrict(district) {
    toggleDistrictActive(district);
    $('#leo-map-view').attr('src', `assets/img/home/leo_map/${district}.png`);
}

function toggleDistrictActive(district) {
    $('#a1').removeClass('district-active');
    $('#a2').removeClass('district-active');
    $('#b1').removeClass('district-active');
    $('#b2').removeClass('district-active');
    $('#c1').removeClass('district-active');
    $('#c2').removeClass('district-active');

    $(`#${district}`).addClass('district-active');
}

function viewClub(club) {
    let clubDetails = clubs_data[club];

    let socialMedia = clubDetails['social_media'];
    let officers = clubDetails['officers'];

    let social_html = "";
    let officers_html = "";

    if (socialMedia['web'] !== "") {
        social_html += `<a href="${socialMedia['web']}" title="View club website" target="_blank"><i class="icofont-web"></i></a>`
    }

    if (socialMedia['facebook'] !== "") {
        social_html += `<a href="${socialMedia['facebook']}" title="View club facebook" target="_blank"><i class="bx bxl-facebook"></i></a>`
    }

    if (socialMedia['instagram'] !== "") {
        social_html += `<a href="${socialMedia['instagram']}" title="View club instagram" target="_blank"><i class="bx bxl-instagram"></i></a>`
    }

    if (socialMedia['linkedin'] !== "") {
        social_html += `<a href="${socialMedia['linkedin']}" title="View club linkedin" target="_blank"><i class="bx bxl-linkedin"></i></a>`
    }

    if (socialMedia['youtube'] !== "") {
        social_html += `<a href="${socialMedia['youtube']}" title="View club youtube" target="_blank"><i class="bx bxl-youtube"></i></a>`
    }

    if (officers.length !== 0) {
        for(let i=0; i < officers.length; i++) {
            if(i % 2 === 0) {
                officers_html += `<div class="row align-items-center h-100 right-img-officer" >
                                <div class="col-md-3 pr-2">
                                    <img src="${ 'assets/img/home/clubs_data/' + officers[i]['img'] }" class="view-club-officer-img float-right">
                                </div>
                                <div class="col-md-9 text-left pl-2 view-club-officer-details justify-content-center">
                                    <h6 class="m-0 font-weight-bold">${ officers[i]['designation'] }</h6>
                                    <p class="m-0">${ officers[i]['name'] }</p>
                                </div>
                            </div>`;
            } else {
                officers_html += `<div class="row align-items-center h-100 left-img-officer" >
                                <div class="col-md-9 text-right pr-2 view-club-officer-details justify-content-center">
                                    <h6 class="m-0 font-weight-bold">${ officers[i]['designation'] }</h6>
                                    <p class="m-0">${ officers[i]['name'] }</p>
                                </div>
                                <div class="col-md-3 pl-2">
                                    <img src="${ 'assets/img/home/clubs_data/' + officers[i]['img'] }" class="view-club-officer-img float-left">
                                </div>
                            </div>
                            <div class="row align-items-center h-100 right-img-officer mobile-left-img-officer" >
                                <div class="col-md-3 pr-2">
                                    <img src="${ 'assets/img/home/clubs_data/' + officers[i]['img'] }" class="view-club-officer-img float-right">
                                </div>
                                <div class="col-md-9 text-left pl-2 view-club-officer-details justify-content-center">
                                    <h6 class="m-0 font-weight-bold">${ officers[i]['designation'] }</h6>
                                    <p class="m-0">${ officers[i]['name'] }</p>
                                </div>
                            </div>
`;
            }
        }
    } else {
        officers_html += '<p class="small-text text-center text-secondary">Sorry! No officers data available.</p>'
    }

    $('#view-club-logo').attr('src', 'assets/img/home/clubs_data/' + clubDetails['logo']);
    $("#view-club-title").text(clubDetails['club']);
    $("#view-club-officers").html(officers_html);
    $("#view-club-social-media").html(social_html);
    $('#club-details-modal').modal('show');
}
