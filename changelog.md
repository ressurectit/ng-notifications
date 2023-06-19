# Changelog

## Version 10.0.0 (2023-06-19)

### BREAKING CHANGES

- minimal supported version of `@angular` is `16.0.3`
- minimal supported version of `@rxjs` is `7.5.7`
- minimal supported version of `@jscrpt/common` is `3.4.0`
- minimal supported version of `@anglr/common` is `16.0.0`
- dropped support of `NodeJs` lower than `16.14`

## Version 9.0.0 (2022-06-30)

### BREAKING CHANGES

- minimal supported version of *Angular* is `14.0.0`
- minimal supported version of `@jscrpt/common` is `2.2.0`
- minimal supported version of `@anglr/animations` is `9.1.0`
- minimal supported version of `@anglr/common` is `11.2.0`
- minimal supported version of `rxjs` is `6.6.7`
- compiled as *Angular IVY* **only** with new *APF*
- removed support of *es5* target and using latest package.json features
- dropped support of `Node.js <= 12.20`

## Version 8.0.0 (2021-10-06)

### Features

- completely rework notifications system, now it is using `@anglr/common` `Notifications`
- added new `NamedNotificationsProviderFactory` as factory for creating named `GlobalNotificationsProvider` or `LocalNotificationsProvider`
- added new `GlobalNotificationsProvider` as global notifications provider that allows creating global notifications
- added new `LocalNotificationsProvider` as local notifications provider that allows creating local notifications
- added new `GLOBAL_NOTIFICATIONS` as instance of `GlobalNotificationsProvider`
- added new `LOCAL_NOTIFICATIONS` as instance of `LocalNotificationsProvider`
- added new `LOCAL_NOTIFICATIONS_SCOPE_NAME` as local notifications scope name
- added new `LOCAL_NOTIFICATIONS_SCOPE` as injection token for injecting local notifications scope name
- `NotificationsComponent` reworked to use new `@anglr/common` `Notifications` API
- `LocalNotificationsProviderDirective` reworked to use new `@anglr/common` `Notifications` API
- added new `MessageOptionsNotificationsDirective` as directive used for providing message options directly to notifications
- added new `TrimTextPipe` as pipe that trims provided text by provided length
- added new `NotificationsCoreModule` as module for core notifications components, directives, pipes
- added new `NotificationsGlobalModule` as module for global notifications
    - `forRoot` that allows injecting `GlobalNotificationsService` as named or root scope
- added new `NotificationsLocalModule` as module for local notifications

### BREAKING CHANGES

- minimal supported version of *Angular* is `12.0.0`
- minimal supported version of `@jscrpt/common` is `1.2.0`
- new dependency `@anglr/common` minimal supported version is `9.0.0`
- removed `Notification`, now replaced with `@anglr/common` `Notification`
- removed `NotificationType`, now replaced with `@anglr/common` `NotificationSeverity`
- removed `NotificationsModule`, now replaced with 2 modules `NotificationsGlobalModule` or `NotificationsLocalModule`
- all generic types are made optional
- removed `NotificationsOptions.timeout`, this is now part of `@anglr/common` `Notifications` system
- moved `NotificationsOptions.maxLength` into `NotificationMessageOptions.maxLength`
- removed `NotificationsService` now using `@anglr/common` `Notifications`
- `GlobalNotificationsService` not self-provided as `'root'`
- `GlobalNotificationsService` and `LocalNotificationsService` used only as injection tokens for getting `Notifications` instance

## Version 7.1.0 (2021-06-10)

### Features

- added new `LocalNotificationsProviderDirective` used for providing `LocalNotificationsService` to local `NotificationsComponent`

## Version 7.0.0

- updated to latest stable *Angular* 9
- added generating of API doc

## Version 6.0.0

 - Angular IVY ready (APF compliant package)
 - added support for ES2015 compilation
 - Angular 8

## Version 5.1.1
 - now again fully working animation

## Version 5.1.0
 - completely refactored notifications
 - now supports custom components that can be used for displaying messages
 - now supports providing options using binding, or DI (new tokens)
 - support for custom components using service

## Version 5.0.1
 - updated usage of `NotificationOptions` fix for latest Typescript and @ngtools/webpack

## Version 5.0.0
 - stabilized for angular v6

## Version 5.0.0-beta.2
 - `@anglr/notifications` is now marked as *sideEffects* free
 - `GlobalNotificationsService` is now *tree-shakeable*
 - `NotificationsModule` removed `forRoot` methods, `NotificationsOptions` must be provided directly

## Version 5.0.0-beta.1
 - aktualizácia balíčkov `Angular` na `6`
 - aktualizácia `Webpack` na verziu `4`
 - aktualizácia `rxjs` na verziu `6`
 - automatické generovanie dokumentácie

## Version 4.0.2
 - returned typescript version back to 2.4.2 and removed distJit

## Version 4.0.1
 - added compiled outputs for Angular JIT

## Version 4.0.0
 - updated angular to 5.0.0 (final)
 - changed dependencies of project to peerDependencies
 - more strict compilation
 - updated usage of rxjs, now using operators

## Version 4.0.0-beta.0
 - updated angular to >=5.0.0-rc.7

## Version 3.1.1
- `ChangeDetectionStrategy.OnPush` set for both notifications components

## Version 3.1.0
- using latest angular 4.2 animation features

## Version 3.0.1
- angular module with support for options

## Version 3.0.0
- finalized version for angular 4, aot and ssr

## Version 3.0.0-beta.4
- bugfix fixed clear messages

## Version 3.0.0-beta.3
- enabled for SSR

## Version 3.0.0-beta.2

- angular 4.0.0-rc.2
- tree shaking enabled
- timeout option used only in browser environment

## Version 3.0.0-beta.1

- angular 4.0.0-beta.8
- angular AOT compliant

## Version 3.0.0-beta.0

- angular 4.0.0-beta.7

## Version 2.2.0

 - angular 2.2.0

## Version 2.0.2

- fixed notifications animations

## Version 2.0.1

- fixed displaying of global notifications
- UMD module
- webpack usage
- typescript 2 usage

## Version 2.0.0

- angular 2.0.0

## Version 1.5.0

- angular 2.0.0

## Version 1.4.0

- angular 2.0.0-rc.6

## Version 1.3.1

- added `NotificationsModule`

## Version 1.3.0

- angular 2.0.0-rc.5

## Version 1.2.0

- angular 2.0.0-rc.4

## Version 1.1.1
## Version 1.1.0

- angular 2.0.0-rc.2

## Version 1.0.1

- support for clearing messages

## Version 1.0.0

- support of global and local notifications
- notification types: error, success, info, warning
- angular 2.0.0-rc.1
- SystemJs bundle