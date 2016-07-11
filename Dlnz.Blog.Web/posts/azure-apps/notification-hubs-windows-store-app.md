# Getting started with Notification Hubs for Windows Store Apps

https://azure.microsoft.com/en-us/documentation/articles/notification-hubs-windows-store-dotnet-get-started/
https://azure.microsoft.com/en-us/documentation/articles/notification-hubs-windows-store-dotnet-send-breaking-news/

This article needs to be updated for Windows 10 + Visual Studio 2015.


## Where is **Toast capable**?
The article says to set the **Toast capable** setting to **Yes**. This setting no longer exists in the
designer for `Package.appxmanifest` and it appears that it is no longer required. I could successfully
send test Toast to the App without the setting.

BTW: The new Azure Portal has a nice Test notification feature. Be sure to select **Notification Type**
= **Toast** before setting the **Payload**. 


## Starting the App in Debug
I hit a couple of issues using Visual Studio 2015 on Windows 10...

If Deployment gets stuck on `Checking whether required frameworks are installed...`

* Run the Visual Studio 2015 installer and modify the installation to ensure that 
**Windows 10 SDK** is selected.
* Try unselecting the **Windows 10 emulator**.

If Deployment get stuck on `Registering the application to run from layout...`

Follow these steps _precisely_ from this [StackOverflow answer](http://stackoverflow.com/a/32014765):

> 1. Restart your computer.
> 2. Check that under **Settings > Update & security > For developer > Developer mode** is selected.
> 3. Open elevated PowerShell (as Administrator)
> 4. `PS> Get-WindowsDeveloperLicense`
> 5. `PS> shutdown /r /t 0` (to restart)
> 6. Start Visual Studio, Create a **New Project**, Built and Run on local machine.


## Registering from your App Backend
https://msdn.microsoft.com/library/azure/dn743807.aspx

Good sample code but you will notice when you paste into Universal Windows App
that the `httpClient.PostAsJsonAsync()` static method is not available. And
you can't reference or Nuget in `System.Net.Http.Formatting` because it is not
compiled for UWP. You need to implement your own Json Post by using Json.NET.

In the Package Manager Console (only the console worked for me):
```PowerShell
# Make sure the App Project is selected as the Default Project
Install-Package Newtonsoft.Json
```

The serialise the object to put yourself:

```csharp
private async Task<HttpStatusCode> UpdateRegistrationAsync(string regId, DeviceRegistration deviceRegistration)
{
    using (var httpClient = new HttpClient())
    {
        var putUri = new Uri(POST_URL + "/" + regId);
        var rego = JsonConvert.SerializeObject(deviceRegistration);
        var response = await httpClient.PutAsync(putUri, new HttpStringContent(rego, UnicodeEncoding.Utf8, "application/json"));
        return response.StatusCode;
    }
}
```



```
Install-Package WindowsAzure.Messaging.Managed
```