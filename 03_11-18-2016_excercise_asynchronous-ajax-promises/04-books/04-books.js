
$(function() {
    "use strict";
    $(`#create`).on(`click`, function() {
        let title = $(`#input-title`).val();
        let author = $(`#input-author`).val();
        let tags = $(`#input-author`).val();
        if (title === `` || author === `` || tags === ``) {
            renderError('Invalid book data.');
        } else {
            let book = newBook(author, title, tags);
            book.create();
            book.init();
        }
    })

});

let serviceUrl = `https://baas.kinvey.com`;
let appKey = `kid_r1nYrgpWx`;
let authToken = btoa(`admin:admin`);

let newBook = (function() {
    "use strict";
    let isbn = 0;
    class Book {
        constructor(title, author, tags, id) {
            this._title = title;
            this._author = author;
            this._tags = tags;
            this._isbn = isbn;
            this._id = id;
        }

        init() {
            let html =
                `<div class="book" id="${this._isbn} data-id="${this._id}">` +
                    `<input id="title" value="${this._title}" />` +
                    `<input id="author" value="${this._author}" />` +
                    `<input id="isbn" value="${this._isbn}" />` +
                    `<input id="tags" value="${this._tags}" />` +
                    `<input type="button" id="edit" />` +
                    `<input type="button" id="delete" />` +
                `</div>`;

            this.attach(html);
        }

        attach(html) {
            let fragment = $(html);
            let that = this;
            fragment.on(`click`, `#edit`, function() {
                this.author = $(`${that._isbn} #author`).val();
                this.title = $(`${that._isbn} #title`).val();
                this.tags = $(`${that._isbn} #tags`).val();
                let method = 'PUT';
                let url = serviceUrl + `/appdata/${appKey}/books/${this._id}`;
                let headers = {
                    "Authorization": `Basic ${authToken}`,
                    "Content-Type": `application/json`
                };
                let data = {
                    author: this._author,
                    title: this._title,
                    tags: this._tags,
                    isbn: this._isbn
                };

                let request = {
                    method,
                    url,
                    headers,
                    data: JSON.stringify(data)
                };

                $.ajax(request);
            });

            fragment.on(`click`, `#delete`, function() {
                let method = `DELETE`;
                let url = serviceUrl + `/appdata/${appKey}/books/${this._id}`;
                let headers = {
                    "Authorization": `Basic ${authToken}`,
                    "Content-Type": `application/json`
                };

                let request = { method, url, headers };
                $.ajax(request)
                    .then(() => $(`#${this._isbn}`).remove());
            });

            $(`#books`).append(fragment);
        }

        create() {
            let method = 'POST';
            let url = serviceUrl + `/appdata/${appKey}/books`;
            let headers = {
                "Authorization": `Basic ${authToken}`,
                "Content-Type": `application/json`
            };
            let data = {
                author: this._author,
                title: this._title,
                tags: this._tags,
                isbn: this._isbn
            };

            let request = {
                method,
                url,
                headers,
                data: JSON.stringify(data)
            };

            $.ajax(request);
        }

        get title() { return this._title }
        get author() { return this._author }
        get tags() { return this._tags }
        get isbn() { return this._isbn }

        set title(title) { this._title = title }
        set author(author) { this._author = author }
        set tags(tags) { this._tags = tags }
        set isbn(isbn) { this._isbn = isbn }

    }
    return function(title, author, tags) {
        isbn++;
        return new Book(title, author, tags);
    }
})();

function renderError(message) {
    "use strict";
    $(`#message`).text(message)
        .removeAttr(`style`)
        .css(`color`, `red`);
}
