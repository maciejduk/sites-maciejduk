This is the Wiki for set of tools used for Service Now Service Catalog automation.

Tools covered by this repository
---

- Ansible Tower
- Azure Function App

Main Contributors
---

- Maciej Dzierzanowski [@maciejduk](https://github.com/maciejduk)
- Irwin Strachan [@Irwins](https://github.com/irwins)
- Alasdair Wilmot [@Alasdair97](https://github.com/Alasdair97)
- Alex Etches [@AlexEtches](https://github.com/AlexEtches)
- Antonio Stella [@astella-insight](https://github.com/astella-insight)
- Ben Halliwell [@bhalliwell1](https://github.com/bhalliwell1)
- Connor Scourfield [@scourf](https://github.com/scourf)
- Jonathan Chan [@jonochan](https://github.com/jonochan)
- Kieran Thompson [@KierDean](https://github.com/KierDean)
- Lynn Raper [@LRaper-Insight](https://github.com/LRaper-Insight)
- Matthew Bieda [@MatthewBieda](https://github.com/MatthewBieda)
- Melissa Bence [@Mbence39](https://github.com/Mbence39)
- Joshua Hampson [@Joshua-Hampson-Insight](https://github.com/Joshua-Hampson-Insight)

# ServiceNow Process Flow

## NEW

![ServiceNowFlow-LogicDiagram-WhiteBG](https://github.com/Insight-EMEA/ip-ansible-servicenow/assets/97241456/3d83c539-ff0c-4ada-8fcc-74e1c3df7f50)

## OLD
<img width="1129" alt="image" src="https://user-images.githubusercontent.com/97241456/206220710-375be7f3-441b-4506-90fc-f6a907d4690a.png">

When User Raises Request
---

`REQ` is created for every request from a customer. It's like a basket. Each form they complete is an item in this basket - `RITM` - Requested ITeM - These are created for all requests.
 
When Automation Succeeds
---

Now if the automation succeeded, then `RITM` is `Closed Complete`.
 
When Automation Fails
---

If automation fails, it creates `SCTASK` (Service Catalog Task) for manual fulfilment under the `RITM` into the `CO - Engineering` queue.
Additionally, an `INC` (Incident) is created and assigned to `Managed Services - Automation` team for investigation (managed by me & SRE)

Other notes
---

Once someone completed the work associated with the request, they should close their `SCTASK`. This should trigger another Service Now internal flow, that closes `RITM` and `REQ` (but its flakey).
 
If at any point one of us takes over and wants to run (or rerun) automation with production details (such as the ones from `RITM` ticket), then we would take ownership of `REQ/RITM/SCTASK` (all 3 tickets!!!) as well as `INC` and close them with relevant notes when appropriate.

List of Incident automations and common errors (Tracker)

| Catalog Item Name                          | Main Playbook                       | Common Error | Reassign to Team | Reason |
|--------------------------------------------|-------------------------------------|-------------| ----------------- | ------ |
| Add Private Endpoint, <br /> Add App Service VNet Integration, <br /> Request JIT activation on VM | add-private-endpoint.yml, <br /> add-appservice-vnet-integration.yml, <br /> just-in-time-access.yml | Content Returned: No Vnet available for a new subnet.", "Message Returned: Status code was 500 and not [200]:HTTP Error 500: Internal Server Error", "Return Code: 500" | Consulting | Technical Assistance | 
| Add Private Endpoint | add-private-endpoint.yml | Status code was 204 and not [200]: OK (unknown bytes)", "Return Code: 204" | Consulting | Technical Assistance |
| Add App Service VNet Integration | add-appservice-vnet-integration.yml | The App must be migrated to a /28 subnet due to new Microsoft practices.", "Message Returned: Status code was 500 and not [200]: HTTP Error 500: Internal Server Error", "Return Code: 500 | Consulting | Technical Assistance |
| Automation Failure: Create Azure VM (New-Automated) | create-vm-findvnet.yml | "msg": "Unable to identify an active virtual network for region X" | Consulting<sup>1</sup> | Technical Assistance<sup>1</sup> |

<details>
<summary><sup>1</sup>Common error msg=Unable to identify an active virtual network for region X</summary>
<pre>

First check on RITM to identfy the RG and Subscription.  Search Azure Portal using @extenalat.cop email address and 
check if VNet is available in that subscription/region.  If not then post a comment on the work notes like below and 
assign to the Consulting Team and Teddy Dubois directly.

![image](https://github.com/Insight-EMEA/ip-ansible-servicenow/assets/108263296/93a7fdfd-20d0-4d04-9bdc-fe4a8d510c21)

If there is a VNet available in that subscription and region then check the tagging for it, as there is a chance the 
tagging may be incorrect and will need to be altered.  If this is the case, assign to Consulting team and Teddy Dubois 
with no need to update work notes. 

Some incidents coming through have just had the tagging updated so they can be resolved using 
"solved remotely(permenantly)".  In the resolved please input the information shown below once the correct tagging is 
found to exist.
 
![image](https://github.com/Insight-EMEA/ip-ansible-servicenow/assets/108263296/671aa137-ae7d-474f-a5cc-ee93dd0c2332)

</pre>
</details>


# List of Automation Items (Tracker)

All Automations use the `Ansible Tower Job Execution Flow` Unless otherwise stated.

| Catalog Item Name                          | Main Playbook                               | Phase      | Category or Link to AB                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Create Azure VM (New-Automated)<sup>2,M</sup>          | create-vm-findvnet.yml                      | Production | [Virtual Machine](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=a6870757974f8190a456bfc3f153affa&sysparm_category=038e909387737014db791fc83cbb35ab)       |
| Give Access to Azure Subscription<sup>3</sup>          | rbac-approval.yml                           | Production | [Identity](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=0c21a79887e181906b46ea030cbb358e&sysparm_category=8be394f287637050db791fc83cbb3520)              |
| Give Access to Azure Resource Group<sup>3</sup>        | rbac-approval.yml                           | Production | [Identity](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=e607ef7f8761c1104aa742690cbb35ac&sysparm_category=8be394f287637050db791fc83cbb3520)              |
| Give Access to Azure Resource<sup>3</sup>              | rbac-approval.yml                           | Production | [Identity](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=5b0304ae4771055042af6d72e36d43a0&sysparm_category=8be394f287637050db791fc83cbb3520)              |
| Add Private Endpoint<sup>M</sup>                     | add-private-endpoint.yml                    | Production | [Network](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=f10b7e1897bf4d1c1ee0b6efe153af77&sysparm_category=47c087d487f3f49092761fc73cbb3537)               |
| Add App Service VNet Integration<sup>M</sup>         | add-appservice-vnet-integration.yml         | Production | [Network](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=8b762e1c973b4d1c1ee0b6efe153afab&sysparm_category=47c087d487f3f49092761fc73cbb3537)               |
| Create/Change/Remove Azure AD Normal Group<sup>3</sup> | ad-group.yml                                | Production | [Identity](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=b2dd3c4e97f34950a456bfc3f153afe8&sysparm_category=8be394f287637050db791fc83cbb3520)              |
| Request JIT activation on VM               | just-in-time-access.yml                     | Production | [Virtual Machine](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=2b1da76497d0d514369438d3f153afe0&sysparm_category=038e909387737014db791fc83cbb35ab)       |
| Tag VM for Auto Start & Stop               | vm-tag-startstop.yml                        | Production | [Virtual Machine](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=8390aaf387205dd8768fdd773cbb3518&sysparm_category=038e909387737014db791fc83cbb35ab)       |
| Remove Azure VM (New-Automated)<sup>3,M</sup>          | remove-vm.yml                               | Production | [Virtual Machine](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=69b5be87973191d4a456bfc3f153af60&sysparm_category=038e909387737014db791fc83cbb35ab)       |
| W365 Add/Remove user (Individual Request)<sup>3</sup>  | w365-automation.yml                         | Production | [Azure Virtual Desktop](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=69ad962487b65550768fdd773cbb3513&sysparm_category=f2b4a0d687d33050db791fc83cbb3502) |
| Add/Change/Remove Azure AD Role<sup>3,M</sup>          | ad-role.yml                                 | Production | [Identity](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=5ca64761970e15501ee0b6efe153af0a&sysparm_category=8be394f287637050db791fc83cbb3520)              |
| Remove Orphaned Disk<sup>3</sup>                       | unmounted-disk-actions.yml                  | Testing    | [Virtual Machine](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=cb12694f8777519c768fdd773cbb35ab&sysparm_category=038e909387737014db791fc83cbb35ab)       |
| Create Storage Account                     | azure/create-storage-account.yml            | Testing    | [AZ Board](https://dev.azure.com/Insight-EMEA-Services/SRE/_workitems/edit/1063)                                                                                               |
| AD Group - Change Owner/AD Group name<sup>3</sup>      | ad-group-actions.yml                        | Testing    | [AZ Board](https://dev.azure.com/Insight-EMEA-Services/SRE/_sprints/taskboard/SRE%20Team/SRE/Sprint%207?workitem=1068)                                                         |
| Grant Admin Access to VM                   | qad/add-user-to-group.yml                   | Testing    | [AZ Board](https://dev.azure.com/Insight-EMEA-Services/SRE/_sprints/taskboard/SRE%20Team/SRE/Sprint%207?workitem=852)                                                          |
| Create AVD Platform                        | avd-automation.yml                          | On Hold    | [Managed PaaS](https://services-emea.insight.com/atlascopco?id=sc_cat_item&sys_id=a9cb05ea973d2d50a456bfc3f153af37&sysparm_category=2526cabd8704c950db791fc83cbb355d)          |
| Create IM-MGMT Tenant Accounts<sup>3</sup>             | create-ims-mgmt-tenant-account-creation.yml | Backlog    | [AZ Board](https://dev.azure.com/Insight-EMEA-Services/SRE/_sprints/taskboard/SRE%20Team/SRE/Sprint%207?workitem=773)                                                          |
| W365 Add/Remove user (Bulk Request)        | w365-automation.yml                         | Backlog    | N/A                                                                                                                                                                            |

<details>
<summary><sup>2</sup> Uses `WC - Ansible Tower Job Execution Flow V2` Flow which Includes Post Setup tasks for Create VM</summary>
<pre>
Later flows do include the post setup tasks but have issues with the order in which the RITM state changes and make them unsuitable to use for create VM.
</pre>
</details>
<details>
<summary><sup>3</sup> Uses `AW - Ansible Tower Job Execution Flow V4` Flow for tasks that require approval</summary>
<pre>
Later flows do include the approval steps but currently have an issue where all jobs are immediately rejected or approved so therefore approval is not working in later flows.
</pre>
</details>
<details>
<summary><sup>M</sup> denotes a manual option exists on the CI</summary>
<pre>
Any automation with a <sup>M</sup> denotes a manual option exists on the CI for different reasons that does not trigger the automation and is completed with the regular manual process.
</pre>
</details>
