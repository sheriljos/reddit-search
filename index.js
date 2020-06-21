const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const searchInput = document.getElementById("item");
    
    if (!searchInput.value) {
        showErrorMessage();
    }

    const searchTerm = searchInput.value;
    const sortBy     = document.getElementById("limit").value;
    const limit      = document.querySelector("input[name=inlineRadioOptions]:checked").value;
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

