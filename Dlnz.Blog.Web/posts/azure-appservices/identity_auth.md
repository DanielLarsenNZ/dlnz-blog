# Authentication and Identity

App Service supports five identity providers out of the box: Azure Active Directory, Facebook, Google, Microsoft Account, and Twitter.

> **How authentication works in Azure App Services**. This is an excellent article with information and links for many auth scenarios in Azure App Services -
[https://azure.microsoft.com/en-gb/documentation/articles/app-service-authentication-overview/](https://azure.microsoft.com/en-gb/documentation/articles/app-service-authentication-overview/)

Service to Service auth can be accomplished using a (AAD) Service Principal.

> **Service principal authentication for API Apps in Azure App Service**. Create a
Service Principal user in AAD. Use ADAL to get a bearer token - 
[https://azure.microsoft.com/en-gb/documentation/articles/app-service-api-dotnet-service-principal-auth/](https://azure.microsoft.com/en-gb/documentation/articles/app-service-api-dotnet-service-principal-auth/)

You can also use TLS (Client certs) or Basic Auth (Authentication Filters).

> How To Configure TLS Mutual Authentication for Web App - [https://azure.microsoft.com/en-gb/documentation/articles/app-service-web-configure-tls-mutual-auth/](https://azure.microsoft.com/en-gb/documentation/articles/app-service-web-configure-tls-mutual-auth/)

> Authentication Filters in ASP.NET Web API 2 - [http://www.asp.net/web-api/overview/security/authentication-filters](http://www.asp.net/web-api/overview/security/authentication-filters)

There are special instructions for securing APIs that are to be consumed by
Logic Apps.

> Using your custom API hosted on App Service with Logic apps - [https://azure.microsoft.com/en-gb/documentation/articles/app-service-logic-custom-hosted-api/](https://azure.microsoft.com/en-gb/documentation/articles/app-service-logic-custom-hosted-api/)

