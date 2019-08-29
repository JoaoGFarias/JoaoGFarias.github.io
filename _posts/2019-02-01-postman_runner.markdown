---
title: "Postman Runner and Workflows"
date: 2019-02-01T20:15:00 -0300
tags:
  - api-testing
  - postman
  - postman-series
categories:
  - blog
excerpt: "Let's learn how to run all Postman requests with ONE click"
---

## In the last episode...

... we've [learned](http://thatsabug.com/2019/01/10/intro_postman_trello.html) how to investigate the Trello
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
An environment is a set of key-value pairs; That's the place where we have stored our initial variables values.
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

## Postman Flows with _setNextRequest_

### The problem

If you have ever used Trello, you probably created way more cards than lists or boards.
It means the card creation endpoint should be used more often.

The problem with our current approach is that it would require us to duplicate the _Create Learn on That's a Bug card_
request - i.e. **duplication**.

![Yoda hates duplication]({{ "assets/images/postman_runner/nextRequest/yoda.jpg" | absolute_url }})

So, let's solve this...

### The _setNextRequest_ function

The Postman's function _setNextRequest_ allow us to programmatically choose the next request to be executed.
For instance, the code:

```javascript
postman.setNextRequest("Delete board");
```

will force Postman Runner to jump to the _Delete board_ request, regardless of the request's _physical_ order.

### Creating 100 cards

So, how you create several cards without duplicating the request itself?

Let's add some code to be run before the request execution and its tests, using the _Pre-Request Script_ tab:

![setNext Request]({{ "assets/images/postman_runner/nextRequest/setNextRequest.png" | absolute_url }})

Explanation:

1 - We create a sort of counter to track how many cards should we still create.

```javascript
const remainingCards = "remainingCards";

if(pm.environment.get(remainingCards) === undefined) {
    pm.environment.set(remainingCards, 100);
}
```

The constant ```remainingCards``` serves as an [Enum](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html),
avoiding typos that would be debugging harder.

As we learn [on the last post](http://thatsabug.com/2019/01/10/intro_postman_trello.html), we use environmental variables 
to share information between requests. They can be used also for multiple calls to the same request.

Then, on the first execution of the card creation request, there is no _"remainingCards"_ environmental variable. We check
it using the [strict comparision operator](https://stackoverflow.com/a/359509/2252076), against the _undefined_ value. If
we indeed do not have this variable, we create it, setting the value _100_ to it.

2 - Setting the same request to run again

```javascript
if(pm.environment.get(remainingCards) > 0) {
    
    pm.environment.set(
        remainingCards,
        pm.environment.get(remainingCards) - 1
    );
    
    postman.setNextRequest("Create Learn on That's a Bug card");
}
```

First we check if we still have cards to be created.
If so, we decrement our _counter_ and inform Postman that we want to execute the same request.

However, if we don't have cards to be created...

```javascript
else {
    pm.environment.unset(remainingCards) 
    postman.setNextRequest("Move card from TODO to Done");
}
```

We can delete the counter variable and save to Postman that we can proceed with the card moving request.

If you execute Postman Runner now:

![setNext Execution]({{ "assets/images/postman_runner/nextRequest/execution.png" | absolute_url }})

You can see that the _"Create Learn on That's a Bug card"_ request was executed multiple times - 
and Postman executed the tests for each request.

**AWESOME!**

## Conclusion

We've seen how to integrate the execution of many requests [we've created before](http://thatsabug.com/2019/01/10/intro_postman_trello.html) using Postman Runner. Additionally, we were able to create specific flows for request re-use, using _setNextRequest_ function.

With these tools, we can indeed simulate the end-to-end usage of the Trello's API with only one click!

Download the final collection [here](https://raw.githubusercontent.com/JoaoGFarias/JoaoGFarias.github.io/master/assets/images/postman_runner/thats_a_bug_postman_trello.postman_collection.json)