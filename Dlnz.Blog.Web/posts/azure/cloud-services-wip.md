# Cloud Services in Azure

How to update .NET version on a worker role. And a good example of install.cmd.
https://azure.microsoft.com/en-us/documentation/articles/cloud-services-dotnet-install-dotnet/

Use the Resource Manager to query things like Guest OS Version, etc:
https://resources.azure.com/

Host Owin in a Worker Role.
http://www.asp.net/web-api/overview/hosting-aspnet-web-api/host-aspnet-web-api-in-an-azure-worker-role

Overview of connection strings and so on.
https://azure.microsoft.com/en-gb/documentation/articles/cloud-services-dotnet-get-started/#deploy-the-application-to-azure

Common Cloud Service startup tasks
https://azure.microsoft.com/en-us/documentation/articles/cloud-services-startup-tasks-common/

How to invoke MSBUILD from PD: http://stackoverflow.com/a/869867

Awesome article on CloudService CD: 
https://azure.microsoft.com/en-us/documentation/articles/cloud-services-dotnet-continuous-delivery/

Troy Hunt rant:
http://www.troyhunt.com/2014/01/with-great-azure-vm-comes-great.html

## Service Discovery
Consul (Go): https://www.consul.io/intro/index.html
Microphone (.NET): https://github.com/rogeralsing/Microphone

## Message Queue
AMQP: https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol
Service Bus AMQP overview: https://azure.microsoft.com/en-us/documentation/articles/service-bus-amqp-overview/
Using Service Bus from .NET with AMQP 1.0: https://azure.microsoft.com/en-us/documentation/articles/service-bus-amqp-dotnet/
Node.js AMQP client library: https://github.com/noodlefrenzy/node-amqp10
Comparing Azure Queues and Service Bus Queues: https://azure.microsoft.com/en-us/documentation/articles/service-bus-azure-and-service-bus-queues-compared-contrasted/

## Containers
Rancher. Private container service and Linux distro for Docker: http://rancher.com/

## Background Tasks in ASP.NET
Great summary from shanselman: http://www.hanselman.com/blog/HowToRunBackgroundTasksInASPNET.aspx
Haacked on some of the challenges and how to overcome them: http://haacked.com/archive/2011/10/16/the-dangers-of-implementing-recurring-background-tasks-in-asp-net.aspx/
Almost exactly how I would want a SignalR notifier to work: https://blog.mariusschulz.com/2014/05/07/scheduling-background-jobs-from-an-asp-net-application-in-net-4-5-2
Hangfire offers storage backed solution with management portal: http://hangfire.io/


## Signal R
Signal R 2 is built on OWIN. Selfhosting tutorial: http://www.asp.net/signalr/overview/deployment/tutorial-signalr-self-host