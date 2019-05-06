(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID 7a7e82bf707c1d4b987e67b45fb7674abd134b163f6180491bcf1cd05946f1f2'
    }
}).then(function(response) {
return response.json();
}).then(addImage);

function addImage(data)
{
    const firstImage = data.results[0];
        
            responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                    <img src="${firstImage.urls.small}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`
            );

}

fetch('http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=gxLwGsDQuYgBwulhQiwi6J7K5H62hfBY').then(response=>response.json()).then(addArticle);
function addArticle(data)
{
    console.log(data);
    let htmlContent = '';   
     if (data && data.response.docs && data.response.docs[0]) {
       htmlContent = '<ul>' + data.response.docs.map(article =>
         `<li class="article">
           <h2><a href="${article.web_url}" target="_blank">${article.headline.main}</a></h2>
           <p>${article.snippet}</p>
         </li>`
       ).join('') + '</ul>';
     } else {
       htmlContent = '<div class="error-no-articles">No article available</div>';
     }
   
     responseContainer.insertAdjacentHTML('beforeend', htmlContent);
}

    });
})();
