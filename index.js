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
    .then(result => {console.log(result)})
    //TODO: catch should display error message
    
})

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

