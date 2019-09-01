---
title: "The Scribe's Oath for Testers"
date: 2018-08-16T20:15:00 -0300
categories:
  - blog
tags:
  - testing
  - ethics
  - software-development
  - craft
excerpt: "Some thoughts on Bob Martin's ethics guides from a tester perspective"
toc: true
toc_icon: "cog"
---

# The Scribe's Oath

Bob Martin (a.k.a. Uncle Bob) is one of giants of software development. Every single time I have the chance to (re-)read what he says I grab my notebook and a pencil, because it is almost certainty that I will get something to improve my professional life. And The Scribe's Oath (previously know as The Programmer's Oath) is one of my favorites lessons regarding professional ethics.

The Oath is composed of nine statements about how software developers should face their craft. It's an ethical guide - inspired by Egyptian scribes' way of working - against a world which may transform programmers into machines of producing products (depressed and personally unsatisfied machines, by the way).

Lo and behold! The Scribe's Oath:

{% include figure image_path="/assets/images/scribes.jpg" alt="The Ancient Egyptian Scribe" caption="The Ancient Egyptian Scribe" %}

**In order to defend and preserve the honor of the profession of computer programmers,**

**I promise that, to the best of my ability and judgement:**

1.  I will not produce harmful code.
    - I will not intentionally write code with bugs.
    - This means: Do your best.
2.  The code that I produce will always be my best work. I will not knowingly allow code that is defective either in behavior or structure to accumulate.
3.  I will produce, with each release, a quick, sure, and repeatable proof that every element of the code works as it should.
4.  I will make frequent, small, releases so that I do not impede the progress of others.
5.  I will fearlessly and relentlessly improve my creations at every opportunity. I will never degrade them.
6.  I will do all that I can to keep the productivity of myself, and others, as high as possible. I will do nothing that decreases that productivity.
7.  I will continuously ensure that others can cover for me, and that I can cover for them.
8.  I will produce estimates that are honest both in magnitude and precision. I will not make promises without certainty.
9.  I will never stop learning and improving my craft.

Although the Oath is written under a programmer's perspective, I think the nine promises are applicable to any professional, including testers. I will break each part and discuss how we can fulfil them, and how to detect and counter-attack risks to these ethical guides.

# "Translating" to the Testing World

## "I promise that, to the best of my ability and judgement"

  Although this is not one of the nine statements, we need to think deeply about it: "to the best of my ability and judgment" makes clear that you **will** fail at keeping the Oaths.

  We are humans: we learn; try stuff; fail; learn again; and eventually reach a point of considerable success. If you are in field for sometime, it is probably clear that new people will make "silly" mistakes, go to the least efficient way and hit walls all the time. And probably it is clear that regardless of your experience, everyone will do these things from time to time as well.

  This statement is a personal reminder that the Oaths are guidelines, points to continuously aim, but circumstances (professional and personal) will cause deviations in your behavior from these goals. It is fine, given that you reflect and make efforts for re-adjust.

## "I will not produce harmful code."

  This oath states the tester will not work on products and features aimed to damage the user and others.

  Warfare ethics is a deep discussion that I would prefer not debate now - but surely it is related this oath.

  Some simpler situations would be misleading products, such as "Improve your sexual performance by 5000% with this secret"; "This strategy will make you millionaire in two weeks" ads; phishing emails or fake sites. Many people put themselves aside from the products, saying they just create software - its usage is responsibility of business people and contractors. It is true that we often don't have control of the exact usage of our products, and that they are property of someone else; however, at the moment **you know** you are creating a product of this kind, the goal of your work is no longer improve the life of your users, but to exploit them - you become a **parasite** of some sort.

  With 7 billion people on Earth, there will be lots of developers and testers who will create these products - and you can not stop them from doing it, but you can mitigate this situation with some attitudes:

  1 - Do not collaborate to these products: With your work and with your user activity (ads are a specially hard to escape, but there are tools to automatically delete them);

  2 - Do not network with people (developers, testers, and clients) involved in these products. One's personal financial situation or lack of knowledge are **never** justifications to feed on others, specially on your users.

  Eventually you may collaborate on products that warm people. Your duty is to acknowledge it, repair the damage as much as you can, and use your influence to make your network avoid these hiddenly harmful projects.

