import { blog_backend } from "../../declarations/blog_backend";

// Tüm yazıları backend'den çekip listeye ekler
async function fetchPosts() {
    const posts = await blog_backend.getPosts();
    const postList = document.getElementById("postList");
    postList.innerHTML = ""; // Mevcut listeyi temizle

    posts.forEach(post => {
        const postDiv = createPostElement(post);
        postList.appendChild(postDiv);
    });
}

// Yeni yazıyı backend'e ekler ve anında listeye ekler
async function addPost() {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title && content) {
        const newPost = await blog_backend.addPost(title, content);
        const postList = document.getElementById("postList");

        // Yeni yazıyı listeye ekle
        const newPostDiv = createPostElement(newPost);
        postList.appendChild(newPostDiv);

        // Inputları temizle
        titleInput.value = "";
        contentInput.value = "";
    }
}

// Bir yazıyı DOM elementine çevirir
function createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>${new Date(Number(post.createdAt / 1000000n)).toLocaleString()}</small>
        <br />
        <button onclick="editPost(${post.id})">Düzenle</button>
        <button onclick="deletePost(${post.id})">Sil</button>
    `;
    return postDiv;
}

// Bir yazıyı siler ve listeyi günceller
async function deletePost(id) {
    await blog_backend.deletePost(id);
    fetchPosts(); // Listeyi yeniden yükle
}

// Sayfa yüklendiğinde yazıları getir
window.onload = fetchPosts;
