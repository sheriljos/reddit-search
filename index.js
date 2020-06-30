import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const searchInput = document.getElementById("item");
    
    if (!searchInput.value) {
        showErrorMessage(
            "Search field should not be empty",
            "alert-warning"
        );

        return;
    }

    const searchTerm = searchInput.value;
    const  limit     = document.getElementById("limit").value;
    const sortBy     = document.querySelector("input[name=inlineRadioOptions]:checked").value;

    searchInput.value = "";

    reddit.search(searchTerm, sortBy, limit)
    .then(result => displayItems(result))
    .catch(err => showErrorMessage(
        "Oops! Try again",
        "alert-danger"
    ));
    
    function showErrorMessage(text, classType) {
        const searchContainer    = document.getElementById("search-container");
        const searchForm         = document.getElementById("search");
        let errorComponent       = document.getElementsByClassName(classType);
    
        if (errorComponent.length === 0) {
            let errorComponent           = document.createElement("div");
            errorComponent.className = `alert ${classType}`;
            errorComponent.innerHTML = text;
    
            searchContainer.insertBefore(errorComponent, searchForm);
            setTimeout(() => errorComponent.remove(), 3000);
        }
    }
    function displayItems(results) {
        console.log(results)
        if (results == 0) {
            showErrorMessage(
                "We could not find any article you searched",
                "alert-danger"
            )

            return;
        }
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

