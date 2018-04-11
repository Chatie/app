# CHATIE APP
Chatie App for Android & Ios & Web

Chatie.io - Make your own ChatBot in no language, in minutes.

![Powered by Ionic & Angular](https://ionicframework.com/img/blog/ionic-angular-v2.jpg "Powered by Ionic & Angular")

# FEATURES

* Passwordless Auth
* Serverless Deploy
* Languageless Programing

# TODO

1. [Use Lighthouse to improve quality](https://developers.google.com/web/tools/lighthouse/)
    1. GitHub: https://github.com/ebidel/lighthouse-ci
    1. Try: https://lighthouse-ci.appspot.com/try

# DEVELOPMENT

## Linux

OS: Ubuntu 17.10

### Install Android SDK

```shell
sudo apt install \
  adb \
  android-platform-tools-base \
  android-sdk \
  android-sdk-platform-23 \
  android-sdk \
  android-sdk-platform-tools

cd $ANDROID_HOME
# download link comes from https://developer.android.com/studio/index.html
wget https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip
sudo unzip -n sdk-tools-linux-3859397.zip
sudo chmod +x \
  tools/bin/sdkmanager \
  tools/bin/avdmanager

# XXX: make sure the following line is required...?
sudo ./tools/bin/sdkmanager "build-tools;27.0.3"

# IMPORTANT: Accept all the licenses
./tools/bin/sdkmanager --licenses

```

### Build Android APK

```shell
./scripts/android.sh
```


## Mac

### Install ...

```shell
# Ios: https://cocoapods.org/
$ sudo gem install cocoapods
```

### Build iOS IPA

```shell
./scripts/ios.sh
```

## Browser

### Build

```shell
ionic cordova platform add browser
ionic cordova build browser --prod
```

# APP PUBLISHING

## Google Play

* https://play.google.com/apps/publish/

## Apple Store

* https://developer.apple.com
* https://itunesconnect.apple.com/

1. Xcode -> Product -> 
    1. Build
    1. Archive

## Web

## Develop

### Debug Switch

By adding `?BROLOG_LEVEL=silly` to URL, you can enable full debug output messages in the console.

For example:

* https://localhost:8100/?BROLOG_LEVEL=silly
* https://app.chatie.io/?BROLOG_LEVEL=silly

## Learning Resources

### Angular

* [Angular Package Format v6.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview), design document at Google Docs

### Auth0

* [OAuth 2.0](https://auth0.com/docs/protocols/oauth2)
* [Silent Authentication](https://auth0.com/docs/api-auth/tutorials/silent-authentication)
* [Doc for Get User Info](https://auth0.com/docs/api/authentication#get-user-info)
* [Calling your APIs with Auth0 tokens](https://auth0.com/docs/api-auth/tutorials/adoption/api-tokens)
* [User profile claims and scope](https://auth0.com/docs/api-auth/tutorials/adoption/scope-custom-claims)
* [Tokens used by Auth0](https://auth0.com/docs/tokens)
* [What is the right setup for Lock + SPA + Native + Rest API?](https://community.auth0.com/t/what-is-the-right-setup-for-lock-spa-native-rest-api/6316/2)
* [Auth0 Ionic2 Quick Start](https://auth0.com/docs/quickstart/native/ionic2)
* [Ionic 2 and Auth0(outdated: v0.9)](http://blog.ionic.io/ionic-2-and-auth0/)
* [Experimenting With Auth0 Passwordless Email Authentication In Angular 2.4.1](https://www.bennadel.com/blog/3207-experimenting-with-auth0-passwordless-email-authentication-in-angular-2-4-1.htm)
* [OpenID Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
* [Server + API Architecture Scenario](https://auth0.com/docs/architecture-scenarios/application/server-api)
* [Verify Access Tokens](https://auth0.com/docs/api-auth/tutorials/verify-access-token)
* [Auth0 + Scaphold](https://scaphold.io/community/questions/scaphold-social-login/)

### Rxjs

How to use Observable.

* [Observables for ECMAScript](https://github.com/tc39/proposal-observable)
* [Migrating from RxJS 4 to 5](https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md)

#### Build from Scratch

* [Creating Observable From Scratch(Video)](https://egghead.io/lessons/rxjs-creating-observable-from-scratch)
* [Learning Observable By Building Observable](https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87)

#### Others

* [Functional Programming in Javascript](http://reactivex.io/learnrx/)
* [How to build Angular 2 apps using Observable Data Services - Pitfalls to avoid](http://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/)
* [3 Common Rxjs Pitfalls that you might find while building Angular 2 Applications](http://blog.angular-university.io/angular-2-rxjs-common-pitfalls/)
* [10 Need-to-Know RxJS Functions with Examples](https://www.sitepoint.com/rxjs-functions-with-examples/)
* [Asynchronous Programming at Netflix - @Scale 2014 - Web](https://www.youtube.com/watch?v=gawmdhCNy-A)
* [RxJS, the smartest dumbest tool ever](https://www.christianalfoni.com/articles/2016_03_31_RxJs-the-smartest-dumbest-tool-ever)
* [COLD VS HOT OBSERVABLES](https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html#caveat-http-with-observables)
* [The Difference Between Throttling and Debouncing](https://css-tricks.com/the-difference-between-throttling-and-debouncing/)
* [RxJS: Don’t Unsubscribe](https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87)

### Machine Learning

* [architecture-free neural network library for node.js and the browser](http://caza.la/synaptic)

## Progressive Web Apps

A Progressive Web App(PWA) uses modern web capabilities to deliver an app-like user experience.

* [Ionic PWA Doc](http://ionicframework.com/docs/v2/resources/progressive-web-apps/)
* [Ionic PWA Blog](http://blog.ionic.io/navigating-the-world-of-progressive-web-apps-with-ionic-2/)
* [Creating (near) native mobile web app (aka progressive web app) for iOS with Ionic 2](https://technology.amis.nl/2016/08/16/creating-near-native-mobile-web-app-aka-progressive-web-app-for-ios-with-ionic-2/)

## Database

### 1. GraphQL

* [Zero to GraphQL in 30 Minutes – Steven Luscher](https://www.youtube.com/watch?v=UBGzsb2UkeY)
* [New features in GraphQL: Batch, defer, stream, live, and subscribe](https://dev-blog.apollodata.com/new-features-in-graphql-batch-defer-stream-live-and-subscribe-7585d0c28b07#.tzc669fjv)
* [GraphQL(with Subscription) Backend As A Service](https://scaphold.io/)

### 2. PouchDB

* [Offline Syncing in Ionic 2 with PouchDB & CouchDB](https://www.joshmorony.com/offline-syncing-in-ionic-2-with-pouchdb-couchdb/)

## Testing

* [Writing Marble Tests](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md)
* [Introduction to RxJS Marble Testing](https://egghead.io/lessons/rxjs-introduction-to-rxjs-marble-testing)

## Open API Specification

* [Top Specification Formats for REST APIs](http://nordicapis.com/top-specification-formats-for-rest-apis/)
* [Speed up your RESTful API development in Node.js with Swagger](https://scotch.io/tutorials/speed-up-your-restful-api-development-in-node-js-with-swagger)
* [Medium.com API Specification](https://github.com/amardeshbd/medium-api-specification)
* [Writing OpenAPI (Swagger) Specification Tutorial](https://apihandyman.io/writing-openapi-swagger-specification-tutorial-part-1-introduction/)

## Push

* [PhoneGap Day US Push Workshop 2016 Build a Hybrid Mobile App with Push](http://macdonst.github.io/push-workshop/index.html)

## Todo

* [x] Hostie Event Page
* [ ] Hostie QR Code Push
* [ ] Store Publish
* [ ] Other
  - [ ] Feedback enable Wilddog & Scrollglue
  - [ ] Gavatar in menu with Matrix CSS


## See Also

* [Motion.AI - Chatbots made easy.](https://www.motion.ai)
* [Static web publishing for Front-End Developers](https://surge.sh)

# CHANGELOG

### v0.3 (master) Apr, 2018

1. Promote `Auth` service as a solo npm package [auth-angular](https://github.com/zixia/auth-angular)


### v0.2 Feb, 2018

1. Upgrade to Ionic 3 & Angular 5
1. GraphQL DB Integration

### v0.1  Apri, 2017

1. Auth0 Integration
1. FastLane.tools Integration
1. Ionic DB Integration

### v0.0 Dec 16, 2016

1. Build with Ionic/Angular 2
1. Prototype with Ionic Creator 

# AUTHOR

[Huan LI](http://linkedin.com/in/zixia) \<zixia@zixia.net\>

<a href="https://stackexchange.com/users/265499">
  <img src="https://stackexchange.com/users/flair/265499.png" width="208" height="58" alt="profile for zixia on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for zixia on Stack Exchange, a network of free, community-driven Q&amp;A sites">
</a>

# COPYRIGHT & LICENSE

* Code & Docs © 2017-2018 Huan LI \<zixia@zixia.net\>
* Code released under the Apache-2.0 License
* Docs released under Creative Commons

MEMO
----------------
title: "Welcome to the Platform!",
description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",

title: "What is platform?",
description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",

title: "What isPlatform?",
description: "The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
