function mustacheRender(template, data) {
    Mustache.parse(template);
    return Mustache.render(template, data);
}

Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        // Второй параметр - число элементов, которые необходимо удалить
        return this.splice(idx, 1);
    }
    return false;
}

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

function loadBooks() {
    let template = fetch('./html/fav_book.html').then(function(response) {
        return response.text()
    });
    let books = fetch('/book/all').then(function(response) {
        return response.json();
    });
    Promise.all([template, books])
        .then(function(response) {
            let resolvedData = response[1];
            const resolvedTemplate = response[0];
            let strip = document.querySelector('.fav-strip');
            let basket = localStorage.getObj('fav');
            resolvedData.forEach(book => {
                if(basket.includes(book.id)) {
                    let str = '';
                    book.authors.forEach(author => str += (' ' + author.name))
                    book.authors = str;
                    strip.innerHTML += mustacheRender(resolvedTemplate, book);
                }
            })
        });
}

loadBooks();