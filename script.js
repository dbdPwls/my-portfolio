document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleDark");
  toggle.addEventListener("change", () => {
    const isDark = toggle.checked;
    document.body.classList.toggle("dark", isDark);
    document.getElementById("mode-label").textContent = isDark ? "Dark Mode" : "Light Mode";
  });

  window.copyEmail = function () {
    navigator.clipboard.writeText("dbddpwls@naver.com").then(() => {
      alert("Email copied to clipboard💚");
    });
  };

  fetchPosts();
});

function searchPosts() {
  const keyword = document.getElementById("search").value.toLowerCase();
  const posts = document.querySelectorAll(".post-item");
  posts.forEach(post => {
    post.style.display = post.textContent.toLowerCase().includes(keyword) ? "block" : "none";
  });
}

function fetchPosts() {
  const container = document.getElementById("posts-container");
  const files = ["posts/post1.json", "posts/post2.json"]; // 추가 가능

  container.innerHTML = ""; // 초기화

  files.forEach(file => {
    fetch(file)
      .then(res => res.json())
      .then(data => {
        const div = document.createElement("div");
        div.className = "post-item";
        div.innerHTML = `<h3>${data.title}</h3><p>${data.date}</p><p>${data.summary}</p>`;
        container.appendChild(div);
      })
      .catch(() => {
        console.error(`Failed to load ${file}`);
      });
  });
}
