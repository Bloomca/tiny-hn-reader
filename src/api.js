// Full docs are here: https://github.com/HackerNews/API
const DOMAIN = "https://hacker-news.firebaseio.com/v0";

// request for latest stories
// https://hacker-news.firebaseio.com/v0/newstories.json
export function getStories() {
  return get("/newstories.json");
}

// example of a single story request
// https://hacker-news.firebaseio.com/v0/item/8863.json
export function getStory(id) {
  return get(`/item/${id}.json`);
}

// we don't need to support POST requests, so only GET is implemented
// same goes for query parameters – we don't need them, so they are not
// implemented.
// in fact, we don't even expose this function, all API is within this file
function get(url) {
  return fetch(`${DOMAIN}${url}`).then(response => response.json());
}
