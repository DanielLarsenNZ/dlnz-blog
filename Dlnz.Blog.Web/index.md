{
    "template": "index",
    "title": "Hello World! A static website/blog with Azure, GitHub and Grunt",
	"description": "I am a big fan of static content management systems like GitHub.io and Jekyll. I thought it would be interesting to try and emulate a similar static content generation story on Azure Websites, using a Visual Studio oriented toolset.",
    "tags": ["azure-websites", "github", "performance"]
}

# Hello World! _A static blog site with Azure Websites, GitHub and Grunt._

![Image of Bilbao by S. Raimon](/images/bilbao.jpg "Image of Bilbao by S. Raimon")


I am a big fan of static content management systems like _[GitHub.io and Jekyll][jekyll_pages]_. I thought it would be interesting to try and emulate a similar static content generation story on Azure Websites, using a Visual Studio oriented toolset.

What I discovered was so much more. What you are reading right now (on www.daniellarsen.nz) is a blogging website that is served 100% from CDN. As long as I get my client-side optimisation right (minification, bundling and other optimisations) my site performance should start to approach the bare metal of the CDN infrastructure. In other words, my website performance is now being tuned by the Azure CDN infrastructure team, and I'm cool with that.

## The solution

These are the main components of the Solution.

|Technology | What              | Why   |
| ----      | ---               | ----- |
| Azure Websites | Cheap, scalable Web hosting platform with easy deployment and CDN stories. | Hosts the website and provides a platform for its deployment and maintenance. |
| GitHub  | Version Control platform for Open Source Software. | Excellent collaboration, editing and deployment story. |
| Kudu    | Swiss army knife deployment tool for Azure Websites.  | Coolest library on the planet. |
| Grunt   | Node.js/NPM based Build Task runner | To run post-deployment task on Azure Website |
| Zetzer  | Grunt-task for parsing Markdown to HTML | To generate Static HTML from MD files and templates |
| Azure CDN | Out-of-the-box CDN for Azure Websites | Serves static content (including blog pages) reducing CPU time. |


### Zetzer

Zetzer is fork of the grunt-stencil project. It's a static content generation framework that supports the creation of 
content, partial content and templates in HTML, Markdown and doT.js - a fast and simple template engine of the curly-braces 
variety. Zetzer runs in Grunt (Node.js) and has only a few dependencies.

#### How it works in a nutshell
* `npm install -g grunt`
* `npm install grunt-zetzer`
* Configure your Gruntfile.js to run Zetzer by default in a way that suits your site. 
 * For example, on this site I write my content in Markdown (.md files) and Zetzer generates HTML versions alongside them at grunt time. Zetzer uses a template (index.dot.html) in the templates folder to add style.



## Other cool stuff

These are interesting discoveries I made along the way.

| Tool          | What              | Why               |
| ----          | ---               | -----             |
| Visual Studio 2015 Preview | Latest version of Visual Studio is in preview as a time limited trial of the Ultimate Edition. Mine expires in mid May. | Includes a task runner for Grunt. |
| Sublime Text  | Perfect editor for Blog (Markdown) editing with a large Plugin community. | Simple, lightweight and has a Build process. |
| Visual Studio Online | (Monaco) Edit and preview Markdown in the Browser. | When synced with GitHub this is the ultimate authoring story. |


### Visual Studio Online (Monaco).

My other pleasent discovery was Visual Studio Online (Monaco). I've been using it and demonstrating it for ages but what really clicked this time was that I can edit, preview and publish my content from Visual Studio Online running in my browser (as well as GitHub.com, Visual Studio, Notepad++, etc) and then push my changes back to my dlnz-blog repo.

_(WIP) I am writing this Blog as I learn. [Follow me on Twitter][twitter_dan] and come back soon..._


## Links to more info

* [Azure CDN overview](http://azure.microsoft.com/en-us/documentation/articles/cdn-overview/)
* [Integrate an Azure Website with Azure CDN](http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/)


[jekyll_pages]: https://help.github.com/articles/using-jekyll-with-pages/
[twitter_dan]: https://twitter.com/daniellarsennz/
