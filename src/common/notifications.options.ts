/**
 * Notifications options that are used withing notifications module
 */
export class NotificationsOptions
{
    /**
     * Timeout in ms, after which will be notification closed, if set to 0, message will stay
     */
    public timeOut: number;
    
    /**
     * Indication that notification should be closed when clicked on it
     */
    public clickToClose: boolean;
    
    /**
     * Maximal allowed length of notification message
     */
    public maxLength: number;
    
    /**
     * Creates instance of NotificationsOptions
     * @param  {number} timeout Timeout in ms, after which will be notification closed, if set to 0, message will stay
     * @param  {boolean} clickToClose Indication that notification should be closed when clicked on it
     * @param  {number} maxLength Maximal allowed length of notification message
     */
    constructor(timeout: number, clickToClose: boolean, maxLength: number)
    {
        this.timeOut = timeout;
        this.clickToClose = clickToClose;
        this.maxLength = maxLength;
    }
}