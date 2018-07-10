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

---

Remember there are more npm etc. notes in ~/git/notes/NOTES.md
