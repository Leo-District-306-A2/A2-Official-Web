$.getJSON("../../assets/js/team/council_data.json", (council_data) => {
  const council = council_data.council;
  let html = "";
  for (let i = 0; i < council.length; i++) {
        const team = council[i];
        let title='';
        if(i===0){
            title =`<div class="section-title">
            <h2>our leaders</h2>           
        </div>`
        }else{
            title = ``;
        }
        html+=`<section id="team${i+1}" class="team">
        <div class="container">
                <div class="section-title">   
                ${title}        
                    <h3>${team.designationCategory}</h3>
                </div>`;
                html += ` <div class="row justify-content-center" data-aos="fade-up">`
        for(let j = 0; j<team.officers.length; j++){
            html+= `<div class="col-lg-3 col-md-6 d-flex animate1">
            <div class="member">
                <div class="member-img">
                    <img src="../../assets/img/team/imgs/${team.officers[j].img}" class="img-fluid" alt="">
 
                </div>
                <div class="member-info">
                    <h4>${team.officers[j].name}</h4>
                    <span>${team.officers[j].designation}</span>
                </div>
            </div>
        </div>`;
        }
        html += `</div></div></section>`
        
    }
    $('#teamDetails').html(html);
});

