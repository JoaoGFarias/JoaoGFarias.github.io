---
title: "Contract Testing with Pact & Kotlin: Part 1 - Introduction"
date: 2020-05-06T08:00:00 -0000
categories:
  - blog
tags:
  - contract-testing
  - kotlin
  - pact
excerpt: "Do you want to validate if your components can work together without connecting them? Let's see how to it with Contract Testing"
toc: true
toc_icon: "cog"
---

# Contract Testing with Pact & Kotlin: Introduction

{% include figure image_path="/assets/images/contract_testing/intro/front.jpg" alt="Contrac" %}

Note: This post's content is part of my presentation on the [Automation Guild 2020 talk](https://guildconferences.com/conferences/automation-2020/) named _"Grow Your Automation Toolkit: Because when all you have is a hammer..."_.

# The integration problem

-------------
Let's say you are responsible for the development of the Product service your ecommerce company. The Product Service handles information about all aspects of a product, from including is storage
-----------
Say you are building a mobile app that will communicate with Google Pay for payment features. 

How would you test for problems in your app? You may say:

"Simple. I boot up the app and connect to Google Map, observing if the payments go well."

Fair enough. Now let's say your app now will also connect to Apple Pay.

How would you test for problem in 

J. B. Rainsberger's post ["Integrated Tests are a Scam"](https://blog.thecodewhisperer.com/permalink/integrated-tests-are-a-scam) raise the problem on strategy of validation

-----------------------

## Applications

In this blog series we will use as example a toy-project of social networks. We will have two different social networks, which deal with different sets of data of Users, an entity managed by a service called by both social networks. 

### Consumer applications

The first social network we will call _PersonalMe_. It will deal with personal aspects of the Users, such what types of familial relationships he/she has, his/her age, etc.

The second social network we will call _ProfessionalMe_. It will deal with professional aspects of the Users, such as skills, experience, interests, etc.

### Provider services

Both applications will fetch User data from a backend service call _UserService_. This service will contain all domain knowledge of an User. 

Any validation and rules of User entities are inside this service, making its clients leaner and simpler: They just need to fullfil _UserService_ API rules and the rest is taken care of.

### Frontend fragility

You can observe that _UserService_ fields can be classified in three groups:

1 - Fields used only by _PersonalMe_;
2 - Fields used only by _ProfessionalMe_;
3 - Fields used by both _Personalme_ and _ProfessionalMe_.

Let's say _PersonalMe_ request changes in the fields of the group _(1)_ (or _ProfessionalMe_ requests for group (2)). 

How would you validate that _PersonalMe_ will work with the changes?

"Simple. You boot up _PersonalMe_ and verfies if the data (new and old) flows well end-to-end."

Seems fair.

Now let's say _PersonalMe_ requested a change on the fields of the group (3).

If you perform the same tests, you still will be able to validate _PersonalMe_ sucessfully.However, in the moment you replace your _UserService_ in production, you will break _ProfessionalMe_, because the fields it uses were changed.

This is a sympton of the fragility of the social network apps towards the backend service: They depend on it, not the other way around. Changes in the backend service can break the social network apps.

It doesn't mean that the team developing _UserService_ shouldn't care about this fragility, after all "the client is always right". _UserService_ must be **useful** for its clients, it should move in a way that doesn't disturbe the client expectations.

So, as an _UserService_ developer, how can you test if changes in the fields on group (3) will break one of the clients?

"We can build each client and validate it against the latest version of the _UserService_".

We would work, but is it feasable? 

// TODO - REDO
In this case, we will have 2 tests, because we have two clients (_clientNum_) and one provider (_providerNum_).

How does it work on scale? If we have _clientNum_ clients and _providerNum_ providers and _changesNum_ being the number of change requests, we potencially will have ```_clientNum_ * _providerNum_ * _changesNum_``` combinations to test (not even talking about the effort in each test itself). Exponential growth ==> Not feasable.
//

Another problem arises with the question: "How can we know if a fields is the group (1)/(2) or (3)?". Client codebases run asynchronously to provider codebases. Since providers return all fields in a response, nothing in the provider can control the consumer so that it would not start using a particular existent field. 

In this series we will see how clients and providers can syncronize themselves in order to minimize the effort of validating its interface changes, by avoid building many components through definition of contracts.

# Validating integtration with Consumer-Driven Contract Testing

## How does it differs from functional testing?
TODO - Lego analogy

# Following posts