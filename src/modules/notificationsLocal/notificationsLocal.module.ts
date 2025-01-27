import {NgModule} from '@angular/core';

import {NotificationsComponent} from '../../components';
import {LocalNotificationsProviderDirective, MessageOptionsNotificationsDirective} from '../../directives';

/**
 * Module for local notifications
 */
@NgModule(
{
    imports:
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
    ],
})
export class NotificationsLocalModule
{
}
