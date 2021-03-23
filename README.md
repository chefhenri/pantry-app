## Pantry App
Pantry App is a hybrid mobile app for virtual consolidation of your cookbooks, pantry items, and grocery list.

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
