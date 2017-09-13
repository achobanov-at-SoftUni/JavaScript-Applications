function solve() {
    "use strict";
    let appId = `kid_HJG9ISsbx`;
    let baseUrl = `https://baas.kinvey.com`;
    let postsData = {};


    $(`#btnLoadPosts`).on(`click`, function() {
        loadPosts();
    });

    $(`#btnViewPost`).on(`click`, function() {
        $(`#post-comments`).empty();
        viewComments();
    });


    function loadPosts() {
        let method = `GET`;
        let url = baseUrl + `/appdata/${appId}/posts`;
        let base64Token = btoa(`peter:p`);
        let headers = {"Authorization":`Basic ` + base64Token };

        let request = {
            method,
            url,
            headers
        };

        $.ajax(request)
            .then(fillSelect)
            .catch(renderError);
    }

    function viewComments() {
        let post = postsData[$(`#posts`).val()];
        $(`#post-title`).text(post.name);
        $(`#post-body`).text(post.content);
        let comments = post.comments;
        comments.forEach(x => $(`#post-comments`).append($(`<li>`).text(x)));
    }

    function fillSelect(data) {
        for (let entry of data) {
            let postName = entry.name;
            $(`#posts`)
                .append($(`<option>`)
                    .text(postName)
                    .attr(`data-id`, `${entry._id}`));
            postsData[postName] = {
                name: entry.name,
                content: entry.content,
                comments: entry.comments.split(`,`)
            };
        }
    }

    function renderError(err) {
        console.log(err);
    }

}