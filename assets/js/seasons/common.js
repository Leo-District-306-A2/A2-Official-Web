let curr_date = new Date();
let season = false;

if (curr_date.getMonth() === 11) {
    season = 'christmas';
} else if (curr_date.getMonth() === 0 && curr_date.getDate() < 10) {
    season = 'new_year';

}
