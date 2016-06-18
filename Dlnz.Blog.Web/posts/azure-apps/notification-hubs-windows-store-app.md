# Getting started with Notification Hubs for Windows Store Apps

https://azure.microsoft.com/en-us/documentation/articles/notification-hubs-windows-store-dotnet-get-started/

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
