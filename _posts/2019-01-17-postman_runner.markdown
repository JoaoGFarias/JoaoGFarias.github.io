---
layout: post
title: "Postman Runner and Workflows"
date: 2019-01-17 08:00:00 +0100
author: João Farias
version: 1.0.0
tags: api-testing postman postman-series
description: Let's learn how to run a manifold of Postman requests
---

See all posts of this series [here](http://thatsabug.com/tag/postman-series.html)

## In the last episode...

// TODO - Recap the Trello API suite from last post
// TODO - Problem: How to create an execution flow of all requests, so we can test the flow with only one click

You can download the suite here and run it by yourself:

[Postman Suite Download](https://raw.githubusercontent.com/JoaoGFarias/JoaoGFarias.github.io/api_postman_post/assets/images/postman_intro/thats_a_bug_postman_trello.postman_collection.json)

## Postman Runner

// TODO - What's Postman Runner
// TODO - How to access the Postman Runner

![Accessing Postman Runner]({{ "assets/images/postman_runner/postman_runner/accessing.png" | absolute_url }})

![Postman Runner UI]({{ "assets/images/postman_runner/postman_runner/runner_ui.png" | absolute_url }})

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