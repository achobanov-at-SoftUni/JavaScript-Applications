function solve() {
    "use strict";
    let appKey = `kid_BJXTsSi-e`;
    let appSecret = `447b8e7046f048039d95610c1b039390`;
    let serviceUrl = `https://baas.kinvey.com`;
    let username = `guest`;
    let password = `guest`;
    let authToken = btoa(`${username}:${password}`);

    loadStudents();

    $(`#newStudent`).on(`click`, function() {
        $(`#message`).attr(`style`, `display:none`);
        let id = $(`#id-input`).val();
        let firstName = $(`#first-name-input`).val();
        let lastName = $(`#last-name-input`).val();
        let facultyNumber = $(`#faculty-number-input`).val();
        let grade = $(`#grade-input`).val();

        let method = `POST`;
        let url = serviceUrl + `/appdata/${appKey}/students`;
        let headers = {
            "Authorization": `Basic ${authToken}`,
            "Content-Type": `application/json`
        };
        let data = {id, firstName, lastName, facultyNumber, grade};
        let request = {
            method,
            url,
            headers,
            data: JSON.stringify(data)
        };
        $.ajax(request)
            .then(renderSuccess)
            .catch(renderError);
    });

    function loadStudents() {
        let method = `GET`;
        let url = serviceUrl + `/appdata/${appKey}/students`;
        let headers = {
            "Authorization": `Basic ${authToken}`,
            "Content-Type": `application/json`
        };

        let request = {method, url, headers};
        $.ajax(request)
            .then(renderStudents)
            .catch(renderError);

    }

    function renderStudents(data) {
        for (let entry of data) {
            let id = entry.ID;
            let firstName = entry.FirstName;
            let lastName = entry.LastName;
            let facultyNumber = entry.FacultyNumber;
            let grade = entry.Grade;

            let newRow =
                `<tr>` +
                    `<td>${id}</td>` +
                    `<td>${firstName}</td>` +
                    `<td>${lastName}</td>` +
                    `<td>${facultyNumber}</td>` +
                    `<td>${grade}</td>` +
                `</tr>`;

            $(`table`).append($(newRow));
        }
    }

    function renderSuccess(_data) {
        $(`#message`)
            .text(`Success!`)
            .removeAttr(`style`)
            .css(`background-color`, `green`);
        setTimeout(function() {
            $(`#message`).fadeOut();
        }, 3000);
    }

    function renderError(err) {
        $(`#message`)
            .text(`Error: ${JSON.stringify(err)}`)
            .removeAttr(`style`)
            .css(`background-color`, `red`)
            .on(`click`, function() {
                 $(this).attr(`style`, `display: none`);
            });
    }
}