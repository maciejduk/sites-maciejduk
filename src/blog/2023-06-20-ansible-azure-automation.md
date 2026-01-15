---
title: "Automating Azure Infrastructure with Ansible"
description: "Award-winning Ansible Automation Platform that handles 90% of customer Azure requests - voted Best Partner Session at Red Hat Tech Exchange."
date: 2023-06-20
achievement: true
order: 3
tags:
  - ansible
  - azure
  - automation
  - red-hat
  - award
---

In this post, I'll share my experience building an **Ansible Automation Platform** that revolutionized how we handle Azure infrastructure requests. This solution was presented at **Red Hat Tech Exchange** and voted **Best Partner Session** by attendees.

[View the LinkedIn post →](https://www.linkedin.com/feed/update/urn:li:activity:7027282588260016128)

## The Challenge

Our team was overwhelmed with repetitive Azure-related requests:
- VM provisioning
- Network configuration
- Storage management
- Access control changes

## The Solution

I built and managed an **Ansible Automation Platform** integrated with **ServiceNow** to create a self-service portal for Azure infrastructure. We developed **custom scripts within ServiceNow** to communicate directly with the AAP API, eliminating the need for middleware.

Additionally, I created an **Azure Function App** to handle the approval workflow for requests requiring authorization outside of ServiceNow, secured with **Azure Entra ID** authentication.

### ServiceNow Integration Flow

When a user raises a request in ServiceNow:
1. A **REQ** (Request) is created as a container for all items
2. Each form submission creates an **RITM** (Requested Item)
3. Automation triggers the appropriate Ansible playbook
4. On success: RITM is closed automatically
5. On failure: A **SCTASK** is created for manual review and an **INC** (Incident) is raised for the SRE team

### Automated Catalog Items

The platform handles a wide range of Azure operations:

| Category | Automations |
|----------|-------------|
| **Virtual Machines** | Create VM, Remove VM, JIT Access, Auto Start/Stop Tags |
| **Identity & Access** | Subscription/Resource Group/Resource RBAC, AD Groups, AD Roles |
| **Networking** | Private Endpoints, App Service VNet Integration |
| **Virtual Desktop** | Windows 365 user provisioning |

## Results

- **90% automation rate** for Azure-related requests
- Reduced provisioning time from days to minutes
- Consistent, repeatable deployments
- Full audit trail for compliance
- Self-service portal reducing support burden
- Automatic incident creation for failed automations
