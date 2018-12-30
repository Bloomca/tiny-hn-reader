# Tiny HN Reader

[![Build Status](https://travis-ci.org/Bloomca/tiny-hn-reader.svg?branch=master)](https://travis-ci.org/Bloomca/tiny-hn-reader)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[Website](https://tiny-hn-reader.bloomca.me/)

This is a small application to display latest HN stories. It uses [HackerNews API](https://github.com/HackerNews/API).

## Run

I used Node@11.0 during development, however, I think any 8+ should work.

```sh
npm install
npm start # will serve locally (will watch automatically)
npm build # will build a production bundle
npm test
```

## Architecture

This application has no runtime dependencies (only development dependencies). The reason for it is the size of the application – the scope is very small, and performance is the focus here (as soon as we want to make a SPA, it won't be a good idea anymore).

How code is organized? It is assumed that our page consists of several widgets, and we can register them with some data – it is assumed that all fetching logic will be located outside of widgets and passed as parameters. In this case, there is no communication between components, but probably it would be an event emitter.

However, this architecture has limitation that it won't scale to made to SPA (at least, it will be challenging). You still can develop several pages with this approach, just linking to another page. And yes, using native DOM API is cumbersome, but for this scope is good enough.

## Offline

This application is capable to run offline. It will warn you if you lose your connection after loading, and will provide old data in case you open it without internet (it caches all requests). However, if you have internet, it will fetch data even when we have cache data. The main reason for that is that cache invalidation is [hard](https://en.wikipedia.org/wiki/Cache_invalidation) ("There are only two hard problems in Computer Science: cache invalidation, and naming things."), so for simplicity we try to fetch real data all the time.

## Tests

The weakest part of this approach. Since I use native DOM API and a lot of browser API, it is hard to test it. I guess the best approach to test it better is to pass everything as parameters (to use [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection), essentially), but I think it makes sense only after growing the application.

To run tests, type `npm t`.

## ES Version

This code uses latest ES version (I think it is 2017 for async/await features), and there is no babel in webpack configuration, so this app won't even work on older browsers – it is assumed you will run it using only latest browsers.

p.s. Babel is used when we run our tests, since Jest runs tests using Node.

## License

MIT.