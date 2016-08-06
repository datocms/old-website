---
title: Gitlab + S3/Surge
---

# Gitlab + S3/Surge

[Gitlab](https://gitlab.com) is a great Git repository manager with a built-in CI/CD system. Just sign up, create a Git repo, and configure the `.gitlab-ci.yml` file so that:

1. it will run the build command specific to the static website generator you chose;
2. uploads the static pages to your preferred CDN.

### Configuring Gitlab CI

Just as an example, this could be your `.gitlab-ci.yml` in case your're using [Middleman](http://middlemanapp.com) and you want to deploy your site to Amazon S3 using the [`s3_website` gem](https://github.com/laurilehmijoki/s3_website):

```yml
build:
  only:
    - master
  script:
    - bundle install --quiet --path /cache
    - bundle exec middleman build
    - bundle exec s3_website push
```

This could be the `.gitlab-ci.yml` of a [Hugo](https://gohugo.io/) website deployed to [Surge CDN](https://surge.sh/):

```yml
build:
  only:
    - master
  script:
    - hugo
    - npm install surge
    - ./node_modules/.bin/surge
```

### Configuring Gitlab Triggers/Webhooks

In your Gitlab project repository, 

* Go to **Settings > Triggers** and click on **Add Trigger**. Then copy the trigger URL (e.g. `https://gitlab.com/api/v3/projects/12345678/trigger/builds`) and the trigger token (e.g. `1ee351fbc97a373b37f3a1e86b4bf1`) in your Site settings, and save the Site.
* Go to **Settings > Webhooks**. Copy the Notification Webhook URL from your Site settings page and paste it in the **URL** field. Check the **Build events** option and hit *Add Webhook*.

