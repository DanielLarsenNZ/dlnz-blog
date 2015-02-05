{
    "template": "home",
    "title": "Hello World! A static website/blog with Azure, GitHub and Grunt",
	"description": "I am a big fan of static content management systems like GitHub.io and Jekyll. I thought it would be interesting to try and emulate a similar static content generation story on Azure Websites, using a Visual Studio oriented toolset.",
    "tags": ["azure-websites", "github", "performance"]
}

# Hello World! _A static blog site with Azure Websites, GitHub and Grunt._
_5th February 2015_

<img src="/images/bilbao.jpg" class="img-responsive img-thumbnail" alt="Image of Bilbao by S. Raimon">

I am a big fan of static content management systems like _[GitHub.io and Jekyll][jekyll_pages]_. I thought it would be interesting to try and emulate a similar static content generation story on Azure Websites, using a Visual Studio oriented toolset.

What I discovered was so much more. What you are reading right now (on [www.daniellarsen.nz]) is a blogging website that is served 100% from CDN. As long as I get my client-side optimisation right (minification, bundling and other optimisations) my site performance should start to approach the bare metal of the CDN infrastructure. In other words, my website performance is now being tuned by the Azure CDN infrastructure team, and I'm cool with that.

## The solution

I'm using [Grunt] to generate static posts and other pages (Home, Contact, About) at deployment time. My source controlled artefacts are posts and partials in the form of Markdown (.md) files and HTML [doT.js] template files. My site is hosted in an [Azure Website] and [Azure CDN] is enabled for the entire site. I have configured the DNS on my domain to send all requests to the _CDN_ (not the Azure Website). This means that _all_ content is served out of CDN. The TTL for all objects in CDN is currently one hour.

**My authoring story is:** I compose my post in Markdown in Visual Studio and save it to my posts folder. I hit F5 and [Task Runner Explorer] (now built-in to [Visual Studio 2015 Preview]) kicks off a grunt task ([grunt-zetzer]) which is bound to the After-build IDE event. The grunt task compiles my post into an HTML file which has been styled by a template and augmented with partials. I can now read the post as served by IIS Express in my Browser that has popped up automatically.

**My deployment story is:** I add and commit my blog post .md file to my local git repo and push to master on GitHub. I have .gitignore'd the .html files. The push webhook in GitHub triggers a deployment on my Azure Website. I have added a [Post Deployment Action] to my .deployment file to run the _grunt-zetzer_ task again on my Azure Website. The newly generated .html file (now in my Azure Website's storage blob) is immediately available to my CDN cache for when it is first requested.

Why not push the generated HTML as well? I am not sure really. It is pretty unbelievably cool that we can run grunt tasks on Azure Websites... plus it saves me having to remember to include the .html file in my Website Project (only files in the .csproj are deployed by default).

In summary, these are the main components of the Solution:

|Technology | What              | Why   |
| ----      | ---               | ----- |
| [Azure Website] | Cheap, scalable Web hosting platform with easy deployment and CDN stories. | Hosts the website and provides a platform for its deployment and maintenance. |
| [GitHub]  | Version Control platform for Open Source Software. | Excellent collaboration, editing and deployment story. |
| [Kudu]    | Swiss army knife deployment tool for Azure Websites.  | Coolest library on the planet. |
| [Grunt]   | Node.js/NPM based Build Task runner | To run post-deployment task on Azure Website |
| [grunt-zetzer]  | Grunt-task for parsing Markdown to HTML | To generate static HTML from MD files and templates |
| [Azure CDN] | Out-of-the-box CDN for Azure Websites | Serves static content (including blog pages) reducing CPU time. |


### Zetzer

[Zetzer] is fork of the grunt-stencil project. It's a static content generation framework that supports the creation of 
content, partial content and templates in HTML, Markdown and [doT.js] - a fast and simple template engine of the curly-braces 
variety. Zetzer runs in Grunt (Node.js) and has only a few dependencies.


#### How it works in a nutshell

* `npm install -g grunt`
* `npm install grunt-zetzer`
* Configure your Gruntfile.js to run Zetzer by default in a way that suits your site. 
 * [For example], on this site I write my content in Markdown (.md files) and Zetzer generates HTML versions alongside them at grunt time. Zetzer uses templates (in the templates folder) to add style.


### Azure CDN

