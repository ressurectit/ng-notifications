import {InjectionToken, EventEmitter, Type} from "@angular/core";

import {Notification} from './notification';
import {NotificationType} from "./notification.type";

/**
 * Token for injecting options for notifications components
 */
export const NOTIFICATIONS_OPTIONS: InjectionToken<NotificationsOptions<any, any>> = new InjectionToken<NotificationsOptions<any, any>>('NOTIFICATIONS_OPTIONS');

/**
 * Css classes for notifications component
 */
export interface NotificationsOptionsCss
{
    /**
     * Css class applied to root div of notifications
     */
    rootDiv?: string;
}

/**
 * Options for notifications component
 */
export interface NotificationsOptions<TMessageCssClasses, TOptions extends NotificationMessageOptions<TMessageCssClasses>>
{
    /**
     * Timeout in ms, after which will be notification closed, if set to 0, message will stay
     */
    timeout?: number;
    
    /**
     * Maximal allowed length of notification message
     */
    maxLength?: number;

    /**
     * Options passed to each message
     */
    messageOptions?: TOptions;

    /**
     * Css classes used within notifications component
     */
    cssClasses?: NotificationsOptionsCss;

    /**
     * Gets type that represents component used for displaying notification message
     */
    getNotificationMessageComponent?: (type: NotificationType) => Type<NotificationMessage<TMessageCssClasses, TOptions>>;
}

/**
 * Token for injecting options for notification message component
 */
export const NOTIFICATION_MESSAGE_OPTIONS: InjectionToken<NotificationMessageOptions<any>> = new InjectionToken<NotificationMessageOptions<any>>('NOTIFICATION_MESSAGE_OPTIONS');

/**
 * Css classes for default notification message
 */
export interface NotificationMessageCss
{
    /**
     * Css class that is applied to div when you can close message by clicking on it
     */
    clickable?: string;

    /**
     * Css always applied to message div
     */
    messageDiv?: string;

    /**
     * Prefix of css class applied to message div, suffix is according NotificationType
     */
    messageTypePrefix?: string;
}

/**
 * Options for notification message
 */
export interface NotificationMessageOptions<TCssClasses>
{
    /**
     * Indication whether is message closed by clicking on it
     */
    clickToClose?: boolean;

    /**
     * Css classes used within notification message component
     */
    cssClasses?: TCssClasses;
}

/**
 * Component used for displaying notification message must implement this interface
 */
export interface NotificationMessage<TCssClasses, TOptions extends NotificationMessageOptions<TCssClasses>>
{
    /**
     * Represents notification that will be displayed
     */
    item: Notification;

    /**
     * Options used for notification message
     */
    options: TOptions;

    /**
     * Occurs when notification is closed by user
     */
    closed: EventEmitter<Notification>;

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}

/**
 * Token for injecting service that can be used for obtaining type of component for notification message
 */
export const NOTIFICATION_MESSAGE_SERVICE: InjectionToken<NotificationMessageService<any, NotificationMessageOptions<any>>> = new InjectionToken<NotificationMessageService<any, NotificationMessageOptions<any>>>('NOTIFICATION_MESSAGE_SERVICE');

/**
 * Represents service that can be used for obtaining notification message component type
 */
export interface NotificationMessageService<TCssClasses, TOptions extends NotificationMessageOptions<TCssClasses>>
{
    /**
     * Gets component type used for displaying notification message
     * @param type - Type of notification that should be displayed
     */
    getNotificationMessageComponent(type: NotificationType): Type<NotificationMessage<TCssClasses, TOptions>>;
}