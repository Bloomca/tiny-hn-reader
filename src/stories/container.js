export default function renderStoriesContainer(node) {
  const container = document.createElement("div");
  container.classList.add("stories-container");

  const header = document.createElement("h1");
  header.textContent = "HN new links";
  header.classList.add("stories-title");

  container.appendChild(header);

  const list = document.createElement("ul");
  list.classList.add("stories");
  container.appendChild(list);

  node.appendChild(container);

  return list;
}
