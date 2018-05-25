import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {Notifications} from '../common/notifications.component';
import {GlobalNotifications} from '../common/global-notifications.component';
import {NotificationMessage} from '../common/notification.message.component';

/**
 * Module for notifications
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [NotificationMessage, GlobalNotifications, Notifications],
    exports: [GlobalNotifications, Notifications]
})
export class NotificationsModule
{
}