## "The code that I produce will always be my best work. I will not knowingly allow code that is defective either in behavior or structure to accumulate."

  This Oath touches the point that the results of our work will reflect our full potential. There are two parts which I would like to dive a bit:

  - "be my best work" seems a difficult task to achieve - after all, there are somedays when physically we cannot think as well as we usually do, or we are facing a situation into which our knowledge is small, comparing to other situations.

    Although this is true, as I've mentioned, these Oaths are guidelines - points to aim. So, in this case, the Oath would require of us a reflection of the reasons we are not producing the best work possible. Maybe you are having bad sleep frequently, some financial situation keeps your mind uneasy, you are having trouble with your coworkers. Many things can disturbed our work potential. The important thing is to find the real root cause of these disturbances. The [5-Whys Technique](https://www.mindtools.com/pages/article/newTMC_5W.htm) can help you to dialogue with yourself.

  - "defective either in behavior or structure" talks about [internal and external quality](http://wiki.c2.com/?InternalAndExternalQuality). The concept of external quality is already established in the testing community, so I will focus on internal quality.

    Although [Kent Beck](https://dl.acm.org/citation.cfm?id=318762) says that internal quality is interest of development, for it deals with how systems are designed, I would argue that testers should be interested in keeping a high internal quality for products.

  Firstly, internal quality **WILL** affect the external quality: In well designed systems, changes and extensions are more easily implemented, with lower risks - and badly designed systems have the opposite effect. Thus, the internal quality will interfere on how fast and well we can reflect the feedback on the product, yield value more or less fast.

  Secondly, one cannot thoroughly analyze the risks associated with an element (feature, module, variable, etc.) when one have only part of the information about it - it is a typical [Allegory of the Cave Problem](https://www.youtube.com/watch?v=1RWOpQXTltA). So, in order to have strong capacity of testing a system, one need to understand how the elements which compose the target element is implemented.

## "I will produce, with each release, a quick, sure, and repeatable proof that every element of the code works as it should."

  For developers, this oath is a call for automated checks - code which exercise the system and checks if each behavior is as expected. This kind of software is a detailed executable documentation of the production code.

  So, should we created documentation a detailed documentation of each step of our testing activities, **right**? Scripts which allow monkeys (or computers) to reproduce exactly what we did?

  Well... if you know how to unambiguously write the all brain processes a human perform while analyzing complex events, please, write a paper describing it **NOW**.

  However, I guess that the above would have a high and unnecessary cost for most projects. A more productive approach would be to create ways to ensure others can know what you did - spread knowledge of your investigation and discovery.

  Imagine an explorer traveling through the deep and uncharted part of the Amazon forest. He could write step-by-step guide to reach certain places, a detailed description of everything he have seen, but it would make his exploration longer and, more importantly, most of the information he have gathered will probably be deprecated at the moment anyone uses it to something useful. However, if he creates a story of what he have seen and his walks, describing his decision-making process, it would allow him to explore more, focus on what is more important, gather and share exactly the information which would allow others to know what is the situation there.

  Exploratory testing does not have this adjective by chance - it is a self-looping process of asking questions, investigation, discovery, and note taking, with the goal of sharing to others what we have seen. Thus the focus should be on the receivers of the information. Business people may require general evaluations for production release; DBAs may need scientific measures of performance; developers may need database dumps and error tracing reports. Your duty is to provide each person the information he needs to make decisions.

  OBS: As pair programming is a great way of making programmers have quick review and share information, [pair **testing**](https://www.agilealliance.org/resources/sessions/discover-the-power-of-pair-testing/) can help to share insights and the testing process.

## "I will make frequent, small, releases so that I do not impede the progress of others."

  Nothing of "testing at the end" of the timebox (even in short sprints) - Be involved in all high-level meetings and discussions - even "technical" ones. So you will be aware of the direction the project is going, and its risks. Work closely to people, so that testing ideas and practices are exercised as soon and frequently as possible.

## "I will fearlessly and relentlessly improve my creations at every opportunity. I will never degrade them."

  For programmers, this Oath represents the need to always introduce adding value changes - and since [risk is anti-value](https://www.whizlabs.com/blog/what-is-value-driven-delivery-in-the-agile-world/), when a programmer increase the level of risk in a product, he is decreasing the value it provides.

  This risk-avoiding approach need to be take by testers as well, since we deal with quality and risk evaluation and mitigation. Our actions need to **always** yield information which can allow the risk of the project to decrease, not allowing risk-adding actions to be taken.

  As examples, you can think in some situations:

  - "The automated checks are taking too long, let's remove some of them".

    This action is not a solution to the problem, but rather a risk exchange - we are assuming the risk of moving these checks to another moment (or never doing them) so we can make other thing (merging branches in a CI, e.g.);

  - "we don't need exploratory testing here, the automated checks are enough"

    This action assumes that the analysis to test something was sufficiently done before the thing was produced, that all risk associated with it are validated by the checks. Saying this is plainly wrong would not be precise, but reality is very close to it.

  - "this **ONE** POLITICALLY POWERFUL user demanded this feature and or this change - although we know this is risky or it will cause problems to other users"

    No comment is necessary here.

## "I will do all that I can to keep the productivity of myself, and others, as high as possible. I will do nothing that decreases that productivity."

  The two things that come to my mind with this need to keep productivity high are automation (all sort of automation) and simplification.

  Do you do some non-value adding activity periodically?

  Maybe once upon a time the gathering of a given metric was important for some people - but is it still? Is it still delivered in the most efficient way?

  Send a message to the receiver and ask how to improve it. You maybe surprised with answers as "Sorry Dave, I don't even read this email" or "We just need the current number, we don't need that interactive chart".

  After simplification, the next step is automation.

  Test and [build automation](https://www.youtube.com/watch?v=FznggUvk5i0) are obviously useful in order to remove frequent work.

  But process automation is important as well:

  You can create tools so that your colleagues may [easily interact with your test management tool](https://developer.atlassian.com/server/jira/platform/rest-apis/), in order to make processes be [automatically trigged by some event](https://confluence.atlassian.com/adminjiracloud/connect-jira-cloud-to-github-814188429.html).

  Additionally, a more subtle way of keep every person's productivity high is to have a holistic vision of your environment. When you know how more pieces fit together, you are able to make better decisions, avoid re-work, and drive people's decisions to more efficient ways.

  Even if you don't have all the answers or decision power, you can be a change-driver force, connecting people in ways to produce better result.

## "I will continuously ensure that others can cover for me, and that I can cover for them."

  Have you team ever got agitated when that person said she was leaving for vacations, new-born license, or to another company? Besides friendship, other cause of agitation is certain situations is the phrase "But only she knows how to do X".

  One way for programmers to anticipate this problem is [visualizing that some people are "specialized" in some part of the code](http://gource.io/) (or better: how some parts of the code are "specilized in some people" :)) or when some important processes are a "black-box" for most of the team:

  - When we need to deploy a new version in production, we ask Mike;
  - When we need to get a production database dump, we ask Julia;
  - When we need to talk to the final user, only Chiranjit is allowed to do it.

  People are either prohibited to perform some activity or its details are not clear for all. This situation indicates a lack of [collective ownership](https://en.wikipedia.org/wiki/Collective_ownership) - and chaos is installed when the _owner_ is not available.

  Examples of lack of collective ownership in testing are:

  - Lack of knowledge in the automation suite from part of the team (tester and developers);
  - Lack of authorization to some tester to investigate important parts of the system or specific environments;
  - Exaggerated processes of work review (i.e., reviews focused on checking correctness instead of learning).

  The reasons for these situation vary widely: Previous catastrophes due errors of less senior members, upper-management neurosis with security, etc.

  Some of them, as the ones I've mentioned, are harder to work-around; however, more subtle and less impacting improvements can compound change overall situations:

  - Improve communication: Make sure your work is understood by other people - create more clear reports and explain your activities with a more acceptable vocabulary.

  - Teach: Invite people to share the activities with you, slowing building skills in others to cover for you.

  And to get for the "I can cover for them" part of the statement, make sure you understand other's work, and that you can learn to perform these activities: Ask questions and offer help - each daily small step is a step forward towards more robust teams.

## "I will produce estimates that are honest both in magnitude and precision. I will not make promises without certainty."

  I thought:

  - "9 oaths -> 20 min each => 3 hours";
  - "Little intro and conclusion => 25 min"
  - "Review => 15 min"

  So, do you think I finished this text in 3 hours and 40 min? :)

  Estimates are doomed to fail: we don't know a bunch of things of our work, a new meme will explode on the internet, people get sick.

  However, they are necessary in all parts of life, specially in software development. So, remembering that the goal is move towards the fullfiment of the Oath, not to be always fulfill it, 3 tips regarding estimates:

  - Continuously work to make them more precise: Do your metrics measure what is really necessary? Are you able to explain why ([deeply](https://www.mindtools.com/pages/article/newTMC_5W.htm)) the estimates failed? Do you continuously list and execute the estimate improvement actions?
  - You will be sincere: This means saying some numbers that you know people will not like and explaining risks and unknowns that you have to consider. Have you thought about the things that can go wrong?
  - Range estimates: Exact estimates are rarely met, and giving one means that you have so much confidence in the work to be done that you consider nothing is out of your control - it's lying. Although almost nobody will get mad about an underestimate, it is still an estimate error. Instead, using the two tips above, be more sincere and say that you consider something can be achieved between X and Y periods of time.

  Make sure you explain the reasons for your estimate, the steps needed and that you will keep the people receive the estimate informed. The continuous communication will create confidence because people will be able to adapt their plans on the way; and range estimates will be more easily accepted, because they will be met.

## "I will never stop learning and improving my craft."

  This statement has two parts:

  - "never stop learning"

    If there is an area of work that no single person on Earth thinks things don't change all the time, that is software development.
    Put aside the new and shine frameworks and programming languages created every year (and often don't bring new things in essence), the basics usage of software in human life change frequently (and tend to continue to do so):

    - From mainframes and work stations in the 40s/50s, to personal computers on every person home, to the internet, to mobile phones, to Internet of Things and Bio-computing;

    - From a few hundred lines of procedural near-to-assembly code, aim to run in a specific machine, to hundreds of independent micro-services running in multi-processor/thread computing farms in the cloud;

    - From CLI and batch processing applications to AI/Big Data based applications, whose behavior is flexible according the user and others' (users, events and applications) activities.

  To both for programmers and testers, the message is the same: "Current knowledge and skills may rapidly become obsolete and inefficient. It is necessary to, **wisely**, constantly learn about the necessities of the context you are in."

  - "never stop improving my craft"

    Knowledge and skill is the first step.
    The next one is change how you work in order to produce the best work possible (second statement) - constantly reviewing and experimenting new ways of work, which include working with colleagues to improve their craft as well (statement 5).

# YOU are your ONLY client and employer!

A general lesson from the 9 statements of the Scribe's Oath is that it is your responsibility, and yours only, as an individual to take your capacities to a higher level of professionalism - both on the technical and on the ethical senses.

Difficulties regarding technical challenges and unprofessional individuals (colleagues, managers, and clients) will appear and you may fail, at least partially, to keep your values. However, as stated repeadatlly throughout the text, acknowledgment of these errors and correction of behavior will increase your capacity to face future situations with more ease. The compound interest of experience and anti-fragility will create in you and in your peers a stronger and more ethical group of professionals.

# Links to Bob's work and others'

Robert Martin:

- [The original blog post](https://blog.cleancoder.com/uncle-bob/2015/11/18/TheProgrammersOath.html);
- [51-min presentation at YOW! 2016](https://www.youtube.com/watch?v=X31Jc6HQUcs)
- [59-min presentation at GOTO 2017](https://www.youtube.com/watch?v=Tng6Fox8EfI)
- [Series of 9 1-min long videos talking about each Promise](https://www.youtube.com/watch?v=36NgPu9OyRM&list=PLWKjhJtqVAbno-B4RmJHCDO0ZUKC2tpUQ)
