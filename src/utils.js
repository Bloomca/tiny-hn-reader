// chunkify array to be able to pull next chunk and check
// whether we are done. The reason to not to use something
// like _.chunk(arr) is that we can control chunk size here,
// and we don't need to iterate over the whole array
// (it is 500 items from HN!)
export function chunkify(arr) {
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

/**
 * @description wait until we scroll to the bottom (almost, 50px more)
 * @returns {Promise<undefined>} resolved promise when we scroll to the bottom
 */
export function waitBottomScroll() {
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
