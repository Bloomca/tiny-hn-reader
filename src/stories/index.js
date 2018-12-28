import renderStoriesContainer from "./container";
import renderStories from "./stories";

export default function render({ node, stories, fetchStory }) {
  const storiesElement = renderStoriesContainer(node);
  renderStories({ stories, node: storiesElement, fetchStory });
}
