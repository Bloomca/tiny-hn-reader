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
    const debouncedHandler = debounce(handler, 100);
    window.addEventListener("scroll", debouncedHandler);

    function handler() {
      const { clientHeight, scrollHeight } = document.documentElement;

      // we use pageYOffset instead of scrollTop due to Safari
      // overall, this part is not very well-tested.
      // I checked latest Chrome, Safari and Firefox
      // we add 50px, so you don't have to scroll to the bottom
      if (clientHeight + window.pageYOffset + 50 >= scrollHeight) {
        window.removeEventListener("scroll", debouncedHandler);
        resolve();
      }
    }
  });
}

// This could be gotten from _.debounce, but to keep number of dependencies 0
// it was written manually. No real reason otherwise, should be replaced.
export function debounce(fn, time) {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(fn, time, ...args);
  };
}
