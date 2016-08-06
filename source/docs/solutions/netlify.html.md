---
title: Github/Bitbucket + Netlify
---

# Github/Bitbucket + Netlify

Netlify is a super-easy service that lets you build and host your static website in a couple of simple step and almost no configuration. Please refer to the [Netlify docs](https://www.netlify.com/docs) to learn how you can publish your static website with their service.

## Configuring DatoCMS integration

In your Netlify site project, 

* Search the **Webhooks** section, click **Edit**, insert "DatoCMS" as the title and hit **Add hook**. Copy the generated URL into your Site settings.
* Visit the **Notifications** tab, go to the **When your site is deployed** section, click **Edit**, then select **Configure a new deploy notification > Webhook** and paste the **Notification Webhook URL** present your Site settings page.
* Visit the **Notifications** tab, go to the **When a build fails** section, click **Edit**, then select **Configure a new deploy notification > Webhook** and paste the **Notification Webhook URL** present your Site settings page.

