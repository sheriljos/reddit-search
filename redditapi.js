export default {
    search: function (searchTerm, sortBy, searchLimit) {
        return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sortBy=${sortBy}&limit=${searchLimit}`)
        .then(res => res.json())
        .then(data => data.data.children.map(data => data.data))
        .catch(err => console.log(err))
    }
}