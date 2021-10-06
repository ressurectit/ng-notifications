import {InjectionToken, EventEmitter, Type, ExistingProvider, FactoryProvider, ValueProvider} from '@angular/core';
import {NotificationSeverity, Notification} from '@anglr/common';

/**
 * Token for injecting options for notifications components
 */
export const NOTIFICATIONS_OPTIONS: InjectionToken<NotificationsOptions> = new InjectionToken<NotificationsOptions>('NOTIFICATIONS_OPTIONS');

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
export interface NotificationsOptions<TMessageCssClasses = any, TOptions extends NotificationMessageOptions<TMessageCssClasses> = NotificationMessageOptions<TMessageCssClasses>>
{
    /**
     * Options passed to each message
     */
    messageOptions?: TOptions;

    /**
     * Css classes used within notifications component
     */
    cssClasses?: NotificationsOptionsCss;

    /**
     * Gets component type used for displaying notification message
     * @param severity - Notification severity that should be displayed
     */
    getNotificationMessageComponent?: (severity: NotificationSeverity) => Type<NotificationMessage<TMessageCssClasses, TOptions>>;
}

/**
 * Token for injecting options for notification message component
 */
export const NOTIFICATION_MESSAGE_OPTIONS: InjectionToken<NotificationMessageOptions> = new InjectionToken<NotificationMessageOptions>('NOTIFICATION_MESSAGE_OPTIONS');

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
export interface NotificationMessageOptions<TCssClasses = any>
{
    /**
     * Indication whether is message closed by clicking on it
     */
    clickToClose?: boolean;

    /**
     * Maximal allowed length of notification message
     */
    maxLength?: number;

    /**
     * Css classes used within notification message component
     */
    cssClasses?: TCssClasses;
}

/**
 * Component used for displaying notification message must implement this interface
 */
export interface NotificationMessage<TCssClasses = any, TOptions extends NotificationMessageOptions<TCssClasses> = NotificationMessageOptions<TCssClasses>>
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
export const NOTIFICATION_MESSAGE_SERVICE: InjectionToken<NotificationMessageService> = new InjectionToken<NotificationMessageService>('NOTIFICATION_MESSAGE_SERVICE');

/**
 * Represents service that can be used for obtaining notification message component type
 */
export interface NotificationMessageService<TMessageCssClasses = any, TOptions extends NotificationMessageOptions<TMessageCssClasses> = NotificationMessageOptions<TMessageCssClasses>>
{
    /**
     * Gets component type used for displaying notification message
     * @param severity - Notification severity that should be displayed
     */
    getNotificationMessageComponent(severity: NotificationSeverity): Type<NotificationMessage<TMessageCssClasses, TOptions>>;
}

/**
 * Factory for creating named `GlobalNotificationsProvider` or `LocalNotificationsProvider`
 */
export interface NamedNotificationsProviderFactory
{
    /**
     * Creates named `FactoryProvider` for global or local notifications
     * @param name - Name of scope for notifications provider
     */
    (name: string): FactoryProvider|[FactoryProvider, ValueProvider];
}

/**
 * Global notifications provider that allows creating global notifications
 */
export interface GlobalNotificationsProvider extends ExistingProvider
{
    /**
     * Gets named global notifications provider
     */
    named?: NamedNotificationsProviderFactory;
}

/**
 * Local notifications provider that allows creating local notifications
 */
export interface LocalNotificationsProvider extends FactoryProvider
{
    /**
     * Gets named local notifications provider
     */
    named?: NamedNotificationsProviderFactory;
}
