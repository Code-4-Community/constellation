# Constellation Backend

## Table of Contents

- [Overview](#overview)
- [Endpoints Reference](#endpoints-reference)
- [Deploy for Development](#deploy-for-development)
  - [Deploy to Personal AWS Account](#deploy-to-personal-aws-account-for-development)
  - [Syncing the stack](#syncing-the-stack)
  - [Cleanup](#cleanup)
- [Deploy Locally](#use-the-aws-sam-cli-to-build-and-test-locally)
- [Deploy for Prod and Dev](#deploy-for-prod-and-dev)
- [Add Resource](#add-a-resource-to-your-application)
- [Use Lambda Logs](#fetch-tail-and-filter-lambda-function-logs)
- [Testing](#unit-tests)
- [Additional Resources](#resources)

## Overview

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI). It includes the following files and folders:

- `src` - Code for the application's Lambda function.
- `events` - Invocation events that you can use to invoke the function.
- `__tests__` - Unit tests for the application code.
- `template.yaml` - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions, an API Gateway API, and Amazon QLDB. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

## Endpoints Reference

We currently have 5 endpoints:

- `/`
  - GET endpoint just returns "Hello world!"
- `/forms`
  - Get endpoint returns all forms in QLDB database
  - This is a restricted endpoint so Cognito authorization is required
- `/form/{id}`
  - Get endpoint returns the form with the given id
  - This is a restricted endpoint so Cognito authorization is required
  - Will return an empty array if no forms exist with given id.
- `/form`
  - POST endpoint to add a form to the QLDB table
  - Event body must match schema defined in `/backend/schema/schema.ts`
- `/form/{id}/notes`
  - PATCH method to update admin notes of given form
  - Event body must match `adminNoteSchema` defined in `/backend/schema/schema.ts`

## Deploy for Development

The AWS SAM CLI is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the AWS SAM CLI, you need the following tools:

- AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
- Node.js - [Install Node.js 18](https://nodejs.org/en/), including the npm package management tool.
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community) (optional, only if you want to try deploying locally but this doesn't work well with QLDB)

### Deploy to Personal AWS Account for development

When working on the backend, the best way to test your work is to deploy the stack on your personal aws account.

> **_NOTE:_** Don't forget to delete the stack when you're finished working or you will be charged for the usage. \
> \
> It is also a good idea to set up pricing alerts in AWS.

First, create an access key for your personal aws account \
Run: `aws configure` \
Enter access key and secret access key when prompted

Now you have two choices:

1. To use the default dev configuration make sure you have a `samconfig.toml` file in the root of the backend folder with the following contents:

```
version = 0.1

[dev]
[dev.deploy]
[dev.deploy.parameters]
stack_name = "constellation-dev"
s3_prefix = "constellation-dev"
region = "us-east-1"
capabilities = "CAPABILITY_NAMED_IAM"
image_repositories = []
resolve_s3 = true
confirm_changeset = true
disable_rollback = true
parameter_overrides = "EnvName='dev', QldbLedgerName='constellation-dev', QldbDeletionProtection='false', QLDBSendCommandRoleName='QLDBSendCommandRole-dev', UserPoolArn='arn:aws:cognito-idp:us-east-1:489881683177:userpool/us-east-1_ItaXWUupj'"
```

Then run:

```
npm run build
sam deploy --config-env dev
```

2. The other option is to walk through setting up the configuration yourself, by running:

```bash
npm run build
sam deploy --guided --capabilities CAPABILITY_NAMED_IAM
```

The first command will build the source of your application. Since we're using TypeScript, we need to use a custom build command (defined in `package.json` instead of the built-in `sam build` command) in order to compile our TypeScript into JavaScript in `/dist`. The second command will package and deploy your application to AWS, with a series of prompts:

- **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
- **AWS Region**: The AWS region you want to deploy your app to.
- **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
- **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
- **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

The API Gateway endpoint API will be displayed in the outputs when the deployment is complete.

If you want to use this endpoint when running the frontend locally, replace the `BASE_URL` constant with it in `apps/frontend/src/constants/endpoints.ts`

### Syncing the stack

After you've deployed for the first time, you can run the command `sam sync --stack-name <STACK NAME>` to deploy local changes to the AWS Cloud. Use sync to build, package, and deploy changes to your development environment as you iterate on your application.

## Cleanup

To delete the sample application that you created, use the AWS CLI.

```bash
aws cloudformation delete-stack --region <REGION DEPLOYED> --stack-name <STACK NAME>
```

## Use the AWS SAM CLI to build and test locally

Build your application by using the `npm run build` command.

```bash
my-application$ npm run build
```

The AWS SAM CLI installs dependencies that are defined in `package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
my-application$ sam local invoke putItemFunction --event events/event-post-item.json
my-application$ sam local invoke getAllItemsFunction --event events/event-get-all-items.json
```

The AWS SAM CLI can also emulate your application's API. Use the `sam local start-api` command to run the API locally on port 3000.

```bash
my-application$ sam local start-api
my-application$ curl http://localhost:3000/
```

The AWS SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
Events:
  Api:
    Type: Api
    Properties:
      Path: /
      Method: GET
```

## Deploy for Prod and Dev

Since the prod stacks are already deployed, the only command need should be to sync the stacks with the appropriate branches.

Dev:

```
git checkout develop
npm run build
sam sync --stack-name constellation-dev
```

Prod:

```
git checkout main
npm run build
sam sync --stack-name constellation-prod
```

In the event the branches need to be redeployed:

Dev:

```
git checkout develop
npm run build
sam deploy --config-env prod
```

Prod:

```
git checkout develop
npm run build
sam deploy --config-env dev
```

## Add a resource to your application

The application template uses AWS SAM to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources, such as functions, triggers, and APIs. For resources that aren't included in the [AWS SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use the standard [AWS CloudFormation resource types](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html).

Update `template.yaml` to add a dead-letter queue to your application. In the **Resources** section, add a resource named **MyQueue** with the type **AWS::SQS::Queue**. Then add a property to the **AWS::Serverless::Function** resource named **DeadLetterQueue** that targets the queue's Amazon Resource Name (ARN), and a policy that grants the function permission to access the queue.

```
Resources:
  MyQueue:
    Type: AWS::SQS::Queue
  getAllItemsFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/handlers/get-all-items.getAllItemsHandler
      Runtime: nodejs18.x
      DeadLetterQueue:
        Type: SQS
        TargetArn: !GetAtt MyQueue.Arn
      Policies:
        - SQSSendMessagePolicy:
            QueueName: !GetAtt MyQueue.QueueName
```

The dead-letter queue is a location for Lambda to send events that could not be processed. It's only used if you invoke your function asynchronously, but it's useful here to show how you can modify your application's resources and function configuration.

Deploy the updated application.

```bash
my-application$ sam deploy
```

Open the [**Applications**](https://console.aws.amazon.com/lambda/home#/applications) page of the Lambda console, and choose your application. When the deployment completes, view the application resources on the **Overview** tab to see the new resource. Then, choose the function to see the updated configuration that specifies the dead-letter queue.

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, the AWS SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs that are generated by your Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

**NOTE:** This command works for all Lambda functions, not just the ones you deploy using AWS SAM.

```bash
my-application$ sam logs -n putItemFunction --stack-name sam-app --tail
```

**NOTE:** This uses the logical name of the function within the stack. This is the correct name to use when searching logs inside an AWS Lambda function within a CloudFormation stack, even if the deployed function name varies due to CloudFormation's unique resource name generation.

You can find more information and examples about filtering Lambda function logs in the [AWS SAM CLI documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `__tests__` folder in this project. Use `npm` to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
my-application$ npm install
my-application$ npm run test
```

## Resources

For an introduction to the AWS SAM specification, the AWS SAM CLI, and serverless application concepts, see the [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).

Next, you can use the AWS Serverless Application Repository to deploy ready-to-use apps that go beyond Hello World samples and learn how authors developed their applications. For more information, see the [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/) and the [AWS Serverless Application Repository Developer Guide](https://docs.aws.amazon.com/serverlessrepo/latest/devguide/what-is-serverlessrepo.html).

### AWS Account Setup Steps (for new account)

1. [Enabled IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/getting-started.html)

2. [Configure AWS CLI to use AWS IAM Identity Center](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html#sso-configure-profile-token-auto)

3. [Install AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
