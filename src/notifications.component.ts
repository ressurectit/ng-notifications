import {OpaqueToken,
        Component,
        Inject,
        Optional} from 'angular2/core';
import {NotificationsOptions} from './notifications.options';
import {Notification} from './notification';
import {NotificationsService, LocalNotificationsService} from './notifications.service';
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
    inputs: ['cssClass'],
    template:
   `<div [class]="cssClass">
        <notification *ngFor="#itm of notifications"
                      [item]="itm"
                      [clickToClose]="options.clickToClose"
                      (closing)="removeItem($event)">
        </notification>
    </div>`
})
export class Notifications
{
    //######################### private fields #########################
    
    /**
     * Array of active timeouts
     */
    private _timeouts: {[index: number]: any} = {};
    
    //######################### public properties #########################
    
    /**
     * Array of displayed notifications
     */
    public notifications: Notification[] = [];
    
    //######################### public properties - inputs #########################
    
    /**
     * Css class that is assigned to root element of notifications
     */
    public cssClass: string = "notifications";
    
    //######################### constructor #########################
    constructor(@Optional() @Inject(GLOBAL_NOTIFICATION_OPTIONS) public options: NotificationsOptions,
                service: LocalNotificationsService)
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
            
            if(itm.message.length > this.options.maxLength)
            {
                itm.message = itm.message.substr(0, this.options.maxLength) + " ...";
            }
            
            if(this.options.timeOut > 0)
            {
                this._timeouts[id] = setTimeout(() =>
                {
                    delete this._timeouts[id];
                    this.removeItem(itm);
                }, this.options.timeOut);
            }
            
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
        var index = this.notifications.indexOf(item);
        
        if (index > -1) 
        {
            delete this._timeouts[this.notifications[index].id]; 
            this.notifications.splice(index, 1);
        }
    }
}