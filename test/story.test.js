import { renderStory } from "../src/stories/story";

describe("rendering story", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("has correct title", () => {
    const story = {
      title: "Some title",
      author: "some_id"
    };
    renderStory({ story, node: document.body });

    const el = document.querySelector(".story-title");

    expect(el).toBeTruthy();

    expect(el.textContent).toBe(story.title);
  });

  test("has correct external url", () => {
    const story = {
      title: "Some title",
      url: "https://some_url.com",
      author: "some_id"
    };
    renderStory({ story, node: document.body });

    const el = document.querySelector(".story-title");

    expect(el).toBeTruthy();

    expect(el.getAttribute("href")).toBe(story.url);
  });

  test("has correct url without external URL", () => {
    const story = {
      title: "Some title",
      id: "some",
      author: "some_id"
    };
    renderStory({ story, node: document.body });

    const el = document.querySelector(".story-title");

    expect(el).toBeTruthy();

    expect(el.getAttribute("href")).toBe(
      "https://news.ycombinator.com/item?id=some"
    );
  });
});
