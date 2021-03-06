﻿{
    "template": "post",
    "title": "Hello World! A static website/blog with Azure, GitHub and Grunt",
	"description": "I am a big fan of static content management systems like GitHub.io and Jekyll. I thought it would be interesting to try and emulate a similar static content generation story on Azure Websites, using a Visual Studio oriented toolset.",
    "tags": ["azure-websites"]
}

# Hello World! _A static blog site with Azure Websites, GitHub and Grunt._
_5th February 2015_

<img src="/images/bilbao.jpg" class="img-responsive img-thumbnail" alt="Image of Bilbao by S. Raimon">


## TL;DR

I'm a big fan of static content management systems like _[GitHub.io and Jekyll][jekyll_pages]_. I thought it would be interesting to try and emulate a similar static content generation story on Azure Websites, using a Visual Studio oriented toolset. I did it with [Grunt], [Zetzer] and GitHub deployment to an Azure Website. I use [Azure CDN] to keep CPU time down and improve performance.


## The solution

|Technology | What              | Why   |
| ----      | ---               | ----- |
| [Azure Website] | Cheap, scalable Web hosting platform with easy deployment and CDN stories. | Hosts the website and provides a platform for its deployment and maintenance. |
| [GitHub]  | Web-based Git repository hosting service. | Excellent collaboration, editing and deployment story. |
| [Kudu]    | Swiss army knife deployment tool for Azure Websites.  | Coolest library on the planet. |
| [Grunt]   | Node.js/NPM based build task runner | To compile Markdown to HTML in Development Environment and at Deployment time. |
| [grunt-zetzer]  | Grunt-task for compiling Markdown to HTML | To generate static HTML from Markdown files and HTML templates. |


## Grunt

I'm using [Grunt] to generate the site as static HTML at "build" time and at Deployment time. The posts are authored as Markdown (_.md_) files and are checked in to source control. Partials are HTML files containing reusable snippets. Templates are also HTML files with templating markup in the form of [doT.js].

The power of Grunt is in the way [grunt tasks are configured], in particular the File abstraction of source to destination mapping. This suits the task of content generation really well. The rules in *[Gruntfile.js]* are very simple currently, but will become more complex as I unleash the power of filtering functions to dynamically determine where files are generated and how they are linked. This is possible because *Gruntfile.js* is a JavaScript file (not JSON config). I can write JavaScript functions that determine which files are generated and where.

[grunt tasks are configured]:http://gruntjs.com/configuring-tasks

### Authoring

<a href="/images/vs2015-Grunt.jpg" class="image-link"><img data-original="/images/vs2015-Grunt-800.jpg" class="img-responsive img-thumbnail lazy" alt="Screenshot of Visual Studio 2015 Preview and Grunt Task Runner"></a>

I compose a post in an _.md_ file in Visual Studio and save it to the posts folder. I hit [F5] and [Task Runner Explorer] (now built-in to [Visual Studio 2015 Preview]) kicks off a grunt task ([grunt-zetzer]) which is bound to the _After-build_ IDE event. The grunt task compiles my post into an *.html* file which has been styled by a [template]. Visual Studio opens a Browser window and I can now read the post as served by IIS Express.

### Deployment

 I add and commit the post's _.md_ file to the local git repo and push to master on GitHub (the compiled *.html* files are _.gitignore_'d). The push webhook in GitHub triggers a deployment on the Azure Website. The Kudu *[.deployment]* file includes the `SCM_POST_DEPLOYMENT_ACTIONS_PATH` setting. The Post Deployment Actions are [*.cmd* files] that install Grunt and other dependencies then run the grunt-zetzer task on the Azure Website. The *.html* file is generated on the server alongside the *.md* file.

Why not commit and push the generated HTML file as well? It keeps my pushes small and saves me having to remember to include the HTML files in my Website Project (only files in the *.csproj* are deployed by default). Plus it is pretty cool that we can run Grunt tasks on Azure Websites. At some stage in the future I may reconsider this strategy though.


### Metadata
Zetzer expects a JSON header that contains extra metadata about the document. This is the metadata for this post:

```javascript
{
    "template": "post",
    "title": "Hello World! A static website/blog with Azure, GitHub and Grunt",
	"description": "I am a big fan of static content management systems like GitHub.io and Jekyll. I thought it would be interesting to try and emulate a similar static content generation story on Azure Websites, using a Visual Studio oriented toolset.",
    "tags": ["azure-websites"]
}
```

The metadata is accessible from within the document or template. For example, to dynamically set the HTML meta-description tag in the template:

```
<meta name="description" content="{{= it.document.description || ""}}">
```

The beauty of [doT.js] is that almost everything inside the curly braces is evaluated as JavaScript so you can easily coalesce `undefined` to `""`, and use language features like `Date`:

```html
<meta name="x-dlnz-blog-page-version" content="{{= new Date().toString() }}">
```


