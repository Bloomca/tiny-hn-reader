import { getStories, getStory } from "./api";

export async function start() {
  const stories = await getStories();

  const { getNextChunk, isFinished } = chunkify(stories);

  let itemsToRender = 80;

  while (await shouldRenderMore()) {
    // let's always render in a way so we stop at 0
    // it is not really necessary, but just to have even
    // numbers of items all the time
    const chunk = getNextChunk(Math.min(itemsToRender, 5));
    await renderStories(chunk);
    itemsToRender -= chunk.length;
  }

  async function shouldRenderMore() {
    if (isFinished()) {
      return false;
    } else if (itemsToRender > 0) {
      return true;
    } else {
      await onBottomScroll();
      itemsToRender += 10;
      return true;
    }
  }
}

function renderStories(stories) {
  const storiesPromises = stories.map(getStory);

  storiesPromises.reduce((acc, promise) => {
    // by rendering only after all previous are rendered
    // we render one-by-one without skipping anything,
    // thus avoiding any jumps or inconsistent loading
    return acc.then(() => promise).then(renderStory);
  }, Promise.resolve());

  return Promise.all(storiesPromises);
}

function renderStory(story) {
  const el = document.createElement("div");
  el.innerHTML = story.title;

  document.getElementById("app").appendChild(el);
}

function chunkify(arr) {
  let offset = 0;
  return {
    isFinished: () => offset >= arr.length,
    getNextChunk: (slice = 5) => {
      const slicedArray = arr.slice(offset, offset + slice);
      offset += slice;
      return slicedArray;
    }
  };
}

function onBottomScroll() {
  return new Promise(resolve => {
    window.addEventListener("scroll", handler);

    function handler() {
      const {
        clientHeight,
        scrollHeight,
        scrollTop
      } = document.documentElement;
      // we add 30px, so you don't have to scroll to the bottom
      if (clientHeight + scrollTop + 50 >= scrollHeight) {
        window.removeEventListener("scroll", handler);
        resolve();
      }
    }
  });
}
