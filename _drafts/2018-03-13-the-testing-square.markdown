---
layout: post
title:  "The Testing Square"
date:   2018-05-09 20:15:00 -0300
author: João Farias
categories: testing automation user-testing testing-pyramid testing-square
---

# The Testing Square

## The Testing Pyramid

The Testing Pyramid (TP) is now a widely known, and widely adopted, idea/best practice on how develop a health and extendable test automation suite.

#### IMAGE OF THE TP

The most known interpretation of the image above is that we should cover most our applications with unit-level tests. After that, in a smaller number, we should have integration tests, just to check if the invidual parts are communicating correctly one with another. And lastly, in an even smaller proportion, we should have tests that touches the user interface, checking for the experimenting the system as an user would.

The rationale for this distribution is that cost increases as you go up the pyramid and test precison increases as you go down the pyramid.

#### IMAGE OF THE PRECISION COST DIAGRAM

It means that unit-level tests are faster, cheaper and more precise in their response that integration and UI-level tests. Therefore, to cover more and more of our application, we should avoid writing lots of UI-level tests, and rely more on lower level tests.

UI-level tests are still necessary - they touch  a broader range of code with each interaction and can uncover issues that lower level tests can not. However, they should be carefully designed - trying not to perform actions that lower level tests could.

### Problems with the Testing Pyramid

Although the idea of the TP is reasonable, it has lots of problems. Some purely conceptual - others related to its lack of contextualization: I.e., it tries to be a silver bullet for all projects.

Many people have talked about these problems, such as (....).

However, one aspect that have not be spoken is its incompletude. The TP only talks about tests performed during development. No layer of test in the TP talks about tests after the software is shipped and it is in the hands of the user...

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

A test in the TP is born through the observation of the product and the specification of a test case. We say: "I want to check if the product behaves like this when these things happen". It can be in freely written English, some semi-structured language as Gherkin or even as a model, totally structured commands.

After that, we implement a software that exercises the aforementioned check. That's the Implementation phase. The artifact of these phase is a software and test data, which this software will consume.

This software is executed and modified on the flow 4 to 7, whose details are not so relevant for the current discussion.

### Observation Phase

Taking a closer look at the observation phase, we can see this picture:

--- IMAGE OF THE OBSERVATION PHASE

Human explorers are people who observe the product (code and documentation), and design the test cases. Usually, they can be identified as one or more the following:

- Developer
- Tester
- User Experience Expert
- Business Analyst

These people use their individual perspectives (skilled ability of observation) to design expectations about the product. Each person says: "**I** think the product should behave this way.". Performance and usability, specially, is highly dependable on their perception of usage.

And since all tests in the TP is dependable on this observation phase, we are only validating **THESE ASSUMPTIONS**.

The single task of creating a more or less coherent list of assumptions from all people involved in designing these test cases is cumbersome, near to humally impossible. Desconsidering it, we are still missing a fundamental piece of the puzzle: **the final user perspective**. After all, 
this is the perspective which will dictate if the product is a success or not: **The user** will say if the product fits his needs and, therefore, reaches its goal.

## How to get the user perspective?



#### Observation 1
The words "test" and "testing" were used with its more common meaning. Although the discussion about "testing" x "checking" is relevant generally speaking, one can use either nomenclature here - given one does not mix both.