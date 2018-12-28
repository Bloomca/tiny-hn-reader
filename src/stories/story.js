export default function render({ story, node }) {
  const listElement = renderListItem(node);
  renderStory({ story, node: listElement });
}

function renderListItem(node) {
  const listElement = document.createElement("li");
  node.appendChild(listElement);

  return listElement;
}

function renderStory({ story, node }) {
  const el = document.createElement("div");

  const linkEl = document.createElement("a");
  linkEl.setAttribute("href", story.url);
  linkEl.setAttribute("target", "_blank");
  linkEl.classList.add("story-title");
  linkEl.textContent = story.title;
  el.appendChild(linkEl);

  const dateEl = document.createElement("span");
  dateEl.classList.add("story-date");
  // HN uses seconds rather than ms
  dateEl.textContent = " " + renderDate(story.time * 1000);
  el.appendChild(dateEl);

  const byText = document.createTextNode(" by ");
  el.appendChild(byText);

  const authorLink = document.createElement("a");
  authorLink.setAttribute(
    "href",
    `https://news.ycombinator.com/user?id=${story.by}`
  );
  authorLink.setAttribute("target", "_blank");
  authorLink.textContent = story.by;
  el.appendChild(authorLink);

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

function renderDate(time) {
  const date = new Date(time);

  if (Number.isNaN(Number(date))) {
    return "unknown date";
  }

  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  // const year = date.getFullYear();

  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${padValue(hour)}:${padValue(minutes)} ${day} ${month}`;
}

function padValue(value) {
  return value < 10 ? `0${value}` : value;
}
