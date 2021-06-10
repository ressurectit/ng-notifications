import {Directive} from '@angular/core';

import {LocalNotificationsService} from '../../common/notifications.service';

/**
 * Directive used for providing local notifications service to local notifications
 */
@Directive(
{
    selector: 'notifications[withProvider]',
    providers: [LocalNotificationsService]
})
export class LocalNotificationsProviderDirective
{
}