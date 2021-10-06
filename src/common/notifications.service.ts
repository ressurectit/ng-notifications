import {FactoryProvider, Injectable, InjectionToken, ValueProvider} from '@angular/core';
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
    public message(_message: string, _severity: NotificationSeverity): Notifications
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public default(_message: string): Notifications
    {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    public success(_message: string): Notifications
    {
        throw new Error('Method not implemented.');
    }
    
    /**
     * @inheritdoc
     */
    public error(_message: string): Notifications
    {
        throw new Error('Method not implemented.');
    }
    
    /**
     * @inheritdoc
     */
    public info(_message: string): Notifications
    {
        throw new Error('Method not implemented.');
    }
    
    /**
     * @inheritdoc
     */
    public warning(_message: string): Notifications
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
 * Global notifications provider
 */
const GLOBAL_NOTIFICATIONS: GlobalNotificationsProvider =
{
    provide: GlobalNotificationsService,
    useExisting: NOTIFICATIONS
};

Object.defineProperty(GLOBAL_NOTIFICATIONS, nameof<GlobalNotificationsProvider>('named'),
{
    get()
    {
        return (name: string): FactoryProvider =>
        {
            return {
                provide: GlobalNotificationsService,
                useFactory: (notifications: Notifications) =>
                {
                    return notifications.getScope(name);
                },
                deps: [NOTIFICATIONS]
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
 * Local notifications provider
 */
const LOCAL_NOTIFICATIONS: LocalNotificationsProvider =
{
    provide: LocalNotificationsService,
    useFactory: (notifications: Notifications) =>
    {
        return notifications.getScope(LOCAL_NOTIFICATIONS_SCOPE_NAME);
    },
    deps: [NOTIFICATIONS]
};

Object.defineProperty(LOCAL_NOTIFICATIONS, nameof<LocalNotificationsProvider>('named'),
{
    get()
    {
        return (name: string = generateId(6)): [FactoryProvider, ValueProvider] =>
        {
            const scopeName = `${LOCAL_NOTIFICATIONS_SCOPE_NAME}-${name}`;

            return [
                {
                    provide: LocalNotificationsService,
                    useFactory: (notifications: Notifications) =>
                    {
                        return notifications.getScope(scopeName);
                    },
                    deps: [NOTIFICATIONS]
                },
                {
                    provide: LOCAL_NOTIFICATIONS_SCOPE,
                    useValue: scopeName
                }
            ];
        };
    }
});

export {GLOBAL_NOTIFICATIONS, LOCAL_NOTIFICATIONS};
