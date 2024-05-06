
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const formattedDate = `${day}/${month}/${year}`;

if (window.location.pathname === '/makePost.html') {
    const form = document.querySelector(".form");

    form.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });
        data["date"] = formattedDate
        console.log("Data to be sent:", data);

        fetch('http://localhost:3000/make_post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            form.reset();
            console.log("reset")
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

if (window.location.pathname === '/home.html') {

    fetch('http://localhost:3000/post_data')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(posts => {
        const postlist = document.getElementById('post-list');

        posts.reverse();

        posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const titleElement = document.createElement('h2');
        postElement.classList.add('post-title');
        titleElement.textContent = post.Title;

        const authorElement = document.createElement('p');
        postElement.classList.add('post-author');
        authorElement.textContent = `Author: ${post.Author}`;

        const contentElement = document.createElement('p');
        postElement.classList.add('post-content');
        contentElement.textContent = post.Content;

        const likesElement = document.createElement('p');
        postElement.classList.add('post-likes');
        likesElement.textContent = post.Likes;

        const dateElement = document.createElement('p');
        postElement.classList.add('post-date');
        dateElement.textContent = post.Date;

        const idElement = document.createElement('button');
        idElement.textContent = post.Id;
        idElement.addEventListener('click', () => fetchPost(post.Id));

        // Append elements to the post container
        postElement.appendChild(titleElement);
        postElement.appendChild(authorElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(likesElement);
        postElement.appendChild(dateElement);
        postElement.appendChild(idElement);
        
        postlist.appendChild(postElement);
        
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchPost(id) {
    fetch(`http://localhost:3000/post/${id}`)  // Make a request to the server

    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Parse the JSON response
    })
    .then(data => {
        // Use the data to populate the content of the page
        console.log(data);
        
        // Example: Open the /post/49 page on the client
        window.location.href = `/post/${id}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
