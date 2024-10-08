const loadALlPosts = async (searchText) =>{
    document.getElementById('post-container').innerHTML = "";
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${searchText ? `?category=${searchText}` : ''}`);
    const data = await response.json();
    displayPosts(data.posts);
}

const postDemo = {
    "id": 101,
    "category": "Comedy",
    "image": "https://i.ibb.co/0QRxkd5/pexels-jan-kop-iva-3525908.jpg",
    "isActive": true,
    "title": "10 Kids Unaware of Their Costume",
    "author": {
        "name": "John Doe"
    },
    "description": "It is one thing to subject yourself to a costume mishap",
    "comment_count": 560,
    "view_count": 1568,
    "posted_time": 5
}

const displayPosts = (posts) =>{
    const postContainer = document.getElementById('post-container');
    console.log(posts[0])
    posts.forEach(post => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl">
            <div class="indicator">
                <span class="indicator-item badge ${post.isActive ? 'bg-green-600' : 'bg-red-500'}"></span>
                <div class="avatar">
                    <div class="w-24 rounded-xl">
                    <img src=${post.image}>
                    </div>
                </div>
                </div>
                <div class="space-y-4 w-full">
                <div class="flex gap-4 *:opacity-60">
                    <p># ${post.category}</p>
                    <p>Author: ${post.author.name}</p>
                </div>
                <h3 class="text-2xl font-bold opacity-70">
                    ${post.title}
                </h3>
                <p class="opacity-40">
                ${post.description}
                </p>
                <hr class="border border-dashed border-gray-300">
                <div class="flex justify-between *:font-bold [&amp;>*:not(:last-child)]:opacity-45">
                    <div class="flex gap-4">
                    <div class="space-x-2 flex items-center">
                        <i class="fa-regular fa-comment-dots" aria-hidden="true"></i>
                        <p>${post.comment_count}</p>
                    </div>
                    <div class="space-x-2 flex items-center">
                        <i class="fa-regular fa-eye" aria-hidden="true"></i>
                        <p>${post.view_count}</p>
                    </div>
                    <div class="space-x-2 flex items-center">
                        <i class="fa-regular fa-clock" aria-hidden="true"></i>
                        <p>${post.posted_time} Min</p>
                    </div>
                    </div>
                    <div class="opacity-100">
                    <button id="addToList" onclick="markAsRead('${post.description}',${post.view_count})" data-post="" class="addToList btn btn-circle bg-green-500 btn-sm">
                        <i class="fa-solid fa-envelope-open text-white" aria-hidden="true"></i>
                    </button>
                    </div>
                </div>
                </div>
            </div>
        `;
        postContainer.appendChild(div);
    });

}

const markAsRead = (description,view_count) =>{
    console.log(description,view_count);
    const markAsReadCounterEl = document.getElementById('markAsReadCounter');
    markAsReadCounterEl.innerText = parseInt(markAsReadCounterEl.innerText) + 1;
    const markAsReadContainer = document.getElementById('markAsReadContainer');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
        <p>${description}</p>
        <div class="flex items-center gap-2">
            <i class="fa-regular fa-eye" aria-hidden="true"></i>
            <p>${view_count}</p>
        </div> 
    </div>
    `;
    markAsReadContainer.appendChild(div);
}



loadALlPosts();

const handleSearchByCategory = () =>{
    const searchText = document.getElementById('searchPosts').value;
    loadALlPosts(searchText);
}