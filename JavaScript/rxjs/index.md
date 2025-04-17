---
title: RxJS
parent: JavaScript
nav_order: 5
---
# RxJS
Imagine you've come across a YouTube channel you like. What do you do? You _subscribe_ to it. There are a number of videos out on the channel already that you can immediately get access to, and any new videos that the channel releases will automagically appear in your Subscriptions feed.

There are a few ways you can stop receiving videos. You could unsubscribe, or the channel could be deleted, or some sort of error could occur due to a bug within YouTube and cause your subscription to stop working. Also, if the end of the world comes along, all of your subscriptions end with it.

If you stop watching the channel and forget to unsubscribe, your feed will continue to receive the videos, wasting Google's resources and causing issues for you, like cluttering up your feed with irrelevant videos.

If you understood that, you understand RxJS Observables.

Join me on this quest to learn all about RxJS and how it can make your code simpler.

##### Using the Playground
For this guide, we will be using TypeScript, since the typings will provide additional insight into RxJS and help us keep track of what's going on in the examples. To make trying things out easier, there is a playground directory in this folder. To use the playground, clone or download this repository to your computer, navigate to the playground folder in your command terminal, and run `npm install`. Then you can put the code you want to try out in `src/index.ts` (or any other `.ts` file under `src`), and run it using `npm start`. If you would like to re-run your code without recompiling, use `npm run start-no-build`.

[Next: Observables and Observers](1-observables-observers.md)
