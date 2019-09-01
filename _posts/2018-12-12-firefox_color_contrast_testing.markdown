---
title: "Color Contrast Testing with Firefox 64"
date: 2018-12-12T20:15:00 -0300
tags:
  - a11y-testing
  - firefox
categories:
  - blog
excerpt: "Firefox 64 shipped with a new feature for Color contrast Testing"
---

# Color contrast Testing (CCT)

One of the most important accessibility aspects of a page is the color contrast - it allows user with lower levels of vision to use your application with ease.

W3C, in their Sucess Criterion 1.4.3, explain in details the acceptable levels of contrast - checkout the details [here](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html).

# Firefox 64 and CCT

When you active the Developer Accessibility Tool, you gain information about the level of contrast of each element in the page, with a simple mark if the passes the W3C standards.

If shows a green check if the contrast is good:

{% include figure image_path="/assets/images/firefox_a11y/contrast_ok.png" alt="Contrast OK" caption="Contrast OK" %}

If shows a yellow alert if the contrast can be improved to provide better visualization:

{% include figure image_path="/assets/images/firefox_a11y/contrast_not_ok.png" alt="Contrast not OK" caption="Contrast not OK" %}

Checkout how to use the new feature on the Developer Accessibility Tools on Youtube:

{% include video id="g2j5kYt00CQ" provider="youtube" %}