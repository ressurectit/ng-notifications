import {FactoryProvider, Injectable, InjectionToken, Type, ValueProvider} from '@angular/core';
import {Notification, NOTIFICATIONS, Notifications, NotificationSeverity} from '@anglr/common';
import {generateId, nameof} from '@jscrpt/common';
import {Observable} from 'rxjs';

import {GlobalNotificationsProvider, LocalNotificationsProvider} from './notifications.interface';

/**
 * Base class for notifications services
 */
@Injectable()
abstract class ɵNotificationsService implements Notifications
{
    //######################### properties #########################

    /**
     * @inheritdoc
     */
    public get notifications(): readonly Notification[]
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public get notificationsChange(): Observable<void>
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public get destroy(): Observable<void>
    {
        throw new Error('Method not implemented.');
    }

    //######################### methods #########################

    /**
     * @inheritdoc
     */
    public message(_message: string, _severity: NotificationSeverity, _parameter?: Record<string, unknown>): Notifications
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public default(_message: string, _parameter?: Record<string, unknown>): Notifications
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public success(_message: string, _parameter?: Record<string, unknown>): Notifications
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public error(_message: string, _parameter?: Record<string, unknown>): Notifications
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public info(_message: string, _parameter?: Record<string, unknown>): Notifications
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public warning(_message: string, _parameter?: Record<string, unknown>): Notifications
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public clearNotifications(): Notifications
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public remove(_notification: Notification): Notifications
    {
        throw new Error('Method not implemented.');
    }

    /**
     * Gets scoped instance of `Notifications`
     * @inheritdoc
     */
    public getScope(_scopeName: string): Notifications
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        throw new Error('Method not implemented.');
    }
}

/**
 * Global notification service that is used for global notifications
 */
@Injectable()
export abstract class GlobalNotificationsService extends ɵNotificationsService implements Notifications
{
}

/**
 * Local notification service that is used for local notifications
 */
@Injectable()
export abstract class LocalNotificationsService extends ɵNotificationsService implements Notifications
{
}

/**
 * Global notifications provider definition
 */
const GLOBAL_NOTIFICATIONS_DEFINITION: Partial<GlobalNotificationsProvider> =
{
    provide: GlobalNotificationsService,
    useExisting: NOTIFICATIONS,
};

/**
 * Global notifications provider
 */
const GLOBAL_NOTIFICATIONS = GLOBAL_NOTIFICATIONS_DEFINITION as GlobalNotificationsProvider;

Object.defineProperty(GLOBAL_NOTIFICATIONS_DEFINITION, nameof<GlobalNotificationsProvider>('named'),
{
    get()
    {
        return (name: string, customNotificationsToken?: Function | Type<any> | InjectionToken<unknown> | string): FactoryProvider =>
        {
            return {
                provide: customNotificationsToken ?? GlobalNotificationsService,
                useFactory: (notifications: Notifications) =>
                {
                    return notifications.getScope(name);
                },
                deps: [NOTIFICATIONS],
            };
        };
    }
});

/**
 * Local notifications scope name
 */
export const LOCAL_NOTIFICATIONS_SCOPE_NAME = 'local';

/**
 * Injection token for injecting local notifications scope name
 */
export const LOCAL_NOTIFICATIONS_SCOPE: InjectionToken<string> = new InjectionToken<string>('LOCAL_NOTIFICATIONS_SCOPE');

/**
 * Local notifications provider definitions
 */
const LOCAL_NOTIFICATIONS_DEFINITION: Partial<LocalNotificationsProvider> =
{
    provide: LocalNotificationsService,
    useFactory: (notifications: Notifications) =>
    {
        return notifications.getScope(LOCAL_NOTIFICATIONS_SCOPE_NAME);
    },
    deps: [NOTIFICATIONS],
};

/**
 * Local notifications provider
 */
const LOCAL_NOTIFICATIONS = LOCAL_NOTIFICATIONS_DEFINITION as LocalNotificationsProvider;

Object.defineProperty(LOCAL_NOTIFICATIONS_DEFINITION, nameof<LocalNotificationsProvider>('named'),
{
    get()
    {
        return (name: string = generateId(6), customNotificationsToken?: Function | Type<any> | InjectionToken<unknown> | string): [FactoryProvider, ValueProvider] =>
        {
            const scopeName = `${LOCAL_NOTIFICATIONS_SCOPE_NAME}-${name}`;

            return [
                {
                    provide: customNotificationsToken ?? LocalNotificationsService,
                    useFactory: (notifications: Notifications) =>
                    {
                        return notifications.getScope(scopeName);
                    },
                    deps: [NOTIFICATIONS],
                },
                {
                    provide: LOCAL_NOTIFICATIONS_SCOPE,
                    useValue: scopeName,
                }
            ];
        };
    }
});

export {GLOBAL_NOTIFICATIONS, LOCAL_NOTIFICATIONS};
