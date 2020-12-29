function changeDistrict(district) {
    toggleDistrictActive(district);
    $('#leo-map-view').attr('src',`assets/img/home/leo_map/${district}.png`);
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
