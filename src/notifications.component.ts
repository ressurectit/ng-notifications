import {OpaqueToken,
        Component,
        Inject,
        Optional} from 'angular2/core';
import {NotificationsOptions} from './notifications.options';
import {Notification} from './notification';
import {NotificationsService, NOTIFICATION_SERVICE} from './notifications.service';
import {NotificationMessage} from './notification.message.component';

/**
 * Token used for injecting global NotificationsOptions, default values for all notifications if not overriden
 */
export const GLOBAL_NOTIFICATION_OPTIONS = new OpaqueToken("GlobalNotificaitonOptions");

/**
 * Notifications component for local messages
 */
@Component(
{
    selector: "notifications",
    directives: [NotificationMessage],
    template:
   `<div class="notifications">
        <notification *ngFor="#itm of notifications"
                      [item]="itm"
                      [clickToClose]="options.clickToClose"
                      (closing)="removeItem($event)">
        </notification>
    </div>`
})
export class Notifications
{
    //######################### public properties #########################
    
    /**
     * Array of displayed notifications
     */
    public notifications: Notification[] = [];

    //######################### constructor #########################
    constructor(@Optional() @Inject(GLOBAL_NOTIFICATION_OPTIONS) public options: NotificationsOptions,
                @Inject(NOTIFICATION_SERVICE) service: NotificationsService)
    {
        if(!this.options)
        {
            this.options = new NotificationsOptions(10000, true, 500);
        }
        
        service.notifying.subscribe((itm: Notification) =>
        {
            var id = 0;
            
            if(this.notifications.length > 0)
            {
                id = this.notifications[this.notifications.length - 1].id + 1; 
            }
            
            itm.id = id;
            
            this.notifications.push(itm);
        });
    }
    
    //######################### public methods #########################
    
    /**
     * Removes notification item from list
     * @param  {number} item Item to be removed
     */
    public removeItem(item: Notification)
    {
        if(!this.options.clickToClose)
        {
            return;
        }
        
        var index = this.notifications.indexOf(item);
        
        if (index > -1) 
        {
            this.notifications.splice(index, 1);
        }
    }
}