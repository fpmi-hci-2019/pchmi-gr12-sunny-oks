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

if(!localStorage.getObj('fav')) {
    localStorage.setObj('fav', []);
}
if(!localStorage.getObj('basket')) {
    localStorage.setObj('basket', []);
}


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
            resolvedData.forEach(book => {
                let str = '';
                book.authors.forEach(author => str += (' ' + author.name))
                book.authors = str;
                strip.innerHTML += mustacheRender(resolvedTemplate, book);

            })
            initContactPage();
        });
}

function openBook(id) {
    localStorage.setItem('bookId', id);
    document.location.href = "./book.html";
}

loadBooks();

function initContactPage() {
    const stars = document.querySelectorAll('.star');

    stars.forEach(function (star) {
        let id = +star.getElementsByTagName('p')[0].innerText;
        let img = star.getElementsByTagName('img')[0];
        if(!localStorage.getObj('fav').includes(id)) {
            img.src = 'assets/pics/star_unselected.png';
        }
        else {
            img.src = 'assets/pics/star.png';
        }
        star.addEventListener('click', function () {
            id = +star.getElementsByTagName('p')[0].innerText;
            img = star.getElementsByTagName('img')[0];
            if(!localStorage.getObj('fav').includes(id)) {
                let arr = localStorage.getObj('fav');
                arr.push(id);
                localStorage.setObj('fav', arr);
                img.src = 'assets/pics/star.png';
            }
            else {
                let arr = localStorage.getObj('fav');
                arr.remove(id);
                localStorage.setObj('fav', arr);
                img.src = 'assets/pics/star_unselected.png';
            }
        })
    });

    const basket = document.querySelectorAll('.basket-in-icon');

    basket.forEach(function (star) {
        id = +star.getElementsByTagName('p')[0].innerText;
        img = star.getElementsByTagName('img')[0];
        if(!localStorage.getObj('basket').includes(id)) {
            img.src = 'assets/pics/korzina.png';
        }
        else {
            img.src = 'assets/pics/basket-out.png';
        }
        star.addEventListener('click', function () {
            id = +star.getElementsByTagName('p')[0].innerText;
            img = star.getElementsByTagName('img')[0];
            if(!localStorage.getObj('basket').includes(id)) {
                let arr = localStorage.getObj('basket');
                arr.push(id);
                localStorage.setObj('basket', arr);
                img.src = 'assets/pics/korzina.png';
            }
            else {
                let arr = localStorage.getObj('basket');
                arr.remove(id);
                localStorage.setObj('basket', arr);
                img.src = 'assets/pics/basket-out.png';
            }
        })
    });

}
/*
function loadContactsSearch(searchParams) {
    if(!searchParams)
        searchParams = getSearchParameters();
    fetch('/ContactBook/search/length', {
        method: 'POST',
        body: JSON.stringify(searchParams)
    }).then(function(response) {
        return response.text()
    })
        .then(function (length) {
            loadContactsSearchPage(1, length, searchParams);
        });
}

function loadContactsSearchPage(page, length, searchParams) {
    const data = fetch('/search?page=' + page, {
        method: 'POST',
        body: JSON.stringify(searchParams)
    }).then(function(response) {
        return response.json()
    });
    loadContactsTable(data, length, page, searchParams);
}

function loadContactsPage(page, length) {
    const data = fetch('/ContactBook/contacts?page=' + page).then(function(response) {
        return response.json()
    });
    loadContactsTable(data, length, page, null);
}

function loadContactsTable(data, length, page, searchParams) {
    setTab('home');
    length = parseInt(length);
    const numPages = Math.floor(length / 10) + ((length % 10 === 0) ? 0 : 1);
    const template = fetch('../resources/html/contact_table.html?' + Math.random()).then(function(response) {
        return response.text()
    });
    Promise.all([data, template])
        .then(function(response) {
            const resolvedData = response[0];
            const resolvedTemplate = response[1];
            document.getElementById('main_content').innerHTML = mustacheRender(resolvedTemplate, resolvedData);

            const ul = document.querySelector('.pagination');
            for(let i = 1; i <= numPages; i++) {
                const li = document.createElement('li');
                li.classList.add('page-item');
                if(i === page)
                    li.classList.add('active');
                const a = document.createElement('a');
                a.classList.add('page-link');
                a.innerText = i;
                if(searchParams)
                    a.addEventListener('click', loadContactsSearchPage.bind(null, i, length, searchParams));
                else
                    a.addEventListener('click', loadContactsPage.bind(null, i, length));
                li.appendChild(a);
                ul.appendChild(li);
            }
            initContactPage();
        }).catch(function(error) {
        console.log('Unable to get all template data: ', error.message)
    });
}

function initContactPage() {
    const table = document.querySelector('#table_contact');
    const btnDelete = document.querySelector('#delete_contact');
    const btnEmail = document.querySelector('#send_email');
    const checkboxes = document.querySelectorAll('input.checkbox');

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function () {
            checkboxChanged(table, btnDelete);
            checkboxChanged(table, btnEmail);
        })
    });

    btnDelete.disabled = true;
    btnEmail.disabled = true;

    btnEmail.addEventListener('click', function () {
        const rows = document.querySelectorAll('tbody > tr');
        let ids = [];
        let emails = [];
        rows.forEach(function (row) {
            const checkbox = row.querySelector('input.checkbox');
            if(checkbox.checked) {
                ids.push(row.querySelector('.d-none').textContent);
                emails.push(row.querySelector('.email').textContent);
            }
        });
        loadEmailForm(ids, emails);
        history.pushState(null, null, '/ContactBook/mail')
    });

    const rows = document.querySelectorAll('tr');
    rows.forEach(function (row) {
        var id = row.querySelector('.d-none').textContent;
        var a = row.querySelector('a');
        if (a)
            a.addEventListener('click', function () {
                parseUrl('/ContactBook/edit', true);
                loadContactFormForEdit(id);
            }, false);
    });

    btnDelete.addEventListener('click', function () {
        const rows = document.querySelectorAll('tbody > tr');
        let ids = [];
        rows.forEach(function (row) {
            const checkbox = row.querySelector('input.checkbox');
            if(checkbox.checked) {
                ids.push(row.querySelector('.d-none').textContent);
            }
        });
        fetch('/ContactBook/contacts', {
            method: 'DELETE',
            body: JSON.stringify(ids),
        }).then(loadContacts())
            .catch(function(error) {
                console.log('cannot delete contacts');
            });
    });
}*/