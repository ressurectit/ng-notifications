import {Injectable,
        OpaqueToken,
        EventEmitter,
        Provider,
        provide} from 'angular2/core';
import {Notification} from './notification';
import {NotificationType} from './notification.type';

/**
 * Notifications service used for creating notifications
 */
export abstract class NotificationsService
{
    //######################### events #########################
    
    /**
     * Occurs when somebody tries to use NotificationsService for notifying user 
     */
    public notifying: EventEmitter<Notification> = new EventEmitter();
    
    //######################### public methods #########################
    
    /**
     * Displays success notification
     * @param  {string} message Message to be displayed
     */
    public success(message: string)
    {
        this._onNotify(new Notification(message, NotificationType.success));
    }
    
    /**
     * Displays error notification
     * @param  {string} message Message to be displayed
     */
    public error(message: string)
    {
        this._onNotify(new Notification(message, NotificationType.danger));
    }
    
    /**
     * Displays info notification
     * @param  {string} message Message to be displayed
     */
    public info(message: string)
    {
        this._onNotify(new Notification(message, NotificationType.info));
    }
    
    /**
     * Displays warning notification
     * @param  {string} message Message to be displayed
     */
    public warning(message: string)
    {
        this._onNotify(new Notification(message, NotificationType.warning));
    }
    
    //######################### private methods #########################
    
    /**
     * Used for invoking notifying event emitter
     * @param  {Notification} notification Notifications that should be displayed
     */
    private _onNotify(notification: Notification)
    {
        this.notifying.emit(notification);
    }
}

/**
 * Global notification service that is used for page global notifications
 */
@Injectable()
export class GlobalNotificationsService extends NotificationsService
{
}

/**
 * Local notification service that should be used only within page notifications
 */
@Injectable()
export class LocalNotificationsService extends NotificationsService
{
}