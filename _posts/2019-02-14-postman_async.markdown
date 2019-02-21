---
layout: postman-series
title: "Exploratory Testing with Postman Async"
date: 2019-02-14 08:00:00 +0100
author: João Farias
version: 1.0.0
tags: api-testing postman postman-series
description: As in life, our actions in Postman have consequences. Let's learn how to explore affected entities.
---

## In the last episode...

... we've [learned](http://thatsabug.com/2019/02/01/postman_runner.html) how to investigate the Trello
API using Postman, using Postman Runner to [run a series of requests in sequence](http://thatsabug.com/2019/02/01/postman_runner.html#execution) and the [setNextRequest function to repeat the same request multiple times](http://thatsabug.com/2019/02/01/postman_runner.html#postman-flows-with-setnextrequest).

You can get the suite here and run it by yourself:

[Download here](https://raw.githubusercontent.com/JoaoGFarias/JoaoGFarias.github.io/api_postman_post/assets/images/postman_runner/thats_a_bug_postman_trello.postman_collection.json)

This is great! But if we observe closely, we will see that the tests for each request ask questions about one entity:

- The board creation request checks if the board was created with the proper name;
- The card moving request checks if the card was inserted on the target list;
- The board deletion request checks if the board no longer exists;
- ...

However, the update of a certain entity may cause a chain of consequences in other entities.
In this post, we will focus on investigating how creating a card can affect a list entity.
In particular, we will check if the number of cards associated with a list is incremented 
after creating a card in it.

Recent versions Postman provide a powerful tool for it: The _*sendRequest*_ function.

## Postman _sendRequest_

Postman's _sendRequest_ function allows us to make generic HTTP calls and act
of its response the same way we deal with the responses from our "main" request.

The function has the following signature:

```javascript
pm.sendRequest(URL,  (err, res) => { ... });
```

The first argument (_URL_) is the target endpoint we want to investigate, passed as a string. It
can also be of a Javascript Object type, specifying many details, such as _method_ or _headers_.
This is outside the scope of this post, but Postman's blog has an example: See it [here](https://blog.getpostman.com/2017/10/03/send-asynchronous-requests-with-postmans-pm-api/).

The second argument is a _callback_ function. If haven't deal with asynchronous programming in
Javascript before, a _callback_ is a function that is executed after receiving a response.
The first argument of this function will store any error (such as timeout) that the response may have
and the second one will have the response itself.

Inside this function where we will perform our work on the list entity, **from inside the card creation request**.
We will do this in two steps:

1 - Store the number of cards before the card creation request is sent, on the _Pre-request Script_ tab;
2 - On the _Tests_ tab, we will fetch the number of cards again and check if it is an increment over the number of cards before.

### Finding previous number of Cards

The [Trello API](https://developers.trello.com/reference/#listsidcards) has an endpoint
that allows us to fetch the cards of a given list, as a _JSON List_.
The cURL call to this endpoint has the following format:

```console
curl --request GET --url https://api.trello.com/1/lists/{id}/cards
```

Additionally, we need to pass our credentials. The URL would be something as follows:

```console
curl --request GET --url https://api.trello.com/1/lists/{id}/cards/?token={token}&key={key};
```

To form this URL, let's firstly start by creating the credentials strings by taking the values from
our environmental variables:

```javascript
const token = "token=" + pm.environment.get("trelloToken");
const key = "key=" + pm.environment.get("trelloKey");
```

Next, let's create the whole parameters request string by appending these credentials to the
Trello's API URL and to the _TODOListId_ we have store while creating the list:

```javascript
const requestParams = "/1/lists/" + pm.environment.get("TODOListId") + "/cards/" + "/?" + token + "&" + key;
```

Lastly, we can append this parameters request URL to Trello API's base URL:

```javascript
const url = pm.environment.get("trelloAPIURL") + requestParams
```

With the whole URL, we can call this endpoint and store in a environmental variable
the number of cards before the new card creation:

```javascript
pm.sendRequest(url, (err, res) => {
    if (!err) {
        pm.environment.set("numberOfCards", res.json().length);
    }
});
```

We already understand _pm.environment.set_ function from [previous posts](http://thatsabug.com/2019/01/10/intro_postman_trello.html#step-1-create-a-board).
_res.json().length_ says to interpret the response as a JSON object and to return the _length_ of this object - because Trello's API returns a list of _cards_
on the called endpoint.

OBS: For simplicity, we are not handling the case of error. How would you deal with it?
Maybe mark some flag to avoid making the test itself, give that the setup step failed...

In summary, this is the code we will have on _Pre-request Script_ tab:

![Pre-Request Script]({{ "assets/images/postman_sendRequest/trello_sendRequest_prescript.png" | absolute_url }})

### Testing if number of cards is updated

// TODO - Testing if number of cards was updated

## What can be improved

// TODO - Code quality
// TODO - Depth of testing

Download the final collection [here](https://raw.githubusercontent.com/JoaoGFarias/JoaoGFarias.github.io/api_postman_post/assets/images/postman_async/thats_a_bug_postman_trello.postman_collection.json)

### Bonus: Callback functions

You can learn more about Javascript callbacks on [this video](https://www.youtube.com/watch?v=pTbSfCT42_M)