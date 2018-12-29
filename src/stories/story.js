export default function render({ story, node }) {
  const listElement = renderListItem(node);
  renderStory({ story, node: listElement });
}

function renderListItem(node) {
  const listElement = document.createElement("li");
  node.appendChild(listElement);

  return listElement;
}

export function renderStory({ story, node }) {
  const el = document.createElement("div");

  const linkEl = document.createElement("a");
  const url = story.url || `https://news.ycombinator.com/item?id=${story.id}`;

  linkEl.setAttribute("href", url);
  linkEl.setAttribute("target", "_blank");
  linkEl.classList.add("story-title");
  linkEl.textContent = story.title;

  el.appendChild(linkEl);

  const infoEl = document.createElement("span");
  infoEl.classList.add("story-info");
  // HN uses seconds rather than ms
  const dateNode = document.createTextNode(" " + formatDate(story.time * 1000));
  infoEl.appendChild(dateNode);

  const byText = document.createTextNode(" by ");
  infoEl.appendChild(byText);

  const authorLink = document.createElement("a");
  authorLink.setAttribute(
    "href",
    `https://news.ycombinator.com/user?id=${story.by}`
  );
  authorLink.setAttribute("target", "_blank");
  authorLink.classList.add("story-author");
  authorLink.textContent = story.by;

  infoEl.appendChild(authorLink);

  el.appendChild(infoEl);

  node.appendChild(el);
}

const MONTHS = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
};

function formatDate(time) {
  const date = new Date(time);

  if (Number.isNaN(Number(date))) {
    return "unknown date";
  }

  const day = date.getDate();
  const month = MONTHS[date.getMonth()];

  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${padValue(hour)}:${padValue(minutes)} ${day} ${month}`;
}

function padValue(value) {
  return value < 10 ? `0${value}` : value;
}
