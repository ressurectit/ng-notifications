import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {GlobalNotificationsComponent} from '../components/globalNotifications/globalNotifications.component';
import {NotificationMessageComponent} from '../components/notificationMessage/notificationMessage.component';
import {NotificationsComponent} from '../components/notifications/notifications.component';
import {MessageRendererDirective} from '../directives/componentRenderer/messageRenderer.directive';

/**
 * Module for notifications
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [NotificationMessageComponent, GlobalNotificationsComponent, NotificationsComponent, MessageRendererDirective],
    exports: [GlobalNotificationsComponent, NotificationsComponent]
})
export class NotificationsModule
{
}