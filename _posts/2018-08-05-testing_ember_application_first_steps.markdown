---
layout: post
title:  "Testing Ember Applications: First Steps"
date: 2018-08-05 08:00 +0200
author: João Farias
version: 1.0.0
tags: testing frontend ember.js selenium
description: Ember.js provides great tools for testing your frontend, enable us to write faster, deeper, and more reliable checks than end-to-end tools, as Selenium. Let's test the UI, not through the UI.
---

# The problem with testing the UI using Selenium

Selenium is a popular too which enables us to drive interactions with the browser programmatically - simulating user journeys and checking the application behavior. However, by its nature, Selenium tests depend on a manifold of components interacting with each other. **Any** problem with this components will probably raise an error in a (or many) Selenium tests.

This is good, with one test when can cover many components. However, it comes with three big prices:

- Performance
- Low checking precision
- High maintenance

When we isolate components and check their behavior in isolation, we lose the high coverage, but gain the three factors mentioned above.

Services testing is already stabilized, with many tools which enable progressive level of granularity, from unit (function level) testing to API testing (black-box checks on the whole service).

Web UI historically lacked this kind of tools, because it was based on HTML and CSS, with small portions of Javascript (logic worth fine-grained checks). Using end-to-end checks could be sufficient to cover UI as well.

However, this is **the past**. More and more logic is added on UI, even on low performance devices<sup>1</sup>, as smartphones. Checking thoroughly the number of decisions and business logic on modern frontend applications is for Tony Stark (rich) and Dr. Meirschultz (mad scientist). Bring the techniques used on services checking to the frontend is necessary for the best usage of developers' time and organization's resources.

Although most modern frontend frameworks provide their own tools for checking, this series of posts will be focused on [Ember.js](https://www.emberjs.com/)(version 3.3, using QUnit as test runner) - similar techniques can be found for [React](https://jestjs.io/docs/en/tutorial-react) and [Angular](https://angular.io/guide/testing).

# The basics of an Ember.js application

Ember app architecture
https://www.slideshare.net/lrdesign/architecture-emberjs-and-angularjs

# Testing an Ember Application

Ember.js testing isolation techniques.
Types of tests covered in this post.

## Application Tests

Advantages over Selenium tests.
Goal.
Example.
Basic page object.
Basic Mirage.

## Components Tests

Finer-grained UI tests: Isolation.
Goals.
Example.

## Unit Tests

Testing non-UI pieces of your application.
Goals.
Example.

## End-to-End is NOT dead

End-to-end is still necessary.
Parts which are not cover by services and frontend checks
in isolation.

## From here...

Routes and Models testing.
Addons: Mirage, A11y, Page Object, Ember Exam.
Configuration.

### Footnotes

1 - Yes, I know your smartphone is more powerful than most people computers.
