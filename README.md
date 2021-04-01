## Pantry App

Pantry App is a hybrid mobile app for virtual consolidation of your cookbooks, pantry items, and grocery list. Pantry App is hosted on AWS Amplify.

### Installation

Clone the repository [here](https://github.com/swen-514-614-spring2021/term-project--team-5.git) or,

with the GitHub CLI:

```bash
gh repo clone swen-514-614-spring2021/term-project--team-5
```

### Setup

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

Finally, in the `ios` directory, run `pod install`

Make sure AWS CLI is installed

```bash
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
```

Run

```bash
aws configure
```

Enter your information generated on your educate account when you hit account details. To verify this is correctly set up type aws s3 ls into your console.

Make sure Amplify CLI is installed

```bash
npm install -g @aws-amplify/cli
```

Once done navigate to the root directory of the project and run

```bash
amplify init
```

Name the environment and the project and use the default values for other information except: specify source directory path as '/' instead of src. For your AWS Profile use "default".

Authentication Setup

In the project directory type:

```bash
amplify add auth
```

Choose the default configuration. Once done run:

```bash
amplify push
```

You should now have authentication set up with Amplify when you run your project.

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
