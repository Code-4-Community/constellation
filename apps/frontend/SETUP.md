# frontend

## set-up

The frontend uses AWS Amplify and AWS Cognito for authentication. If you want to access authenticated resources, you'll have to:

1. Obtain access to the C4C AWS account - create an access key and secret access key for yourself to use with the AWS CLI.
2. Create a user for yourself in the AWS Cognito userpool `constellation-userpool`.
3. Install the [AWS Amplify CLI](https://docs.amplify.aws/cli/start/install/) on your machine.
4. Run `amplify pull` in the root directory of the project. If prompted, use the following configuration options:

Select the authentication method you want to use: AWS access keys
accessKeyId:  **YOUR ACCESS KEY ID**
secretAccessKey: **YOUR SECRET ACCESS KEY**
region: `us-east-1`
Which app are you working on? **SOMETHING CONSTELLATION**
Backend environment 'dev' found. Initializing...
Choose your default editor: `Visual Studio Code`
Choose the type of app that you're building `javascript`
Please tell us about your project
What javascript framework are you using `react`
Source Directory Path:  `apps/frontend/src`
Distribution Directory Path: **DEFAULT OPTION**
? Build Command:  **DEFAULT OPTION**
? Start Command: **DEFAULT OPTION**
? Do you plan on modifying this backend? `Yes`

5. After this, you should see the file `aws-exports.js` in `apps/frontend/src`.