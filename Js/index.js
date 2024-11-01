"use strict";

const wrapper = $("#cards");
const globalSearch = $("#search");
const genersOption = $("#geners");
const searchForm=$('#search-form');
const likeCount=$('#like-count');
const refresh= $('#refresh');




const data = movies.splice(0, 4000)

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

//-------------- data readering ------------------------//

function renderData(data) {

    wrapper.innerHTML = ` <div class="loader"></div>`

    setTimeout(() => {

        if (data.length) {

            wrapper.innerHTML = "";

            data?.forEach(el => {
                const card = createElement('div', 'card shadow-2xl hover:translate-y-[-10px] duration-300 w-[330px] text-white  bg-h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500', `
                    <img src="${el.imgMax}" class="w-full h-[45%]" alt="smth">
                    
                    <div class=" card-body mx-2 pl-2 ">
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
                            <button id="read-more" class="button" data-id="${el.id}" >Read more</button>
                            <button id="add-like" data-like="${el.id}"> 
                            <i id="like" class="bi bi-star-fill" data-like="${el.id}"></i>
                            </button>
                            </div>
                        </ul>
                    </div>
                    `)

                wrapper.appendChild(card);
            })
        } else {
            wrapper.innerHTML = `<h1>No more movies to display.</h1>`
        }
    }, 2000)
}
renderData(normalize)


//------------- global search -----------------------//


globalSearch.addEventListener('keyup', (e) => {
    let filtereData = normalize.filter((el) => el.title.toLowerCase().includes(e.target.value.toLowerCase()));
    console.log(filtereData);
    renderData(filtereData);

});
//------------------ dynamic options -----------------------//

function filtereOptions(state) {

    const options = [];

    state.forEach((el) => {
        el.genres.forEach(g => {
            if (!options.includes(g)) {
                options.push(g);
            }

        });
    })
    options.sort();
    return options;
}

function renderOptions(state) {
    state.forEach((el) => {
        const option = createElement('option', 'option-item', el)
        genersOption.appendChild(option)
    })
}

renderOptions(filtereOptions(normalize));


//-------------- Search Form  ------------------------//



function multiSearch(state) {

    console.log($('#name').value);
    console.log($('#rating').value);
    console.log($('#geners').value);

    let filtereData = state.filter((el) => {

        console.log(el.title.toLowerCase())
        console.log(Number(el.rating))
        console.log(el.genres)

        return el.title.toLowerCase().includes($('#name').value.toLowerCase()) && Math.round(Number ($('#rating').value)) <= (el.rating) && el.genres.includes($('#geners').value)
    });

    renderData(filtereData)
}
searchForm.addEventListener('submit', e => {
    console.log("submit")
    multiSearch(normalize)
});

refresh.addEventListener('click',e=>{
    window.location.reload();
})


//---------------- Event delegation --------------------------------//

wrapper.addEventListener('click', (e) => {

    if (e.target.getAttribute('id')==="read-more" && e.target.nodeName==='BUTTON') {
        const id=e.target.getAttribute('data-id');
        localStorage.setItem('film-id',id)
        window.location.href="./film.html"

    }

//-----------------  add like   -----------------------------------//        

     else if (e.target.getAttribute('id')==="add-like" && e.target.nodeName==='BUTTON' || e.target.getAttribute('id')==="like") {

        let likedlist=JSON.parse(localStorage.getItem('liked-list')) || [];

        const id=e.target.getAttribute('data-like');


        if(!likedlist.includes(id)){
        likedlist.push(id);
        localStorage.setItem('liked-list',JSON.stringify(likedlist));
        renderLikeCount(likedlist);
        }else(
            alert('alreadyadd liked')
        )

    }
});


function renderLikeCount(data) {
    likeCount.textContent=data.length;
}

renderLikeCount(JSON.parse(localStorage.getItem('liked-list')));

//-------------------- dark mode -----------------------------------------------//

 // Dark mode'ni faollashtiruvchi funksiyani yozing
 function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  }

  // Foydalanuvchi tanlovini yuklang
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  // Tugmani bosish orqali dark mode'ni o'zgartirish
  document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);