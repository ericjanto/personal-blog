---
date: 2020-07-03
title: 'Deploying your Gatsby site to cPanel'
excerpt: While it is certainly possible to deploy your Gatsby project on cPanel within a few minutes, I struggled very much with it, having never done it before. This article covers a simple step-by-step explanation on what exactly to do.
template: post
slug: deploy-gatsby-cpanel
tags:
  - 'computer-science'
  - 'gatsby'
  - 'cPanel'
  - 'server'
---

Gatsby is a static site generator. This means, for instance, that you can write some parts of your website using Markdown. Gatsby then transforms it, using some fancy magic, into a single HTML file and some static assets. The benefit is that almost every hosting platform supports plain HTML and more importantly, that Gatsby sites are usually really fast and secure.

When I first used Gatsby to build this website, I was amazed about how easy the deployment with Netlify was. After the development process, I got this whole blog online within a few minutes.

However, I was forced to use cPanel as hosting platform for a new project. While it is certainly possible to deploy your Gatsby project on cPanel within a few minutes, I struggled very much with it, having never done it before. This article covers a simple step-by-step explanation on what exactly to do.

#### Objectives

- Publish a Gatsby site using cPanel
- Integrate a GitHub repo

#### What this is not

- Setup for continuous deployment
- Setup of a domain with cPanel

I tried to set up continuos deployment system which [should be possible](https://blog.cpanel.com/git-version-control-soon-with-automatic-deployment/). I tried it for a few hours and gave up after running into too many problems (please [contact](/contact/) me if you have a simple step-by-step guide and wanna help me out in that regard).

## Without Git – Newbie Version

If you're totally new to using Git and you don't want to spend some time learning the basics yet, this way works perfectly fine for you.

The first thing to do is to get Gatsby to create the HTML and CSS files.
Go into your project directory and run `gatsby build`.

It should look similar to this:

```bash
$ gatsby build
success open and validate gatsby-configs - 0.161s
success load plugins - 1.862s
success onPreInit - 0.014s
success delete html and css files from previous builds - 0.027s
success initialize cache - 0.011s
success copy gatsby files - 0.081s
success onPreBootstrap - 0.012s
success createSchemaCustomization - 0.298s
success source and transform nodes - 0.107s
success building schema - 0.375s
success createPages - 0.070s
success createPagesStatefully - 0.083s
success onPreExtractQueries - 0.001s
success update schema - 0.029s
success extract queries from components - 0.392s
success write out requires - 0.008s
success write out redirect data - 0.002s
success Build manifest and related icons - 0.004s
success onPostBootstrap - 0.014s
⠀
info bootstrap finished - 9.492s
⠀
success Building production JavaScript and CSS bundles - 15.705s
success Rewriting compilation hashes - 0.007s
success run queries - 15.870s - 3/3 0.19/s
success Building static HTML for pages - 2.142s - 28/28 13.07/s
success onPostBuild - 0.113s
info Done building in 27.744292266 sec
```

This should create a new `public` directory in your project directory. In there is all the code you need to deploy your website.

Then run `gatsby serve` to check whether everything is alright with the website.

```bash
$ gatsby serve
⠀
You can now view ericjanto.com in the browser.
⠀
  http://localhost:9000/
```

On macOS, you can terminate the serve process by typing `^C` (control + c).
If everything looks alright, go to cPanel and log in.

Go to the file manager and look for the `public_html` directory. Usually, it has the web icon (🌐) in front of the name.

Delete everything in there (if you don't need it for the new website) and click on `Upload`. Upload the entire content of the `public` directory (the one created with the `gatsby build` command). Make sure that the files are directly in the `public_html` directory, not in a new subdirectory.

That's it. If you've already linked a domain to your cPanel profile, the website should now be online.

## Using GitHub

While the way described above works perfectly fine, it gets a bit tedious to download and upload the entire `public` folder every time you change some detail on your website. An easy workaround is to use a GitHub repository.

The first thing to do is to include a `.cpanel.yml` file in your project directory. This file is basically an instruction manual for cPanel on how and where to deploy the changes you make or respectively, which files to ignore.

You want your `.cpanel.yml` file to look like this for Gatsby projects:

```yml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/userName/public_html/
    - /bin/cp -R public/* $DEPLOYPATH
```

Make sure to replace `userName` in the deploypath with your cPanel username.

But what's going on here?

1. We specify the path to the directory where cPanel where should put the GitHub repository files. We want this to be `public_html`.
2. We specify which files to deploy. In our case, we only want the build files, i.e. files in the `public` folder, to be deployed. This is what `-R public/*` is for. It says "take all folders and files in `public`.

Now run `gatsby build` to create the `public` folder and push it to your repo. You can use `gatsby serve` to check the build files.

Once you've set up your repository and everything is on GitHub, go to the cPanel menu and click on `Git Version Control`. Click on `Create` to create a new repo and paste the clone url of your GitHub repo.

Then choose a path where your repository should be stored. It doesn't really matter, you can choose any path.
I chose `/home/userName/repositories` as it makes it easier to find it should I ever need to.

Choose a repo name and click on `Create`. Make sure that your `public_html` folder is empty, go back to the Git control panel in cPanel and click on the `Manage` button next to your repository name. Then go to `Pull or Deploy`, click on `Update from Remote` and then `Deploy HEAD Commit`.

That should be it! Enjoy your website, generated with Gatsby, deployed to and hosted by cPanel.
