{
    "template": "post",
    "title": "Bare-metal performance with Azure CDN",
	"description": "",
    "tags": ["azure-websites", "performance"]
}

# Bare-metal performance with Azure CDN
_7th February 2015_

What you are reading (on [www.daniellarsen.nz]) is served 100% from CDN. I have configured the DNS on my domain to send all requests to the _CDN_ (not the Azure Website). This means that _all_ content is served out of CDN. As long as I get my client-side optimisation right (minification, bundling and other optimisations) my site performance should start to approach the bare metal of the CDN infrastructure. In other words, my site performance is tuned by the Azure CDN infrastructure team, and I'm cool with that.

This works because, as I described in [Hello World! A static website/blog with Azure, GitHub and Grunt], this site's content is generated as static HTML files at deployment time. When I author a post and deploy (from GitHib) the newly generated .html file (now in my Azure Website's storage blob) is immediately available to my CDN cache for when it is first requested.

Serving an entire website from CDN is a very aggresive (some would say foolish) strategy that only works if your content is truly static. The first time you need any kind of dynamic content served (that is not via AJAX) this fails hard. For my purposes this is fine, but there are still some gotchas.

The default TTL for Azure CDN is 72 hours. If you modify an object in CDN you may have to wait up to _three days_ for that modified object to be served, and possibly longer for browser client caches to expire their copy of the content. That is going to be a long three days if you have an embarrassing typo on your home page. There are several ways that I can think of to get around this.

The first idea is to [reduce the TTL for HTML objects in the CDN]. For this site I have set the TTL for pages and posts to eight hours and the TTL for CSS, scripts, fonts and images to three days. I can live with my site's HTML content only being updated three times a day. It is slow moving and visitors currently number in the ones. CDN TTL is a trade-off between freshness and performance/cost. I would not recommend a short TTL on a very busy site as it will result in more origin requests which incur a performance hit and a cost - you pay for the storage hit and the data transfer for origin requests (as well at the CDN outbound data). Using _web.config_ files you can [set different TTLs for different folders] which is handy. Large truly static assets like images and third-party JS/CSS libraries should always have a long TTL.

The second idea is to consider any post or page you write as an immutable document. In other words don't ever modify or delete a page once you have published it, create a new version instead. New versions are served immediately and can be cached for a long time. Your URL must include the version number, either in its path or as a query (this won't work for _index.html_), so multiple versions will be indexed by GoogleBot. The Google index problem can be solved with effective use of the [canonical] link element or header.

The third idea is to use a clever combination of static and dynamic content, where the basis of your site is loaded from CDN which bootstraps a dynamic app (an [Angular] app for example) that calls to an API for all dynamic content. Hat-tip to my friend Reece at work who sowed the seed of this idea in my head.

A good overall strategy would be to combine all three of these approaches, and the busier the site got, the more it would look like a traditional web-app but would be built "performance-first", if you know what I mean. In Cloud Compute CPU is expensive so any time you are caching you are winning, as long as you are not inconveniencing your users too much.


## How much does it cost?

The beauty of hosting from CDN is that (in this case) the Azure Website does not do any hosting, so a Free tier website is fine. The custom domain name is associated with the CDN, not the Azure Website so their is no Shared tier requirement.

CDN pricing starts at about NZ$ 0.17c* per GB of outbound data and gets cheaper as the Terabytes go up and/or the region gets more central. You also pay for outbound data from your Azure Website Storage Blob to the CDN edges. The first 5GB are free approx NZ$ 0.17 per GB after that (and get cheaper as the Terabytes go up and the Region gets more central). Traffic to the same Region is free so, because my site is hosted in Sydney, I don't get charged for outbound traffic to the Sydney CDN edge. 

_Brazillian data starts at NZ$ 0.22c per GB. See [Azure CDN Pricing] and [Azure Data Transfer Pricing] for actual pricing and info._

I know what you are thinking: "Yeah right, but what does it _really_ cost?" For the answer to that come back soon as I work on the numbers and make observations from my experiment that you are reading right now.


<div class="alert alert-info" role="alert"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> **(WIP)** I am writing this post as I learn. [Follow me on Twitter][twitter_dan] and come back soon...</div>

<div class="alert alert-info" role="alert"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span> [This content and source for this site is on GitHub](https://github.com/DanielLarsenNZ/dlnz-blog)</div>


### More about Azure CDN
* [Azure CDN overview](http://azure.microsoft.com/en-us/documentation/articles/cdn-overview/)
* [Integrate an Azure Website with Azure CDN](http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/)
* [Azure CDN Pricing]


[Azure Data Transfer Pricing]: http://azure.microsoft.com/en-us/pricing/details/data-transfers/
[Azure CDN Pricing]: http://azure.microsoft.com/en-us/pricing/details/cdn/
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
[reduce the TTL for HTML objects in the CDN]: http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/#caching
[set different TTLs for different folders]: http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/#caching
[canonical]: https://support.google.com/webmasters/answer/139066?hl=en
[Angular]: https://angularjs.org/
[For example]: https://github.com/DanielLarsenNZ/dlnz-blog/blob/master/Dlnz.Blog.Web/Gruntfile.js
[Zetzer]: https://github.com/brainshave/grunt-zetzer
[Azure Websites pricing page]: http://azure.microsoft.com/en-us/pricing/details/websites/
[Hello World! A static website/blog with Azure, GitHub and Grunt]: /posts/azure-websites/hello-world.html
