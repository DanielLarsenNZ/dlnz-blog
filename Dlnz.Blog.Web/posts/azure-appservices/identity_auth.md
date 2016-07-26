# Authentication and Identity

## Glossary

* **Security Token** – A serialized collection of claims about a user, signed with a crypto key to confirm the issuer, for example, JWT (JSON) and SAML (XML) 
* **Claims** – A collection of name/value pairs items describing a user (for example: email address, display name, and age) 
* **Security Token Server (STS)** – A web service capable of determining user identity (for example: via password credentials) and issuing a Security Token using an authentication/authorization protocol 
* **Authentication/Authorization** protocol – An agreed way of requesting, issuing, renewing or cancelling a Security Token, for example, WS-Federation, SAML-P, OAuth2 

## Overview

App Service supports five identity providers out of the box: Azure Active Directory, Facebook, Google, Microsoft Account, and Twitter.

It is important to understand the authentication flows and choose the correct one for your application.

> Authentication Scenarios for Azure AD - Application Types and Scenarios - [https://azure.microsoft.com/en-us/documentation/articles/active-directory-authentication-scenarios/#application-types-and-scenarios](https://azure.microsoft.com/en-us/documentation/articles/active-directory-authentication-scenarios/#application-types-and-scenarios)

> Active Directory Authentication Library for JavaScript (ADAL.JS) [https://github.com/AzureAD/azure-activedirectory-library-for-js/tree/dev](https://github.com/AzureAD/azure-activedirectory-library-for-js/tree/dev)


## OAuth
OAuth is an Authorization framework defined by [RFC 6749] that allows users to log in to third-party websites using their Microsoft, 
Twitter, Google, Twitter, Facebook or other provider credentials. Authorization takes place without
exposing the user's password to the third-party website. A website that supports OAuth does not need to provide
their own Authentication system, although many do. For example: Spotify allows you to login with your Spotify
credentials, or using Facebook credentials (OAuth).

> RFC 6749: The OAuth 2.0 Authorization Framework - [https://tools.ietf.org/html/rfc6749](https://tools.ietf.org/html/rfc6749)

In a simple OAuth flow, a user is authorized by an Authorization Server using their credentials 
(HTTP Basic Auth for example). The STS responds with a bearer token that is sent with subsequent requests to 
prove authorisation. Bearer tokens usually expire and can be refreshed.

One way to get a good understanding of the OAuth 2.0 flow may be to run through the workflow one step at a time
using a browser and [Postman](https://www.getpostman.com/) (for example). There are good step-by-step instructions with detailed explanations
in [Authorize access to web applications using OAuth 2.0 and Azure Active Directory](https://azure.microsoft.com/en-us/documentation/articles/active-directory-protocols-oauth-code/).
My supplementary notes are as follows:

### Create an API App:

1. Create an ASP.NET Azure API App and deploy it to Azure.
    1. Add an unauthentication endpoint, (e.g. `/api/heartbeat` or `/api/health`)
    1. Add an authenticated endpoint, (e.g. `/api/users`). Decorate the controller class with an `[Authorize]` attribute.

### Create an AD Tenant and configure Authentication/Authorization

1. Create an AD Tenant (if you don't have one already).
1. In the **Authentication/Authorization** blade:
    1. Turn **App Service Authentication** On.
    1. **Action to take when request is not authenticated** = **Allow request (no action)**
    1. Express configure the **Azure Active Directory** Authentication Provider. 

### Create Applications in the AD Tenant

1. Create two Applications in the AD Tenant: One for the "App" and one for the API. The App does not need to exist,
    you will simulate the APP using a Browser and Postman.
    1. The Redirect URLs can be anything (for now). Use localhost or a domain that you own for safety. However the URLs you choose
    must match the parameter in the authorize request.
1. In the App application, Add delegated permissions to the API application. (The Quickstart page tells you how and why).
1. In the App application, create a Key (`client_secret`). Be sure to save the key in your Password Safe before
    you leave the page.
1. In the App application, click **VIEW ENDPOINTS** and copy the **OAuth 2.0 Authorization Endpoint** and **OAuth 2.0 Token Endpoint** URLs.
1. Copy the **Client Id** of both Applications.

### Authorize

1. Follow the instructions in the article to construct a URL. It will look something like `https://login.microsoftonline.com/{tenancy_id}/oauth2/authorize?client_id={app_client_id}&response_type=code&redirect_uri={redirect_url_encoded}&response_mode=query&resource={api_client_id}`
1. Paste the constructed URL into a browser and go.
1. Copy the URL that the browser redirects to (after authenticating) and paste into Notepad.
1. Copy the value of the `code` query string value.

### Get a bearer Token

1. Open Postman and construct a POST request to the token endpoint, i.e. `https://login.microsoftonline.com/{tenant_id}/oauth2/token`
    1. `client_id` = the "App" Application Client ID.
    1. `code` = the code copied above.
    1. `resource` = the "API" Application Client Id.
    1. `client_secret` = the "App" Application key created above.
1. When you get a successful response, copy the value of the `access_token` in the response JSON body.

### Make an authorized request to the API

1. Construct a new GET request in Postman to the Authenticated endpoint of your API app (created above), e.g. `https://myapi.azurewebsites.net/api/Users`
1. Add an `Authorization` header. Set the value to `Bearer {bearer_token}`. "Bearer" is case sensitive and there must be
    exactly one space between it and the bearer token copied from `access_token` above. **Note:** you do not
    need to Base64 encode the token. Just paste it exactly as is.
1. Send the request. You should see a successful response.
1. If you still get a "Not authorized" response; in the Azure Portal:
    1. Turn on Diagnostics logs to the Verbose level.
    1. Open the Stream Logs console.
    1. Read the awesome debug info to find the problem. 

> Authorize access to web applications using OAuth 2.0 and Azure Active Directory - [https://azure.microsoft.com/en-us/documentation/articles/active-directory-protocols-oauth-code/](https://azure.microsoft.com/en-us/documentation/articles/active-directory-protocols-oauth-code/)

> Azure Active Directory developer's guide - [https://azure.microsoft.com/en-us/documentation/articles/active-directory-developers-guide/](https://azure.microsoft.com/en-us/documentation/articles/active-directory-developers-guide/)

> Protect a Web API using Bearer tokens from Azure AD - [https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-webapi-dotnet/](https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-webapi-dotnet/)


[RFC 6749]:https://tools.ietf.org/html/rfc6749



### In App Services

> How authentication works in Azure App Services - 
> [https://azure.microsoft.com/en-gb/documentation/articles/app-service-authentication-overview/](https://azure.microsoft.com/en-gb/documentation/articles/app-service-authentication-overview/)



Deferred authorization means that individual controllers / actions can be authorised
using the `[Authorization]` attribute.

"Your app can trigger the login flow by navigating the user to `/.auth/login/<provider>`
where `<provider>` is one of `aad`, `facebook`, `google`, `microsoftaccount`, and `twitter`. This option 
is perfect for sites featuring a login button and for many mobile applications.

"Alternatively, a client can obtain a token using a provider SDK and exchange it for a session token. 
Simply submit an HTTP POST to the same endpoint with the provider token in a JSON body under the 
key `“access_token”` (or `“authenticationToken”` for Microsoft Account). This is the preferred solution 
for mobile applications if a provider SDK is available on the platform, and it also works for many 
web and API applications.

"In fact, this support also means that App Service can allow headless authentications. If you have a 
daemon process or some other client needing access to APIs without an interface, you can request a 
token using an AAD service principal and use it for authentication with your application. In the case
of AAD, we even allow you to bypass the session token and just include AAD tokens in the Authorization
header, according to the bearer token specification.

> Expanding App Service Authentication/Authorization - [https://azure.microsoft.com/en-us/blog/announcing-app-service-authentication-authorization/](https://azure.microsoft.com/en-us/blog/announcing-app-service-authentication-authorization/)

> How to configure your App Service application to use Microsoft Account login - [https://azure.microsoft.com/en-us/documentation/articles/app-service-mobile-how-to-configure-microsoft-authentication/](https://azure.microsoft.com/en-us/documentation/articles/app-service-mobile-how-to-configure-microsoft-authentication/)

> How to configure your App Service application to use Azure Active Directory login - [https://azure.microsoft.com/en-us/documentation/articles/app-service-mobile-how-to-configure-active-directory-authentication/](https://azure.microsoft.com/en-us/documentation/articles/app-service-mobile-how-to-configure-active-directory-authentication/)

Service to Service auth can be accomplished using a (AAD) Service Principal. Create a Service Principal user in AAD. Use ADAL to get a bearer token. 

> Service principal authentication for API Apps in Azure App Service
[https://azure.microsoft.com/en-gb/documentation/articles/app-service-api-dotnet-service-principal-auth/](https://azure.microsoft.com/en-gb/documentation/articles/app-service-api-dotnet-service-principal-auth/)



You can also use TLS (Client certs) or Basic Auth (Authentication Filters).

> How To Configure TLS Mutual Authentication for Web App - [https://azure.microsoft.com/en-gb/documentation/articles/app-service-web-configure-tls-mutual-auth/](https://azure.microsoft.com/en-gb/documentation/articles/app-service-web-configure-tls-mutual-auth/)

> Authentication Filters in ASP.NET Web API 2 - [http://www.asp.net/web-api/overview/security/authentication-filters](http://www.asp.net/web-api/overview/security/authentication-filters)

There are special instructions for securing APIs that are to be consumed by
Logic Apps.

> Using your custom API hosted on App Service with Logic apps - [https://azure.microsoft.com/en-gb/documentation/articles/app-service-logic-custom-hosted-api/](https://azure.microsoft.com/en-gb/documentation/articles/app-service-logic-custom-hosted-api/)

