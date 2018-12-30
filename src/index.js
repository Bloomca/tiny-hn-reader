import { start } from "./app";
import registerServiceWorker from "./service-worker/registration";

registerServiceWorker();

const appNode = document.getElementById("app");

start(appNode);
