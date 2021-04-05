---
title: "3 Coding Katas for Automation in Web Testing - UI Edition"
date: 2020-10-10T08:00:00 -0000
categories:
  - blog
tags:
  - automation
  - kata
  - web
excerpt: "Practice makes it perfect. Time to apply the old saying to improve our skills in automation for testing website interfaces."
toc: true
toc_icon: "cog"
---

# Coding Katas

TODO - Add Kata related Image
TODO - **Should I break this in many posts?**

In Asian martial arts Katas are exercises meant to...

The Coding Kata is when a programmer...

In this post, I will propose three beginner Coding Katas based on [The Internet](https://the-internet.herokuapp.com/) application. In each Kata, I will point out the problem we are trying to solve, different levels of constraints and in the end propose a solution that you can compare with yours. 

The goal is not to simply get it right or the code the same as me. These exercises are meant to instigate you to try to solve the problem and afterwards not only look on what you wrote, but also in **how you wrote**: In Coding Katas, as it is in martial arts Katas, how you perform (your style, elegance and low stress), is even more important than the performance itself.

TODO - Add note about language agnostic - note about OO

Without further ado, put on your gi, do your warm-up exercises, and let's get to coding!

TODO - Add note about running The Internet locally

# 1 - The Login Page

The [Internet's Login Page](https://the-internet.herokuapp.com/login) displays a typical... login page, with a title, a subtitle text. At its core are the user credentials fields and a big **_Login_** button. In this Kata we will exercise your skill in writing Page Objects, incrementally creating abstractions and new tests — enabling us to have maintainable and extendable code.

## Step Zero

The first step will take is to perform the login itself.

The Kata consists of writing a test that will:

1 — Go to the [Internet's Login Page](https://the-internet.herokuapp.com/login);
2 — Enter the correct username ("tomsmith") and password ("SuperSecretPassword!");
3 — Click on the **_Login_** button;
4 — Wait for 2 seconds (yes, for now we will explicitly wait for a total of 2 seconds - feel free to use any method for it);
5 — Assert that the "_Secure Area_" title and "_Welcome to the Secure Area. When you are done click logout below._" subtext appear.

For now, write everything in a single function, without any type of abstraction, calling the browser driving library and assertion libraries directly.

TODO - You can find my solution here

## Step One — Extract Till You Drop

Now we will start our abstraction process.

At the end of this step the only thing that your test function may contain are function calls.
For now, these functions should stay in the same file / namespace as your main test function.

Additionally, we will keep all test data (strings) in the main test function — we don't want
the support functions to be coupled to test data.

The goal of step is to exercise the practice of [_Extract Till You Drop_](https://sites.google.com/site/unclebobconsultingllc/one-thing-extract-till-you-drop)(ETYD), as named by Robert Martin. With _ETYD_, you will end up with **very small** (no, smaller than that) and well-named functions, making your [code read like well-written prose](https://www.goodreads.com/quotes/7029841-clean-code-is-simple-and-direct-clean-code-reads-like), thus pleasurable to **other people** to read and understand. Look at each line of your code and think if you give it a descriptive name — if you can, then extract it to a function, even if it has only one line.

Don't forget to run your test to check if it's still working ;)

TODO - You can find my solution here

## Step Two — Creating Objects

Now it's time for us to start creating our page objects.

Now create two objects, one representing the **_Login Page_** and another representing the **_Secure Area_** page, and move the support functions to their appropriated objects.

TODO — You can find my solution here

## Step Three — Refactor, refactor, refactor!

Now we have objects that we can structure them in many ways.

1 — The _Username_ and _Password_ fields, together with the _Login_ button, are actually one component: **The Login Form** (look at the DOM!). The refactoring you can do it is to create this _LoginForm_ object, hiding all complexity of the DOM, and make the _LoginPage_ interact with it.

TODO — You can find my solution here

2 — Regardless of doing (1) or not, another refactoring you can do is to create an object called _UserCredentials_, which will hold the data necessary to perform the login. Pass this object around instead of the raw strings.

TODO — You can find my solution here

3 — Let's make our solution more robust by changing our hardcoded 2 seconds wait time for proper waits for the page elements we want to interact with, both the title and subtitle of the _Secure Area_ page.

TODO — You can find my solution here


## Step Four — Adding Tests

In this step we will train in adding functionality to page objects as we need for new tests.

Create tests for:

1 — Logout: After the login, perform the logout and verify that a green banner appears with the _"You logged out of the secure area!"_ text and that the _LoginForm_ fields are empty.

TODO — Add screenshot of the banner

TODO — You can find my solution here

2 — Wrong login: Try to use wrong credentials to login and check that a red banner appears with the text _"Your username is invalid!_. Which combinations can we validate?

TODO — Add table with Combinations

# 2 — Dynamic Controls

The [Internet's Dynamic Controls Page](https://the-internet.herokuapp.com/dynamic_controls) displays two forms with dynamic content, controlled by a button. In this Kata we will focus on the checkbox form, leaving the Enable/Disable text field as an exercise. This exercise builds on the previous one, demanding the skill of page object creation, but now we will have to learn how deal with elements that appear and disappear.

## Step Zero

For starters, we will create a simple test to validate the checking / unchecking behavior.

The first part of The Kata consistss of writing a test that will:

1 - Go to the [Internet's Dynamic Controls Page](https://the-internet.herokuapp.com/dynamic_controls);
2 - Verify the checkbox is unchecked as default and its text;
3 - Check the checkbox;
4 - Verify the checkbox is checked and its text;

TODO — You can find my solution here

## Step One

In this step we can already refactor our code into page objects.
You can create an object called _CheckboxField_, which will hold box the checkbox and the associated text,
then we can change our test code to simply create this object and call its functions.

TODO — You can find my solution here

## Step Two

Now we can create another test that will deal with the Remove / Add button.

This second test will do the follow:

1 - Go to the [Internet's Dynamic Controls Page](https://the-internet.herokuapp.com/dynamic_controls);
2 - Verify the checkbox is present;
3 - Click on the _Remove_ button;
4 - Wait until the checkbox is gone;
5 - Click on the _Add_ button;
6 - Wait until the checkbox is back;

TODO — You can find my solution here

## Step Three

Now we can refactor the second test so all the behavior will go into page objects.

TODO — You can find my solution here

## Step Four

The last step is to create a third test where we will mix the checking and Remove / Add button;

1 - Go to the [Internet's Dynamic Controls Page](https://the-internet.herokuapp.com/dynamic_controls);
2 - Verify the checkbox is unchecked as default and its text;
3 - Check the checkbox;
4 - Verify it's checked;
5 - Wait until the checkbox is gone;
6 - Click on the _Add_ button;
7 - Wait until the checkbox is back;
8 - Verify the checkbox is unchecked as default and its text;
9 - Check the newly created checkbox;
10 - Check it is checked;


TODO — You can find my solution here

Remember to use ETYD also in your page objects. Look at the DOM and screen and find opportunities to create
components representing high-level areas and sub-components representing the parts of these areas.

The Enable / Disable form can be used as a Kata in a similar form, aiming at hiding from your test all the
details of how you wait to elements to change and its components / sub-components.

# 3 — Challenging DOM

The [Internet's Challenging DOM Page](https://the-internet.herokuapp.com/challenging_dom) displays three components with elements that are not so easy to deal with, due to lack of unique IDs and organization of the HTML. In this Kata we explore how we can write clean tests that abstract this complicated DOM into simple objects and functions. We will focus on the table, but you can use the other two elements as exercise as well.

## Step Zero

The first step will validate the first row of the table. We will want to know if the text of each element is _"Iuvaret0"_, _"Apeirian0"_, _"Adipisci0"_, _"Definiebas0"_, _"Consequuntur0"_, _"Phaedrum0"_, followed by the _edit_ and _delete_ links. Again, we will not worry now about writing a clean version of the solution.

1 - Go to the [Internet's Challenging DOM Page](https://the-internet.herokuapp.com/challenging_dom);
2 - Verify the first 6 columns of the first row contain  _"Iuvaret0"_, _"Apeirian0"_, _"Adipisci0"_, _"Definiebas0"_, _"Consequuntur0"_, _"Phaedrum0".
3 - Verify the last column of the first row is composed by the _edit_ and _delete_ links

TODO — You can find my solution here

## Step One

Refactor solution into page objects. Note that we are not dealing with the table as a whole yet, so we should create a _Row_ object, which will handle only
the elements our test needs.

TODO — You can find my solution here

## Step Two

We can create new test that will validate the whole table, as follows:

1 - Go to the [Internet's Challenging DOM Page](https://the-internet.herokuapp.com/challenging_dom);
2 - For each i-th row in the table, verify that
2.1 - The first 6 columns of the row contain  _"Iuvaret(i-1)"_, _"Apeirian(i-1)"_, _"Adipisci(i-1)"_, _"Definiebas(i-1)"_, _"Consequuntur(i-1)"_, _"Phaedrum(i-1)"_.
2.2 - the last column of the first row is composed by the _edit_ and _delete_ links.

TODO — You can find my solution here

## Step Three

Refactor the second test into page objects. To make the test even more clean, try to avoid any loops in the test function, keep them only inside the _Table_ and _Row_ objects.

TODO — You can find my solution here


# Conclusion

If you are new in automation for web testing, the exercises above may prove a bit challenging at the beginning. However, by repeating them your "mind muscles" will get use to them and the thought patterns necessary to fulfil them. At this point you will be able to think about how you are performing and realize which "movements" you may need to train more specifically.

If you are experienced in automation for web testing, the exercises above may seem too simple, but the isolation and focus on the "movements" from the exercise may uncover some skills you are rusty at the moment. Additionally, if you are using a new programming language, technology, or coding style, the Katas may be helpful to incorporate the new details in your automatic responses to specific problems, like creating and breaking down page objects.