export default function renderStoriesContainer(node) {
  const header = document.createElement("h1");
  header.textContent = "HN new links:";
  header.classList.add("title");

  node.appendChild(header);

  const list = document.createElement("ul");
  node.appendChild(list);

  return list;
}
