"use strict";

const wrapperLikeFilms = $("#liked-list")

const db = movies.splice(0, 100)

const likedFilms = JSON.parse(localStorage.getItem("liked-list"));

//--------------- normalize data  -----------------------//

const normalize = db.map(el => {
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


const findResult = [];

function findFilmLinkedList(DB, likedList) {
    if (DB.length) {

        likedList.forEach(item => {
            if (likedList.length) {
                DB.forEach(el => {
                    if (likedList.includes(el.id)) {
                        if (!findResult.push(el)) {
                            findResult.push(el);

                        }

                    }
                })
            }
        });
    }
}

findFilmLinkedList(normalize, likedFilms)


//-------------- data readering ------------------------//

function renderData(data) {

    wrapperLikeFilms.innerHTML = ` <div class="loader"></div>`

    setTimeout(() => {

        if (data.length) {

            wrapperLikeFilms.innerHTML = "";

            data?.forEach(el => {
                const card = createElement('div', 'card shadow-2xl hover:translate-y-[-10px] duration-300 w-[330px] ', `
                    <img src="${el.imgMax}" class="w-full h-[45%]" alt="smth">
                    
                    <div class=" card-body mx-2 pl-2">
                        <h2 class="text-xl">${el.title.substring(0, 24)}...</h2> 
                        <ul>
                            <li>
                                <strong>Year: </strong><span>${el.year}</span>
                            </li>
                            <li>
                                <strong>Genre: </strong><span>${el.genres.join(", ")}</span>
                            </li>
                            <li>
                                <strong>Rating: </strong><span>${el.rating}</span>
                            </li>
                            <li>
                                <strong>Language: </strong><span>${el.language}</span>
                            </li>
                            <li>
                                <strong>Runtime: </strong><span>${el.time}</span>
                            </li>    
                            <div class="flex items-center  justify-between">

                            <button id="read-more" data-id="${el.id}">Read more</button>
                            <button id="add-like" data-del="${el.id}"> 
                            <i id="delete" class="bi bi-trash3" data-del="${el.id}"></i>

                            </button>
                            </div>
                        </ul>
                    </div>
                    `)

                    wrapperLikeFilms.appendChild(card);
            })
        } else {
            wrapperLikeFilms.innerHTML = `<h1 class="text-[40px] text-white w-full">Not found</h1>`
        }
    })
}
renderData(findResult)


wrapperLikeFilms.addEventListener('click',(e)=>{

    if (e.target.getAttribute('id')==='del-like' && e.target.nodeName==='BUTTON' || e.target.getAttribute('id')==='delete') {
    const id=e.target.getAttribute('data-del')
        removeLikedList(id);
}
})


function removeLikedList(id) {
    const result=likedFilms.filter(item=>item!==id);
    localStorage.setItem('liked-list',JSON.stringify(result));
    window.location.reload()
}


$('#go-back').addEventListener('click', () => {
    window.location.href = './index.html';
});