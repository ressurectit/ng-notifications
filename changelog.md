# Changelog

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