---
layout: post
title:  "The Testing Square: Completing the Testing Pyramid"
date:   2018-05-09 20:15:00 -0300
author: João Farias
version: 1.0.0
categories: testing automation user-testing testing-pyramid testing-square
---

# The Testing Square: Completing the Testing Pyramid

## The Testing Pyramid

The Testing Pyramid (TP) is now a widely known, and widely adopted, idea/best practice on how to develop a health and extendable test automation suite.

#### IMAGE OF THE TP

The most known interpretation of the image above is that we should cover most our application with unit-level tests. After that, in a smaller number, we should have integration tests, just to check if the invidual parts communicate correctly with each other. And lastly, in an even smaller proportion, we should have tests that touches the user interface, experimenting the system as an user would.

The rationale for this distribution is that cost increases as you go up the pyramid and test precison ("the error happen exactly in this function") increases as you go down the pyramid.

#### IMAGE OF THE PRECISION COST DIAGRAM

It means that unit-level tests are faster, cheaper and more precise in their response that integration and UI-level tests. Therefore, to cover more and more of our application without creating bottlenecks and long-running test suites, we should avoid writing lots of UI-level tests, and rely more on lower level tests.

UI-level tests are still necessary - they touch a broader range of code with each interaction and can uncover issues that lower level tests can not. However, they should be carefully designed - trying not to perform actions that lower level tests could.

### Problems with the Testing Pyramid

Although the idea of the TP is reasonable, it has lots of problems. Some purely conceptual - others related to its lack of contextualization: I.e., it tries to be a silver bullet for all projects.

Many people have talked about these problems, such as (....).

However, one aspect that has not beign spoken is its incompletude. The TP only talks about tests performed during development. No layer of test in the TP talks about tests after the software is shipped and it is in the hands of the user...

"TESTS AFTER SHIPPING???" you might ask. Firstly, let's take a look on the Lifetime of Test in the TP.

## Lifetime of a test in the Test Pyramid

(CREATE STATE MACHINE)
1 - Observation and specification
2 - Implementation
3 - Execution
4 - Failure
5 - Maintenance
6 - Fix
7 - Green

A test in the TP is born through the observation of the product and the specification of a test case. We say: "I want to check if the product behaves like this when these things happen". It can be in freely written English [USER STORY LINK], some semi-structured language [GHERKIN LINK] as Gherkin or even as a model [MODEL BASED TEST], totally structured commands.

After that, we implement a software that exercises the aforementioned check. That's the Implementation phase. The artifact of these phase is a software and test data, which this software will consume.

This software is executed and modified on the flow 4 to 7, whose details are not so relevant for the current discussion.

### The Observation Phase

Taking a closer look at the observation phase, we can see this picture:

--- IMAGE OF THE OBSERVATION PHASE

Human explorers are people who observe the product (code and documentation), and design the test cases. Usually, they can be classified as one of the following:

- Developer
- Tester
- User Experience Expert
- Business Analyst

These people use their individual perspectives (skilled ability of observation) to design expectations about the product. Each person says: "**I** think the product should behave this way.". Performance and usability, specially, is highly dependable on their perception of usage.

And since all tests in the TP is dependable on this observation phase, we are only validating **THESE ASSUMPTIONS**.

The single task of creating a more or less coherent list of assumptions from all people involved in designing these test cases is cumbersome, near to humanly impossible. Desconsidering it, we are still missing a fundamental piece of the puzzle: **The Final User perspective**. After all,
this perspective will dictate if the product is a success or not: **The Final User** will say if the product fits his needs and, therefore, reaches its goal.

## How to get the user perspective?

The design field has for a long time realized the necessity of getting the end user perspective at the initial phases of product developing.
A manifold of techiniques have beign used with success in many domains:

- Study groups;
- User Experience Testing;
- Prototyping;
- Walkthroughs;
- etc...

These techniques enables the product builders to co-create the requirements with the users.

**THAT'S GREAT!**

However, again, this techniques will gather only the perspective of the users which have participated of the experiments - a small portion of the user set.

In the last few years, we are more heavily gathering user usage production data in our applications. We log each click, error, input, device information, etc. But, alike the tests, if this information is not appropriataly structured and used, we may end up with a mountain of data which takes two eternities to process. In the end, alike that 100.000 Selenium tests suite, we have no way to use this tool to improve our products - a lost of money and time, past and future.

To attack this problem, we can think of using a pyramid structure as a health and expandable user data metamodel:

--- IMAGE OF THE USER DATA PYRAMID

As the TP, the User Data Pyramid (UDP) have three layers:

- Logging: The largest layer form the base of the others. Its function is to structure the data of the users in an comprehensable way: I.e., entities' names should clearly state its function; duplication and redundancies should be avoided; they should represent the user flows through the application. A well engineered log structure allows to store largest amount of data, and use it to anwser questions on higher levels.

- Monitoring: This level's goal is to gives us insights about the user behaviour. It uses the data of Logging Level to extract information about the users as a group.

Examples:

- "How many friends does the users from Poland have?"
- "Do people access our site from Windows Phone devices?"
- "When people do X, do they do Y?"
- "Are requests awnsered in up to 5 seconds?"

The answers given here may differ from the product builders and the users on design experiments. And it's **that** perspective that matters in the end.

And this perspective can change over time: The users may behave differently in given seasons; with the combination of previous and new features; or (endless reasons).

That's why is crucial to continiously monitoring these questions, to use as input for our exploration in changes on the product - continiously aligning our perspectives and the final user's.

- Alerts: Although answers to questions to drive improvements are great, we know that certain situations should not happen. This level also uses the Logging level data as input to anwser questions - however, these questions are not meant to validate assumptions, but to trigger actions to avoid cascate of problems.

Examples:

- "The server can store data of 100.000 users";
- "Users without the role Admin cannot access the page of Administration";

More on the each of these three levels in the future ;)

#### Observation 1

The words "test" and "testing" were used with its more common meaning. Although the discussion about "testing" x "checking" is relevant generally speaking, one can use either nomenclature here - given one does not mix both.
