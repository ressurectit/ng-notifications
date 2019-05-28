# Angular Notifications

Angular module for displaying notifications.

Module contains components for displaying local and global notifications.

* [Installation](#installation)
* [Types](#types)
* [Usage](#usage)
* [API](#api)
* [Change Log](./changelog.md)

## Installation

To install latest version of this module you just run:

```nocode
npm install "@ng2/notifications" --save
```

### SystemJs Usage

In your **SystemJs** configuration script add following lines to `packages` configuration section:

```javascript
packages:
{
    '@ng2/notifications': 
    {
        main: "dist/index.dev.min.js",
        defaultExtension: 'js'
    }
}
```

### Webpack Usage

In your application create file called *dependencies.ts* and add following line:
```typescript
import '@ng2/notifications';
```

Then add this file as `entry` point in your *webpack.config.js*:
```javascript
"vendor-import": path.join(__dirname, "pathToVendorTsDirectory/vendor.ts")
```

Then reference this file in your *index.html* at the end of body before application start javascript:
```html
<script src="webpackOutputDirectory/vendor-import.js"></script>
```

## Types

Available types:

### Modules

 - `NotificationsModule`

### Components

- `Notifications`
- `GlobalNotifications`
- `NotificationMessage`

### Interfaces, classes, enums

- `Notification`
- `NotificationType`
- `NotificationsOptions`

### Services

- `GlobalNotificationsService`
- `LocalNotificationsService`

## Usage
### Import Module
#### Typescript

This enables usage of all 'Notifications' components.

```typescript
import {NgModule} from '@angular/core';
import {NotificationsModule, GlobalNotificationsService} from '@ng2/notifications';
import {GlobalSampleComponent} from '.globalSample.component';
import {LocalSampleComponent} from '.localSample.component';

/**
 * Definition of your module
 */
@NgModule(
{
    imports: [NotificationsModule],
    declarations: [GlobalSampleComponent, LocalSampleComponent],
    providers: [GlobalNotificationsService]
})
export class YourModule
{
}
```

