---
layout: postman-series
title: "Postman Runner and Workflows"
date: 2019-01-21 08:00:00 +0100
author: João Farias
version: 1.0.0
tags: api-testing postman postman-series
description: Let's learn how to run a manifold of Postman requests
---

## In the last episode...

One the [last post](http://thatsabug.com/2019/01/10/intro_postman_trello.html) we've learned how to investigate the Trello
API using Postman.

We've [created a board](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-1-create-a-board), [some lists](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-2-create-two-lists), [a couple of cards](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-3-creating-a-card), [moved them around](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-5-moving-the-card-between-lists), [checked the behavior of some invalid operations](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-51-invalid-operations), and [deleted the board](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-6-deleting-the-board).

You can download the suite here and run it by yourself:

[Postman Suite Download](https://raw.githubusercontent.com/JoaoGFarias/JoaoGFarias.github.io/api_postman_post/assets/images/postman_intro/thats_a_bug_postman_trello.postman_collection.json)

So far, so good... However, to perform the all these operations, we have to click on the _Run_ button of each of the 6 requests... **IN ORDER**.
If we skip the request to create the lists, the cards cannot be created.

This is error-prone, and, worse of all, it is **BORING**.

I don't know you, but I would prefer to spend me time doing other things that looking at Postman running requests...
That's we will start using the Postman Runner!

## Postman Runner

When we were building our requests, we aggregated them in a folder, on the left side of Postman.

![Postman Collection]({{ "assets/images/postman_runner/postman_collection.png" | absolute_url }})

This folder is a _Collection_.

Postman Runner is a feature that allow us to run all requests of a collection at once, so we can evaluate flows such
as the one we did for the Trello API.

To access Postman Runner for a given collection, hover over the collection, click on the _Play_ button, and on the
_Run_ blue button:

![Accessing Postman Runner]({{ "assets/images/postman_runner/postman_runner/accessing.png" | absolute_url }})

This will open a new window where we can configure the execution of the collection:

![Postman Runner UI]({{ "assets/images/postman_runner/postman_runner/runner_UI.png" | absolute_url }})

### Configuring the suite

// TODO - Configurations: Environment, Iterations, Delay, Logging

![Accessing Postman Runner Configuration]({{ "assets/images/postman_runner/configuring/configuring.png" | absolute_url }})

### Execution

// TODO - How to execute
![Postman Runner Summary]({{ "assets/images/postman_runner/execution/click_on_run.png" | absolute_url }})
![Postman Runner Screen]({{ "assets/images/postman_runner/execution/runner_screen.png" | absolute_url }})
![Postman Runner Summary]({{ "assets/images/postman_runner/execution/summary.png" | absolute_url }})
![Postman Runner Execution Parts]({{ "assets/images/postman_runner/execution/execution_parts.png" | absolute_url }})
![Postman Runner Summary Button]({{ "assets/images/postman_runner/execution/run_summary_button.png" | absolute_url }})
![Postman Runner Run Summary]({{ "assets/images/postman_runner/execution/run_summary.png" | absolute_url }})
![Postman Runner Execution JSON]({{ "assets/images/postman_runner/execution/execution_json.png" | absolute_url }})

### Results

// TODO - Results display
// TODO - Exporting results

## Postman Flows with nextRequest

// TODO - Removing duplicated list creation
// TODO - Creating and moving 100 cards


## Conclusion

We've seen how to integrate the execution of many requests [we've created before](http://thatsabug.com/2019/01/10/intro_postman_trello.html) using Postman Runner. Additionally, we were able to create specific flows for request re-use, using nextRequest function.

With these tools, we can indeed simulate the end-to-end usage of the Trello's API with only one click! 