import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotificationsCoreModule} from './notificationsCore.module';
import {GlobalNotificationsComponent} from '../components/globalNotifications/globalNotifications.component';

/**
 * Module for global notifications
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
        GlobalNotificationsComponent,
    ],
    exports:
    [
        GlobalNotificationsComponent,
    ]
})
export class NotificationsGlobalModule
{
}