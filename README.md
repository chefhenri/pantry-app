## Pantry App

Pantry App is a hybrid mobile app for virtual consolidation of your cookbooks, pantry items, and grocery list. Pantry App is hosted on AWS Amplify.

### Installation

Clone the repository [here](https://github.com/swen-514-614-spring2021/term-project--team-5.git) or,
with the GitHub CLI:

```bash
gh repo clone swen-514-614-spring2021/term-project--team-5
```

Next, follow the steps to complete the following:

- Environment setup
- AWS/Amplify setup
- Authentication setup
- Transcription setup
- DynamoDB setup  

### Environment Setup

Install Node, Watchman, and CocoaPods

```bash
brew install node
brew install watchman
sudo gem install cocoapods
```

In Xcode preferences, enable Command Line Tools under "Locations"

In the project root, run `yarn`

In the project `ios` directory, run `pod install`

### AWS/Amplify Setup
Install the AWS CLI,

```bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

Update your credentials in `~/.aws/credentials`

Install the Amplify CLI,

```bash
npm install -g @aws-amplify/cli
```

In the project root run,

```bash
amplify init
```

Leave all options default except:
- Specify 'src' to '/' to set the `aws-exports.js` file location
- Use "default" for the AWS profile

### Authentication Setup

Add Amplify auth with,

```bash
amplify add auth
```

Select the default configuration, but specify "Email" as the login method.

Push the configuration,

```bash
amplify push
```

### DynamoDB Setup

Run,

```bash
npm run setup:db
```
The necessary DynamoDB tables are now created on your AWS account.

Import the tables into Amplify,

```bash
amplify import storage
```

Select `DynamoDB table - NoSQL Database` and select one of the tables 
(`Food`,`Recipe`,`Transcription`)

Repeat for the remaining tables. 

Push the Amplify Storage configuration,

```bash
amplify push
```

### Transcription Setup

Add the following lines to an `.env` file in the project root,

```bash
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_SESSION_TOKEN=your_session_token
```

Create your input/output S3 buckets using the provided CloudFormation template: `CloudFormation/s3_cloudformation.yml`

Add the following lines to the `.env` file

```bash
S3_BUCKET_INPUT=input_bucket_name
S3_BUCKET_OUTPUT=output_bucket_name
```

### Usage
#### Start Metro

In a terminal instance run,

```bash
npx react-native start
```

*Note: after updating your AWS credentials in the `.env` file, run `npm run start:reset` to reset Metro's cache*

#### Start the application

In a new terminal instance run,

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
