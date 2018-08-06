---
layout: post
title:  "Testing Ember Applications: First Steps"
date: 2019-08-05 08:00 +0200
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

Web UI historically lacked this kind of tools, because it was based on HTML and CSS, with small portions of JavaScript (logic worth fine-grained checks). Using end-to-end checks could be sufficient to cover UI as well.

However, this is **the past**. More and more logic is added on UI, even on low performance devices<sup>1</sup>, as smartphones. Checking thoroughly the number of decisions and business logic on modern frontend applications is for Tony Stark (rich) and Dr. Meirschultz (mad scientist). Bring the techniques used on services checking to the frontend is necessary for the best usage of developers' time and organization's resources.

Although most modern frontend frameworks provide their own tools for checking, this series of posts will be focused on [Ember.js](https://www.emberjs.com/)(version 3.3, using QUnit as test runner) - similar techniques can be found for [React](https://jestjs.io/docs/en/tutorial-react) and [Angular](https://angular.io/guide/testing).

# The basics of an Ember.js application

Ember app architecture
https://www.slideshare.net/lrdesign/architecture-emberjs-and-angularjs

# Testing an Ember Application

Ember.js testing isolation techniques.
Types of tests covered in this post.

## Application Tests

Application tests setup and destroy the whole Ember app from scratch between tests, creating exactly each object and running each line of code as in the production app, including rendering. This enable us to simulate the user actions with confidence that no mocking is creating a false environment, letting bugs pass through our checks.

"So, exactly the same as Selenium/end-to-end tests?"
Not so. There is one element the is not executed during Application Tests:
**All networking activity** can be mocked, both eliminating the necessity of performing such time-consuming operations during the app execution, database setup for different test scenarios and tests failures due bugs in any service.
Thus, we can focus solely on checking the behavior of the frontend code.

(I know you raise your eyebrows now - I will take about this problem you thought in a future post)

In summary, the goal of Application Tests is to validate how all components behave together, when rendered in response to page landing and actions of the user, under certain data situations.

Below you can find two simple Application Test:

....

Very similar to a Selenium test, right?

On the first test, we simply access a page, click on the Say Hello button, and check if the app answered "Hello!".
On the second test, we access the same page, click on the Say Bye button, and check if the app answered "Bye!".

After each test, the app is totally destroyed and rebuilt - so, if we had had some state after our actions, it would be gone. It deals with most cases of flakiness and allow the holy grail of parallel execution. We just need to run 1.000.000 of Ember apps in a machine, no need to touch databases. AWESOME!

If you have code duplication OCD, you probably is starching yourself. Let's deal with it.

We've created an object with cool functions which wrap the interaction with the page... A.k.a.: Page Object :)
Of course, this is primitive - Luckily tThe Ember.js community created an awesome Page Object addon.
I will talk about it in details, and give some tips, in the future.

Let's say our app have a "What's the date" button, which asks for a service the current date and displays a message with it. Do we need check it with end-to-end tests?

Nope...

That´s when another great addon appears: Mirage.

Mirage´s goal is to intercept web requests to services and return mock data. It fools the Ember app, making it behave as if a real service have returned a response. Let´s see how it works:

....

The first file contains the test - similar to the others. The mirage.js file is the new thing.

In it, we indicate the route that we want to intercept and a function to process the request.
In this case, we completely ignored the requested data and just returned a fixed date.

That's what we need for your test. We want to know if the app will behave correctly when receiving a (any!) date as a response. So, instead of being dependable of a correct implementation of the service, we are focusing on our frontend app. More complex situations can be created using just in-memory processing, avoiding touching databases or network.

## Components Tests

We argued that the point of testing frontend in isolation was because of the increasing load of business logic on these applications. So, since Application Tests setup a "whole Ember app" on each test, we can expect hit the performance wall if we try to broadly cover our app using this tool. Luckily, we can go one-level down and perform checking at the component level.

This kind of testing is interested in verify the behavior (specially rendering) of each component in isolation - mocking every dependency, both services and other components.

The test below will validate how the Message component, used on the Hello/Bye examples, behaves.

...

Firstly, we have to prepare mock data to be injected into the component. It gives total control to this test on the cases we want to validate - independently on the contexts that this component will be used in the app.

Secondly, we render the component using this data. The Ember.js engine will create the minimal environment to render this component - as if the whole app was only this message.

Lastly, we check the displayed message. We use CSS Selectors because this test really renders the component. It behaves exactly as if if was in an app.

This allow us to go deep in different scenarios without having to create other objects, optimizing our suite performance.

...

## Unit Tests

Well... We always can try to go deeper, right?

Let's say that we represent an User as the following:

... (first name, last name, age)

On the component test above, we forcibly set the Message attribute the way we wanted.
However, the message is actually calculated by some code:

...

We have to test this function. Maybe there is a bug due an untreated null value or an overflow.
But, do we need to render each possible situation on the screen? Aren´t we interested only if the function returns the correct string value? We already checked that the message is rendered for a mocked result of this function.

That's when Unit Tests enter in scene. Ember.js' Unit Tests have **no** rendering - they are composed purely of in memory operations (as fast as it gets).

Let's take a look in some examples:

...

Pretty straightforward, right?
We set the parameters that the function takes (the pure attributes), call the function with them, and check its return. Easy-peasy...

The second test teaches us a lesson: When possible try to go to lower levels of checking.

Previously, we were checking the ellipsis on the Component Test level, however, after looking deep into the function which create the message values, we realized that we don't need rendering, only the logic. Thus, let's write an Unit Test and **delete** the Component Test.

Improving performance without loosing coverage: AWESOME!

## End-to-End is NOT dead

**WAIT!** Don't delete your Selenium suite.

End-to-end tests still have its purposes and are able to perform checks that frontend or service checks in isolation would not catch.

Let's say you have balance loader in your system, which directs requests from a master server to various slave machines based on the user location, creating slightly different results according to that.

How would you validate that computing resources are correctly distributed according to the balance loader configuration, giving a good throughput to most users?

Other complex relations, specially in legacy systems, are difficult to mock - or the mocking gives little confidence in the asserting.

Either way, in any system there is space checks in levels below the end-to-end. And in order to be able to grow a broad and brisk suite of automated checks, we need to pay attention to opportunities of using the least expensive tool for each situation.

Try to use a silver bullet and you will find trouble.

## From here...

We've just touched the basics of testing Ember.js apps. Other very interesting topics are:

- Routes and Models testing;
- The addons created by the Ember community: Mirage, Accessibility, Page Object, Ember Exam, Percy;
- Configuration necessary to instruct the app on how to glue all this pieces together.

### Footnotes

1 - Yes, I know your smartphone is more powerful than most computers.
