import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const searchInput = document.getElementById("item");
    
    if (!searchInput.value) {
        showErrorMessage();
    }

    const searchTerm = searchInput.value;
    const  limit     = document.getElementById("limit").value;
    const sortBy     = document.querySelector("input[name=inlineRadioOptions]:checked").value;

    searchInput.value = "";

    reddit.search(searchTerm, sortBy, limit)
    .then(result => displayItems(result))
    //TODO: catch should display error message
    
    function showErrorMessage() {
        const searchContainer    = document.getElementById("search-container");
        const searchForm         = document.getElementById("search");
        let errorComponent       = document.getElementsByClassName("alert-warning");
    
        if (errorComponent.length === 0) {
            errorComponent           = document.createElement("div");
            errorComponent.className = "alert alert-warning";
            errorComponent.innerHTML = "Search field should not be empty";
    
            searchContainer.insertBefore(errorComponent, searchForm);
            setTimeout(() => errorComponent.remove(), 3000);
        }
    }
    function displayItems(results) {
        let searchResult = '';

        results.forEach(result => {
            const imageResult = result.thumbnail.includes('jpg') ? result.thumbnail :
                "https://assets.prestashop2.com/sites/default/files/styles/blog_750x320/public/blog/2019/10/banner_error_404.jpg?itok=eAS4swln";

            searchResult = searchResult + 
            `
                <div class="card col-4 p-2 mb-1">
                    <img src=${imageResult} class="card-img-top" alt="..." height="200">
                    <div class="card-body">
                        <h5 class="card-title">${result.title}</h5>
                        <p class="card-text">${result.selftext.substring(0,150) + '...'}</p>
                        <a href="${result.url}" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            `
        });

        document.getElementById("results").innerHTML = searchResult;
    }
})

