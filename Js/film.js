
const filmId=localStorage.getItem('film-id')
// const goBack = $('#go-back');
const filmWrapper = $('#film-wrapper');


const data = movies.splice(0, 100)

//--------------- normalize data  -----------------------//

const normalize = data.map(el => {
    return {
        title: el.title,
        year: el.year,
        genres: el.categories,
        id: el.imdbId,
        rating: el.imdbRating,
        time: `${Math.floor(el.runtime / 60)}H ${el.runtime % 60}m`,
        language: el.language,
        youtube: `https://youtube.com/embed/${el.youtubeId}`,
        summary: el.summary,
        imgMax: el.bigThumbnail,
        imgMin: el.smallThumbnail,
    }
});

function findFilmById(filmidmovies) {
    return normalize.filter((el)=>el.id===filmidmovies)[0]
}

const state =findFilmById(filmId);


function renderFilmData(data) {
    filmWrapper.innerHTML=`

    <iframe class="mt-[80px]" id="video" width="100%" height="600px" src="${data.youtube}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

     <h1 id="film-title" class="text-[50px] text-white">Film Name:</h1>
    
    <h2 id="film-title" class="text-[50px] text-white">${data.title}</h2>

       <button id="go-back" class="button" >go back</button>


    `

}

renderFilmData(state);


$('#go-back').addEventListener('click', () => {
    window.location.href = './index.html';
});