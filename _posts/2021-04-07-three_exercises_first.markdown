---
title: "Coding Katas for Automation in Web Testing - Part 1 of 3"
date: 2021-04-04T08:00:00 -0000
categories:
  - blog
tags:
  - automation
  - kata
  - web
  - selenium
  - kotlin
excerpt: "Practice makes it perfect. Time to apply the old saying to improve our skills in automation for testing website interfaces."
toc: true
toc_icon: "cog"
---
# Coding Katas

{% include figure image_path="/assets/images/coding_katas/kata.webp" alt="kata" %}

In Asian martial arts, Katas serve to sharp the practitioner's skills through repetition of a simulated confrontation with multiple opponents. Defense and offensive movements are trained to the point they become fluid as water, with ease and effectiveness. Despite clearly not being a substitute for real fights, Katas provide the opportunity of self-reflection on how good every detail is, in order to compose the perfect fighting techniques.

A Coding Kata serves a similar role to a programmer: She will have the opportunity to incorporate and improve certain skills that are used throughout a programming session, such as breaking down of big problems into smaller ones, various refactoring techniques, etc. The more familiar a programmer is with a specific problem, faster and more fluidly she will be able to utilize the techniques that are useful in solving other programming problems.

In this series I will propose three beginners Coding Katas based on [The Internet](https://the-internet.herokuapp.com/) application. In each Kata, I will point out the problem we are trying to solve, and create constraints that will drive us to use different programming techniques, towards a more elegant solution. At each step, I will propose a solution. 

The goal is not to simply get it right or get an exact copy of my solution. These exercises are meant to instigate you to solve the problem and afterwards, to not only look on what you wrote, but also in **how you wrote**: In Coding Katas, as it is in martial arts Katas, how you perform (your style, elegance and low stress), is even more important than the performance itself.

My solutions will be written in Kotlin and the main takeaways of the posts may seem too much connected OO concepts. However, if you preferred language is more focused on Structural or Functional programming, I wouldn't discourage you to do the _"movements"_ here described - although _"classes"_ may not make much sense in C or Haskell, you can still use the namespace system of these languages in order to create the **boundaries** we will be describing.

Without further ado, put on your gi, do your warm-up exercises, and let's get to coding!

Note: If you want to run The Internet locally, you can simply boot up its Docker image:

```bash
docker run -d -p 7080:5000 gprestes/the-internet
```

# #1 — The Login Page

The [Internet's Login Page](https://the-internet.herokuapp.com/login) displays a typical... login page, with a title, a subtitle text. At its core are the user credentials fields and a big **_Login_** button. In this Kata we will exercise your skill in writing Page Objects, incrementally creating abstractions and new tests — enabling us to have maintainable and extendable code.

{% include figure image_path="/assets/images/coding_katas/loginpage.png" alt="login page" %}


## Step Zero

The first step we will take is to perform the login itself.

The Kata consists of writing a test that will:

1 — Go to the [Internet's Login Page](https://the-internet.herokuapp.com/login);

2 — Enter the correct username ("tomsmith") and password ("SuperSecretPassword!");

3 — Click on the **_Login_** button;

4 — Wait for 2 seconds (yes, for now we will explicitly wait for a total of 2 seconds - feel free to use any method for it);

5 — Assert that the "_Secure Area_" title and "_Welcome to the Secure Area. When you are done click logout below._" subtext appear.

For now, write everything in a single function, without any type of abstraction, calling the browser driving library and assertion libraries directly.

This is my solution:

```kotlin
@Test
fun performLoginTest() {
    driver.get("https://the-internet.herokuapp.com/login")

    driver.findElement(By.id("username")).sendKeys("tomsmith")
    driver.findElement(By.id("password")).sendKeys("SuperSecretPassword!")
    driver.findElement(By.tagName("button")).click()

    Thread.sleep(2000)

    assertThat(driver.findElement(By.tagName("h2"))).isEqualTo("Secure Area")
    assertThat(driver.findElement(By.tagName("h4"))).isEqualTo("Welcome to the Secure Area. When you are done click logout below.")
}
```

## Step One — Extract Till You Drop

Now we will start our abstraction process.

At the end of this step the only thing that your test function may contain are function calls.
For now, these functions should stay in the same file / namespace as your main test function.

Additionally, we will keep all test data (strings) in the main test function — we don't want
the support functions to be coupled to test data.

The goal of step is to exercise the practice of [_Extract Till You Drop_](https://sites.google.com/site/unclebobconsultingllc/one-thing-extract-till-you-drop) (ETYD), as named by Robert Martin. With _ETYD_, you will end up with **very small** (no, smaller than that) and well-named functions, making your [code read like well-written prose](https://www.goodreads.com/quotes/7029841-clean-code-is-simple-and-direct-clean-code-reads-like), thus pleasurable to **other people** to read and understand. Look at each line of your code and think if you can give it a descriptive name — if you can, then extract it to a function, even if it has only one line.

Don't forget to run your test to check if it's still working ;)

This is what I wrote:

```kotlin
@Test
fun performLoginTest() {
    accessLoginPage()

    login(username = "tomsmith", password = "SuperSecretPassword!")

    verifyLoggedPageElements(
        title = "Secure Area",
        subtitle = "Welcome to the Secure Area. When you are done click logout below."
    )
}

private fun accessLoginPage() {
    driver.get("https://the-internet.herokuapp.com/login")
}

private fun login(username: String, password: String) {
    fillFields(username = username, password = password)
    performLogin()
    waitLoggedInPage()
}

private fun fillFields(username: String, password: String) {
    fillUsernameField(username)
    fillPasswordField(password)
}

private fun fillUsernameField(username: String) {
    driver.findElement(By.id("username")).sendKeys(username)
}

private fun fillPasswordField(password: String) {
    driver.findElement(By.id("password")).sendKeys(password)
}

private fun performLogin() {
    driver.findElement(By.tagName("button")).click()
}

private fun waitLoggedInPage() {
    Thread.sleep(2000)
}

private fun verifyLoggedPageElements(title: String, subtitle: String) {
    verifyTitle(title)
    verifySubTitle(subtitle)
}

private fun verifyTitle(title: String) {
    assertThat(driver.findElement(By.tagName("h2"))).isEqualTo(title)
}

private fun verifySubTitle(subtitle: String) {
    assertThat(
        driver.findElement(By.tagName("h4"))
    ).isEqualTo(subtitle)
}
```

## Step Two — Creating Objects

Now it's time for us to start creating our page objects.

Now create two objects, one representing the **_Login Page_** and another representing the **_Secure Area_** page, and move the support functions to their appropriated objects.

This is what I got:

1 — The test:

```kotlin
@Test
    fun performLoginTest() {
        val loginPage = LoginPage(driver)

        val secureAreaPage = loginPage.login(username = "tomsmith", password = "SuperSecretPassword!")

        verifyLoggedPageElements(
            secureAreaPage = secureAreaPage,
            title = "Secure Area",
            subtitle = "Welcome to the Secure Area. When you are done click logout below."
        )
    }

    private fun verifyLoggedPageElements(secureAreaPage: SecureAreaPage, title: String, subtitle: String) {
        verifyTitle(secureAreaPage = secureAreaPage, title = title)
        verifySubTitle(secureAreaPage = secureAreaPage, subtitle = subtitle)
    }

    private fun verifyTitle(title: String, secureAreaPage: SecureAreaPage) {
        assertThat(secureAreaPage.titleText).isEqualTo(title)
    }

    private fun verifySubTitle(subtitle: String, secureAreaPage: SecureAreaPage) {
        assertThat(secureAreaPage.subtitleText).isEqualTo(subtitle)
    }
```

2 — An abstract class to represent the concept of a _Page_, which base locator is the _body_ HTML tag:

```kotlin
abstract class Page(private val driver: WebDriver) {
    protected lateinit var baseLocator: WebElement

    fun initPage() {
        baseLocator = driver.findElement(By.tagName("body"))
    }

}
```
3 — A class to represent the _Login Page_, which accesses the The Internet URL upon creation and provides a single public function to perform the login. You can notice that I simply copied and pasted the smaller functions from the previous steps - that's the power of systematic refactoring!

```kotlin
class LoginPage(private val driver: WebDriver): Page(driver) {

    init {
        driver.get("https://the-internet.herokuapp.com/login")
        initPage()
    }

    fun login(username: String, password: String): SecureAreaPage {
        fillFields(username = username, password = password)
        performLogin()
        waitLoggedInPage()
        return SecureAreaPage(driver)
    }

    private fun fillFields(username: String, password: String) {
        fillUsernameField(username)
        fillPasswordField(password)
    }

    private fun fillUsernameField(username: String) {
        baseLocator.findElement(By.id("username")).sendKeys(username)
    }

    private fun fillPasswordField(password: String) {
        baseLocator.findElement(By.id("password")).sendKeys(password)
    }

    private fun performLogin() {
        baseLocator.findElement(By.tagName("button")).click()
    }

    private fun waitLoggedInPage() {
        Thread.sleep(2000)
    }
}
```

4 — A class to present the Secure Area Page, which for now will only provide the means by which we can inspect the title and subtitle text:

```kotlin
class SecureAreaPage(driver: WebDriver): Page(driver) {

    init {
        initPage()
    }

    val titleText: String
        get() = baseLocator.findElement(By.tagName("h2")).text

    val subtitleText: String
        get() = baseLocator.findElement(By.tagName("h4")).text
}
```

## Step Three — Refactor, refactor, refactor!

Now we have objects that we can structure them in many ways.

1 — The _Username_ and _Password_ fields, together with the _Login_ button, are actually one component: **The Login Form** (look at the DOM!). The refactoring you can do it is to create this _LoginForm_ object, hiding all complexity of the DOM, and make the _LoginPage_ interact with it.

This is the _LoginForm_ representation:

```kotlin
class LoginForm(baseLocator: WebElement) {
    private var baseLocator = baseLocator.findElement(By.id("login"))

    private val usernameField: WebElement
        get() = baseLocator.findElement(By.id("username"))

    private val passwordField: WebElement
        get() = baseLocator.findElement(By.id("password"))

    private val loginButton: WebElement
        get() = baseLocator.findElement(By.tagName("button"))

    fun login(userCredentials: UserCredentials) {
        fillFields(userCredentials)
        performLogin()
    }

    private fun fillFields(userCredentials: UserCredentials) {
        fillUsernameField(userCredentials.username)
        fillPasswordField(userCredentials.password)
    }

    private fun fillUsernameField(username: String) {
        usernameField.sendKeys(username)
    }

    private fun fillPasswordField(password: String) {
        passwordField.sendKeys(password)
    }

    private fun performLogin() {
        loginButton.click()
    }
}
```

And now the _LoginPage_ class gets way simpler:

```kotlin
class LoginPage(driver: WebDriver): Page(driver) {

    private var loginForm: LoginForm

    init {
        driver.get("https://the-internet.herokuapp.com/login")
        initPage()
        loginForm = LoginForm(baseLocator)
    }
    // UserCredentials will be explained down below
    fun login(userCredentials: UserCredentials): SecureAreaPage {
        loginForm.login(userCredentials)
        return SecureAreaPage(driver)
    }
}
```

2 — Another refactoring you can do is to create an object called _UserCredentials_, which will hold the data necessary to perform the login. Pass this object around instead of the raw strings.

In Kotlin, this is the perfect case for the [Data Class](https://kotlinlang.org/docs/data-classes.htmlt) concept:
```kotlin
data class UserCredentials(
    val username: String,
    val password: String
)
```

Now our tests can create an object of this type, which gives more security that our page objects will deal correctly with this data:

```kotlin
val secureAreaPage = loginPage.login(makeUserCredentials())

...

private fun makeUserCredentials() = UserCredentials(username = "tomsmith", password = "SuperSecretPassword!")
```

3 — Let's make our solution more robust by changing our hardcoded 2 seconds wait time for proper waits for the page elements we want to interact with, both the title and subtitle of the _Secure Area_ page.

```kotlin

class SecureAreaPage(driver: WebDriver): Page(driver) {

    init {
        initPage()
        waitElements()
    }
    ...
    private fun waitElements() {
        val wait = createWait()
        waitTitle(wait)
        waitSubtitle(wait)
    }

    private fun createWait() = WebDriverWait(driver, Duration.ofSeconds(2L))

    private fun waitTitle(wait: WebDriverWait) {
        wait.until(ExpectedConditions.visibilityOf(titleElement))
    }

    private fun waitSubtitle(wait: WebDriverWait) {
        wait.until(ExpectedConditions.visibilityOf(subTitleElement))
    }
}
```


## Step Four — Adding Tests

In this step we will train adding functionality to page objects as we need for new tests.

Create tests for:

1 — Logout: After the login, perform a logout and verify that a green banner appears with the _"You logged out of the secure area!"_ text and that the _LoginForm_ fields are empty.

{% include figure image_path="/assets/images/coding_katas/logout.png" alt="logout banner" %}

1 — Tests:

```kotlin
@Test
fun logoutTest() {
    val initialLoginPage = LoginPage.accessPage(driver)
    val secureAreaPage = initialLoginPage.login(makeUserCredentials())
    val loginPageAfterLogout = secureAreaPage.logout()
    verifyFlashMessage(loginPageAfterLogout)
}

private fun verifyFlashMessage(loginPageAfterLogout: LoginPage) {
    assertThat(loginPageAfterLogout.flashBannerText.contains("You logged out of the secure area!")).isTrue()
}
```

2 — _SecureAreaPage_

```kotlin
class SecureAreaPage(driver: WebDriver): Page(driver) {

    ...

    fun logout(): LoginPage {
        logoutButton.click()
        return LoginPage(driver)
    }
}
```

3 — _LoginPage_

```kotlin
class LoginPage(driver: WebDriver): Page(driver) {
  ...
  val flashBannerText: String
      get() = flashBanner.text

  private val flashBanner
      get() = baseLocator.findElement(By.id("flash"))
}
```

2 — Wrong login: Try to use wrong credentials to login and check that a red banner appears with the text _"Your username is invalid!_. Which combinations can we validate?

This challenge I will leave without a solution on my part. Share your solution on the comments ;)


# Conclusion

If you are new in automation for web testing, the exercises above may prove challenging. However, by repeating them, your “mind muscles” will get use to the thought patterns necessary to fulfil them. At this point you will be able to think about how you are performing and realize which “movements” you may need to train more specifically.

If you are experienced in automation for web testing, the exercises above may seem too simple, but the isolation and focus on the “movements“ from the exercise may uncover some skills you are rusty at the moment. Additionally, if you are using a new programming language, technology, or coding style, the Katas may be helpful to incorporate the new details in your automatic responses to specific problems, such as creating and breaking down page objects.

If you want to take a look at the complete code for each step, you can find them [here](https://github.com/Thats-a-Bug/ThreeExercisesAutomationInTesting/tree/master/src/test/java/exercises/exerciseOneLoginPage).

You can check the other posts of this series [here](http://localhost:4000/tags/#kata).