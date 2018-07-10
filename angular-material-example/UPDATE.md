Doing a full update of everything
---------------------------------

Update to latest version of npm:

    $ npm install -g npm
    $ npm --version

Update to the latest Angular CLI version:

    $ npm install -g @angular/cli@latest

Throw away the old packages:

    $ rm -rf package-lock.json node_modules

See what packages are out-of-date:

    $ npm outdated

Fix the versions by hand - npm can do minor version updates automatically but deliberately doesn't support doing major version number updates:

    $ npm outdated > see
    $ vi -O package.json see
    $ npm install
    $ npm outdated

Update project files produced by earlier Angular CLI version:

    $ ng update @angular/cli

If npm complained about vulnerabilities see if it can fix them automatically:

    $ npm audit fix

When doing this it complained that the appropriate typescript dependency wasn't available. It turned out that the latest version I'd specified in package.json was beyond that supported by Angular and other packages.

Find the latest version that meets the constraints shown in the error messages:

    $ npm show 'typescript@*' version

Downgrade typescript version:

    $ vi package.json 
    $ npm install

Rerun the fix - it turns out npm can't automatically fix any of the issues - it's up to the packages that we depend on to do this:

    $ npm audit fix

Updating Swagger wrappers
-------------------------

If you've cloned a new copy of this repo or want to update the wrappers, first find the latest version of swagger-codegen-cli at <https://search.maven.org>, then:

    $ cd ..
    $ wget http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.3.1/swagger-codegen-cli-2.3.1.jar -O swagger-codegen-cli.jar
    $ java -jar swagger-codegen-cli.jar generate -i http://localhost:8080/v2/api-docs -l typescript-angular -o angular-material-example/src/app/api

The 2.3.1 CLI still generates wrappers that are slightly incompatible with the latest version of RxJS - presumably this will be fixed in version 3 that will soon be out.

In the meantime the issue can be fixed with the help of <https://update.angular.io/> - basically it boiled down to:

    $ rxjs-5-to-6-migrate -p src/tsconfig.app.json

This just changed `import { Observable } from 'rxjs/Observable';` to `import { Observable } from 'rxjs';` in the wrapper files.

---

Remember there are more npm etc. notes in ~/git/notes/NOTES.md
