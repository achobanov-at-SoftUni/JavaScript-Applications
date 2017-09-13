function solve() {
    "use strict";
    // MyApp - JudgeApp
    // let serviceUrl = `https://phonebook-81e42.firebaseio.com/phonebook.json`;
    let serviceUrl = 'https://phonebook-nakov.firebaseio.com/phonebook';
    $(`#btnLoad`).on(`click`, function () {
        ajaxGetPhoneBook(fillPhoneBook);
    });

    $(`#btnCreate`).on(`click`, function () {
        let person = $(`#person`);
        let phone = $(`#phone`);

        ajaxPostContact(person.val(), phone.val());
        person.val(``);
        phone.val(``);

        ajaxGetPhoneBook(fillPhoneBook)
    });

    function fillPhoneBook(phoneBook) {
        $(`#phonebook`).empty();
        for (let entry in phoneBook) {
            let contact = phoneBook[entry];
            let name = contact.person;
            let phone = contact.phone;
            let linkDelete = $(`<button>`).text(`Delete`)
                .on(`click`, function () {
                    ajaxDeleteContact(entry);
                });

            $(`#phonebook`)
                .append($(`<li>`).text(`${name}: ${phone} `)
                    .append(linkDelete));
        }
    }

    function ajaxGetPhoneBook(callback) {
        let url = serviceUrl + `.json`;
        $.ajax({url})
            .then((phoneBook) => callback(phoneBook));
            // .catch(displayError);
    }

    function ajaxPostContact(person, phone) {
        let url = serviceUrl + `.json`;
        let method = `POST`;
        let contact = {
            person,
            phone
        };

        let request = {
            url,
            method,
            data: JSON.stringify(contact),
        };

        $.ajax(request)
            .then(console.log(`Contact created.`));
            // .catch(displayError);
    }

    function ajaxDeleteContact(key) {
        let url = serviceUrl + `/${key}.json`;
        let method = `DELETE`;

        let request = {url, method};

        $.ajax(request)
            .then(function () {
                ajaxGetPhoneBook(fillPhoneBook);
            });
            // .catch(displayError);
    }

    // function displayError(err) {
    //     $("#phonebook").append($("<li>Error.</li>"));
    //     console.log(`err`);
    // }
}