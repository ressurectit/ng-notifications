import {NgModule} from '@angular/core';

import {GlobalNotificationsComponent} from '../../components';

/**
 * Module for global notifications
 */
@NgModule(
{
    imports:
    [
        GlobalNotificationsComponent,
    ],
    exports:
    [
        GlobalNotificationsComponent,
    ],
})
export class NotificationsGlobalModule
{
}