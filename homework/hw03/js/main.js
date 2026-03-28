// requires utilities.js to be loaded first:
// included in index.html

const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "emedlock"; // change to your username :)
let password = "password";

// INITIALIZES SCREEN BY CALLING VARIOUS HELPER FUNCTIONS
async function initializeScreen() {
  token = await getToken();
  showNav();
  // invoke all of the Part 1 functions here
  showPosts();
  showProfileHeader();
  showSuggestions();
  showStories();
}

// fetch and initialize screen
async function showPosts() {
  const endpoint = `${rootURL}/api/posts/`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const posts = await response.json();
  console.log(posts);

  const postContainerEl = document.querySelector("#postContainer");

  posts.forEach((post) => {
    postContainerEl.insertAdjacentHTML("beforeend", postToHTML(post));
  });
}

// CREATES A HTML ELEMENT FOR POSTS
function postToHTML(post) {
  return `
        <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
                <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="placeholder image" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        ${getLikeButton(post)}
                        <button><i class="far fa-comment"></i></button>
                        <button><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${getBookmarkButton(post)}
                    </div>
                </div>
                <p class="font-bold mb-3">${post.likes.length} likes</p>
                <div class="text-sm mb-3">
                  <p>
                    <strong>${post.user.username}</strong>
                    ${post.caption}
                  </p>
                </div>
                <p class="uppercase text-gray-500 text-xs mb-3">${post.display_time}</p>
                ${getComments(post)}
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button class="text-blue-500 py-2">Post</button>
            </div>
        </section>
    `;
}

// GET AND ADD COMMENTS TO POST
function createComments(post) {}

// GET API TOKEN
async function getToken() {
  return await getAccessToken(rootURL, username, password);
}

// DISPLAYS THE NAV
function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// TO SHOW BOOKMARK STATUS
function getBookmarkButton(post) {
  if (post.current_user_bookmark_id !== undefined) {
    return `<button onclick="unBookmark(${post.current_user_bookmark_id})"><i class="fas fa-bookmark"></i></button>`;
  } else {
    return `<button onclick="bookmark(${post.id})"><i class="far fa-bookmark"></i></button>`;
  }
}

// TO UNBOOKMARK A POST
async function unBookmark(bookmarkID) {
  console.log("delete a bookmark...");

  const response = await fetch(`${rootURL}/api/bookmarks/${bookmarkID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  console.log(data);
}

// TO BOOKMARK A POST
async function bookmark(postID) {
  console.log("create a bookmark...");
  // issue POST request to server
  // send the data it needs
  // check that it worked successfully

  const postData = {
    post_id: postID,
  };

  const response = await fetch(`${rootURL}/api/bookmarks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  console.log(data);
}

// GET COMMENTS FOR POSTS
function getComments(post) {
  if (post.comments.length === 0) {
    return "";
    // } else if (post.comments.length === 1) {
    //   return `
    //     <p class="text-sm mb-3">
    //       <strong>${post.comments[0].user.username}</strong>
    //       ${post.comments[0].text}
    //     </p>
    //   `;
  } else {
    return post.comments.map(commentToHTML).join("");
  }
}

// RENDER A COMMENT TO HTML
function commentToHTML(comment) {
  console.log(comment.user.username);
  console.log(comment.text);
  return `
    <p class="text-sm mb-3">
      <strong>${comment.user.username}</strong>
      ${comment.text}
    </p>
  `;
}

// SHOW LIKED STATUS
function getLikeButton(post) {
  if (post.current_user_like_id !== undefined) {
    return `<button onclick="unlikePost(${post.current_user_like_id})"><i class="fas fa-heart text-red-600"></i></button>`;
  } else {
    return `<button onclick="likePost(${post.id})"><i class="far fa-heart"></i></button>`;
  }
}

// ADD A LIKE TO A POST
async function likePost(postID) {
  console.log("Liked a post");

  const postData = {
    post_id: postID,
  };

  const response = await fetch(`${rootURL}/api/likes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  console.log(data);
}

// REMOVE A LIKE FROM A POST
async function unlikePost(likeID) {
  console.log("Unliked a post");

  const response = await fetch(`${rootURL}/api/likes/${likeID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  console.log(data);
}

// TO SHOW MY PROFILE PHOTO AND USERNAME
async function showProfileHeader() {
  const response = await fetch(`${rootURL}/api/profile/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  // console.log(data);

  const headerEl = document.querySelector(".header");
  const headerContent = `
    <img src="${data.thumb_url}" class="rounded-full w-16" />
    <h2 class="font-Comfortaa font-bold text-2xl">${data.username}</h2>
    `;
  headerEl.insertAdjacentHTML("beforeend", headerContent);
}

// GENERATES AND DISPLAYS SUGGESTION SECTION
async function showSuggestions() {
  const response = await fetch(`${rootURL}/api/suggestions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  console.log(data);
}

// GENERATE AND DISPLAYS STORIES SECTION
async function showStories() {
  const response = await fetch(`${rootURL}/api/stories/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  console.log(data);

  const storiesEl = document.querySelector(".stories");

  const storiesInfo = data.map(getStoriesInfo);
  console.log(storiesInfo);

  storiesInfo.forEach((story) => {
    storiesEl.insertAdjacentHTML("beforeend", storiesToHTML(story));
  });
}

function getStoriesInfo(data) {
  return {
    username: data.user.username,
    profileImg: data.user.thumb_url,
  };
}

function storiesToHTML(storiesInfo) {
  return `
    <div class="flex flex-col justify-center items-center">
      <img src="${storiesInfo.profileImg}" class="rounded-full border-4 border-gray-300 max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px]" />
      <p class="text-xs text-gray-500">${storiesInfo.username}</p>
    </div>
  `;
}

// max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px]
// after all of the functions are defined,
// invoke initialize at the bottom:
initializeScreen();
