page_title: What is Shippable?
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

# What is Shippable?

Shippable was founded so that software powered organizations could accelerate innovation. We enable this by providing an integrated platform, built from the ground up, to defragment and streamline the process of shipping applications. Using Shippable, you can automate your software delivery from source control to production, without needing to write complex, imperative code.

Today, most organizations find it challenging to innovate fast enough to satisfy consumers. DevOps is a set of principles that tries to solve this problem. One of these principles is automation of your software delivery pipelines, also called Continuous Deployment.

The picture below shows a high level maturity model for Continuous Deployment.

<img src="pipelines/images/cdMaturityModel.png" alt="Shippable Continuous Integration and Delivery" style="width:800px;"/>

Most organizations today are at L1 or L2 of this maturity model, i.e. they have a CI server that runs unit tests and packaging for every code commit. Some have the capability to deploy to one endpoint as part of their CI. However, this does not address the flow of that service or application through various test environments and ultimately to production.

Organizations that have achieved L3 or L4 have put in significant time and resources in order to get there, mostly through struggling with cobbling together a bunch of fragmented tools and writing thousands of lines of custom scripts to create their continuous deployment pipelines. Once created, these custom, homegrown pipelines are rigid, inflexible and hard to maintain. Regardless of the effort, several successful companies like Facebook, Netflix, Amazon have invested in building these pipelines.

However, not every organization has the luxury of having entire in-house teams to manage this process. Not just that, this do-it-yourself approach is a distraction and takes valuable cycles away from product engineering  

**Shippable helps you mature from L1 to L4 at your own pace, without needing to build homegrown pipelines.** Our pipelines are configured in a human readable, declarative language, making it very easy to create and update your release workflows. We offer the only integrated platform that address Continuous Integration (CI) and Application Release Automation (ARA) for a complete end to end solution.

We integrate with the tools and technologies you use today and will need tomorrow, across source control providers, artifact repositories, notification providers, and cloud endpoints. Our platform supports enterprise grade multi-tier applications (e.g. Java applications), as well as modern applications with containerized microservices.

If you believe that your team should focus on product innovation instead of building complex deployment pipelines, you should sign up for Shippable today.

The Shippable platform consists of 2 parts:

**Continuous Integration (CI)**, which enables teams to build and test their repositories for every code commit or pull request and get instant feedback.

**Continuous deployment pipelines** which automate the flow of your application from source control to production. Using these deployment pipelines, you can easily deploy containerized applications to Container Services like Amazon's ECS, Google Container Engine (GKE), Joyent Triton, and Microsoft Azure Container Service (ACS).

---

## Continuous Integration
Our Continuous Integration platform helps developers find bugs as soon as they are introduced. Every time you commit code or open a pull request, your code will be automatically built and tested and you will receive a notification with build results.

We run all your builds on **minions**, which are Docker-based containers. If you're using Docker for development, you can use your own Docker images or even build a Docker image and run builds in the container as part of your CI workflow. For customers who are not using Docker for their development, we provide a variety of images for each language that are pre-loaded with popular services and tools.

You should use Shippable for Continuous Integration if you fit the following profile -

* Your source code is on GitHub, GitHub Enterprise, Bitbucket, Bitbucket Server or GitLab
* You want to avoid the time sink of setting up and managing your own CI system and would rather spend the time writing features for your product   
* (optional)You're a Docker user and you want to use your own custom image to run your builds. You can even run Docker compose to spin up environments!

Some customers are not comfortable or for some reason cannot run builds on our hosted infrastructure. To address this, we offer an additional feature called BYOH where you can run builds on your own infrastructure.

Go to [the Continuous Integration section](/ci/overview/) to learn more.

---

## Continuous Delivery pipelines

Our powerful deployment pipelines give software development teams the ability to automate the flow of their Docker based applications from CI to a versioned deployment unit called manifest which can then be easily and automatically deployed to Container Services like Amazon's ECS or Google Container Engine.

Go to [the Continuous Deployment section](/pipelines/overview/) to learn more.

---
