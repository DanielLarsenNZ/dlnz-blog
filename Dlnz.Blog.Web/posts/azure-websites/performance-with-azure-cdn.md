{
    "template": "post",
    "title": "Bare-metal performance with Azure CDN",
	"description": "",
    "tags": ["azure-websites", "performance"]
}

# Bare-metal performance with Azure CDN
_7th February 2015_

<img src="/images/auckland-central.jpg" class="img-responsive img-thumbnail" alt="Image of Auckland Central Railway Station by D. Larsen" title="Auckland Central Railway Station by D. Larsen">


## TL;DR

If you are Ops savvy and can work around the long TTL of CDN caches, then hosting in CDN may be a high performance and cost effective option. There are gotchas and down-sides though so, read on.


## Look Ma, no web server!

What you are reading (on [www.daniellarsen.nz]) is served 100% from CDN. The DNS records on the domain are configured to send all requests to the _CDN_ (not the Azure Website). As long as I get my client-side optimisation right (minification, bundling and other optimisations) site performance should start to approach the bare metal of the CDN infrastructure. In other words, the performance of this site is tuned by the Azure CDN infrastructure team, and I'm cool with that.

This works because, as described in [Hello World! A static website/blog with Azure, GitHub and Grunt], this site's content is generated as static HTML files at deployment time. When I author a post and deploy (from GitHib) the newly generated _.html_ file (now in the Azure Website's storage blob) is immediately available to CDN cache.

Serving an entire website from CDN is an aggresive (some would say foolish) strategy that only works if your content is truly static. The first time you need any kind of dynamic content served (that is not via AJAX) this fails hard. For my purposes it's fine, but there are still some gotchas.


## Time To Live

The default TTL for Azure CDN is 72 hours. If you modify an object in CDN you may have to wait up to _three days_ for that modified object to be served, and possibly longer for browser client caches to expire their copy of the content. That is going to be a long three days if you have an embarrassing typo on your home page. Here are three ideas on how to mitigate the effects of TTL.

The first idea is to [reduce the TTL for HTML objects in the CDN]. For this site I have set the TTL for pages and posts to eight hours and the TTL for CSS, scripts, fonts and images to three days. I can live with my site's HTML content only being updated three times a day. It is slow moving and visitors currently number in the ones. CDN TTL is a trade-off between freshness and performance/cost. I would not recommend a short TTL on a very busy site as it will result in more origin requests which incur a performance hit and a cost - you pay for the storage hit and the data transfer for origin requests (as well at the CDN outbound data). Using _web.config_ files you can [set different TTLs for different folders] which is handy. Large truly static assets like images and third-party JS/CSS libraries should always have a long TTL.

```xml
<configuration>
  <!-- ... -->
  <system.webServer> 
    <staticContent> 
      <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="0.08:00:00"/> 
    </staticContent> 
  </system.webServer> 
</configuration>
```
_Snippet from [Web.config] that sets the CDN TTL to eight hours. You can drop Web.config files in folders to vary TTLs on a folder-by-folder basis._

The second idea is to treat any post or page you write as an immutable document. In other words don't ever modify or delete a page once you have published it, create a new version instead. New versions are served immediately and can be cached for a long time. Your URL must include the version number, either in its path or as a query (this won't work for _index.html_), so multiple versions will be indexed by GoogleBot. The Google index problem can be solved with effective use of the [canonical] link element or header.

```html
<link rel="canonical" href="http://www.daniellarsen.nz/posts/azure-websites/performance-with-azure-cdn.html" />
```

The third idea is to use a clever combination of static and dynamic content, where the basis of your site is loaded from CDN which bootstraps a dynamic app (an [Angular] app for example) that calls to an API for all dynamic content. Hat-tip to my friend Reece at work who sowed the seed of this idea in my head.

A good overall strategy would be to combine all three of these approaches, and the busier the site got, the more it would look like a traditional web-app. But it would be built "performance-first", if you know what I mean. In Cloud Compute CPU is expensive so any time you are caching you are winning, as long as you are not inconveniencing your users too much.


### More info

* [CDN Websites with CDN] (Azure Docs)
* [Use canonical URLs] (Google Webmaster Tools)


[Web.config]: https://github.com/DanielLarsenNZ/dlnz-blog/blob/master/Dlnz.Blog.Web/Web.config
[CDN Websites with CDN]: http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/#caching
[canonical]: https://support.google.com/webmasters/answer/139066?hl=en
[Use canonical URLs]: https://support.google.com/webmasters/answer/139066?hl=en


### DNS

There are only two entries in the DNS record for _daniellarsen.nz_:

```
@   A     62.116.130.8            3600
www CNAME az714222.vo.msecnd.net  3600
```

The A record is for redirection from the root to www (using a service provided by my registrar). The CNAME for www resolves to the CDN, not the Azure Website. Note that there is a TTL on the domain records as well. In this case the Domain TTL is one hour which gives a one hour turnaround should I change my mind and want to host on the Azure Website itself.


## How much does it cost?

The beauty of hosting from CDN is that (in this case) the Azure Website does not do any hosting, so a Free tier website is fine. The custom domain name is associated with the CDN, not the Azure Website so their is no Shared tier requirement.

CDN pricing starts at about NZ$ 0.17c* per GB of outbound data and gets cheaper as the Terabytes go up and/or the region gets more central. You also pay for outbound data from your Azure Website Storage Blob to the CDN edges. The first 5GB are free and then it's approx NZ$ 0.17 per GB after that (and gets cheaper as the Terabytes go up and the Region gets more central). Traffic to the same Region is free so, because my site is hosted in Sydney, I don't get charged for outbound traffic to the Sydney CDN edge.

<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> **Note** Pricing changes all the time and other charges that may apply. See [Azure CDN Pricing] and [Azure Data Transfer Pricing] for details and don't take my word for it.</div>

_ * Brazillian data starts at NZ$ 0.22c per GB._

I know what you are thinking: "Yeah right, but what does it _really_ cost?" For the answer to that come back soon as I work on the numbers and make observations from my experiment that you are reading right now.


<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> **WIP** I am writing this post as I learn. <a href="https://twitter.com/daniellarsennz/" class="alert-link">Follow me on Twitter</a> and come back soon...</div>

<div class="alert alert-info" role="alert"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span> [The content and source for this site is hosted on GitHub](https://github.com/DanielLarsenNZ/dlnz-blog)</div>


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
[set different TTLs for different folders]: http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/#caching
[Angular]: https://angularjs.org/
[For example]: https://github.com/DanielLarsenNZ/dlnz-blog/blob/master/Dlnz.Blog.Web/Gruntfile.js
[Zetzer]: https://github.com/brainshave/grunt-zetzer
[Azure Websites pricing page]: http://azure.microsoft.com/en-us/pricing/details/websites/
[Hello World! A static website/blog with Azure, GitHub and Grunt]: /posts/azure-websites/hello-world.html
