import {Injectable,
        OpaqueToken,
        EventEmitter,
        Provider,
        provide} from '@angular/core';
import {Notification} from './notification';
import {NotificationType} from './notification.type';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

/**
 * Notifications service used for creating notifications
 */
export abstract class NotificationsService
{
    //######################### private fields #########################

    /**
     * Subjet usef for emitting clear messages event 
     */
    private _clearSubject: Subject<any> = new Subject<any>();

    //######################### events #########################
    
    /**
     * Occurs when somebody tries to use NotificationsService for notifying user 
     */
    public notifying: EventEmitter<Notification> = new EventEmitter();
    
    //######################### publi properties #########################

    /**
     * Gets observable that is used for indication that messages are being cleared
     */
    public get clearingMessages(): Observable<any>
    {
        return this._clearSubject.asObservable();
    }

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

    /**
     * Clears all displayed messages for current services
     */
    public clearMessages()
    {
        this._clearSubject.next(null);
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