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

## Installing

### Use npm

`npm` is a dependency management and package system which can pull in all of the Grunt Edition's dependencies for you. There are two ways of using `npm` to install the Grunt Edition of Pattern Lab Node:

#### Install as a Dependency of an existing project

First, install the Grunt Edition as a dependency of your project using [npm install](https://docs.npmjs.com/cli/install):

    cd project/
    npm install edition-node-grunt --save-dev

This will install the Grunt Edition into a directory called `node_modules` in `install/location/`.

Next, add the edition-node-grunt [tasks](http://gruntjs.com/getting-started#loading-grunt-plugins-and-tasks) to your main [Gruntfile](http://gruntjs.com/getting-started#the-gruntfile) by adding `grunt.loadNpmTasks('edition-node-grunt');`.  See [Sample Gruntfile](#sample-gruntfiles) for help.

Now, continue on and finish [setting up your configuration](#set-up-and-configuration).


#### Install the Grunt Edition of Pattern Lab Node as standalone

* download or `git clone` this repository to an install location.

* run the following

    ```
    cd install/location
    npm install
    ```

Running `npm install` from a directory containing a `package.json` file will download all dependencies defined within.

## Set up and Configuration
Run `grunt patternlab:set-up` to create a default source directory for your Pattern Lab project.  This is only necessary if your installed the Grunt Edition as a dependency.

Pattern Lab runs using the default configs defined in the [default-config.json](/default-config.json) file.

If you want to change any of these configurations you can create your own `config.json` file and then add its path to your Gruntfile as the `config_file` option.  See [Sample Gruntfile](#sample-gruntfiles) for help.  Make sure your config file includes **ALL** the necessary configurations.  

You can also add your custom configurations directly in your Gruntfile as options. These options will only overwrite the existing default configurations so don't worry about including them all.  Again see [Sample Gruntfile](#sample-gruntfiles) for help.  Note, overwriting options in your Gruntfile does not nest so if you overwrite the `"paths"` config, be sure to include **ALL** the source and public paths information.

## Sample Gruntfiles
Your Gruntfile.js could look something like this:

```
module.exports = function(grunt) {

  grunt.initConfig({

    patternlab: {
        // You can place a path do your own config file here
        options: {
            config_file: "config.json"
        }
    }
  });

  grunt.loadNpmTasks('edition-node-grunt');
};

```

Or this:

```
module.exports = function(grunt) {

  grunt.initConfig({

    patternlab: {
        // You can overwrite default config directly in your Gruntfile
        options: {
            "cleanPublic" : false,
            "patternExportDirectory": "./exports/"
        }
    }
  });

  grunt.loadNpmTasks('edition-node-grunt');
};

```

## Updating Pattern Lab

To update Pattern Lab please refer to each component's GitHub repository, and the [master instructions for core](https://github.com/pattern-lab/patternlab-node/wiki/Upgrading). The components are listed at the top of the README.

## Helpful Commands

These are some helpful commands you can use on the command line for working with Pattern Lab.

### List all of the available commands

To list all available commands type:

    grunt patternlab:help

### Set Up Pattern Lab source directories

To generate the default Pattern Lab source directories:

    grunt patternlab:set-up

See [Set up and Configuration](#set-up-and-configuration)

### Generate Pattern Lab

To generate the front-end for Pattern Lab type:

    grunt patternlab:build

### Watch for changes and re-generate Pattern Lab

To watch for changes, re-generate the front-end, and server it via a BrowserSync server,  type:

    grunt patternlab:serve

BrowserSync should open [http://localhost:3000](http://localhost:3000) in your browser.

### Install a StarterKit

To install a specific StarterKit from GitHub type:

    npm install [starterkit-vendor/starterkit-name]

    grunt patternlab:loadstarterkit --kit=[starterkit-name]
