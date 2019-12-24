function loadBooks() {
    let template = fetch('./html/book.html').then(function(response) {
        return response.text()
    });
    let books = fetch('/book/all').then(function(response) {
        return response.json();
    });
    Promise.all([template, books])
        .then(function(response) {
            let resolvedData = response[1];
            const resolvedTemplate = response[0];
            let strip = document.querySelector('.strip');
            let basket = localStorage.getObj('basket');
            resolvedData.forEach(book => {
                if(basket.contains(id)) {
                    let str = '';
                    book.authors.forEach(author => str += (' ' + author.name))
                    book.authors = str;
                    strip.innerHTML += mustacheRender(resolvedTemplate, book);
                }
            })
        });
}