### More info
* [Post Deployment Action Hooks](https://github.com/projectkudu/kudu/wiki/Post-Deployment-Action-Hooks) (Project Kudu)
* [Zetzer concepts](https://github.com/brainshave/zetzer#main-concepts) (Zetzer on GitHub)
* [Introducing Gulp, Grunt, Bower, and npm support for Visual Studio](http://www.hanselman.com/blog/IntroducingGulpGruntBowerAndNpmSupportForVisualStudio.aspx) (Hanselman.com)
* [Visual Studio 2015 Preview Downloads](http://www.visualstudio.com/en-us/downloads/visual-studio-2015-downloads-vs.aspx) (VisualStudio.com)


[*.cmd* files]: https://github.com/DanielLarsenNZ/dlnz-blog/tree/master/deployment/postdeploymentactions
[.deployment]: https://github.com/DanielLarsenNZ/dlnz-blog/blob/master/.deployment


## Zetzer

[Zetzer] is fork of the grunt-stencil project. It's a static content generation framework that supports the creation of 
content, partial content and templates in HTML, Markdown and [doT.js] - a fast and simple template engine of the curly-braces 
variety. Zetzer runs in Grunt (Node.js) and has only a few dependencies.


### Installation

```
npm install -g grunt
npm install grunt-zetzer
```

Then configure _Gruntfile.js_ to run Zetzer by default in a way that suits your site. [For example], on this site I write my content in Markdown (_.md_ files) and Zetzer generates HTML versions alongside them at Grunt time. Zetzer uses templates (in the templates folder) to add style.

The main Zetzer task compiles static pages based on a src to dest list. For example, [line 23 of Gruntfile.js] specifies that _hello-world.md_ should be compiled to index.html (the Home page).

The [_posts_ Zetzer task] compiles any Markdown files found in the posts directory (or sub-directories) to HTML files that are placed alongside them (`flatten: false`). Any files expansion supported by Grunt can be used. See [Configuring Tasks](http://gruntjs.com/configuring-tasks) (Grunt docs).

[line 23 of Gruntfile.js]: https://github.com/DanielLarsenNZ/dlnz-blog/commit/009d593a396469d710ebe02298453b534fde758e#commitcomment-9758099

[_posts_ Zetzer task]: https://github.com/DanielLarsenNZ/dlnz-blog/commit/009d593a396469d710ebe02298453b534fde758e#commitcomment-9758196


## How much does it cost?

There are options here and the cost depends on how busy your site is obviously. For a small blog starting out (like mine) then you can host for free, as long as you don't need a custom domain name. Your site URL would be something like _http://{{sitename}}.azurewebsites.net_. Free (and shared) sites have no SLA and are not intended for "production". You may experience long warmup times and the odd outage when your site goes over its CPU allocation.

The _Shared_ tier supports custom domain names and is approx. NZ$ 14.57 per month when hosting in an Australian Region. You get four hours of CPU time on a shared core. Once you blow that allocation the site will start serving `HTTP 400` errors. What I _love_ about that is it forces us to think about the cost of our code. Poorly performing code is punished with a higher pricing tier. All of a sudden the business driver for performance comes into sharp focus. It has always been there but sometimes we forget about it.

When you are ready for the big time you can graduate to a _Basic_ tier and host as many sites as you like on your own core/s starting from approx. NZ$ 86 per month (Aussie Region). This tier and above have a 99.95% SLA and all sorts of other goodies. 

<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> **Note** Pricing changes all the time and there are other charges like outbound traffic and storage that may apply. See the [Azure Websites pricing page] for details and don't take my word for it.</div>

This website is hosted on a Free Azure Website but all content is served from CDN. I get a custom domain name on my CDN endpoint so don't need a shared plan. I do pay CDN charges however and there are downsides. Read all about it in my next post, [Bare metal performance with Azure CDN].


<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> **WIP** I am writing this post as I learn. <a href="https://twitter.com/daniellarsennz/" class="alert-link">Follow me on Twitter</a> and come back soon...</div>

<div class="alert alert-info" role="alert"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span> [The content and source for this site is hosted on GitHub](https://github.com/DanielLarsenNZ/dlnz-blog)</div>


[Gruntfile.js]: https://github.com/DanielLarsenNZ/dlnz-blog/blob/master/Dlnz.Blog.Web/Gruntfile.js
[template]: https://github.com/DanielLarsenNZ/dlnz-blog/blob/master/Dlnz.Blog.Web/templates/post.dot.html
[Bare metal performance with Azure CDN]: /posts/azure-websites/performance-with-azure-cdn.html
[jekyll_pages]: https://help.github.com/articles/using-jekyll-with-pages/
[twitter_dan]: https://twitter.com/daniellarsennz
[Grunt]: http://gruntjs.com/
[doT.js]: http://olado.github.io/doT/index.html
[Azure Website]: http://azure.microsoft.com/en-us/services/websites/
[Azure CDN]: http://azure.microsoft.com/en-us/services/cdn/
[Task Runner Explorer]: http://www.hanselman.com/blog/IntroducingGulpGruntBowerAndNpmSupportForVisualStudio.aspx
[Visual Studio 2015 Preview]: http://www.visualstudio.com/en-us/downloads/visual-studio-2015-downloads-vs.aspx
[grunt-zetzer]: https://github.com/brainshave/grunt-zetzer
[GitHub]: https://github.com
[Kudu]: https://github.com/projectkudu/kudu
[www.daniellarsen.nz]: http://www.daniellarsen.nz/
[reduce the default TTL for objects in the CDN]: http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/#caching
[set different TTLs for different folders]: http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/#caching
[canonical]: https://support.google.com/webmasters/answer/139066?hl=en
[Angular]: https://angularjs.org/
[For example]: https://github.com/DanielLarsenNZ/dlnz-blog/blob/master/Dlnz.Blog.Web/Gruntfile.js
[Zetzer]: https://github.com/brainshave/grunt-zetzer
[Azure Websites pricing page]: http://azure.microsoft.com/en-us/pricing/details/websites/