I am serving this entire site (the entire [www.daniellarsen.nz] domain, including _index.html_) from CDN. Serving an entire website from CDN is a very aggresive (some would say foolish) strategy that only works if your content is truly static. The first time you need any kind of dynamic content served (that is not via AJAX) this fails hard. For my purposes this is fine, but there are still some gotchas.

The default TTL for Azure CDN is 72 hours. That means if you want to change an object in CDN you may have to wait up to _three days_ for that change to be served, and possibly longer for browser client caches to expire their copy of the content. That is going to be a long three days if you have an embarrassing typo. There are several ways that I can think of to get around this.

The first idea is to [reduce the default TTL for objects in the CDN]. For this site I have set the TTL for all objects to one hour. I can live with an hour or two to update content. My site is slow moving and its visitors currently number in the ones. CDN TTL is a trade-off between convenience and performance/cost. I would definitely not recommend a one-hour TTL on a very busy site. This means more origin requests which have a performance hit and a cost - you pay for the storage hit and the data transfer for origin requests (as well at the CDN outbound data). Using _web.config_ files you can [set different TTLs for different folders] which is handy. Large truly static assets like images and third-party JS/CSS libraries should always have a long TTL.

The second idea is to consider any post or page you write as an immutable document. In other words don't ever modify or delete a page once you have published it, create a new version instead. New versions are served immediately and can be cached for a long time. The downsides of this idea are that your URL must include the version number, either in its path or as a query (this won't work for _index.html_), and multiple versions will be indexed by GoogleBot. The Google index problem can be solved with effective use of the [canonical] link element or header.

The third idea is to use a clever combination of static and dynamic content, where the basis of your site is loaded from CDN which bootstraps a dynamic app (an [Angular] app for example) that calls to an API for all dynamic content. Hat-tip to my friend Reece at work who sowed the seed of this idea in my head.

A good overall strategy would be to combine all three of these approaches, and the busier the site got, the more it would look like a traditional web-app but would be built "performance-first", if you know what I mean.


#### How much does Azure CDN cost?

It starts at about NZ $0.17c per GB of outbound data and gets cheaper as the Terabytes go up and/or the region gets more central. I know what you are thinking: "Yeah right, but what does it _really_ cost?" For the answer to that come back soon as I work on the numbers and make observations from my experiment that you are reading right now.


#### More info about Azure CDN
* [Azure CDN overview](http://azure.microsoft.com/en-us/documentation/articles/cdn-overview/)
* [Integrate an Azure Website with Azure CDN](http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/)
* [Azure CDN Pricing](http://azure.microsoft.com/en-us/pricing/details/cdn/)


_(WIP) I am writing this post as I learn. [Follow me on Twitter][twitter_dan] and come back soon..._


## Even more info

* [This blog site and source are on GitHub](https://github.com/DanielLarsenNZ/dlnz-blog)
* [Configuring Grunt Tasks](http://gruntjs.com/configuring-tasks)


[jekyll_pages]: https://help.github.com/articles/using-jekyll-with-pages/
[twitter_dan]: https://twitter.com/daniellarsennz
[Grunt]: http://gruntjs.com/
[doT.js]: http://olado.github.io/doT/index.html
[Azure Website]: http://azure.microsoft.com/en-us/services/websites/
[Azure CDN]: http://azure.microsoft.com/en-us/services/cdn/
[Task Runner Explorer]: http://www.hanselman.com/blog/IntroducingGulpGruntBowerAndNpmSupportForVisualStudio.aspx
[Visual Studio 2015 Preview]: http://www.visualstudio.com/en-us/downloads/visual-studio-2015-downloads-vs.aspx
[grunt-zetzer]: https://github.com/brainshave/grunt
[Post Deployment Action]: https://github.com/projectkudu/kudu/wiki/Post-Deployment-Action-Hooks
[GitHub]: https://github.com
[Kudu]: https://github.com/projectkudu/kudu
[www.daniellarsen.nz]: http://www.daniellarsen.nz/
[reduce the default TTL for objects in the CDN]: http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/#caching
[set different TTLs for different folders]: http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/#caching
[canonical]: https://support.google.com/webmasters/answer/139066?hl=en
[Angular]: https://angularjs.org/
[For example]: https://github.com/DanielLarsenNZ/dlnz-blog/blob/master/Dlnz.Blog.Web/Gruntfile.js
[Zetzer]: https://github.com/brainshave/grunt-zetzer