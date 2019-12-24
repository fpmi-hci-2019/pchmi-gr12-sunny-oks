id = localStorage.getItem('bookId');

fetch('/book/' + id).then(function(response) {
    return response.json();
}).then(
    book => {
        document.querySelector('.profile-name').innerHTML = '<h1>'+ book.name +'</h1>';
        document.querySelector('.book-ava').innerHTML = '<img src="data:image/jpeg;base64,'+
            book.picture + '" width="300" height="400">';
        document.querySelector('.profile-info-block > h1').innerHTML = '<h1>'+ book.description +'</h1>';
    }
);