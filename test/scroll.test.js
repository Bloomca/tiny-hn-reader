import { waitBottomScroll } from "../src/utils";

/**
 * There is only one test here, which tests that in case there is no content,
 * it will work. We can mock window & document object fully here, but I think
 * it simple makes more sense to run it in real browser using karma,
 * but it is an overkill for this single feature.
 */

describe("wait for bottom scroll", () => {
  test("should trigger if there is no scroll", async () => {
    const promise = waitBottomScroll();

    const scrollEvent = new Event("scroll");
    window.dispatchEvent(scrollEvent);

    await promise;
  });
});
