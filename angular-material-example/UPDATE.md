Installing the latest version of node (and npm)
-----------------------------------------------

You don't want `npm -g` requiring `sudo` and installing files to a system-wide location.

I used to have a `~/.npmrc` file, containing the line `prefix=~/.npm-global`, to achieve this.

But now the best way to handle this (and maintain multiple versions of node, if needed) is to use [`nvm`](https://github.com/nvm-sh/nvm).

So first delete any old `~/.npmrc` related files (as `nvm` notices and warns about unexpected interactions if you don't):

    $ rm -rf ~/.npm*

And remove any reference to `.npm...` from your `~/.bashrc`.

Install `nvm` (as per the `README`):

    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

This updates your `~/.bashrc` so open a new terminal session to pickup these changes and in this new session retrieve the latest version of node:

    $ nvm install node

You can then check where things are and their versions:

    $ command -v node
    .../.nvm/versions/node/v13.11.0/bin/node
    $ command -v npm 
    .../.nvm/versions/node/v13.11.0/bin/npm
    $ node --version
    v13.11.0
    $ npm --version     
    6.13.7

And update to the latest version of npm, if a newer one has been released since the latest version of node:

    $ npm install -g npm
    $ npm --version     
    6.14.2

To see where things are installed:

    $ npm list -g --depth=0
    .../.nvm/versions/node/v13.11.0/lib
    +-- npm@6.14.2

If you later install things like `@angular/cli`, they'll end up in this `lib` directory too.

Doing a full update of an existing project
------------------------------------------

Update to latest version of npm:

    $ npm install -g npm
    $ npm --version

Install the latest `@angular/cli` version:

    $ npm install -g @angular/cli@latest

Things won't work without an existing `node_modules` directory, so if the existing versions aren't installed, install them:

    $ npm install

Some of the versions may be so old that they won't install successfull but this is fine.

Tell `@angular/cli` to update itself and project files produced by earlier versions of the CLI:

    $ ng update @angular/cli

This seems to work better if things haven't gotten too stale.

Ask `npm` what packages are outdated and update them to the latest version:

    $ for p in $(npm outdated | sed 's/ .*//' | egrep -v '^Package')
    do
        npm install $p@latest
    done

This takes a substantial amount of time. At the end resolve any outstanding complaints. E.g...

The latest `typescript` was higher than the latest version supported by Angular, so find and install the latest acceptable version:

    $ npm show typescript@* version | sort
    $ npm install typescript@3.7.5

Some of the latest package version required a not yet installed dependency:

    $ npm install tslib

Some packages required a specific older version of `tslint`:

    $ npm install tslint@5.0.0

The package `@angular/http` has been adsorbed into `@angular/common`:

    $ npm uninstall @angular/http

Finally tell `npm` to clean up anything it can:

    $ npm audit fix

And then fix up the compilation errors revealed by:

    $ ng serve

Updating Swagger wrappers
-------------------------

If you've cloned a new copy of this repo or want to update the wrappers

    $ cd ../spring-boot-rest-swagger-example
    $ mvn compile
    $ mvn exec:java -Dexec.mainClass=hello.Application

This will start the server from which the Swagger codegen can retrieve a description of the API - leave it running and open another terminal session.

Now find the latest version of swagger-codegen-cli at <https://search.maven.org>, then:

    $ cd ..
    $ curl -O https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.18/swagger-codegen-cli-3.0.18.jar
    $ java -jar swagger-codegen-cli-3.0.18.jar generate -i http://localhost:8080/v2/api-docs -l typescript-angular -o angular-material-example/src/app/api
