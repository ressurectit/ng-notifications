import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonLocalizeModule} from '@anglr/common';

import {TrimTextPipe} from '../pipes/trimText.pipe';
import {NotificationMessageComponent} from '../components/notificationMessage/notificationMessage.component';
import {MessageRendererDirective} from '../directives/componentRenderer/messageRenderer.directive';

/**
 * Module for core notifications components, directives, pipes
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        CommonLocalizeModule,
    ],
    declarations:
    [
        TrimTextPipe,
        NotificationMessageComponent,
        MessageRendererDirective,
    ],
    exports:
    [
        TrimTextPipe,
        NotificationMessageComponent,
        MessageRendererDirective,
    ]
})
export class NotificationsCoreModule
{
}