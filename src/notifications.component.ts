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
        <notification *ngFor="let itm of notifications"
                      [item]="itm"
                      [visible]="itm.visible"
                      [clickToClose]="options.clickToClose"
                      [animated]="options.animations"
                      (closing)="closeItem($event)"
                      (closed)="removeItem($event)">
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

    /**
     * Array of displayed notifications - working set
     */
    private _activeNotifications: Notification[] = [];

    //######################### public properties #########################

    /**
     * Array of displayed notifications - displayed set
     */
    private notifications: Notification[] = [];

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
            this.options = new NotificationsOptions(10000, true, 500, true);
        }

        service.notifying.subscribe((itm: Notification) =>
        {
            var id = 0;

            if(this._activeNotifications.length > 0)
            {
                id = this._activeNotifications[this._activeNotifications.length - 1].id + 1;
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
                    this.closeItem(itm);
                }, this.options.timeOut);
            }

            this.addItem(itm);
        });
    }

    //######################### public methods #########################

    /**
     * Adds notification item to list
     * @param  {Notification} item Item to be added
     */
    public addItem(item: Notification)
    {
        this._activeNotifications.push(item);
        this.notifications.push(item);
        item.visible = true;
    }

    /**
     * Closes notification item
     * @param  {number} item Item to be closed
     */
    public closeItem(item: Notification)
    {
        var index = this._activeNotifications.indexOf(item);

        if (index > -1)
        {
            delete this._timeouts[item.id];
            this._activeNotifications.splice(index, 1);
            item.visible = false;
        }
    }
    
    /**
     * Removes notification item from list
     * @param  {number} item Item to be removed
     */
    public removeItem(item: Notification)
    {
        var index = this.notifications.indexOf(item);

        if (index > -1)
        {
            this.notifications.splice(index, 1);
        }
    }
}