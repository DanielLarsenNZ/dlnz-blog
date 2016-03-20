# Azure Resource Groups and the Azure Resource Manager

* https://azure.microsoft.com/en-us/documentation/articles/virtual-machines-size-specs/ - good summary of VM Sizes.


> You need Azure PowerShell 1.0. Install from https://azure.microsoft.com/en-us/blog/azps-1-0/

Deploy an application with Azure Resource Manager template: https://azure.microsoft.com/en-us/documentation/articles/resource-group-template-deploy/
Another good summary of templates: https://azurestack.eu/2015/06/azure-resource-manager-templates-json/

Scripted installation using ARM https://azure.microsoft.com/en-us/documentation/articles/virtual-machines-ps-create-preconfigure-windows-resource-manager-vms/

TeamCity guidance: http://www.markermetro.com/2015/02/technical/team-city-with-azure-virtual-machines/

RM VMs cannot be backed up using Azure Backup (yet) so are best used for immutable infrastructure.
https://feedback.azure.com/forums/258995-azure-backup-and-scdpm/suggestions/8369907-azure-backup-to-support-iaas-vm-v2?page=2&per_page=20


## Starting an Azure VM with the Azure CLI
> https://azure.microsoft.com/en-us/documentation/articles/virtual-machines-deploy-rmtemplates-azure-cli/#start-a-virtual-machine

1. Install or upgrade to the latest version of the Azure CLI
1. Login
1. Set the subscription
1. Switch to ARM mode
1. Start the VM

```powershell
# install/upgrade
npm install azure-cli -g
npm upgrade azure-cli -g

# login, set sub, config ARM
azure login
azure account set f90cf276-e272-48e2-901a-e3a01b9fbf27
azure config mode arm

# start the VM
azure vm start TeamCity teamcity05

```

## Stop / Start VM with Azure Automation
> Using a Microsoft account as credentials won't work. Create an Automation AD User especially for the purpose, 
> make it a co-administrator, and use that account. (Must log in and change password).


## App Services and Cloud Services
Great overview of the fundamentals: https://azure.microsoft.com/en-us/documentation/articles/fundamentals-application-models/
