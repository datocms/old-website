---
title: Gitlab + S3/Surge
---

# Gitlab Pages

[Gitlab](https://gitlab.com) is a great Git repository manager with a built-in CI/CD system. It recently released Github Pages, a super-simple way to deploy static pages within the system.

### Configuring Gitlab CI

Please refer to the [Gitlab Pages documentation page](https://pages.gitlab.io/).

### Configuring Gitlab Triggers/Webhooks

In your Gitlab project repository, 

* Go to **Settings > Triggers** and click on **Add Trigger**. Then copy the trigger URL (e.g. `https://gitlab.com/api/v3/projects/12345678/trigger/builds`) and the trigger token (e.g. `1ee351fbc97a373b37f3a1e86b4bf1`) in your site settings, and save the site.
* Go to **Settings > Webhooks**. Copy the Notification Webhook URL from your site settings page and paste it in the **URL** field. Check the **Build events** option and hit *Add Webhook*.

