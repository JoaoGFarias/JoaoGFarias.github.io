---
title: "MoT Bloggers Club: First Experience in Accessibility Testing"
date: 2019-05-23T20:15:00 -0300
tags:
  - a11y-testing
categories:
  - blog
excerpt: "A short report of my first experiences with Accessibility Testing for the Ministry of Testing Bloggers Club"
header:
  overlay_color: "#252a34"
toc: true
toc_icon: "cog"
---

This post was motivated by the Bloggers Club from the Ministry of Testing Community.
You can find more posts about first experiences with accessibility (a11y) testing [here](https://club.ministryoftesting.com/t/sprint-13-your-first-experiences-with-accessibility-testing/25453/2)

# The Problem

I used to work on a web project based on Ember.js for frontend.

Most developers touched the frontend with the purpose of change the functionality of the application or improve performance. We had a single person that was focused on the UI details, such as color pallets and, guess what, a11y.

Our requirements for a11y were a standard _"should be a11y compatible"_ - nobody used to discuss the implications of proposed changes to a11y aspects.

Testers (including myself) would basically ignore these requirements, restricting themselves to shallow evaluation, given that the feedback to a11y problems were not prioritized by business nor they seemed to interest the team.

In a calm and ordinary afternoon, we get a feedback that our application should be smoothly usable by disabled users. This caught us by surprise, given the time the app was already in production.

But before jumping into work, we've decided to investigate if request had a business reason or it was more motivated by politics. The goal was not to fight back, but to help people to make the best possible decision.

We scraped the usage logs a bit and rapidly discover that ~10% of our users were interacting with the application through the default a11y assistance tool (blind and color-blind). Needless to say that a11y really became a high priority for POs, testers and developers.

Everyone sit and decided to plan well how to include a11y in our regular work. The first request was to create an a11y fixes backlog, so the PO could prioritize it together with the rest of the work.

# Solutions

## Short-term

Although not so known as Angular.js and React, Ember.js excels on its testing
tools (BTW, I have written a tutorial about it [here](http://thatsabug.com/2018/08/08/testing_ember_application_first_steps.html)).

We leveraged well these tools for all functional testing of the frontend, from unit to application levels, but now we needed something for a11y.

Luckily, there an awesome addon called [ember-a11y-testing](https://github.com/ember-a11y/ember-a11y-testing). It enables checking more than 78 a11y rules with a few lines of code.

(You can check all the rules [here](https://dequeuniversity.com/rules/axe/3.2)).

A simple test would be something like this:

```javascript
import a11yAudit from 'ember-a11y-testing/test-support/audit';

test('Some test case', function(assert) {
  visit('/');
  a11yAudit();
  andThen(() => assert.ok(true, 'no a11y errors found!')); // Need to Ember.js compatibility purposes
});
```

It access the root page of our application and calls the _a11yAudit_ function to inspect the whole DOM for the aforementioned rules.

Since the number of pages was fairly small, this strategy allowed us to find many problems in just a couple of hours. 

Additionally, it gave us a regression suite for a11y :blush: (We didn't added it to the build checks because we knew the problems were still acceptable).

Of course, these checks were not focused on how the user actually interact with the application.

To find deeper problems what the machine couldn't find we had to explore the application using the a11y assistance tool.

It took some time to understand how to use the tool properly and how the application flows work using it.

Most testers explored the application with their eyes closed. It was fun and helped to understand the difficulties in understanding what was going on.

## Long-term

This testing effort created a substantial backlog that tremendously improved our app. Everyone was very proud and happy after the feedback we got from business.

Our logs also showed that a11y users were performing their flows faster and with less errors.

The next steps was to keep the high-level of quality for a11y.

We implemented three major changes for such:

1 - Improvements in requirements

  We knew that requirements were fundamental to build quality features. We had previously improvements in performance requirements, so we had a similar strategy for a11y requirements. During backlog refinement, we would deep dive in a11y questions and impact.

2 - A11y in the Definition of Done (DoD)

  DoD was taken very seriously in our team. Failing sprints was not a shame, we always strived to meet the same standards. Additionally, we had a [zero-bug policy](https://sookocheff.com/post/process/zero-bug-policy/), meaning that, by default, a11y (new) bugs would block the completion of a story/sprint - everyone put this aspect in the same level as functional and performance.

3 - Testing in Production

  We already had some testing in production initiatives: Logging and monitoring of user behavior and ratio of completion/errors. We added special hooks for a11y evaluation, to better understand which elements were being beneficial or detrimental for the users.

# Lessons Learned

The journey to incorporate a11y development and testing was difficult, but worth. This aspect is often given low priority, even over other non-functional aspects, such as performance and security. However, we know what **fundamental** it is for the target users. Knowing that we could benefit these users, who often have bad experiences with applications, was reason for great pride.

I would say we took three major lessons from this journey:

1 - Try to mitigate the cost early in the process

  If your application is legacy (no tests) on the a11y  aspect, try to mitigate the costs of the testing by leveraging automation to unblock the obvious problems.

2 - Test with the user in mind

  The target users here have special needs and perceptions. Work to understand it for better testing

3 - Get **everyone's** buy-in, by making a11y a first-level citizen

  It is fundamental that everyone involved have the same vision on the importance of a11y to the users.
