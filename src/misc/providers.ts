import {EnvironmentProviders, Provider, makeEnvironmentProviders} from '@angular/core';
import {isPresent} from '@jscrpt/common';

import {GLOBAL_NOTIFICATIONS, LOCAL_NOTIFICATIONS} from '../common/notifications.service';

/**
 * Provides global notifications service
 * @param name - Name for global notifications scope
 */
export function provideGlobalNotifications(name?: string): EnvironmentProviders
{
    if(isPresent(name))
    {
        return makeEnvironmentProviders(
        [
            GLOBAL_NOTIFICATIONS.named(name),
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
 */
export function provideLocalNotifications(name?: string): Provider[]
{
    if(isPresent(name))
    {
        return [
            LOCAL_NOTIFICATIONS.named(name),
        ];
    }

    return [
        LOCAL_NOTIFICATIONS,
    ];
}