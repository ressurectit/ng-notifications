import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders, FactoryProvider} from '@angular/core';

import {GlobalNotificationsService} from '../common/notifications.service';
import {Notifications} from '../common/notifications.component';
import {GlobalNotifications} from '../common/global-notifications.component';
import {NotificationMessage} from '../common/notification.message.component';
import {NotificationsOptions} from '../common/notifications.options';

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
    //######################### public methods #########################
    
    /**
     * Returns module with global notifications providers that is used for app root module
     */
    public static forRoot(): ModuleWithProviders 
    {
        return {
            ngModule: NotificationsModule,
            providers: [GlobalNotificationsService]
        };
    }

    /**
     * Returns module with global notifications providers that is used for app root module and options
     * @param {() => NotificationsOptions} options Options factory
     */
    public static forRootWithOptions(options: () => NotificationsOptions): ModuleWithProviders 
    {
        return {
            ngModule: NotificationsModule,
            providers: 
            [
                GlobalNotificationsService,
                <FactoryProvider>
                {
                    provide: NotificationsOptions,
                    useFactory: options
                }
            ]
        };
    }
}