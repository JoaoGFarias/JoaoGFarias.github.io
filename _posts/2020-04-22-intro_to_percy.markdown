---
title: "Intro to Visual Testing with Percy & Ember"
date: 2020-04-22T08:00:00 -0000
categories:
  - blog
tags:
  - percy
  - visual testing
  - ember
  - javascript
  - testing
excerpt: "A bad visual aspect can be a death sentence for your application, even if an user can perform every intended action on it. On top of that, modern web apps have immensely complicated CSS structures to create their visual aspects. Therefore, summing the risk of bad visual and the difficult in keep every aspect of the code related to it under control, visual testing clearly becomes an essential part of any testing strategy. In this post we give a first on the path computer-assisted visual testing, using Percy."
toc: true
toc_icon: "cog"
---

# Intro to Visual Testing with Percy & Ember

{% include figure image_path="/assets/images/percy_intro/cover.png" alt="Visual changes" %}

Note: This post's content is part of my presentation on the [Automation Guild 2020 talk](https://guildconferences.com/conferences/automation-2020/) named _"Grow Your Automation Toolkit: Because when all you have is a hammer..."_.

# Our example

// TODO - Explain Super Rental
We were hired by the Ember development team to implement some changes on the guideline application [Super Rentals](https://github.com/ember-learn/super-rentals), a toy-project used to learn the basics of Ember.

Super Rentals allows us to inspect different properties we may want to rent.

{% include figure image_path="/assets/images/percy_intro/1-super_rentals.png" alt="Super Rentals" %}


On the Home page you can find a button that take us to the About page:

{% include figure image_path="/assets/images/percy_intro/2-home.png" alt="Home page" %}

And on the About page we have a button to go back to the home page:

{% include figure image_path="/assets/images/percy_intro/3-about.png" alt="About page" %}

We will focus our attention on these two buttons.

### Tests

Although simple, the behavior of these buttons are better validated by automated checks.
Particurally, we will use Ember's Application Tests, where we boot up the whole Ember application (only frontend, including routes and all components) and perform the actions we want. For more details, check out our post on [Ember Testing](http://thatsabug.com//blog/testing_ember_application_first_steps/#application-tests).

The behavior of these buttons can be exercised like this:

```javascript
test('should link to information about the company', async function(assert) {
  await visit('/rentals');
  await click(".button-to-about");
  assert.equal(currentURL(), '/about', 'should navigate to about');
});
  
test('should link to home page', async function(assert) {
  await visit('/about');
  await click(".button-to-home");
  assert.equal(currentURL(), '/rentals', 'should navigate to home');
});
```

Each _test_ function will validate a button. They access directly the page where the button is, click on this button, and then verify if the application went to the expected page, by checking the URL.

Now let's start our work on the app.


## "Do this simple color change"

The Ember team asked us to change the color of the About button text color to **red**, to highlight its presence. Does it make sense? I don't know, you tell me ;) 

{% include figure image_path="/assets/images/percy_intro/4-no_idea.jpeg" alt="I have no idea" %}

### Implementing a change

To implement the new color, we can make a CSS change on the _app.css_.

```css
.button {
  color: red;
}
```

It will change the default color of buttons to _red_.
You take a look at the button on About page and it seems ok.

{% include figure image_path="/assets/images/percy_intro/5-new_color.png" alt="New color on about page" %}

You run **all** your tests and they pass.

{% include figure image_path="/assets/images/percy_intro/6-tests_pass.png" alt="Tests pass" %}

Good to go to production!

{% include figure image_path="/assets/images/percy_intro/7-yes.jpeg" alt="Yes!" %}


### The bug

A couple of days later, you get an email from the Ember team.

"Well well... they probably want another super change made with such elegant code."

Attached to the email is the following image:

{% include figure image_path="/assets/images/percy_intro/8-bug.png" alt="A bug" %}

Yes, you have introduced a bug in the system.

{% include figure image_path="/assets/images/percy_intro/9-bug_meme.jpeg" alt="Bug meme" %}

{% include figure image_path="/assets/images/percy_intro/10-shame.jpeg" alt="Shame meme" %}

You may want to want to blame your automated checks for these error, but they did exactly want they were programmed to do: Validate the page navigation upon button clicking. The bug we saw is **out-of-scope** for them.

The rest of this post will teach us how to expand your tests for cover also this type of change.

# Visual Testing

// TODO - Goal of Visual Testing

// TODO - How VT happens

## Percy

// TODO - What is it?

### Percy & Ember

// TODO - Installing

// TODO - Extending our acceptance tests

// TODO - Execution and logs

### Percy builds

// TODO - First build => Auto-approve bc master

// TODO - Second build => Adding changes + Changes to approve

// TODO - Third build => Fix + Auto-approve

// TODO - Fourth build => Merge to master + Auto-approve

# Conclusions

// TODO - Percy extends functional tests very easily and powerfully, as does mutation testing