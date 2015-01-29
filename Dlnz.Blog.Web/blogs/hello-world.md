{
  "title": "Hello World! A static website/blog with Azure, GitHub and Grunt",
  "template": "default",
  "tags": ["azure-websites", "github", "performance"]
}

# Hello World! _A static website/blog with Azure, GitHub and Grunt._

I am a big fan of static content management systems like GitHub.io and Jekyll and what was hoping to learn through writing this blog was how I could implement a simlar system using tools that are familiar to me (Windows OS, Visual Studio, Azure Websites). What I discovered was so much more. What you are reading right now (on www.daniellarsen.nz) is a website that is served 100% from CDN. As long as I get my client-side optimisation right (minification, bundling and other optimisations) my site performance should start to approach the bare metal of the CDN infrastructure. In other words, my website performance is now being tuned by the Azure CDN infrastructure team, and I'm cool with that.

My other pleasent discovery was Visual Studio Online (Monaco). I've been using it and demonstrating it for ages but what really clicked this time was that I can edit, preview and publish my content from Visual Studio Online running in my browser (as well as GitHub.com, Visual Studio, Notepad++, etc) and then push my changes back to my dlnz-blog repo.

_(WIP)_

It's great to be blogging again and what better way to kick it off than with a how-to roll-your-own blog site. I know what 
you're thinking... just what the world needs, another Blog engine 101. Well this is not that - This is some cool
new-ish technologies working together to meet some target conditions, which are:

## Mission<sup>1</sup>

_A rich, performant blog-site that will scale and extend._


Target condition | Why | How 
High performance | Peformance is a feature, and it's fun | Static pages, Grunt, minification, CDN 
Highly scalable | It's fun and interesting | Azure Websites 
Easy to author content | In a hurry, don't like rich text editors or handcrafting HTML | Markdown 
Easy to develop, deploy and host on Windows | Simplicity. Familiarity. | Visual Studio, GitHub deployments 
Super customisable | Innovation | OSS, Zetzer 

## Static pages with Grunt and Zetzer

Static pages are a good option for high performance when dynamic content is not high on the Feature Map. They can simplify
the problem of performance under load, but can also have scaling problems of their own. Static content generation has come
in to the spotlight again recently with libraries like Jekyll and Cloud hosting solutions like GitHub Pages.

What I am interested in learning (by doing) is how Cloud Computing can make static content publishing faster and easier.

Zetzer is fork of the grunt-stencil project. It's a static content generation framework that supports the creation of 
content, partial content and templates in HTML, Markdown and doT.js - a fast and simple template engine of the curly-braces 
variety. Zetzer runs in Grunt (Node.js) and has only a few dependencies.

### How it works in a nutshell
* npm install grunt
* npm install grunt-zetzer
* Configure your Gruntfile.js to run Zetzer by default in a way that suits your site. 
** For example, on this site I write my content in Markdown (.md files) and Zetzer generates HTML versions alongside them at
grunt time. Zetzer uses a template (default.html) in the Templates folder to add style.

_*WIP*_

## Notes

1 [Lean Enterprise](http://shop.oreilly.com/product/0636920030355.do), Principle of Mission.
