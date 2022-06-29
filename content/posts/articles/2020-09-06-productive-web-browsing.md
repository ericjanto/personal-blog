---
date: 2020-09-06
title: 'Productive web browsing in Chrome'
excerpt: 'It was not until my Bluetooth mouse stopped to work that I wanted to be able to use and navigate through Chrome only using my keyboard. After a few weeks, I noticed that it made my daily web browsing experience much more efficient and productive. This is a quick tutorial on how to web browse mouse-less on a Mac.'
template: post
slug: productive-web-browsing
tags:
  - 'tools'
  - 'productivity'
---

### System Navigation

I use the free version of [Alfred](https://www.alfredapp.com/) to open the Chrome application. Since I use the default configuration, that's done by `Option + Space`, typing `Chrome` and pressing `Enter`.

Should I want to switch between applications, I use the `Cmd + Tab` shortcut.

### Chrome Navigation

Once in Chrome, there is only a few number of shortcuts I use:

| Shortcut                        | Function                                                              |
| ------------------------------- | --------------------------------------------------------------------- |
| `Cmd + L`                       | Jump to search bar of Chrome                                          |
| `Cmd + F`                       | Find search-keyword(s) on website                                     |
| `Cmd + Ctrl + F`                | Access/leave full screen mode                                         |
| `Cmd + Shift + F`               | Hide/show tab bar when in full screen mode (my favourite)             |
| `Cmd + T`                       | Open new tab                                                          |
| `Cmd + Shift + T`               | Re-open most recently closed tab; can be used multiple times in a row |
| `Cmd + Any Number n`            | Jump to `n`th tab (1 ≤ `n` ≤ 9)                                       |
| `Cmd + Ctrl + Left/Right Arrow` | Go to tab to the left/right of current tab                            |
| `Cmd + Left/Right Arrow`        | Go back/forward in browser history of current tab                     |
| `Cmd + R`                       | Reload page                                                           |
| `Cmd + W`                       | Close tab; if no tab open: close window                               |
| `Cmd + Q`                       | Terminate application                                                 |
| `Cmd + N`                       | New window                                                            |

These shortcuts allow me to use Chrome's most important functions. Nonetheless, that's not enough to browse through the web without using a mouse.

### Web / Content Navigation

This is where [Vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=en) comes in handy. In contrast to the shortcuts above, this browser extension allows navigating through website content itself rather than the Chrome application. You can also navigate through Chrome, e.g. open new tabs, but that's not what I use Vimium for.

I use Vimium only for the following functions:

| Shortcut    | Function                                 |
| ----------- | ---------------------------------------- |
| `F`         | Shows shortcuts for every link on page   |
| `Shift + F` | Similar to `F` but opens link in new tab |
| `J`         | Scroll down a bit                        |
| `K`         | Scroll up a bit                          |
| `D`         | Scroll **D**own half a page              |
| `U`         | Scroll **U**p half a page                |

Notice that Vimium cannot be activated while your cursor is in some input field. You'd have to press `Esc` first and then use any of the shortcuts above.

Now you have everything to enjoy Chrome in a frictionless and fast way.
