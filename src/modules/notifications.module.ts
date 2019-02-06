import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NotificationMessageComponent, NotificationsComponent, GlobalNotificationsComponent} from '../components';
import {MessageRendererDirective} from '../directives';

/**
 * Module for notifications
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [NotificationMessageComponent, GlobalNotificationsComponent, NotificationsComponent, MessageRendererDirective],
    exports: [GlobalNotificationsComponent, NotificationsComponent],
    entryComponents: [NotificationMessageComponent]
})
export class NotificationsModule
{
}