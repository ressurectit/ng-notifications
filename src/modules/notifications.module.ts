import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {GlobalNotificationsService} from '../common/notifications.service';
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
    exports: [NotificationMessage, GlobalNotifications, Notifications]
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
            ngModule: NgModule,
            providers: [GlobalNotificationsService]
        };
    }
}