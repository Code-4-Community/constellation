## AWS Account Setup Steps (for new account)

1. [Enabled IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/getting-started.html)

2. [Configure AWS CLI to use AWS IAM Identity Center](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html#sso-configure-profile-token-auto)

3. [Install AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)


## Helpful commands
- `sam local start-api` - deploy locally (need Docker installed on your machine)
- `aws cloudformation delete-stack --region <REGION DEPLOYED> --stack-name <STACK NAME>` - destroy deployed stack
- `sam sync --stack-name` - deploys your local changes to the AWS Cloud. Use sync to build, package, and deploy changes to your development environment as you iterate on your application. 