export default function render(node) {
  const container = document.createElement("div");
  container.classList.add("connection-container");

  // if user _is_ online, we don't need to
  // render anything, everything should work fine
  // even if they go offline, they should load data already
  if (!navigator.onLine) {
    markOffline();
    node.appendChild(container);
  }

  function markOnline() {
    window.removeEventListener("online", markOnline);
    window.addEventListener("offline", markOffline);
    container.classList.remove("warning");
    container.classList.add("info");

    container.innerHTML = "";
    const refreshLink = document.createElement("a");
    refreshLink.setAttribute("href", "/");
    refreshLink.textContent = "Refresh Page";

    const text = document.createTextNode("You are online again! ");

    container.appendChild(text);
    container.appendChild(refreshLink);
  }

  function markOffline() {
    window.removeEventListener("offline", markOffline);
    window.addEventListener("online", markOnline);
    container.classList.remove("info");
    container.classList.add("warning");

    container.innerHTML = "";

    const text = document.createTextNode(
      "You seem to be offline. Application might not work or show old data."
    );

    container.appendChild(text);
  }
}
