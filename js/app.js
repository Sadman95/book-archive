// error handler
const errorMsg = meassage => {
    const errorText = document.getElementById('error-text');
    errorText.innerText = meassage;
    totalSearch.classList.add('d-none');
}


/* Search button onclick function */
const totalSearch = document.getElementById('total-search');
const searchField = document.getElementById('search-field');
const loadBooks = async () => {
    if(searchField.value === ''){
        errorMsg('please search for books');
    }

    else{
        errorMsg('');
        const url = `https://openlibrary.org/search.json?q=${searchField.value}`;
        const res = await fetch(url);
        const data = await res.json();
        displayBooksInfo(data.docs);
        searchField.value = '';
        details.textContent = '';
    }
}

/* Data load to site */
const displayBooksInfo = details => {
    if(details.length === 0){
        errorMsg('Nothing to Display');
    }
    else{
        const booksGallery = document.getElementById('books-gallery');
        booksGallery.textContent = '';
        /* total search results */
        totalSearch.classList.remove('d-none');
        totalSearch.innerText = `${details.length} results found`;
        details.forEach(detail => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div onclick="loadDetails('${detail.cover_i}', details)" 
                class="card h-100">
                    <img src= "https://covers.openlibrary.org/b/id/${detail.cover_i ? detail.cover_i : '<a href="#">No image</a>'}-M.jpg" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${detail.title}</h5>
                        1st published year: <p>${detail.first_publish_year}</p> 
                        <p class="card-text">Publisher: ${detail.publisher}</p>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="text-muted">By: ${detail.author_name}</a>
                    </div>
                </div>
            `;
            booksGallery.appendChild(div);
        }
        );
    }

}

/* Single book detail */
const details = document.getElementById('details');
details.classList.add('d-none');
const loadDetails = (info,displayDetail) =>{
    details.innerHTML = `
        <img src="https://covers.openlibrary.org/b/id/${info}-M.jpg" class="card-img-top" alt="...">
    `;
    displayDetail.classList.remove('d-none');
}


