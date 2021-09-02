/* Search button onclick function */
const searchField = document.getElementById('search-field');
const loadBooks = async () => {
    const url = `https://openlibrary.org/search.json?q=${searchField.value}`;
    const res = await fetch(url);
    const data = await res.json();
    displayBooksInfo(data.docs);
    searchField.value = '';
}

/* Data load to site */
const displayBooksInfo = details => {
    const booksGallery = document.getElementById('books-gallery');
    booksGallery.textContent = '';
    /* total search results */
    const totalSearch = document.getElementById('total-search');
    totalSearch.innerText = `${details.length} results found`;
    details.forEach(detail => {
        // console.log(detail);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src= "https://covers.openlibrary.org/b/id/${detail.cover_i}-M.jpg" class="card-img-top" alt="...">
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






