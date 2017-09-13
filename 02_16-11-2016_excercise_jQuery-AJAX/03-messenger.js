function solve() {
    "use strict";
    let baseUrl = `https://messenger-24a58.firebaseio.com/messenger`;

    $(`#submit`).on(`click`, function() {
        let author = $(`#author`).val();
        let content = $(`#content`).val();
        let timestamp = Date.now();
        if (author !== `` && content !== ``) {
            let data = {author, content, timestamp};
            let method = `POST`;
            let url = baseUrl + `.json`;

            $.ajax({method, url, data: JSON.stringify(data)})
                .then(console.log(`success`));
                // .catch((err) => console.log(err));
        }
    });

    $(`#refresh`).on(`click`, function() {
        let url = baseUrl + `.json`;
        let method = `GET`;
        let request = {method, url};
        $.ajax(request)
            .then(renderMessages)
            .catch((err) => console.log(err));

    });

    function renderMessages(data) {
        "use strict";
        $(`#messages`).val();
        let output = ``;
        for (let msg in data) {
            let message = data[msg];
            let name = message.author;
            let content = message.content;
            if (output !== ``) output += `\n`;
            output += `${name}: ${content}`;
        }

        $(`#messages`).text(output);
    }
}



