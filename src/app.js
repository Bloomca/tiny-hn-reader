import renderStories from "./stories";
import renderConnection from "./connection";

import { getStories, getStory } from "./api";

export async function start(appNode) {
  renderConnection(appNode);
  // we do data fetching outside of render method
  // individual stories fetching is happening inside render, but
  // we pass a function to fetch it, so there is no business logic
  // inside our view
  const stories = await getStories();
  renderStories({ node: appNode, stories, fetchStory: getStory });
}
