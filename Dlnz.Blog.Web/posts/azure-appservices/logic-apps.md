# Microsoft Azure Logic Apps

> Microsoft Azure Certified: <https://azure.microsoft.com/en-us/marketplace/programs/certified/>

> Community APIs: <https://github.com/logicappsio>

> Workflow Actions and Triggers: <https://msdn.microsoft.com/library/azure/mt643939.aspx>

> Sample REST Request for Basic Authentication: <https://azure.microsoft.com/en-us/documentation/articles/scheduler-outbound-authentication/#sample-rest-request-for-basic-authentication>

> Build and Deploy Logic Apps in Visual Studio: <https://azure.microsoft.com/en-us/documentation/articles/app-service-logic-deploy-from-vs/>

> Azure Logic App PowerShel Cmdlets: <https://msdn.microsoft.com/en-us/library/mt652195.aspx>



## Azure Resource Group Project

Use a Resource Group Project in Visual Studio to author a Logic App.

* Install latest Update Visual Studio
* Install Azure SDK for Visual Studio
* Install Azure Logic Apps extension.

You can get the trigger URL for the Logic App with this code:

```json
"outputs": {
     "triggerURI": {
            "type": "string",
            "value": "[listCallbackURL(concat(resourceId('Microsoft.Logic/workflows/', parameters('logicAppName')), '/triggers/manual'), '2016-06-01').value]"
       }
}
```

> See the full example: <https://github.com/Azure/azure-quickstart-templates/blob/master/101-logic-app-sendgrid/azuredeploy.json>
