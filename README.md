# AppCivist Pattern Library and Style Guide

This style guide library is designed to provide a central place for the team to document and store front end components like HTML partials and CSS styles. It is based on the [Pattern Lab](https://patternlab.io) tool.

# Pattern Lab Node - Grunt Edition

The Grunt wrapper around [Pattern Lab Node Core](https://github.com/pattern-lab/patternlab-node), providing tasks to interact with the core library and move supporting frontend assets.

## Packaged Components

The Grunt Edition comes with the following components:

* `patternlab-node`: [GitHub](https://github.com/pattern-lab/patternlab-node), [npm](https://www.npmjs.com/package/patternlab-node)
* `patternengine-node-mustache`: [GitHub](https://github.com/pattern-lab/patternengine-node-mustache), [npm](https://www.npmjs.com/package/patternengine-node-mustache)
* `pattern-lab/styleguidekit-assets-default`: [GitHub](https://github.com/pattern-lab/styleguidekit-assets-default)
* `pattern-lab/styleguidekit-mustache-default`: [GitHub](https://github.com/pattern-lab/styleguidekit-mustache-default)

## Prerequisites

The Pattern Lab Node - Grunt Edition uses [Node](https://nodejs.org) for core processing, [npm](https://www.npmjs.com/) to manage project dependencies, and [grunt.js](http://gruntjs.com/) to run tasks and interface with the core library. Node version 4 or higher suffices. You can follow the directions for [installing Node](https://nodejs.org/en/download/) on the Node website if you haven't done so already. Installation of Node will include npm.

It's also highly recommended that you [install grunt](http://gruntjs.com/getting-started) globally.

***appcivist-patterns*** asumes that you have compass already installed. In order to install compass, follow the steps found [here](http://compass-style.org/install/).
Compass plugin [Susy](https://www.safaribooksonline.com/library/view/sass-and-compass/9781849694544/ch05s04.html) is also required.

## Installing

### Use npm

`npm` is a dependency management and package system which can pull in all of the Grunt Edition's dependencies for you. To accomplish this:

* download or `git clone` this repository to an install location.

* run the following

    ```
    cd install/location
    npm install
    ```

Running `npm install` from a directory containing a `package.json` file will download all dependencies defined within.

## Getting started

To start hacking with ***appcivist-patterns*** a few commands are available to you.

### Helpful Commands

These are some helpful commands you can use on the command line for working with Pattern Lab.

### List all of the available commands

To list all available commands type:

    grunt patternlab:help

### Generate Pattern Lab

To generate the front-end for Pattern Lab type:

    grunt patternlab:build

### Watch for changes and re-generate Pattern Lab

To watch for changes, re-generate the front-end, and server it via a BrowserSync server,  type:

    grunt patternlab:serve

BrowserSync should open [http://localhost:3000](http://localhost:3000) in your browser.