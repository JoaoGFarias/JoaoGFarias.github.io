---
title: "Learning Spring with Kotlin - Sprint 0"
date: 2020-04-08T08:00:00 -0000
categories:
  - blog
tags:
  - spring
  - spring-learning
excerpt: "I am learning Spring using Kotlin only. In this post, I will describe what are my goals and the path I will walk to reach them."
toc: true
toc_icon: "cog"
---

# Learning Spring with Kotlin - Sprint 0

{% include figure image_path="/assets/images/spring_kotlin/logo.png" alt="Spring & Kotlin" %}

# Context & Goals

A few months ago I started working at [FreeNow](https://free-now.com/) with focus on Backend Testing. Alongside great smart developers and testers, I deal with the challenge of a fast-paced environment of hundreds of services (micro-services, if you like the buzzword). During this time, I've learned many techniques and approaches - many of them I've described on my [Automation Guild 2020 talk](https://guildconferences.com/conferences/automation-2020/).

This environment has on its base the [Spring Framework](https://spring.io/projects/spring-framework), for both Inversion of Control and application development. 

Spring, 17 years after its initial release, is myriad of topics; from security to testing, passing through configuration, internationalization, etc etc etc. And my knowledge of Spring is as big as your knowledge of quantum mechanics. Therefore, nothing more natural than move my learning focus to Spring and its capabilities.

I will be posting here what I learned, my questions, tips, and any other note from my studying hours.

My goals will be the following:

1 - Create REST APIs, automatically built and checked;

2 - Understand Spring Configuration, in its different approaches to separate the application from its data;

3 - Create examples of [SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)), [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), and [Clean Architecture](hhttps://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164/ref=sr_1_1);

4 - Hardcore [TDD](https://www.youtube.com/watch?v=qkblc5WRn-U) at every checking level, from hand-written stubbing unit checking, to databases with [TestContainer](https://www.testcontainers.org/), service contract with [Pact](https://docs.pact.io/), advanced test doubles with [Mockk](https://www.testcontainers.org/), etc.

And EVERYTHING ON *KOTLIN*!

# Plan

As an advocated of [Project-Based Learning](https://www.edutopia.org/project-based-learning), I will reach these four goals (mostly) through the construction of things that at least reassembles real-world problems. 

## Short-term Path

Of course, the beginning is when we not only know the least, and it is in the beginning when we don't know we don't know things the most.

{% include figure image_path="/assets/images/spring_learning/sprint_0/unknown.png" alt="Knowledge Quadrants" %}

Meaning that we:

1 - More easily get stuck at every problem: We don't know how to speculate solutions.

2 - Have more difficult in breaking big problem into smaller, actionable problems.

So, in the first steps, the Project-Based Learning approach has be put on the side a bit on the side, and a more classical classroom learning system brings more results.
And since Spring is such a big space, the basic concepts have to be incorporated first, even when some approaches are considered "outdated".

For the first moments, my goal will be to learn concepts of Classical Spring, XML-based configuration, basic services without databases or extentable architecture-focus.

For that, my main resource will be Java Brains playlists, such as [Spring Framework](https://www.youtube.com/playlist?list=PLC97BDEFDCDD169D7), [Spring Boot Quick Start](https://www.youtube.com/playlist?list=PLqq-6Pq4lTTbx8p2oCgcAQGQyqN8XeA1x),
and [Spring Data Support](https://www.youtube.com/watch?v=eR_JFtqyNL4&list=PL1A506B159E5BD13E).

Additionally, since these videos are quite old, I may go for some other online course for more recent syntax and semantics.

However, to add a bit a challenge and to create knowledge that will be useful in later stages, I will re-write some of the course code in Kotlin.

## Medium-term Path

Finally the first project: A clone of [Trello's REST API](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/).

Trello (which I already explored [on this blog](http://thatsabug.com/tags/#postman-series)) has concepts of objects and relationships, well-defined [CRUD operations](http://thatsabug.com/blog/intro_postman_trello/).

I think it will serve as a good exercise of the concepts learned before, and also include more real-world challenges, such as databases, architecture, and automated checks.

## Long-term Path

We can play with the basic Trello API clone service in many ways:

- Spring Configurations: Separate different ways to setup main variables of the service, to deal with different enviorements for instance;
- Advanced automated checks, as mentioned above;
- Architectural refactorings;
- Break the service into smaller ones, creating physical boundaries.
- Containerization;
- Logging and monitoring;
- ...

Seems interesting? :)
Leave a comment and let's go together on this journey.
