---
layout: post
title: "JMeter Basics Part 1 of 5 - Fetching Bitcoin orders data"
date: 2019-05-24 07:00:00 +0100
author: João Farias
version: 1.0.0
tags: jmeter jmeter-series
description: Let's learn the basic components of JMeter, shall we?
---

# Introduction JMeter Series

## What is JMeter?

## Fetching Bitcoin Orders from Mercado Bitcoin API

### What We Will Do

[Mercado Bitcoin](https://www.mercadobitcoin.com.br) is one of the biggest cryptocurrencies exchanges from Brazil,
providing its services for Bitcoin, Litecoin, Ethereum and others coins.

The platform provides an API to fetch data from its usage. The best thing is that this API is simple, doesn't require any account or authentication: **Perfect to start with JMeter**, since we can focus indeed on the basics.

For this post, we will investigate the performance of the _orderbook_ endpoint. The orderbook is the registration of all negation requests (selling and buying). We will simply hit the endpoint _for the Bitcoin's orderbook **many times** and register how long does it take for our request to get completed.

### Creating Our Test Plan

The root for any JMeter project is the **Test Plan**.

A Test Plan will group a series of steps that JMeter will execute when it is executed.

Additionally, it can provide general configuration that will be shared everywhere, such as User Defined Variables. But this is theme for another post...

For our purposes, the Test Plan will serve only to name our project.

![Test Plan]({{ "assets/jmeter/post1/test_plan.png" | absolute_url }})

Here, we simply change the Test Plan name and JMeter updated it on the tree structure.

[Test Plan Details]({{ "assets/jmeter/post1/test_plan_details.png" | absolute_url }})

### Thread Groups: Execution Configuration

### Samplers: Our Tests

### Listeners: Reporting Results

## What to do from here?