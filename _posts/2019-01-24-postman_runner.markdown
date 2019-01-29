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

... we have [learned](http://thatsabug.com/2019/01/10/intro_postman_trello.html) how to investigate the Trello
API using Postman.

We've [created a board](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-1-create-a-board), [some lists](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-2-create-two-lists), [a couple of cards](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-3-creating-a-card), [moved them around](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-5-moving-the-card-between-lists), [checked the behavior of some invalid operations](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-51-invalid-operations), and [deleted the board](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-6-deleting-the-board).

You can get the suite here and run it by yourself:

[Download here](https://raw.githubusercontent.com/JoaoGFarias/JoaoGFarias.github.io/api_postman_post/assets/images/postman_intro/thats_a_bug_postman_trello.postman_collection.json)

So far, so good... However, to perform the all these operations, we have to click on the _Run_ button of each of the 6 requests... **IN ORDER**.
If we skip the request to create the lists, the cards cannot be created.

This is error-prone, and, worse of all, it is **BORING**.

I don't know you, but I would prefer to spend me time doing other things that looking at Postman running requests...
That's why we will start using the Postman Runner!

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

The first region is a collection picker. It allows us to change the collection.

The second region have configuration fields to the execution itself.

The third region shows the history of execution.

Let's take a deeper look at the configuration fields.

### Configuring the suite

![Accessing Postman Runner Configuration]({{ "assets/images/postman_runner/configuring/configuring.png" | absolute_url }})

The first field allow us to pick the environment where the execution will happen.
An environment is a set of key-value pairs; that's the place where we have stored our initial variables values.
You can use the environment setup to perform the same flow for different users (by changing the credentials) or different domains, such as QA, Dev or Prod (by changing the base URL of the API).

The second field, _Interations_, tells Postman how the number of times that the flow should run.

The third field, _Delay_, indicates the halting time between each request (not between iterations). This feature is generally used to simulate a bit more the way a human user would use an API. It can also serve to simulate the acceptance criteria of duplication of data across a data warehouse, although other tools, focused on performance, are more indicated than Postman.

The forth field, _Log Responses_, offers the logging options. You can use it to improve performance, because logging can be a bottleneck, specially for long collection.

There are three options:

- _For all requests_: Log responses for all requests;
- _For failed requests_: If at least **one test** fails, the response will be logged;
- _For no requests_: No response logging.

We will talk about the _Data_ field in a future post.

### Execution

// TODO - How to execute

To run the suite, we simply click on _Run_

![Postman Runner Summary]({{ "assets/images/postman_runner/execution/click_on_run.png" | absolute_url }})

Postman will run every request in sequence, repeating the process according to the number of iteration we've setup.

![Postman Runner Screen]({{ "assets/images/postman_runner/execution/runner_screen.png" | absolute_url }})

Since we have a total of 23 checks in the suite, with 3 iterations, we will have a total of 69 checks for each
run.

![Postman Runner Summary]({{ "assets/images/postman_runner/execution/summary.png" | absolute_url }})

The detailed screen has in three parts:

1 - The title of each request;
2 - The list of tests inside each request;
3 - The list of iterations, that allow us to jump to each execution.

![Postman Runner Execution Parts]({{ "assets/images/postman_runner/execution/execution_parts.png" | absolute_url }})

We can also see a summarized version of this screen:

![Postman Runner Summary Button]({{ "assets/images/postman_runner/execution/run_summary_button.png" | absolute_url }})

This view will display the title of each request, and the result (Green or Red) for each iteration.

![Postman Runner Run Summary]({{ "assets/images/postman_runner/execution/run_summary.png" | absolute_url }})

We can export the results in a JSON file, for future reference.

![Postman Runner Execution JSON]({{ "assets/images/postman_runner/execution/execution_json.png" | absolute_url }})

## Postman Flows with nextRequest

// TODO - Removing duplicated list creation
// TODO - Creating and moving 100 cards


## Conclusion

We've seen how to integrate the execution of many requests [we've created before](http://thatsabug.com/2019/01/10/intro_postman_trello.html) using Postman Runner. Additionally, we were able to create specific flows for request re-use, using nextRequest function.

With these tools, we can indeed simulate the end-to-end usage of the Trello's API with only one click!