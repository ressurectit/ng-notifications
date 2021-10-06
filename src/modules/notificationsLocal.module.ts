import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotificationsCoreModule} from './notificationsCore.module';
import {NotificationsComponent} from '../components/notifications/notifications.component';
import {MessageOptionsNotificationsDirective} from '../directives/messageOptionsNotifications/messageOptionsNotifications.directive';
import {LocalNotificationsProviderDirective} from '../directives/localNotificationsWithProvider/localNotificationsWithProvider.directive';

/**
 * Module for local notifications
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        NotificationsCoreModule
    ],
    declarations:
    [
        NotificationsComponent,
        LocalNotificationsProviderDirective,
        MessageOptionsNotificationsDirective,
    ],
    exports:
    [
        NotificationsComponent,
        LocalNotificationsProviderDirective,
        MessageOptionsNotificationsDirective,
    ]
})
export class NotificationsLocalModule
{
}