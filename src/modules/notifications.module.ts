import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {GlobalNotificationsComponent} from '../components/globalNotifications/globalNotifications.component';
import {NotificationMessageComponent} from '../components/notificationMessage/notificationMessage.component';
import {NotificationsComponent} from '../components/notifications/notifications.component';
import {MessageRendererDirective} from '../directives/componentRenderer/messageRenderer.directive';
import {LocalNotificationsProviderDirective} from '../directives/localNotificationsWithProvider/localNotificationsWithProvider.directive';

/**
 * Module for notifications
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [NotificationMessageComponent, GlobalNotificationsComponent, NotificationsComponent, LocalNotificationsProviderDirective, MessageRendererDirective],
    exports: [GlobalNotificationsComponent, NotificationsComponent, LocalNotificationsProviderDirective]
})
export class NotificationsModule
{
}