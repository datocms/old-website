---
title: Integrating DatoCMS with Okta
---

This guide provides the steps required to configure provisioning for DatoCMS, and includes the following sections:

* Features
* Prerequisites
* Configuration Steps
* Troubleshooting Tips

### Features

Automatic User Provisioning is supported for the DatoCMS application.

This enables Okta to:

* Add new users to DatoCMS
* Update select fields in users’ profile information in DatoCMS
* Deactivate users in DatoCMS
* Push groups and membership to DatoCMS

The following provisioning features are supported:

* **Push New Users** - Creating a new user in Okta and assigning them to the DatoCMS application will create a new user in DatoCMS.
* **Push Profile Updates** - Updates to a user in Okta will be pushed to DatoCMS.
* **Push User Deactivation** - Deactivating the user or disabling the user's access to DatoCMS within OKTA will deactivate the user in DatoCMS.
* **Import New Users** - Users created in DatoCMS can be pulled into Okta and turned into new AppUser objects for matching against existing Okta users.
* **Push Groups** - Groups created in Okta can be pushed to DatoCMS. Attributes pushed include name and group members.
* **Pull Groups** - Groups created in DatoCMS can be pulled into Okta for reference within Okta.
* **Delete Groups** - Groups deleted or removed from the DatoCMS application within Okta will be deleted within DatoCMS.

### Configuration Steps

Switch your Okta dashboard to *Admin mode* by clicking the button in the upper right corner:

![Switch to admin](../../images/okta/1-admin-mode.png)

Then select *Applications* and click *Add Application*:

![Add application](../../images/okta/2-add-application.png)

On the new page press search for **Scim 2.0 Test App (OAuth Bearer Token)**:

![Add application](../../images/okta/3-select-scim-2.png)

A new screen will appear. Give the new app a name and press *Next*:

![First step](../../images/okta/4-1-create-step.png)

In the next *Sign-On Options* screen select **SAML 2.0** as the Sign-On method (no Relay state is required), set **Application username format** to **Email** and press *Done*:

![Second step](../../images/okta/4-2-create-step.png)

Now enter the *Provisioning* tab and click the *Configure API Integration* button:

![First step](../../images/okta/5-1-provisioning.png)

Insert the **SCIM 2.0 Base URL** and **OAuth Bearer Token** parameters from the *SSO Settings* section of your DatoCMS project:

Click the *Test API Credentials* button and check that your credentials were verified successfully.

![Second step](../../images/okta/5-2-provisioning.png)
