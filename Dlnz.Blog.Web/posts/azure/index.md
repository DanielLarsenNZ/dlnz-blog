# Azure

## RBAC - Role Based Access Controls

### Auditing

* Logs all operations (all verbs except GET) and retains for 90 days. Max search window is 15 days.
* Search for _Activity Log_ in the Portal.

> Audit operations with Resource Manager: <https://azure.microsoft.com/en-us/documentation/articles/resource-group-audit/>

## Azure Automation

Stop a VM with three lines of PowerShell, a Runbook and a Schedule.

### PowerShell

```powershell
$servicePrincipalConnection = Get-AutomationConnection -Name "AzureRunAsConnection"
Add-AzureRmAccount -ServicePrincipal -TenantId $servicePrincipalConnection.TenantId `
    -ApplicationId $servicePrincipalConnection.ApplicationId `
    -CertificateThumbprint $servicePrincipalConnection.CertificateThumbprint
Stop-AzureRmVM -Force -Name 'its2016' -ResourceGroupName 'DansDevVM'
```

> Start and Stop Azure VM with Azure Automation: <https://www.arjancornelissen.nl/2016/07/11/start-and-stop-azure-vm-with-azure-automation/>
