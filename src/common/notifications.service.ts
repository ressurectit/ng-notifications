import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {Notification} from './notification';
import {NotificationType} from './notification.type';

/**
 * Notifications service used for creating notifications
 */
export abstract class NotificationsService
{
    //######################### private fields #########################

    /**
     * Subjet used for emitting clear messages event 
     */
    private _clearSubject: Subject<void> = new Subject<void>();

    /**
     * Subject used for emittin notifying event 
     */
    private _notifying: Subject<Notification> = new Subject<Notification>();
    
    //######################### public properties - events #########################

    /**
     * Gets observable that is used for indication that messages are being cleared
     */
    public get clearingMessages(): Observable<void>
    {
        return this._clearSubject.asObservable();
    }

    /**
     * Gets observable that is used for notifying user
     */
    public get notifying(): Observable<Notification>
    {
        return this._notifying.asObservable();
    }

    //######################### public methods #########################
    
    /**
     * Displays success notification
     * @param message Message to be displayed
     */
    public success(message: string)
    {
        this._onNotify(new Notification(message, NotificationType.success));
    }
    
    /**
     * Displays error notification
     * @param message Message to be displayed
     */
    public error(message: string)
    {
        this._onNotify(new Notification(message, NotificationType.danger));
    }
    
    /**
     * Displays info notification
     * @param message Message to be displayed
     */
    public info(message: string)
    {
        this._onNotify(new Notification(message, NotificationType.info));
    }
    
    /**
     * Displays warning notification
     * @param message Message to be displayed
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
        this._clearSubject.next();
    }
    
    //######################### private methods #########################
    
    /**
     * Used for invoking notifying event emitter
     * @param notification Notifications that should be displayed
     */
    private _onNotify(notification: Notification)
    {
        this._notifying.next(notification);
    }
}

/**
 * Global notification service that is used for page global notifications
 */
@Injectable({providedIn: 'root'})
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