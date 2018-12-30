// render error message if we could not get stories
export default function render(node) {
  const el = document.createElement("div");
  el.classList.add("stories-error");

  const firstLine = document.createTextNode("Something went wrong :(");
  const secondLine = document.createTextNode(
    "Try to refresh your page and check your internet connection"
  );

  el.appendChild(firstLine);
  el.appendChild(document.createElement("br"));
  el.appendChild(secondLine);

  node.appendChild(el);
}
