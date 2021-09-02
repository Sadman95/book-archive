// error handler
const errorText = document.getElementById('error-text');

/* Search button onclick function */
const totalSearch = document.getElementById('total-search');
const searchField = document.getElementById('search-field');
const loadBooks = async () => {
    if(searchField.value === ''){
        errorText.innerText = 'Pleasse search something'
        totalSearch.classList.add('d-none')
    }

    else{
        totalSearch.classList.remove('d-none')
        errorText.classList.add('d-none')
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
    const booksGallery = document.getElementById('books-gallery');
    booksGallery.textContent = '';
    /* total search results */
    totalSearch.innerText = `${details.length} results found`;
    details.forEach(detail => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadDetails('${detail.cover_i}')" 
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

/* Single book detail */
const details = document.getElementById('details');
const loadDetails = (info) =>{
    details.innerHTML = `
        <img src="https://covers.openlibrary.org/b/id/${info}-M.jpg" class="card-img-top" alt="...">
    `;
}


