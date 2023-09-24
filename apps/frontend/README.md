# Constellation Frontend

## Table of Contents

- [Set Up](#set-up)
- [Accessing the Site](#accessing-the-site)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Site Map](#site-map)

## Set Up

The frontend uses AWS Amplify and AWS Cognito for authentication. If you want to access authenticated resources, you'll have to:

1. Obtain access to the C4C AWS account - create an access key and secret access key for yourself to use with the AWS CLI.
2. Create a user for yourself in the AWS Cognito userpool `constellation-userpool`.
3. Install the [AWS Amplify CLI](https://docs.amplify.aws/cli/start/install/) on your machine.
4. Run `amplify pull` in the root directory of the project. If prompted, use the following configuration options: \
   Select the authentication method you want to use: AWS access keys \
   accessKeyId: **YOUR ACCESS KEY ID** \
   secretAccessKey: **YOUR SECRET ACCESS KEY** \
   region: `us-east-1` \
   Which app are you working on? ` CONSTELLATION` \
   Pick a backend environment: dev \
   Choose your default editor: `Visual Studio Code` \
   Choose the type of app that you're building: `javascript` \
   What javascript framework are you using: `react` \
   Source Directory Path:`apps/frontend/src`
   Distribution Directory Path: **DEFAULT OPTION** \
   Build Command: **DEFAULT OPTION** \
   Start Command: **DEFAULT OPTION** \
   Do you plan on modifying this backend?: `Yes`

5. After this, you should see the file `aws-exports.js` in `apps/frontend/src`.

6. In the future, checkout the dev amplify environment with: `amplify env checkout dev`

## Accessing the Site

The Constellation project is deployed to two separate environments. The dev environment is the one we can use to test features behind authenticated resources and upload test data.

The url for the dev environment is https://develop.d26ahfp227bhin.amplifyapp.com/

The prod environment is for use by the TSWGO organization and none of us have access to it.

The url for the prod environment is https://tswgo.c4cneu.com/

Do not upload test forms to the prod url.

## Running Locally

To run the frontend locally, from the root of the constellation directory, run:

```
nx serve frontend
```

To use a different backend stack than either dev or prod (e.g. a custom one from your personal aws account), replace the `BASE_URL` constant in `apps/frontend/src/constants/endpoints.ts` with the one listed in Api Gateway for your stack.

## Deployment

Merging into the main branch will redeploy the prod frontend autocmatically. At the moment, you also need to merge into the develop branch to redeploy the dev environment.

## Site Map

- `\` : Error page, with link to the form page
- `\form` : Page with the main form to be filled out. Accessible by everyone
- `\all-forms` : Page with a list of all forms. Authentication required.
