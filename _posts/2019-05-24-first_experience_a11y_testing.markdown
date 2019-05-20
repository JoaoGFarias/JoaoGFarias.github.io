---
layout: post
title: "MoT Bloggers Club: First Experience in Accessibility Testing"
date: 2019-05-24 08:00:00 +0100
author: João Farias
version: 1.0.0
tags: a11y-testing
description: A short report of my first experiences with Accessibility Testing for the Ministry of Testing Bloggers Club
---

# The Problem

* App not built to suuport a11y used for more than 100k users.
* 10% color blind or blind users
* Business had to prioritize fixes -> They needed a backlog for a11y compatibility

# Solutions

We had to act fast to create this backlog, but some shifts in practices had to be implemented
for the long-term.

In summary, we did the following:

## Immediate

* Automation right now
* Exploration of main flows

## Long-term

* Improvements in requirements
* A11y in the DoD -> Zero bug policy
* Testing in production
  * Investigate usage of a11y target users