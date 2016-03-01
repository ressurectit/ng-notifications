import {NotificationType} from './notification.type';

/**
 * Class representing simple notification
 */
export class Notification
{
    /**
     * Type of notification message
     */
    type: NotificationType;
    
    /**
     * Message displayed by notification
     */
    message: string;
    
    /**
     * Unique id identifying notification
     */
    id: number;
    
    /**
     * Creates instance of Notification
     * @param  {string} message Message displayed by notification
     * @param  {NotificationType} type Type of notification message
     */
    constructor(message: string, type: NotificationType)
    {
        this.message = message;
        this.type = type;
    }
}