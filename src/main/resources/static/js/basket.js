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
    let template = fetch('./html/basket_book.html').then(function(response) {
        return response.text()
    });
    let books = fetch('/book/all').then(function(response) {
        return response.json();
    });
    Promise.all([template, books])
        .then(function(response) {
            let resolvedData = response[1];
            const resolvedTemplate = response[0];
            let strip = document.querySelector('.basket-strip');
            let basket = localStorage.getObj('basket');
            resolvedData.forEach(book => {
                if(basket.includes(book.id)) {
                    let str = '';
                    book.authors.forEach(author => str += (' ' + author.name))
                    book.authors = str;
                    strip.innerHTML += mustacheRender(resolvedTemplate, book);
                }
            });
            initContactPage()
        });
}

loadBooks();

function initContactPage() {
    const basket = document.querySelectorAll('.basket-out-icon');
    let sum = 0;
    basket.forEach(function (star) {
        sum += +document.querySelector('.author-pic > h1').innerText;
        star.addEventListener('click', function () {
            star.parentNode.remove();
            let arr = localStorage.getObj('basket');
            id = +star.getElementsByTagName('p')[0].innerText;
            arr.remove(id);
            localStorage.setObj('basket', arr);
            initContactPage();
        })

    });
    document.querySelector('.sum').innerText = sum;

    document.querySelector('#make_order').addEventListener('click', function () {
        localStorage.setObj('basket', []);
        document.location.href = "./index.html";
    })
}