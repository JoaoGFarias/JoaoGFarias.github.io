---
layout: post
title: "3 Reasons Why Automation Will Not Save You"
date: 2018-05-15 20:15:00 -0100
author: João Farias
version: 1.0.0
categories: Automation testing
---

It's not uncommon to see senior developers and managers mesmerized by Automation.
Many of these people have histories of slow and complicated feedback provided by multitudes
of unskilled testers who think number of test cases in a excel file and bugs registered on Jira
are a good metric of their performance.
In this context, of little contact with high-skilled testing practices, it is understandable
that the image of Selenium scripts clicking and checking state in your web application would look
like as the silver bullet, the secret for unleashing of all their potential to develop great software,
rapidly and cheaply, without being limited by the almost archaic "testing phase".
And **this is true**: Automation can perform most **checks** necessary in software project; and
it, thus, can increase greatly feedback speed and reduce costs. However, it is necessary to notice
that it will only affect a small part of the testing activities ([testing != checking](http://www.developsense.com/blog/2009/08/testing-vs-checking/)).

Automation can be

## 1 - Automation is costly

When shallow testing performed by many people is the normal, the idea of having two or three people working on Selenium scripts
that can be run over and over again at basically no cost with cloud services seem very attractive in financial terms.
However, the creation of those Automation suites require a very unique mindset and skills, with feet of both testing aspects
and development aspects.
Two common characteristics on early implementation of Automation in organizations usually result in high costs:

- Unexperienced professionals
    
    Not rarely, the implementation of Automation in an organization or project is performed by junior developers or senior
    testers with little background in development. Although this context allows the development of either more opened-minded
    architectures and suites that properly cover the testing (checking) needs, it require long periods of learning and experimentation,
    which may be unexpected for the intent of introducing automation as a cost reducer strategy.

- One-tool-fits-all strategy 
    I have talked about the problem of [testing the UI using Selenium](http://thatsabug.com/2018/08/08/testing_ember_application_first_steps.html#the-problem-with-testing-the-ui-using-selenium). It is but an instance
    of the problem of lack of knowledge previously discussed: When the activity of testing is understood as simple verification of GUI events, tools that
    simulate interactions with the GUI are seen as the perfect pick for replacing all testing. However, this strategy inevitably results in executions
    which run for hours and provide little feedback. 

Strategies for mitigating these problems exist, but they require maturity from teams, the company itself and other stakeholders

## 2 - You cannot automate everything

## 3 - You can only automate what you already know

You cannot automate everything
    Not talking about checking a calculator with all the possible integer numbers
    Some evaluations require a human (or many humans), specially in non-functional requirements
    Good tools to reduce human resources needs: A11y checks and other static checklists
You can only automate what you know
    Related to the previous one, but maybe more important
    Our knowledge is always limited
        In what we can do
        In how we can do
        In what we need to do
    If any we don't know any of these three, we would not know that certain thing can be done in a certain - therefore, we cannot instruct a machine in doing so
Review
    Automation is awesome, but it will not save you because it costs, you cannot automate everything, and you can only automate what you know
    It's necessary to keep on learning and experimenting, so we can uncover more information - which is the only thing that will really improve our work. The rest is just a consequence of the uncovering





