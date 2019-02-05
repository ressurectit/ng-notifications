import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NotificationMessageComponent, NotificationsComponent, GlobalNotificationsComponent} from '../components';

/**
 * Module for notifications
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [NotificationMessageComponent, GlobalNotificationsComponent, NotificationsComponent],
    exports: [GlobalNotificationsComponent, NotificationsComponent]
})
export class NotificationsModule
{
}