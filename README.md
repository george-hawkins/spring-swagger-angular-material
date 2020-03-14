Spring Swagger Angular Material
===============================

This project works through building an [Angular frontend](https://angular.io/) with the visual components provided by [Material](https://material.angular.io/) and the backend provided by Spring Boot.

The REST calls are provided by the Spring Boot backend and [Swagger](https://swagger.io/) is configured there so that the structure of the REST API can be interrogated. This allows for the autogeneration of TypeScript wrappers for the API that allow the frontend to interact with it without the need to code up raw HTTP calls by hand.

The assumption is that you're already familiar with Spring Boot and Java and want to work out how to wire this up to a modern Angular frontend with an appealing visual frontend.

Angular code is written in TypeScript, if you're vaguely familiar with Javascript or anything faintly similar you can probably pick things up from the Angular tutorial without first making an effort to get familiar with the language. If you're interested though Microsoft does provide extensive [documentation](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) for TypeScript.

To get started I recommend going thru the Angular [getting-started](https://angular.io/guide/quickstart) section to get your environment set up and then go thru the [tutorial](https://angular.io/tutorial). I recommend using [Visual Studio Code](https://code.visualstudio.com/) for development, it supports lots of languages via plugins, but comes with TypeScript support bundled in by default.

For Ubuntu you just need to download the `.deb` file and do the following (the `mv` and `chmod` is just to deal with `apt` quickly giving up root privileges and then having issues accessing files owned by you):

    $ mv ~/~/Downloads/code_XYZ.deb /tmp
    $ chmod a+rw /tmp/code_XYZ.deb
    $ sudo apt install /tmp/code_XYZ.deb

At the end of this you'll have worked thru the most important features of Angular, and you can look into these further in the fundamentals, techniques and API sections of the [documentation](https://angular.io/docs).

The resulting example application though is fairly unattractive. The solution to this is using [Material](https://material.angular.io/), with this you get layouts and attractive visual components, e.g. see [this simple panel](https://material.angular.io/components/card/examples) with a title, picture, text and a like and share button.

Unfortunately, unlike Angular, Material doesn't come with a good tutorial and the first stable version was only released in December 2017. Prior to that it went through a very long beta phase with frequent non-trivial changes which means that most of the older tutorials one can find on sites like Medium are already extremely stale.

So the Material part of this project is the result of working thru the first few steps of the Material [getting-started](https://material.angular.io/guide/getting-started) guide and then incorporating some of the examples that accompany the [components](https://material.angular.io/components/categories) documentation, e.g. the [card](https://material.angular.io/components/card/examples) example.

If you press the `<>` button, i.e. the "view code" button, seen in the title bar for such examples you'll find the HTML, TypeScript and CSS for the given example. If you've gone thru the Angular tutorial it's fairly obvious how this code should be added into an existing application. However these snippets miss out on some elements that need to be configured elsewhere in the application, i.e. the setup of your global CSS, your base `index.html` and your `@NgModule` section.

Note: sometimes VSCode or `ng serve` will claim that errors exist where they do not, this generally happens if you're using angular-cli to create new components etc. while VSCode or `ng serve` are running. So if you see an error that doesn't seem to make sense just try exiting and restarting VSCode and/or `ng serve` before you start investigating - this will often make the problem disappear.

Basic Material application
--------------------------

So assuming you've already done the basic Angular tutorial we'll now build up a new app, and first pull in the Material [card](https://material.angular.io/components/card/examples) mentioned above and then tag on the [dialog](https://material.angular.io/components/dialog/examples) example.

Create a new application and add it to git before making any changes:

    $ ng new angular-material-example
    $ cd angular-material-example
    $ rm -r .git
    $ cd ..
    $ git init
    $ git add angular-material-example
    $ git commit -m 'Initial import.'

Note: angular-cli automatically initializes the root directory that it creates as a git repo and imports the initial project setup - here we'll work with git at a level above this, hence the removal of the `.git` directory created by angular-cli.

Do the initial Material setup (as per the getting-started guide mentioned above):

    $ cd angular-material-example
    $ npm install --save @angular/material @angular/cdk @angular/animations

Note: the Material getting-started guide shows how you can use npm or Yarn to install packages etc. At one stage Yarn looked like a significant improvement on npm but with the release of npm@5 neither appears to have a great advantage over the other, so it seems to make sense to just stick with npm.

Update [`index.html`](angular-material-example/src/index.html) to include the Material typography in order to get the fonts used by Material. See the [typography](https://material.angular.io/guide/typography) guide for more details.

Update [`styles.css`](angular-material-example/src/styles.css) to specify which Material theme you want to use. See the [theming](https://material.angular.io/guide/theming) guide for more details.

For the changes to `index.html` and `styles.css` see commit [`2fab41e`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/2fab41e).

Now you can track all further development in your browser - start `ng serve` and open <http://localhost:4200/>.

Create our first Material component:

    $ ng generate component my-card

Replace the contents of `app.component.html` to display the autogenerated my-card content:

    <app-my-card></app-my-card>

See commit [`52ec2d4`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/52ec2d4) for this step.

Then copy over the HTML and CSS from the Material [card](https://material.angular.io/components/card/examples) example - you don't need to copy the TypeScript as there are no changes that need to be made to the already autogenerated TypeScript code created by angular-cli above.

If you're watching things in the browser you'll see that everything breaks at this stage - you'll see more information in the console if you open the browser's developer tools.

This is because unfortunately the example code doesn't cover the changes you need to make to `app.module.ts`. It turns out you need to set up a few basic things first and then include stuff specific to the particular Material components you're using.

First you need to include support for Angular forms. Note this is basic Angular stuff and not specific to using Material. We're not using any form components yet but they're such a standard part of any application that we'll just include this as part of standard boilerplate right up front:

    import { FormsModule } from '@angular/forms';

Then we need to include support for the animations that Material uses:

    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

Then you have to include these in the `imports` section of the `@NgModules` block.

After that a slightly more tricky step - you have to work out what specific Material modules to include for the components you've specified in your HTML. There's probably some sensible way to do this but I found the easiest thing to do was to look at the browser console output, see what it was complaining about and look for a suitable module.

In this case the error on the console related to `mat-card-title` being unknown. If you go to the `imports` section in `app.module.ts` and start typing `Mat` as a new module name and then do autocomplete to see what your options are you'll quickly see that there's a `MatCardModule` (and this as expected covers all the `mat-card` related elements).

If you include this then everything will work again (autocomplete will also nicely include the appropriate `include` line up at the top of `app.module.ts`).

But it's clear something is wrong with the styling of the buttons. As there's no issue in the console it's harder to know what to do here. If you look at the HTML for the buttons you'll see `mat-button` attributes and it turns out you need to include `MatButtonModule` to get the related CSS.

See commit [`2950966`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/2950966) for this step.

Now you should be able to add any other Material component in a similar fashion yourself.

### A simple console

Before we go any further let's add a simple console, similar to the [messages service](https://angular.io/tutorial/toh-pt4#show-messages) in the Angular tutorial, so we can display messages on our browser page without having to open the developer tools to look at console output there.

Add a service and a component:

    $ ng generate service my-console --module=app
    $ ng generate component my-console

Then update the code and the HTML for the console (pretty much exactly as in the Angular tutorial). This is pretty trivial - see commit [`1847320`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/1847320) for the changes involved.

### Adding the dialog example

Now we'll add the Material [dialog](https://material.angular.io/components/dialog/examples) example as this is a bit more involved - it involves two small forms and a small amount of code that uses the values entered in the forms and displays the dialog.

We need to create two components, one for a small form and a button that opens the dialog and one for the dialog itself:

    ng generate component my-dialog-opener
    $ ng generate component my-dialog

If you press `<>` and view the source for the [dialog](https://material.angular.io/components/dialog/examples) you'll notice they've missed out the HTML related to the dialog. But you can find it and everything else behind this example under [`dialog-overview`](https://github.com/angular/material2/tree/master/src/material-examples/dialog-overview) in the Material GitHub repository.

I've given my components different names, i.e. `my-dialog-opener` and `my-dialog` rather than `dialog-overview-example` and `dialog-overview-example-dialog` respectively.

It's worth taking a look at the code in [`my-dialog-opener.component.ts`](angular-material-example/src/app/my-dialog-opener/my-dialog-opener.component.ts) and [`my-dialog.component.ts`](angular-material-example/src/app/my-dialog/my-dialog.component.ts). It's a bit more involved than anything so far.

In particular it's worth noting that the component `my-dialog` isn't really a dialog but rather the _contents_ of the dialog, if you look at the `my-dialog-opener.component.ts` code you'll see the constructor takes a generic `MatDialog` as an argument and then in the `openDialog()` method (which is bound to a button in our HTML) you can see that it opens the `my-dialog` component in the dialog that was passed into the constructor. It's also worth trying to work out what's happening with the untyped structure passed as the `data` field when calling `open`. Look at the corresponding `data` argument to the component `my-dialog` and at the bindings in the HTML.

We need to add three more modules (`MatDialogModule`, `MatFormFieldModule` and `MatInputModule`) to `app.module.ts` to support these components. These components also pull in forms for the first time in this application so we finally start using the Angular `FormsModule` that we pulled in earlier.

If you do all this everything will look good in the browser but if you press the "Pick one" button the page will go gray but no dialog will appear. If you look at the developer tools console you'll see:

    No component factory found for MyDialogComponent

It turns out that the logic behind dialog `open` doesn't know how build something of the type `MyDialogComponent` that you specified. It turns out we don't need any special behavior for the factory that creates this component so can just leave that all to Angular by adding the following the `@NgModules` block:

    entryComponents: [MyDialogComponent],

Now everything works - if you enter your favorite animal in the dialog and click OK then you'll see the named animal displayed beneath the "Pick one" button.

See commit [`f6639e6`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/f6639e6) for this step.

### Using the console

Let's get rid of the "You chose" text below the "Pick one" button and instead use the console that we added earlier. This is fairly trivial - see commit [`929aa4c`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/929aa4c) for this step.

Try opening the dialog and entering a favorite animal and pressing OK or canceling out and seeing what appears in our fancy looking console.

OK - that's everything finished on the frontend for the moment.

Spring Boot REST server with Swagger
------------------------------------

OK - lets get out of the frontend world for the moment and clone the Spring Boot [RESTful web service](https://spring.io/guides/gs/rest-service/) example.

    $ pwd
    .../angular-material-example
    $ cd ..
    $ git clone git@github.com:spring-guides/gs-rest-service.git tmp
    $ mkdir spring-boot-rest-swagger-example
    $ mv tmp/complete/src spring-boot-rest-swagger-example
    $ rm -rf tmp

See commit [`22350f0`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/22350f0) for this step. We're missing a `pom.xml` for our super basic REST server, so let's add that.

Note the `pom.xml` used here is a little longer than it needs to be as I prefer being free to specify my own parent pom later if I want to rather than specifying `spring-boot-starter-parent` as the parent. So instead I use what's called the bill-of-materials (BOM) approach as described in the Spring Boot [build documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-build-systems.html#using-boot-maven-without-a-parent). This means Spring Boot manages the versions for the huge universe of artifacts that it knows about but otherwise is fairly unobtrusive.

Along with the pom I also cleaned up `GreetingController` a little bit.

See commit [`ad6848a`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/ad6848a) for this step.

Once the pom is setup you can import the project into Eclipse as an existing Maven project and then run the `Application` class. Once you do this you can test out the REST service like so:

    $ $ curl http://localhost:8080/greeting
    {"id":2,"content":"Hello, World!"}
    $ curl 'http://localhost:8080/greeting?name=foobar'
    {"id":3,"content":"Hello, foobar!"}

### Adding Swagger support

Adding Swagger support is extremely simple you just have to add the `springfox-swagger2` artifact to the pom (and optionally add the `springfox-swagger-ui` artifact for a fancy browser based way to interact with Swagger) and then add in a boilerplate `SwaggerConfig` class, i.e. a Spring `@Configuration` class to setup Swagger.

The `SwaggerConfig` class used here was taken from the Baeldung [Swagger2 with a Spring REST API](http://www.baeldung.com/swagger-2-documentation-for-spring-rest-api) tutorial.

This is enough to make the existing REST API queryable via Swagger but I also added in a trivial Swagger `@ApiOperation` to `GreetingController.greeting(...)` to show that you can use this and other annotations to add additional information that can be picked up by Swagger.

See commit [`5b8c7a9`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/5b8c7a9) for this step.

Once you've done this and rerun the `Application` class via Eclipse you can now query Swagger like so:

    $ curl http://localhost:8080/v2/api-docs

If you've got Python 2.6+ installed you can pretty print this like so:

    $ curl http://localhost:8080/v2/api-docs | python -m json.tool

And thanks to the optional `springfox-swagger-ui` artifact you can interact with things via a fancy browser based UI, just open <http://localhost:8080/swagger-ui.html> in your browser. Click on greeting-controller, then on GET, then on "Try it out", replace the text "World" with "John" and click Execute and you can see the server response below.

### Adding CORS support

We're almost there but before we can wire up the frontend to the backed we need to add [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) support.

If we run the frontend via `ng serve` then this serves things up via port 4200, i.e. <http://localhost:4200/>, and if we run the backend via the `Application` class then this will serve up the REST API via port 8080.

Without CORS support Angular will not allow calling from one origin to another, i.e. if the frontend is served via `localhost:4200` then the REST API must also be available via this origin.

As we're serving things out via port 9000 we need to add CORS support - this is easy enough, you just have to add a simple `CorsConfig` file that configures the allowed origins.

See commit [`72f07aa`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/72f07aa) for this step.

Rerun the `Application` class and try:

    $ curl -v http://localhost:8080/greeting

You'll see nothing different to before in the reponse headers, now try:

    $ curl -v -H 'Origin: http://localhost:4200' http://localhost:8080/greeting

When the request includes the `Origin` header you should see the following (along with other additional headers) in the response:

    Access-Control-Allow-Origin: *

I've been lazy here and specified that all origins, i.e. `*`, are allowed. In a production setup the allowed origins, configured via our `CorsConfig` class, should be specified using e.g. `application.properties` and would be restrictive as possible. Or even better the frontend and the backend would be served via the same hostname and port then no CORS support would be needed.

Aside: from experience serving up a HTML frontend plus a REST API via the same Spring instance works out very messy if you start adding in authorization. When you make an unauthorized call to a REST API you want a [401](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401) response, i.e. something the frontend logic that made the call can process, whereas if a person navigates to a page for which they are currently unauthorized you want a 30X redirect to a login page, i.e. something a human can handle. You can introduce rules to work out which behavior should be applied in a given situation but it all becomes rather messy - if Spring Boot can see that you're either just serving HTML or just providing a REST API then it'll do the "right thing" without additional configuration.

Note: CORS headers should not leak information - so if you specify an `Origin` header in your request that does not match the allowed origins configured on the backend then you'll get no CORS headers in the response. You only get CORS headers in the response in the positive situation where things match properly. This can make debugging a little difficult - if you don't get CORS headers back it's difficult to distinguish between the situation where there's an issue with your request and the `Origin` header specified or if CORS in misconfigured or not configured at all on the backend.

Generating TypeScript wrappers for the REST API
-----------------------------------------------

We've got our frontend and our backend setup and now we want to automatically generate TypeScript wrappers from the Swagger description of the REST API.

First let's get into the right directory and setup `.gitignore` so that it ignores all the files autogenerated by Swagger CodeGen.

    $ pwd
    .../spring-boot-rest-swagger-example
    $ cd ..
    $ printf '\n# Autogenerated Swagger wrappers.\nsrc/app/api/\n' >> angular-material-example/.gitignore
    $ git commit -a -m 'Added Swagger autogenerated wrappers to .gitignore.'

The Swagger CodeGen CLI isn't terribly well documented so let's just do things cookbook style. First you have to have the backend running, i.e. run the `Application` class in Eclipse, so it's queryable via Swagger then:

    $ wget http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.3.1/swagger-codegen-cli-2.3.1.jar -O swagger-codegen-cli.jar
    $ java -jar swagger-codegen-cli.jar generate -i http://localhost:8080/v2/api-docs -l typescript-angular -o angular-material-example/src/app/api

So first we download the Swagger CodeGen CLI tool via Maven Central - it's just an executable jar artifact. Then we run it against the JSON that it can retrieve from <http://localhost:8080/v2/api-docs> and tell it to output Angular TypeScript code to the directory `angular-material-example/src/app/api`.

Aside: version 3.0 of the CLI should soon come out - the first RC is already available - so check [swagger-codegen-cli at Maven Central](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22io.swagger%22%20AND%20a%3A%22swagger-codegen-cli%22) to see if it's been released yet.

If you look at what ends up in the `api` directory you'll see first some junk, odd little scripts and the like that may be useful to someone in some situation but not to us, and you'll see quite a lot of TypeScript but most of it is just stuff that works away behind the scenes - almost none of it is directly interesting to us.

The only really interesting files are `api/api/greetingController.service.ts` and `api/model/greeting.ts` these contain the `GreetingControllerService` class, which wraps our single REST call, and the class `Greeting` which corresponds to the response from this call.

Now that we've generated this code we just have to wire it into our existing frontend.

This actually relatively trivial. We just need to import the autogenerated `ApiModule` into the `@NgModules` block, configure the base URL for our queries, i.e. `http://localhost:8080`. Then we just need to add something to our user interface to trigger a call to our greetings REST service. Rather than add a new component for this we can just hack an additional "Query greeting" button into our existing dialog example.

Then we just need to pull in a `GreetingControllerService` as an additional argument to the constructor to our existing `MyDialogOpenerComponent`, create a new function `queryGreeting` and bind it to our "Query greeting" button. Within this function it's trivial to call into our REST service:

    this.greetingControllerService.greetingUsingGET("John Doe")
      .subscribe(body => ...);

`body` is the response to our request and is of type `Greeting`.

See commit [`989ea83`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/989ea83) for this step.

Important: if you jump to the implementation of `greetingUsingGET` you'll see there are variations that allow you to access more than just the unmarshaled body of the response, you can also get the full thing wrapped up as `HttpResponse`, with status code, headers etc. or even more exotic you can work with `HttpEvent` instances (that allow you to monitor the steps of the requests lifecycle in greater detail).

Note: the vertical spacing between the original "Pick one" button and the new "Query greeting" button isn't great - fixing this is left as an exercise for the reader!

### Configuring a base URL

In the last step the following was added to the `providers` array that's part of `@NgModules`:

    {
      provide: BASE_PATH,
      useValue: 'http://localhost:8080'
    }

This allows us to configure the base URL of our REST service. When we autogenerated our wrapper code we told the Swagger CodeGen CLI to run against the JSON pulled from <http://localhost:8080/v2/api-docs> so if you look at `GreetingControllerService` you'll see that `http://localhost:8080/` is already baked in as the `basePath` value.

So setting `BASE_PATH` as above is just setting it to the value it already has by default - but in a real setup you'd want to be able to configure the location of the REST service and here in the `@NgModules` block would be where you'd pull in some externally configured value (rather than as here using a hardcoded value). See elsewhere for "application environments" for how to do this.

Note: configuring `BASE_PATH` doesn't seem to be very well documented, but it is covered in Swagger issue [#3513](https://github.com/swagger-api/swagger-codegen/issues/3513), which also covers how to deal with the case where you've got multiple REST services each of which provides its own `BASE_PATH` (see [this comment](https://github.com/swagger-api/swagger-codegen/issues/3513#issuecomment-293593251).

### Working with RxJS

Like the standard `HttpClient` in Angular the methods on the REST wrapper classes like `GreetingControllerService` return observables.

Just to demo how error handling can be done and how a pipeline of operations can be applied to the results retrieved via an observable we'll now add some rather pointless extras to our `queryGreeting` logic.

See commit [`a94e3f4`](https://github.com/george-hawkins/spring-swagger-angular-material/commit/a94e3f4) for this step.

If you look at this you can see a pipeline of operations like this:

    const obs$ = this.greetingControllerService.greetingUsingGET('John Doe')
      .pipe(
        tap(_0 => ...),
        finalize(() => ...)
      );

Note: prepending `$` to a variable name is just a convention to indicate that it's an observable. And using `_0`, `_1` etc. is just a convention to indicate that the particular parameters are unused (the plain underscore on its own has already been taken by Lodash).

The methods on `Observable` are apparently quite extensive, in terms of quantity of code, so traditionally the `Observable` just came with `subscribe` and a few other methods and then developers used prototype patching to add in the additional methods that they actually wanted to use rather than adding the whole lot. So once patched you could write code like this:

    const obs$ = this.http.get<Foo>(myUrl)
      .map(x => ...)
      .catch(err => ...)
      .finally(() => ...);

This is the kind of code you see in most of the current examples on the web. However apparently there were various issues with this approach of patching `Observable` and with RxJS 5 they introduced the approach seen up above of using `pipe` with independent operators that you import as you need. So e.g. the old style patched on methods `catch` and `finally` become the independent pipeable operators `checkError` and `finalize`. You can still use the old style patching approach, though it's not recommend, e.g. to patch in `catch` you just need to add the following import:

    import 'rxjs/add/operator/catch';

For more information on these new operators see the RxJS [pipeable operators page](https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md) and the [section on operators](https://www.learnrxjs.io/operators/) at the Learn RxJS site (the list there does though miss out some of the basic operators).

You can use the `catchError` operator to deal with error situations but if you just want to print an error it's probably easier to use the additional optional arguments to `subscribe`:

    obs$.subscribe(
      body => ...,
      err => ...,
      () => /* completed */);

Note that initially I tried passing a method to `subscribe` like this:

    obs$.subscribe(this.processGreeting);

However this doesn't work, you have to use an arrow function like so:

    obs$.subscribe(body => this.processGreeting(body));

The reason for this is explained in the answer to the TypeScript FAQ question ["Why does `this` get orphaned in my instance methods?"](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-does-this-get-orphaned-in-my-instance-methods)

### HTTP responses as observables

The request methods on the standard `HttpClient` and on the wrappers generated here by Swagger all return observables. Initially getting back an observable, rather than a promise, feels wrong for HTTP requests as there's only one response. However you can see the argument for using observables explained in Angular issue [#5876](https://github.com/angular/angular/issues/5876).

TODO
----

* Look at bundling up Spring and Angular together in a more coherent project with [JHipster](https://www.jhipster.tech/).
* Is linting run automatically as part of the standard Angular workflow or is it worthwhile runnging [`ng lint`](https://github.com/angular/angular-cli/wiki/lint) as part of one's workflow?
* Look at more sophisticated layout with e.g. [flex layout](https://medium.com/@nima_ap/creating-a-responsive-dashboard-in-angular-5-from-scratch-147f6a493d9e) (see image before conclusion section to see what it's capable of). Are there other popular Angular layouts? In the code above the "Pick one" and "Query greeting" buttons are too close - take a look at some of the form examples that appear in the examples that accompany the Material [components](https://material.angular.io/components/categories) documentation and see what they use to lay things out nicely.
* For a different approach altogether see the Vaadin [Flow and Spring demo](https://vaadin.com/start/v10-full-stack-spring), note Vaadin can also work with Angular - see the [Angular example](https://vaadin.com/start/v10-angular). Whether it makes sense or is feasible to swap out Flow, and use Angular instead, is unclear.
* Look at project [Origami](https://github.com/hotforfeature/origami) and see if it's possible (and interesting) to mix in Polymer with the work done so far using Material.

Unsorted notes
--------------

For the Angular introduction to [webpack](https://webpack.js.org/) see their [webpack guide](https://angular.io/guide/webpack). Currently the introductory section to this guide is out of date as it seems to suggest that SystemJS is the default bundler while webpack is an alternative, however webpack replaced SystemJS as the default long ago (see the Angular CLI [1.0.0-beta.11 `CHANGELOG` entry](https://github.com/angular/angular-cli/blob/ed5f47dc22d5eb4a5d4b4ae2c8f7cb0ec1a999f3/CHANGELOG.md#100-beta11-webpack-2016-08-02)).

When using Angular CLI the webpack configuration is kept hidden from the end user - to see it you first have to do `ng eject`, doing this though has knock on affects, see [SO answer](https://stackoverflow.com/a/42406194/245602) and this Angular CLI [issue](https://github.com/angular/angular-cli/issues/6302) for more details.

Once you've ejected the configuration such that you can modify it directly, e.g. if you look at the [medical appointment scheduling app](https://github.com/sebastianhaas/medical-appointment-scheduling/) that's used as a Swagger demo you can see that they've separated out different webpack configs for different environment, e.g. see how `API_BASE_PATH` is set up in [`webpack.dev.js`](https://github.com/sebastianhaas/medical-appointment-scheduling/blob/master/config/webpack.dev.js) (and the corresponding files for TEST and PROD). If you grep around from this starting point (looking for `webpack.dev.js` etc.) you can see how this environment specific configuration are then bundled up into different packages.

However it seems you should usually be able to avoid interacting directly with webpack, e.g. for configuring environment specific values see the files under `src/environments` that Angular CLI automatically generates and the corresponding Angular wiki entry on [application environments](https://github.com/angular/angular-cli/wiki/stories-application-environments).
