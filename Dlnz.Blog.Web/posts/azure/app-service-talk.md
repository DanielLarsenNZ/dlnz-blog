{
    "template": "post",
    "title": "Azure App Service",
    "description": "Azure App Service, Microsoft’s new Web and Mobile app PaaS offering on Azure.",
    "tags": [ "azure", "paas" ]
} 


# Azure App Service
_14th April 2015_

<img src="images/ninja-cat.jpg" class="img-responsive img-thumbnail" alt="Ninja Cat riding a flame throwing Unicorn with a Rainbow.">


## TL;DR
App Service combines the previous Azure Websites, Mobile Services and BizTalk Services into one integrated offering and is a major PaaS play by Microsoft Azure that drives Continous Delivery and Development Efficiency.


## Hello Azure App Service
Today I had the pleasure of speaking at the [Auckland Azure Lunchtime Meetup](http://www.meetup.com/Auckland-Azure-Lunchtime-Meetup/) about the new, but also old, Azure App Service. This was an interesting talk to prepare for as, while I know Azure Websites fairly well, the new Logic Apps and API Apps are... new. But you can see Integration patterns coming back that have been around for decades. Dare I say it, Azure is making Integration cool again. 

What follows are notes, references and links from research for the talk. See also the [slides](https://github.com/DanielLarsenNZ/Azure-App-Service-Talk/raw/master/Azure-App-Service-Talk-Slides.pdf) and a [demo project](https://github.com/DanielLarsenNZ/Azure-App-Service-Talk/tree/master/ImageResizer).


## Getting started with App Service
If you are getting in to Azure App Service, then watch [the Announcement](https://channel9.msdn.com/Events/Microsoft-Azure/Scott-Guthrie-March-24-2015-Announcement/Azure-App-Service-announcement) (especially Hanselman's demo). Then read this [excellent summary](http://www.infoworld.com/article/2904348/application-development/first-look-microsoft-azure-app-services-cloud-development.html) by [Martin Heller](https://twitter.com/meheller).


## New, but also old
Azure Websites have been around for a while now. They offer simplicity of deployment and management, as well as the power of a scale-out model and test-on-prod features. Mobile Services and BizTalk Services have also been PaaS offerings in their own right for some time. But the challenge has been that these three services have been quite isolated from each other in several ways including affinity and also pricing. Integrating these services has felt a bit clunky and does not spring to mind as a viable option. There have been improvements over the past year, but now the new Azure App Service is all about bringing these three services together as first-class citizens of a PaaS ecosystem.

Now Azure Websites becomes "Web Apps", Mobile Services becomes "Mobile Apps", "Logic Apps" take over the workflow previously provided by BizTalk Services (MABS). API Apps are new pluggable LOB Connectors that can be authored in several different languages and shared with the community via a the Azure Marketplace. All of this adds up to a new integrated PaaS offering, standing on the shoulders of Azure Websites, which reinforces PaaS as a major play for Microsoft Azure.


### Web Apps

<a href="images/new-portal-github-deployment.jpg" class="image-link"><img data-original="images/new-portal-github-deployment-800.jpg" class="img-responsive img-thumbnail lazy" alt="Screenshot of GitHub Deployments in the New (Preview) Azure Portal"></a>

Web Apps keep all of the announcements from the past year or so including support for Node.js, Java, PHP, Python. The new (Preview) Portal gets a major upgrade and deserves a shoutout - especially from those of us deploying from GitHub: GitHub and BitBucket finally join VSO as first-class deployment citizens in the new portal. The other exciting announcement (which I have not had time to investigate further) is [Hybrid Connections to on-premise resources](http://blogs.biztalk360.com/azure-api-app-and-logic-app-in-depth-look-into-hybrid-connector-marriage-between-cloud-and-on-premise/) (like on-prem SQL Server for example).

### Mobile Apps
Mobile Apps is a new beast that merges in the capacbilities of the old Mobile Services offering. Mobile Apps' code runs on a Web App, and you have full control over the web app and how it operates. Features which were previously unavailable to Mobile Services, such as Traffic Manager and Deployment Slots, can now be used. Because you have more control over the app, any version of any NuGet package can now be deployed without worry about dependency conflicts.

When you create a Mobile App you get a Mobile App resource (which includes some new features like SaaS API connectors, etc), a Mobile App Code site to run your Web API project using the Mobile App Server SDK, and an App Service Gateway to handle logic and assists with adding App Service API Apps to your application.


### Logic Apps
Logic Apps are new. They are easiest explained in a show and tell, but think "Lego" for integrators. A drag-and-drop designer interface where you compose Triggers and LOB Workflow connectors to form a workflow. The Logic App is, again, a Web App under the hood so you can scale up, use diagnostic tools and so on.


### API Apps
If Logic Apps are Lego then API Apps are the building blocks. Each one is a Web API App meaning you can easily create your own from scratch or from existing code. The Azure Marketplace now includes pre-built API Apps that you can pick and choose for your own custom (Logic App) workflows. Over 40 connectors are in the market and the number is growing all the time with the ability for any third-party to contribute. I am excited about the prospect of being able to contribute apps to this Marketplace.


### Hybrid Connections
Hybrid connections are interesting. Apparently these have been available via BizTalk Services for some time but now any App Service App can use a hybrid connection. This is going to unlock some interesting scenarios for integrating with a System of Record or other on premise systems that don't make sense to move to the cloud.

### Resource Groups and Affinity

<a href="images/app-service-on-prem.jpg" class="image-link"><img data-original="images/app-service-on-prem-800.jpg" class="img-responsive img-thumbnail lazy" alt="Web, Mobile and Logic Apps build on API Apps."></a>

Hanselman describes Mobile, Web and Logic Apps as logically building on API Apps which is an interesting way of thinking of them. This is almost a micro-services architectural pattern where API services underlie everything. Another important aspect is that instances of these App Service Apps can be deployed to the same VM for low latency between the Web, Logic and Mobile Apps and the API Apps that they build on. App Service Apps employ Resource Group as a logical grouping for management and deployment.

### Pricing changes in your favour
All Apps in your App Service exist in the same App Service Plan too. Remember Web Hosting Plans for Azure Websites? These have been renamed to App Service Plans to which all App Service Apps belong. This is a fundamental shift in the PaaS pricing model in your favour. Each Web, Mobile, Logic and API App instance counts towards your Plan's total instances. Previously Mobile Services and BizTalk Services would have been charged separately.

For my demos I am using an S1 Standard (small) Plan which supports up to 10 instances of which I am using about 5. If I need more power I can pay more and turn up the cores. I can also auto-scale instances of my Apps as required. At around $55 NZD per month for a small plan I think this represents pretty good value.

_Note: At the time of writing the Australia Geo was not supported for Logic Apps. I created my demo in West-US._


## Build a Logic App

<a href="images/logic-app-tiggers-actions.jpg" class="image-link"><img data-original="images/logic-app-tiggers-actions-800.jpg" class="img-responsive img-thumbnail lazy" alt="Logic App Triggers and Actions in the Designer."></a>

Building a Logic App is quick and easy.
* [Create a new logic app](http://azure.microsoft.com/en-us/documentation/articles/app-service-logic-create-a-logic-app/)
* [Add conditional logic and work with the Code view](http://azure.microsoft.com/en-us/documentation/articles/app-service-logic-use-logic-app-features/)

The management API is wonderful. You can PUT workflow, run it and interrogate it. _Tip: Triggering workflow from the API will give your more debug info than the Portal does._

*  [Logic App Workflow Management API](https://msdn.microsoft.com/en-us/library/azure/dn948513.aspx)

There is a [Workflow Definition Language](https://msdn.microsoft.com/en-US/library/azure/dn948512.aspx). Expressions can be embedded in a JSON document (delimited by "@"). It's a shame that the team didn't go the whole hog and allow JavaScript to be used as a Workflow Language (i.e. save the definition as JavaScript similar to _Gruntfile.js_), but I am sure there is a good reason for that.


## Build an API App.
* [Create an API App in Visual Studio](http://azure.microsoft.com/en-us/documentation/articles/app-service-dotnet-create-api-app-visual-studio/)
* [Deploy an API App](http://azure.microsoft.com/en-us/documentation/articles/app-service-dotnet-deploy-api-app/)

In the [App Service announcement](https://channel9.msdn.com/Events/Microsoft-Azure/Scott-Guthrie-March-24-2015-Announcement/Azure-App-Service-announcement) Scott Hanselman does a killer demo of a Car Service company workflow - check it out. My favourite bit is when he reuses an old VIN Decoder class from an old legacy app. To me _this is the opportunity_; exploiting old code to create micro API Apps that can contribute to new workflows, or old workflows in new ways. I have a simple demo that reinforces this point called [ImageResizer](https://github.com/DanielLarsenNZ/Azure-App-Service-Talk/tree/master/ImageResizer).

`ImageResizer.Resizer` service is a simple Service that takes an Image as Stream and returns a resized Image as Stream. It is old, well worn and tested code that does one thing well. It's extracted from a horrible system that stores the Images as Blobs in an old SQL Server DB. Building it into an API App will breathe new life in to the code. The component becomes part of a new workflow that stores the original and resized images in Azure Blob Storage – a much cheaper an easier to manage option.

<a href="images/swagger-docs.jpg" class="image-link"><img data-original="images/swagger-docs-800.jpg" class="img-responsive img-thumbnail lazy" alt="Swagger Docs."></a>

* `ImageResizer.API` is a new Azure API App Project (created from a new template now available in Azure SDK 2.5.1 for Visual Studio).
* `ResizerController` is a Web API controller that downloads the Image as Blob from Storage, passes to `ResizerService`, and then uploads the resized version of the Image to Storage.
* [Swagger](http://swagger.io/) comes for free in the API App Project - this is an OSS service definition language for REST APIs. This is a very exciting development for APIs.
* Build and run the project and navigate to /swagger to see Swagger docs in action.
* Deploying is as easy as right-click Publish using the Publish wizard.
* Once deployed, the API App can be used as part of a workflow in Logic Apps.

This unlocks extreme possibilities in terms of building a library of integration service apps that you can share with your Organisation, or the community (or even sell).


## Summary
* Azure App Service is a single integrated offering for building rich Web and Mobile Apps backed by composable integration connectors and API Apps.
* The API App Service Marketplace presents a library of ready made connectors and the opportunity to contribute more.
* Logic Apps are drag-and-drop Lego for Integrators.
* API Apps - Quickly create pluggable Interfaces from new code or upgrade your old LOB apps so that they can be exploited by other workflows.


## More info, links and references
* [Azure API App and Logic App. In depth look into Hybrid Connector. Marriage between cloud and on-premise](http://blogs.biztalk360.com/azure-api-app-and-logic-app-in-depth-look-into-hybrid-connector-marriage-between-cloud-and-on-premise/) - Hybrid connections in depth.
* [Request Bin](http://requestb.in/) - handy dandy endpoint that echoes out anything you post to it.
* [Azure Resource Explorer: a new tool to discover the Azure API](http://azure.microsoft.com/blog/2015/04/02/azure-resource-explorer-a-new-tool-to-discover-the-azure-api/) - this is awesome.


### Reviews: 
These are worth reading.
* [First look: Microsoft's Azure App Services sweeten cloud development](http://www.infoworld.com/article/2904348/application-development/first-look-microsoft-azure-app-services-cloud-development.html) - InfoWorld.
* [Welcome Azure App Service. Some of my thoughts](http://www.codit.eu/blog/2015/03/24/welcome-azure-app-service-some-of-my-thoughts/) - Codit.
* [Azure App Service: BizTalk Server PaaS Done Right](http://www.quicklearn.com/blog/2015/03/24/azure-app-service-biztalk-server-paas-done-right/) - QuickLearn.
