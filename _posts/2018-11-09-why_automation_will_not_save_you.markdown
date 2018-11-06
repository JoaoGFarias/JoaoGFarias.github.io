---
layout: post
title: "3 Reasons Why Automation Will Not Save You"
date: 2018-11-09 00:00:00 -0000
author: João Farias
version: 1.0.0d
categories: Automation testing
description: Many companies start focusing on Automation and fail. Let's see three common reasons for that
---

It's not rare to see senior developers and managers mesmerized by Automation.
Many of these people have stories of slow and complicated feedback provided by multitudes
of unskilled testers who think number of test cases in an Excel file and bugs registered on Jira
as good metric of their performance.
In this context of little contact with high-skilled testing practices, it is understandable
that the image of Selenium scripts clicking and checking state in your web application would sound
as the secret for unleashing of all the potential to develop great software -
rapidly and cheaply - without being limited by the almost archaic "testing phase".
And **this is true**: Automation can perform most **checks** necessary in software project; and
it, thus, can greatly increase feedback speed and redduce costs. However, it is necessary to notice
that it will only affect a small part of the testing activities ([testing != checking](http://www.developsense.com/blog/2009/08/testing-vs-checking/)).

And even for this subset of testing activities, Automation have drawbacks and can fail:

## 1 - Automation is costly

When shallow testing performed by many people is the normal, the idea of having two or three people working on Selenium scripts
that can be ran over and over again, at basically no cost with cloud services, seems very attractive in financial terms.
However, the creation of those suites require a very unique mindset and skills, with each feet in both testing
and development aspects.
When early implementation of Automation in organizations result in high costs, two things usually come together:

- Unexperienced professionals

  Not rarely, the implementation of Automation in an organization or project is performed by junior developers or senior
  testers with little background in development. Although this context allows the development of either more opened-minded
  architectures and suites that properly cover the testing (checking) needs, it requires long periods of learning and experimentation,
  which may be unexpected for the intent of introducing Automation as a cost reducing strategy.

- One-tool-fits-all strategy
  I have talked about the problem of [testing the UI using Selenium](http://thatsabug.com/2018/08/08/testing_ember_application_first_steps.html#the-problem-with-testing-the-ui-using-selenium). It is but an instance
  of the previously discussed lack of knowledge problem: When the activity of testing is understood as simple verification of GUI events, tools that
  simulate interactions with the GUI are seen as the perfect choice for replacing all testing. However, this strategy inevitably results in executions
  which run for hours on and provide little feedback.

Strategies for mitigating these problems exist, but they require maturity from teams, from the company itself and from other stakeholders.

## 2 - You cannot automate everything

... And I am not talking about the [problem of combinatorial explosion in testing](https://www.ps.uni-saarland.de/~niehren/index.html/vorlesung/node5.html), which is well known since the 1960's and has been tackled in many contexts with reasonable success. Most of us are comfortable with release a calculator software without testing every possible number in every possible operation.

I am talking about the inerent necessity of human evaluation in testing. It can be seen in two moments:

- Testing what is not being tested:

  As mentioned above, the almost-mindless activities of checking performed by low-skill testers apparently can be performed by a computer. "Apparently", because, although everything written in an test case can indeed be simulated by a computer, when a human reproduce the procedure, inevitably, his/her mind will be performing unnumbered other evaluations: If a part of the screen blinks, even if it is unrelated to the test case, it will raise a small alert of potential risk. **High-skilled testers** deal with these signals **in a structured way**: While [testing](http://www.satisfice.com/articles/what_is_et.shtml), the search to answer some questions will yield other questions, that can be investigate afterwards depending on the risk analysis and resources available. **Low-skilled testers** will ignore the signals and **proceed with the test case steps**. But, **on both cases**, the human **did** an evaluation - the computer **simply could not do it**.

- Testing what is being tested:

  Ignoring the situations as above, even when we consider only the described written test case scope, the human evaluation necessarily surpass the computer evaluation.

  Both human and computer will evaluate the product by comparing what is observed against an [oracle](http://www.developsense.com/resources/Oracles.pdf) - if they differ, the product has a possible problem. "Possible" because the "Oracle" may be **wrong**, when looked by some perspective:

  A site may seem perfectly OK for most people. However, if I ask a blind person to evaluate it, the result may be different. Super users are usually adapted to the flow of an application - however, regular users will find the same flow impossible to understand.

  Therefore, the test oracle is not necessarily static and final. **Testing is a risk evaluation activity** - and risk is subjective (no-encodable).

Given that, even with [tools that automatically detect non-functional issues](https://github.com/ember-a11y/ember-a11y-testing) and usage of [AI to detect bugs](test.ai), testing continues to demand human evaluation at its core.

## 3 - You can only automate what you already know

At any given time, our knowledge is always limited

- In what we need to do (motive)

- In how we can do (means)

Without the motive and the means, we would not perform the activities of checking some aspect in a certain way - therefore, we cannot instruct a machine in doing so.

And this is where the view of testing as a discovery activity, through exploration and learning, shows the limitation of Automation. Exploration serves to discover new risks and aspects that we had not thought about. Through learning, we explore techniques and tools against the under test aspect of the product.

Only after knowing this, one is able to instruct a computer to reproduce the a checking procedure - which is a simplification of all the discovery process.

This means that when we focus on automating what we know, we are not focusing on discovering new risk aspects of an application. **Both** are necessary, with the balance in accordance to the risk analysis - particular to each project in a each point in time.

# Review

Automation is awesome, but it will not save you because it costs, you cannot automate everything, and you can only automate what you know.
It's necessary to **keep on learning and experimenting**, so we can uncover more information - which is the **only thing** that will really improve our work.
