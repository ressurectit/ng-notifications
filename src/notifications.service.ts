import {Injectable,
        OpaqueToken,
        EventEmitter,
        Provider,
        provide} from 'angular2/core';
import {Notification} from './notification';
import {NotificationType} from './notification.type';

/**
 * Token used for injecting NotificationsService for global purposes
 */
export const GLOBAL_NOTIFICATION_SERVICE = new OpaqueToken("GlobalNotificaitonService");

/**
 * Token used for injecting NotificationsService for local purposes
 */
export const NOTIFICATION_SERVICE = new OpaqueToken("LocalNotificaitonService");

/**
 * Notifications service used for creating notifications
 */
@Injectable()
export class NotificationsService
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
 * Provider for global notifications, must be inserted in bootstrap
 */
export const GLOBAL_NOTIFICATION_SERVICE_PROVIDER = provide(GLOBAL_NOTIFICATION_SERVICE,
                                                            {
                                                                useClass: NotificationsService
                                                            });
                                                            
/**
 * Provider for local notifications, use for provide
 */
export const NOTIFICATION_SERVICE_PROVIDER = provide(NOTIFICATION_SERVICE,
                                                     {
                                                         useClass: NotificationsService
                                                     });