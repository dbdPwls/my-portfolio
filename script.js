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
  const files = ["posts/post1.json", "posts/post2.json", "posts/post3.json", "posts/post4.json"];

  container.innerHTML = ""; // 초기화

  // 모든 fetch 요청을 동시에 실행한 뒤, 응답이 다 오면 처리
  Promise.all(
    files.map(file =>
      fetch(file)
        .then(res => res.json())
        .then(data => ({ ...data, file }))
        .catch(() => {
          console.error(`Failed to load ${file}`);
          return null;
        })
    )
  ).then(posts => {
    // null 값 제거
    const validPosts = posts.filter(post => post !== null);

    // 날짜 기준으로 내림차순 정렬 (최근 것이 위로)
    validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 화면에 렌더링
    validPosts.forEach(data => {
      const div = document.createElement("div");
      div.className = "post-item";
      div.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.date}</p>
        ${data.image ? `<img src="${data.image}" alt="${data.title}" class="post-img">` : ""}
        <p>${data.summary}</p>
      `;
      container.appendChild(div);
    });
  });
}


