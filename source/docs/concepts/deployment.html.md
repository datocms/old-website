---
title: Deployment solutions
---

# Deployment solutions

A DatoCMS site is completely separated from your static frontend website. In order see any change in the data contained in your site reflected in the public website, a new build of the static website must be produced. This job is not performed directly by DatoCMS, but is delegated to an external Continuous Deployment service. This means that you have to link these two pieces toghether. Let's learn how.

### How it works?

1. Your users edit the website content within the DatoCMS site backend;
1. A warning sign notifies the user that some changes to the data has been made that has not yet been published to the public website;
1. When they're ready with their changes, they hit the "Publish" button. The warning sign becomes a loading spinner;
1. A new build is requested to the Continuous Deployment system, which already knows how to generate the static site and publish it somewhere on the Internet;
1. When the build completes, the Continuous Deployment system notifies DatoCMS about the status of the operation via webhooks;
1. The loading spinner becomes a green check! The publishing process has completed successfully, and the user can see their changes reflected on the public website!

<div class="space--both-5"><img src="/images/image.png" /></div>

### Supported Continuous Deployment solutions

Together with DatoCMS, you need other 3 pieces to complete the puzzle and enjoy your totally-static, serverless website:

* A **Git repository hosting service**: that's the place where your project code will be stored;
* A **Continuous Integration/Deployment service**: that's the buddy which knows how to build the final website static pages starting from the project repo;
* A **CDN**: that's the service that will host the static pages and deliver them to the final visitor.

There are plenty of services on the Internet that fullfill the above needs, all with slightly different features and pros/cons. We don't want to limit you with a specific solution, so you can actually decide your preferred combination.  these are the stacks we recommend the most:

* [Github/Bitbucket (Git) + Netlify (CI + CDN)](/docs/solutions/netlify.html)
* [Gitlab (Git + CI) + S3/Surge (CDN)](/docs/solutions/gitlab_s3_surge.html)
* [Gitlab Pages (Git + CI + CDN)](/docs/solutions/gitlab_pages.html)

We're working hard to add integrations with new services every month.. stay tuned!
