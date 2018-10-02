---
layout: single
title: "A Testing Planning Ceremony for Scrum Teams"
date: 2018-08-21 20:37:00 +0200
author: João Farias
version: 1.0.0
categories:
  - testing
tags:
  - scrum
  - agile
  - testing
  - planning
  - automation
  - exploratory
description: Mini-waterfall and separated/uncoordinated groups of developers and testers is a common problem. In this post, I will describe a simple planning ceremony to better integrate team members in testing activities.
---

## Testing in Scrum Teams

Scrum teams' main goal is to deliver a valuable increment at the end of each iteration (sprint),
so that the stakeholders can clearly see progress and provide feedback for the direction of the project.

Obviously, in order to deliver value (new features without breaking existing ones), it is necessary
a rigorous evaluation of product, a.k.a. **testing**. Although many teams have reached maturity
regarding incrementally building new features and infra-structure, testing activities commonly
fell into the trap of the mini-waterfall - i.e., they are delayed until the end of the iteration
or to later phases of the project.

Many teams divide their iterations in _development week_ and _testing week_. On the first, developers work at full speed in all user stories planned for the iteration, integrating the new features into a single package. This package is then evaluated in the _testing week_, where the evil testing people come into scene and point
out the mess that would be if the team deliver this package. Developers, then, spend all this time trying to
get things into order so that _no so many known bugs_ pass into the next sprint ("unknown bugs
will be introduced, surely).

One of the possible root causes of this situation is the separation between the work of testers and
developers, on both sides. Developers don't know what kind of risks the testers will evaluate - and
testers don't know the implementation approach that the developers plan to use (and the new approaches
that they discovered during the sprint). This situation results in more bugs, less velocity, worse quality, more re-work and, **worst of all**, conflicts and low moral in the team.

## Goal

In order to mitigate this vacuum, developers and testers should work together in the problems, both
on the (iteration) planning phase and during iteration execution. In this post, I will be focusing
on the planning phase, describing a testing planning ceremony that enables developers and testers
to think about the risks involved in the increment building, and how they will approach testing
activities (writing of automated checks, areas to explore for failures and risks).

## Context

The example given below is thought to be used by a team of no more than 10 people, preferably
co-located - however, adjustments can be done to deal with (a bit) more people or geo-disperse
groups (quick suggestions about that at the end of the post).

Additionally, the imaginary team has a diverse check automation suite, relying on checks from basic
units, like functions, up until whole-system, working in conjunction, rather than as indenpendts entities.
This configuration, [besides being more reliable and organic](http://thatsabug.com/2018/08/08/testing_ember_application_first_steps.html), takes
great advantage of the testing planning ceremony, for the discussion will generate better-thought
organization of the many different types of check.

## Testing Planning Ceremony Overview

The ceremony is a meeting between many members of the team. Although the participation of
all members is not a must, it is necessary to have diverse expertise in the room (testers with
automation background and testers more exploratory background | front-end and back-end developers, etc).

The ceremony is held after the first half of the planning phase, when the Product Owner have already
explained the stories and the team have a good idea of what needs to be built. The ceremony can
also be held after task breaking, but the ideas generated during the meeting will affect the tasks -
so, some re-work would be necessary.

During the meeting, the attendants will go through each user story, and each acceptance criteria;
brainstorming risks and necessary checks:

- "We need to check if the button is enabled under when all fields are filled. And disabled otherwise.";
- "We need to investigate if this API change will affect the consumer client system.";
- "We need to verify if the color scale is visible for color-blind users";
- "We need to check the performance degradation after updating this library";

In this point, the members should not discuss deeply the validity of the ideas - only excluding
the obviously unnecessary or repeated ones.

The different points of view, due the diverse expertise, will create very specific validation ideas;
and other members will slowing learn the common points of risk in each area of the project.

With list of testing ideas, and the learning created by the discussion and exposition, the members can
discuss how to better implement each idea:

- Discussion about whether an testing idea can be well covered by automated checks or not - which details need to be validated by a human, etc.
- Which tools better fit the job: If we would need API checks, unit checks, end-to-end checks - usage of UI diff tool, a tool to simulate the usage of blind user, etc.

## Ceremony Output

The result of the ceremony, besides the team learning, is a well-thought list of activities to be performed
**during the development** of the increment, usually attached to the specific acceptance criteria and/or user
stories.

This allows both developers and testers to better coordinate their work, performing the necessary activities
as soon as possible. Additionally, effort for completing a given user story can encompass both developers and
testers work, thus improving the quality of estimations.

## Extensions and Contexts

### Bigger and Geo-disperse Teams

Bigger and/or geo-disperse teams would take a longer time both for brainstorming and discussing the testing strategy. To mitigate this problem, the team can divide itself into groups of two to four people, trying to keep the expertise diversity - each group focusing on one or more user stories, and perform the same ceremony. Afterwards, cross-group reviews allow improvement of quality and completeness of the testing activities.
