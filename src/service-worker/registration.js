export default function register() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" })
      .then(() => {
        // registration worked
        console.log("Service Worker registration succeeded.");
        console.log("It is just a debug information.");
      })
      .catch(error => {
        // registration failed
        console.log("Registration failed with " + error);
        console.log(
          "Nothing wrong with it, just offline capabilities will be limited"
        );
      });
  }
}
