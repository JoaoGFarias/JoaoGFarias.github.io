---
title: "Interviews in Tech: Show how you are different"
date: 2020-02-12T08:00:00 -0100
categories:
  - blog
tags:
  - interview
  - career
excerpt: "About the problem"
toc: false
---


# What are really companies looking for?

When a company goes to the market to find a new employee, you may think they
are trying to fullfil a business goal: 

The HR head: "We will need a staff of 15 programmers, 10 testers and 3 managers to the future Programme of Sub-Atomic AI-driven Blockchain Applications".

However, what is hidden between the lines of this statement is that some people from the company have specific pains that need to be fulfilled:

The Senior Backend Developer: "Man, we need more people with TDD experience here. I am spending half of my time pairing with the developers from other teams
to guide them in TDD, then I had to put 3 extra hours
 everyday this month, which made I was basically sleepless during the last two on-call emergencies".

In this perspective, companies are not looking for cures for their pains, their employee's pains. 

To solve these pains, companies, more or less successfully, engage in weeks or month long period of search for people with the specific skills and experience.

Therefore, if you want to be ahead of others for any position, you will need to expose primarily what **differentiate** you from others, before what makes you aligned with the experience and skills of everyone else.

# What makes you equal to others?

Before jumping in how to differentiate yourself, let's look at what may make you seem mediocre (ordinary, just like all else). These are things that a hiring manager or an engineer will think "ah ok, that's cool (meh)":

- Education:

"What?" you may ask. It can seem strange to not consider education as a differential factor. The problem arises when the possession of certain certifications are common-place in your industry.

Although becoming less common, most programmers, testers and managers have a college degree with a GPA-equivalent of 70%-80%. Increasly common in the industry are online certifications such as Udemy and Coursera.

- Tools

Oh, the tools list...

"Programming languages: PHP, Java, Python2, Python3, Javascript +8, Ruby, Groovy, Kotlin, C, C++, D, CSS (?)"

Long list of tools rarely are impressive, specially when you have many years of experience. 

Some tools in your CV are simply annoying to read:

"Operational systems: Windows, Linux, Mac." 
"Microsoft Word, Jira, Subversion (?)"

Unless you are some sort of system administrator for these tools, then they are probably just a tiny little part of your job, and also not something it's important for you to develop as a craft.

Additionally, tools nowadays are widely spread. With two clicks you can find thousands and thousands of Postman users, Ember programmers, and Git masters. And many of them have applied to the same position as you.

# How can you differentiate yourself? The Attention Grabbing Game

# What about automatic CV analysis?

# Most of the time you will blow up the interview. And that's fine...

# Note for the unexperiecied

# Introduction JMeter Series

## What is JMeter?

{% include figure image_path="https://jmeter.apache.org/images/jmeter.png" alt="JMeter" caption="" %}

JMeter is a load testing tool designed and maintained by Apache released in 1998.
It is written in Java, which makes it easy to run out-of-the-box in any system
with a JVM.

# Fetching Bitcoin Orders from Mercado Bitcoin API

## What We Will Do

[Mercado Bitcoin](https://www.mercadobitcoin.com.br) is one of the biggest cryptocurrencies exchanges from Brazil,
providing its services for Bitcoin, Litecoin, Ethereum and others coins.

The platform provides an API to fetch data from its usage. The best thing is that this API is simple, doesn't require any account or authentication: **Perfect to start with JMeter**, since we can focus indeed on the basics.

For this post we will investigate the performance of the _orderbook_ endpoint. The orderbook is the registration of all negotiation requests (selling and buying). We will simply hit the endpoint for the Bitcoin's orderbook **many times** and register how long does it take to complete our requests.

## Creating Our Test Plan

The root for any JMeter project is the **Test Plan**.

A Test Plan will group a series of steps that JMeter will execute.

Additionally, it can provide general configuration that will be shared everywhere, such as User Defined Variables.

But this is theme for another post...

For our purposes the Test Plan will serve only to name our project.

Here we simply change the Test Plan name and JMeter updates it on the tree structure.

{% include figure image_path="assets/jmeter/post1/test_plan_details.png" alt="Test Plan Details" caption="Test Plan Details, where we name our set of interactions" %}

## Thread Groups: Execution Configuration

Thread Groups elements serve to setup an execution scenario - they are the **"how"** we will run.

In Thread Groups, we can define the requests we want to send - and also the frequency.

![Thread Group Tree]({{ "assets/jmeter/post1/thread_group_tree.png" | absolute_url }})

A Thread Group have three main configuration parameters:

- **Number of Threads (users)**: It configures how many users will be simulated. Each user will execute each request under the Thread Group. E.g. if you configure requests for two endpoints and 30 threads, you will have 60 requests in total.

- **Ramp-up Period (in seconds)**: The ramp-up time is the time that JMeter will take to start **all** configured threads. E.g. if we set 50 threads and a ramp-up of 250 seconds, each thread will start 5 seconds after the previous one:

  - Thread 1 - time 0
  - Thread 2 - time 5
  - ...
  - Thread 50 - time 250

- **Loop Count**: The number of times the Thread Group will be executed as a whole - it is basically a... loop. In the example above, if you setup a Loop Count of 3, JMeter will take 250 seconds to start the first 60 requests; then, when all of them finish, JMeter will take more 250 seconds to start 60 more requests; and then it again. The total number of requests will be 180 - however, the total time will not be 250*3=750 seconds; it will be 750 + total time that take for the last request finish (if you application has bad performance...).

![Thread Group Details]({{ "assets/jmeter/post1/thread_group_details.png" | absolute_url }})

## Samplers: Our Tests

Sampler is the **"what"** we will test. It defines the request itself. 

In our example, we will use only HTTP requests.

![Thread Group Tree]({{ "assets/jmeter/post1/sampler_tree.png" | absolute_url }})

It has two main parameters:

- **Web Server**: It defines the URL of the server that will be hit;

- **HTTP Request**: It defines the HTTP Method (GET, POST, PATCH...) and the HTTP resource path

![Thread Group Tree]({{ "assets/jmeter/post1/sampler_details.png" | absolute_url }})

## Listeners: Reporting Results

Finally, in order to understand the behavior of our application, we must read how requests behaved.

That's were Listeners enter.

The goal of a listener is to display the results of all requests from a Thread Group in a specific way.

In our example, we will use the _View Results Tree_ and the _Summary Report_ listeners.

![Listener Tree]({{ "assets/jmeter/post1/listener_tree.png" | absolute_url }})

The _View Results Tree_ will display data of each request separately, showing the details of the request, the details of the response and a summary of the call.

![Listener Details]({{ "assets/jmeter/post1/listener_view.png" | absolute_url }})

![Listener Details]({{ "assets/jmeter/post1/listener_view2.png" | absolute_url }})

![Listener Details]({{ "assets/jmeter/post1/listener_view3.png" | absolute_url }})

The _Summary Report_ shows statistical data from the set of requests, regarding response time and size.

![Listener Details]({{ "assets/jmeter/post1/listener_summary.png" | absolute_url }})

You can download the JMeter suite [here](https://raw.githubusercontent.com/JoaoGFarias/JoaoGFarias.github.io/master/assets/jmeter/post1/jmeter_basics.jmx)

# What to do from here?

JMeter has a manifold of features - different types of servers, different listeners.

In this tutorial series, we will focus more on how to create usable and extensive JMeter suites, in order to make them a tool to enable agility.

Our series will follow talking about:

- [Variables](http://thatsabug.com/2019/06/21/jmeter_2.html)
- Tests
- Authentication OAuth
- Running JMeter on Jenkins
