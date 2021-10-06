import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {isPresent} from '@jscrpt/common';

import {NotificationsCoreModule} from './notificationsCore.module';
import {GlobalNotificationsComponent} from '../components/globalNotifications/globalNotifications.component';
import {GLOBAL_NOTIFICATIONS} from '../notifications';

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
    //######################### public methods #########################

    /**
     * Registers global notifications service
     * 
     * @param name - Name for global notifications scope
     */
    public static forRoot(name?: string): ModuleWithProviders<NotificationsGlobalModule>
    {
        if(isPresent(name))
        {
            return {
                ngModule: NotificationsGlobalModule,
                providers:
                [
                    GLOBAL_NOTIFICATIONS.named(name)
                ]
            };
        }

        return {
            ngModule: NotificationsGlobalModule,
            providers:
            [
                GLOBAL_NOTIFICATIONS
            ]
        };
    }
}