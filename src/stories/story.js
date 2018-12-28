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
  el.innerHTML = story.title;

  node.appendChild(el);
}
