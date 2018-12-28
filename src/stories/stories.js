import { chunkify, waitBottomScroll } from "../utils";
import renderStory from "./story";

export default async function renderStories({ stories, node, fetchStory }) {
  const { getNextChunk, isFinished } = chunkify(stories);

  // TODO make this number depending on the screen size;
  // we just need to render ~1.5 screens.
  let itemsToRender = 80;

  while (await shouldRenderMore()) {
    // let's always render in a way so we stop at 0
    // it is not really necessary, but just to have even
    // numbers of items all the time
    const chunk = getNextChunk(Math.min(itemsToRender, 5));
    await renderStoriesChunk({ stories: chunk, node, fetchStory });
    itemsToRender -= chunk.length;
  }

  async function shouldRenderMore() {
    if (isFinished()) {
      return false;
    } else if (itemsToRender > 0) {
      return true;
    } else {
      await waitBottomScroll();
      itemsToRender += 10;
      return true;
    }
  }
}

function renderStoriesChunk({ stories, node, fetchStory }) {
  const storiesPromises = stories.map(fetchStory);

  // we render stories 1 by 1, but only after all previous
  // stories were loaded
  storiesPromises.reduce((acc, promise) => {
    // by rendering only after all previous are rendered
    // we render one-by-one without skipping anything,
    // thus avoiding any jumps or inconsistent loading
    return acc.then(() => promise).then(story => renderStory({ story, node }));
  }, Promise.resolve());

  // we continue only after all stories were loaded and rendered
  return Promise.all(storiesPromises);
}
