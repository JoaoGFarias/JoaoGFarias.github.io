---
title: "JMeter and Jenkins - JMeter Basics Part 4 of 4"
date: "2019-12-02T09:00:00.000Z"
excerpt: "Continuous Performance Testing - The First Step"
urlPath: "/blog/jmeter_5/"
categories:
  - "blog"
tags:
  - "jmeter"
  - "jmeter-series"
---
# JMeter and Jenkins

![JMeter]({{ "https://jmeter.apache.org/images/jmeter.png" | absolute_url }})

## Where are we?

## Installing Jenkins using Docker

Jenkins is installed locally in many ways depending on your OS.

On Mac, you can use _brew_:

```bash
brew install jenkins
```

On Debian, you can use _apt_:

```bash
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -

deb https://pkg.jenkins.io/debian-stable binary/

sudo apt update
sudo apt install jenkins
```

You can find the instructions to other systems [here](https://jenkins.io/download/).

In the end, you can simply run ```bash jenkins``` and the service will be up and running.

The command will give the initial administrator password. The next screens will guide you through Jenkins configuration. For our purposes you can simply use the default options.

![Jenkins setup](/assets/jmeter/post5/setup.png)

Afterwards Jenkins will be ready to go!

![Jenkins ready](/assets/jmeter/post5/ready.png)

## Running JMeter from the command line

To configure Jenkins, we will need to learn how to run our Jenkins plans from the command line.

The first step is to identify the location of your JMeter.
On Linux and Windows, it will probably the folder that you extracted JMeter. On Mac, if you installed JMeter using brew, you can use ```where jmeter``` to find out (it will probably be ```/usr/local/bin/jmeter```).

Then, to run JMeter in a NON_GUI fashion, you can run the following command:

```bash
PATH_TO_JMETER/bin/jmeter -n -t PATH_TO_MY_PLAN/MY_PLAN.jmx -l  PATH_WHERE_I_WANT_TO_SAVE_THE_RESULTS/MY_PLAN.jtl
````

The only new part is the cryptic _.jtl_ file. This is a XML or CSV format used by JMeter to save its results. After you run the command, you shall see a new or updated file in the indicated folder.

## Creating a Jenkins job to execute the JMeter plan

For this example, we will be using a JMeter plan that makes call to the Open Maps API.

For starters, we will add the [Performance plugin](https://plugins.jenkins.io/performance), in order to have nice reports on JMeter screen.

To add it, go to _Manage Jenkins_ and _Manage Plugins_.

![Jenkins management screen](/assets/jmeter/post5/manage_jenkins.png)

Then Select _Performance_ form the _Available_ tab.

![Adding Performance plugin](/assets/jmeter/post5/add_performance.png)

No restart is necessary.

Back on Jenkins initial screen, you can click on _create new jobs_ and then create a _Freestyle project_.

![Jenkins job naming](/assets/jmeter/post5/job_naming.png)

Clicking on _Configure_ allows us to add the building steps.

Firstly we will add a Build step execute the exact command we use before to run JMeter in NON-GUI mode.

![Build step - Execute Shell](/assets/jmeter/post5/execute_shell.png)

Secondly, we will add a Post-build step. The type will be _Publishing Performance test result report_, which is coupled to the Performance plugin.

![Post=Build step - Execute Shell](/assets/jmeter/post5/publish_report.png)

Here we just need to add the path to our _.jtl_ file in the _Source data files_ field.

![Post=Build step - File path](/assets/jmeter/post5/post_build.png)

## Information overview

After a couple of executions, you can see that the Performance plugin shows a trend chart on the job home page.

![Job stats](/assets/jmeter/post5/job_stats.png)

Additionally, you can see more detailed data into each execution.

![Execution stats](/assets/jmeter/post5/execution_stats.png)

## Possible improvements

Of course, this is just the first step.

You can configure many triggers for the Jenkins job, such as a new commit on GitHub, a deployment on certain environment.

Also you can configure the JMeter plan itself, for instance, by passing [arguments on the non-GUI command](https://dzone.com/articles/using-commandline-parameters-in-jmeter).

## Conclusion

This ends the 5-part series to introduce JMeter, from the basics concepts to continous execution. You can check out the whole series [here](http://thatsabug.com/tags/#jmeter-series).

