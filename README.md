## Pantry App

Pantry App is a hybrid mobile app for virtual consolidation of your cookbooks, pantry items, and grocery list. Pantry App is hosted on AWS Amplify.

### Installation

Clone the repository [here](https://github.com/swen-514-614-spring2021/term-project--team-5.git) or,
with the GitHub CLI:

```bash
gh repo clone swen-514-614-spring2021/term-project--team-5
```

Also, make sure you have these requirements:

- Environment setup
- Amplify setup
- Authentication setup

#### Environment Setup

Make sure that Node and Watchman are installed with

```bash
brew install node
brew install watchman
```

Make sure that Xcode's Command Line Tools are enabled in "Preferences..." from the Xcode menu. This option is found in
the "Locations" panel

Make sure CocoaPods is installed with

```bash
sudo gem install cocoapods
```

In the `ios` directory, run `pod install`

Next, install and configure the AWS CLI and the AWS Amplify CLI

Install the AWS CLI,

```bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

Make sure your credentials in `~/.aws/credentials` match your current account details.

Install the Amplify CLI,

```bash
npm install -g @aws-amplify/cli
```

In the root directory of the project run,

```bash
amplify init
```

Leave all defaults and for the AWS profile, use "default".

Now run,

```bash
amplify add auth
```

Choose the default configuration, but specify "Email" for the login method.
Then run,

```bash
amplify push
```

You are now configured with authentication through Amplify when you run the project.

Set Up Transcription

In order to set up transcription services you need to create a .env file at the root of your project with your aws educate account information. It should look like this:

```bash
AWS_ACCESS_KEY_ID=youraccesskey
AWS_SECRET_ACCESS_KEY=yoursecretkey
AWS_SESSION_TOKEN=yoursessiontoken
```

After you do this you then need to go to your aws console and create the stack for the cloudformation template found in `/CloudFormation/s3_cloudformation.yml`. You will have to name your two s3 instances, I recommend one with "input" and one with "output". Once the stack completes and you can verify your s3 buckets exist, add their names to your .env file, which should now look like this:

```bash
AWS_ACCESS_KEY_ID=youraccesskey
AWS_SECRET_ACCESS_KEY=yoursecretkey
AWS_SESSION_TOKEN=yoursessiontoken
S3_BUCKET_INPUT=inputbucketname
S3_BUCKET_OUTPUT=outputbucketname
```

Your transcription services should work properly from here!

### Usage

Running the React Native application

#### Start Metro

Metro "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and
its dependencies."
[—Metro Docs](https://facebook.github.io/metro/docs/concepts/)

```bash
npx react-native start
```

#### Start the application

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder.

```bash
npx react-native run-ios
```

### Contributing

In development by:
[Rachael Daly](https://github.com/RachaelDaly),
[Kelley Lam](https://github.com/kxl1360),
and [Henry Larson](https://github.com/hxl1116)

Add an issue to the project
[board](https://github.com/swen-514-614-spring2021/term-project--team-5/projects/1)
or story card to the Trello
[board](https://trello.com/b/ZunSFauw/kanban-template)
