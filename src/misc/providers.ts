import {EnvironmentProviders, InjectionToken, Provider, Type, makeEnvironmentProviders} from '@angular/core';
import {isPresent} from '@jscrpt/common';

import {GLOBAL_NOTIFICATIONS, LOCAL_NOTIFICATIONS} from '../common/notifications.service';

/**
 * Provides global notifications service
 * @param name - Name for global notifications scope
 * @param customNotificationsToken - Optional type or token that should be provided for custom notifications
 */
export function provideGlobalNotifications(name?: string, customNotificationsToken?: Function | Type<any> | InjectionToken<unknown>): EnvironmentProviders
{
    if(isPresent(name))
    {
        return makeEnvironmentProviders(
        [
            GLOBAL_NOTIFICATIONS.named(name, customNotificationsToken),
        ]);
    }

    return makeEnvironmentProviders(
    [
        GLOBAL_NOTIFICATIONS,
    ]);
}

/**
 * Provides local notifications service
 * @param name - Name for local notifications scope
 * @param customNotificationsToken - Optional type or token that should be provided for custom notifications
 */
export function provideLocalNotifications(name?: string, customNotificationsToken?: Function | Type<any> | InjectionToken<unknown>): Provider[]
{
    if(isPresent(name))
    {
        return [
            LOCAL_NOTIFICATIONS.named(name, customNotificationsToken),
        ];
    }

    return [
        LOCAL_NOTIFICATIONS,
    ];
}