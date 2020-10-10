---
title: "Three Code Kata for Automation in Web Testing - UI Edition"
date: 2020-10-10T08:00:00 -0000
categories:
  - blog
tags:
  - automation
  - kata
  - web
excerpt: "Practice makes it perfect. Time to apply the old saying to improve our skills in automation for testing website interfaces."
---

# Code Katas

TODO - Add Kata related Image
TODO - **Should I break this in many posts?**

In Asian martial arts, Katas are exercises meant to...

The concept was translated in the coding world when a programmer...

In this post, I will propose three beginner Code Katas based on the [The Internet](https://the-internet.herokuapp.com/) application. In each Kata, I will point out the problem we are trying to solve, different levels of constraints and in the end propose a solution that you can compare with yours. 

The goal is not to simply get it right or the same as me, but to instigate you to in trying to solve the problem and afterwards not only look on what you wrote, but also in **how you wrote**: In Code Katas, as it is in martial arts Katas, how you perform, (your style, elegancy and low stress) is even more important than the performance itself.

TODO - Add note about language agnostic - note about OO

Without further ado, put on your gi, do your warming exercises, and let's get to coding!

TODO - Add note about running The Internet locally

# 1 - The Login Page

The [Internet's Login Page](https://the-internet.herokuapp.com/login) displays a typical... login page, with a title, a subtitle text and at its core user credentials fields and a big **_Login_** button. In this Kata we will exercise your skill of creating Page Objects, incrementally creating abstractions and new tests - enabling us to have maintainable and extendable code.

## The Step Zero

The first step will take is to perform the login itself.

The Kata consist of writing a test that will:

1 - Go to the [Internet's Login Page](https://the-internet.herokuapp.com/login);
2 - Enter the correct username ("tomsmith") and password ("SuperSecretPassword!");
3 - Click on the **_Login_** button;
4 - Wait for 2 seconds (yes, for now we will explicitly wait for a total of 2 seconds - feel free to use any method for it);
5 - Assert that the "_Secure Area_" title and "_Welcome to the Secure Area. When you are done click logout below._" subtext appear.

For now, write everything in a single function, without any type of abstraction, calling the browser driving library and assertion libraries directly.

TODO - You can find my solution here

## Step One - Extract Till You Drop

Now we will start our abstraction process.

At the end of this step the only thing that your test function may contain are function calls.
For now, these functions should stay in the same file / namespace as your main test function.

Additionally, we will keep all test data (strings) in the main test function - we don't want
the support functions to be coupled to test data.

The goal of step is to exercise the practice of [_Extract Till You Drop_](https://sites.google.com/site/unclebobconsultingllc/one-thing-extract-till-you-drop)(ETYD), as named by Robert Martin. With ETYD, you will end up with **very small** (no, smaller than that) and well-named functions, making your [code read like well-written prose](https://www.goodreads.com/quotes/7029841-clean-code-is-simple-and-direct-clean-code-reads-like), thus pleasurable to **other people** to read and understand. Look at each line of your code and think if you give it a descriptive name - if you can, then extract it to a function, even if it has only one line.

Don't forget to run your test to check if it's still working ;)

TODO - You can find my solution here

## Step Two - Creating Objects

Now it's time for us to start creating our page objects.

Now create two objects, one to represent the **_Login Page_** and another to represent the **_Secure Area_** page, and move the support functions to their appropriated objects.

TODO - You can find my solution here

## Step Three - Refactor, refactor, refactor!

Now we have objects that we can structure them in many ways.

1 - The _Username_ and _Password_ fields, together with the _Login_ button, are actually one component: **The Login Form** (look at the DOM!). The refactoring you can do it is to create this _LoginForm_ object, hiding all complexity of the DOM, and make the _LoginPage_ interact with it.

TODO - You can find my solution here

2 - Regardless of doing (1) or not, another refactoring you can do is to create an object called _UserCredentials_, which will hold the data necessary to perform the login. Pass this object around instead of the raw strings.

TODO - You can find my solution here

3 - Let's make our solution more robust by changing our hard 2 seconds wait time for waits for the page elements we want to interact with, both the title and subtitle of the _Secure Area_ page.

TODO - You can find my solution here


## Step Four - Adding Tests

In this step we will train in adding functionality to page objects as we need for new tests.

Create tests for:

1 - Logout: After the login, perform the logout and verify that a green banner appears with the _"You logged out of the secure area!"_ text and that the _LoginForm_ fields are empty.

TODO - Add screenshot of the banner

TODO - You can find my solution here

2 - Wrong login: Try to use wrong credentials to login and check that a red banner appears with the text _"Your username is invalid!_. Which combinations should we use to validate?


