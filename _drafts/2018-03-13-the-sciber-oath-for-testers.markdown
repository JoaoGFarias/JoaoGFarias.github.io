---
layout: post
title:  "The Scribe's Oath for Testers"
date:   2018-03-13 23:21:22 -0300
author: João Farias
categories: testing ethics software
---

# The Scribe's Oath

Bob Martin (aka Uncle Bob) is one of giants of software development. Every single time I have the chance to read, and re-read, what he says, I grap my notebook and a pencil, because it is almost certian that I will get something to improve my life professional. And The Scribe's Oath (previously know as The Programmer's Oath) is one of my personal favourites lessons regarding professional ethics.

The Oath is composed of 9 statements about how software developers should face their craft, an ethical guide, inspired on egyptian scribes way of working, against a world which may transform programmers into machines of producing products - depressed and personally insatisfied machines, by the way.

Lo and behold! The Scribe's Oath:

### **In order to defend and preserve the honor of the profession of computer programmers,** 
### **I promise that, to the best of my ability and judgement:** 

1. I will not produce harmful code.
      - I will not intentionally write code with bugs.
      - This means: Do your best.
2. The code that I produce will always be my best work. I will not knowingly allow code that is defective either in behavior or structure to accumulate.
3. I will produce, with each release, a quick, sure, and repeatable proof that every element of the code works as it should.
4. I will make frequent, small, releases so that I do not impede the progress of others.
5. I will fearlessly and relentlessly improve my creations at every opportunity. I will never degrade them.
6. I will do all that I can to keep the productivity of myself, and others, as high as possible. I will do nothing that decreases that productivity.
7. I will continuously ensure that others can cover for me, and that I can cover for them.
8. I will produce estimates that are honest both in magnitude and precision. I will not make promises without certainty.
9. I will never stop learning and improving my craft.

Although the Oath is written under a programmer's perspective, I think the 9 promisses are applicable to any professional, including testers. I will break each part and discuss how can we fullil them (and how to detect and counter-attack risks to these ethical guides).

## Translating to the Testing World

* "I promise that, to the best of my ability and judgement"
   
      Although this statement is not an Oath, we should think deeply about it. "to the best of my ability and judment" makes clear that you **will** fail at keeping the Oaths. 
      
      We are humans: we learn; try stuff; fail; learn again; and eventually reach a point of considarable success. If you are in field for sometime, it is probably clear that new people will make "silly" mistakes, go to the least effient way and stop at walls all the time. And probably it is clear that regardless of your experience, everyone will do these things as well.

      This statment is a personal reminder that the Oaths are guidelines, points to continuosly aim, but circumstances (professional and personal) will cause deviations in your behaviour from these goals. It is fine, since you reflect and make efforts for re-adjust.

* "I will not produce harmful code."
   
      This oath states the tester will not work on products and features aimed to damage the user or others. 
      
      Warfare ethics is a deep dicussion that I would prefer not debate now - but surely it is related this oath.

      Some simpler situations would be misleading products, as "Improve your sexual performance by 5000% with this secret"; "This strategy will make you milionare in two weeks" ads; phishing emails or fake sites. Many people put themselves aside from the products, saying they just create software - its usage is reponsability of bussiness people and contractors. It is true that we often don't have control of the exact usage of our products, and that they are property of someone else; however, at the moment **you know** you are creating a product of this kind, the goal of your work is no longer improve the life of your users, but to feed on them - you become a **parasite** of some sort.

      With 7 billion people on Earth, there will be lots of developers and testers who will create this products - and you can not stop them from doing; all you can do is:

      1 - Do not collaborate to these products: With your work and with your user activities (ads are a specially hard to escape, but there are tools to automatically delete them);

      2 - Do not network with people, developers; testers; and clients, involved in these products. One's personal finantial situation or lack of knowledge are **never** justifications to feed on others, specially on your users.

      Eventually you may collaborate on products that warm people. Your duty is to ackownledge it; repair the damage as much as you can; and use your influence to make your network avoid these hiddenly harmful projects.

* "The code that I produce will always be my best work. I will not knowingly allow code that is defective either in behavior or structure to accumulate."

* "I will produce, with each release, a quick, sure, and repeatable proof that every element of the code works as it should."

      For developers, this oath is a call for automated checks - code which exercise the system and checks if each behavior is as expected. This kind of software is a detaled executable documentation of the production code.
      
      So, should we created documentation a detailed documentation of each step of our testing activities, right? Scripts which allow monkeys (or computers) to reproduce exactly what we did?

      Well... if you know how to unambiguously write the all brain processes a human perform while analysing complex events, please, write a paper describing it **NOW**.

      However, I guess that the above would have a high and unnecessary cost for most projects. More productive would be to create ways to ensure others can know what you did - spread knowledge of your investigation and discovery.

      Imagine an explorer traveling through the deep and uncharted part of the Amazon forest. He could write step-by-step guide to reach certain places, a detailed description of everthing he have seen, but it would make his exploration longer and, more importantly, the most information he gathers will probably be deprecated at the moment anyone uses it to something useful. However, if he creates a story of what he have seen and walk, describing his decision-making process, it would allow him to explore more, focus on what is more important, gathering and sharing firstly the information which would allow others to know what is the situation there.

      Exploratory testing does not have this adjective by chance - it is a process of cycling asking questions, investigation and discovery note taking, with the goal of sharing with others what we have seen. Thus the focus should be on the receivers of the information. Bussiness people may require general avaliations for production release; DBAs may need scientific meseasures of performance; developers may need database dumps and error tracing reports. Your duty is to provide each person the information he needs to make decisions.

      OBS: As pair programming is a great way of making programmers have quick review and share information, [pair **testing**](https://www.agilealliance.org/resources/sessions/discover-the-power-of-pair-testing/) can help to share insights and the testing process.

* "I will make frequent, small, releases so that I do not impede the progress of others."
      
      - Nothing of "testing at the end" of the timebox (even in short sprints)
      - Be envolved in all high-level meetings and discussions - even "technical" ones. So you will be aware of the direction the project is going, and its risks
      - Work closely to people, so that testing ideas and pratices are exercised as soon as possible

* "I will fearlessly and relentlessly improve my creations at every opportunity. I will never degrade them."

      - Never degrade: "The automated checks are taking too long, let's remove some of them"; "we don't need exploratory testing here, just the automated checks are enough"; "this ONE POLITICAL POWERFUL user demanded this feature and change - although we know this is risky or it will cause problems to other users".

* "I will do all that I can to keep the productivity of myself, and others, as high as possible. I will do nothing that decreases that productivity."

      - Holistic vision of the project process and needs
      - Effort in automating activities

* "I will continuously ensure that others can cover for me, and that I can cover for them."
      - Collective ownership
      - Communication
      - Teaching
      - Vacations

* "I will produce estimates that are honest both in magnitude and precision. I will not make promises without certainty."

      - Fail at estimates is fine, but you will continuosly work to make them more precise.
      - You will consider risks and unknowns into your estimates.
      - Range estimates - you will almost always estimate wrongly (underestimate or overestimate) if you state a precise date or effort for something.

* "I will never stop learning and improving my craft."

      - The landscape is always changing
            - People work in new ways
            - New kinds of products and software archetectures
      - Specialization is important, but you need to expand to contribute
      - 

## YOU are your ONLY client and employer!

### Links to Bob's work and others'
