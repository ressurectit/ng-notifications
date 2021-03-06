import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {NotificationsComponent} from "../components/notifications/notifications.component";
import {NotificationMessageComponent} from "../components/notificationMessage/notificationMessage.component";
import {LocalNotificationsService} from "./notifications.service";

describe('Local Notifications component - with default options', () =>
{
    //let comp: Notifications;
    let fixture: ComponentFixture<NotificationsComponent>;
    let mainDivDElement: DebugElement;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
        {
            imports:
            [
                NoopAnimationsModule
            ],
            declarations: 
            [
                NotificationsComponent, 
                NotificationMessageComponent
            ],
            providers:
            [
                LocalNotificationsService
            ]
        });

        fixture = TestBed.createComponent(NotificationsComponent);
        //comp = fixture.componentInstance;

        //OnInit()
        fixture.detectChanges();

        mainDivDElement = fixture.debugElement.query(By.css("div.notifications"));
    });

    it('should be empty', () =>
    {
        let notifications = mainDivDElement.queryAll(By.css('notification'));

        expect(notifications.length).toEqual(0, 'no notifications');
    });

    it('should display all 4 types', () =>
    {
        let notificationsSvc = fixture.debugElement.injector.get(LocalNotificationsService);

        notificationsSvc.error("text");
        notificationsSvc.info("text");
        notificationsSvc.warning("text");
        notificationsSvc.success("text");

        let notifications = mainDivDElement.queryAll(By.css('notification'));
        expect(notifications.length).toEqual(4, 'four notifications');
        expect(notifications[0].query(By.css('div')).classes['alert-danger']).toBeTruthy('danger notification');
        expect(notifications[1].query(By.css('div')).classes['alert-info']).toBeTruthy('info notification');
        expect(notifications[2].query(By.css('div')).classes['alert-warning']).toBeTruthy('warning notification');
        expect(notifications[3].query(By.css('div')).classes['alert-success']).toBeTruthy('success notification');
    });

    it('should display requested text', () =>
    {
        let notificationsSvc = fixture.debugElement.injector.get(LocalNotificationsService);

        notificationsSvc.error("requested text");

        let notification = mainDivDElement.query(By.css('notification>div'));
        expect(notification).toBeDefined('div with text found');
        expect((<HTMLElement>notification.nativeElement).innerText).toEqual('requested text', 'div with text found');
    });

    it('should be empty after 10 seconds', fakeAsync(() =>
    {
        let notificationsSvc = fixture.debugElement.injector.get(LocalNotificationsService);

        notificationsSvc.error("requested text");

        let notification = mainDivDElement.query(By.css('notification'));
        expect(notification).toBeDefined('notification found');
        tick(10000);
        notification = mainDivDElement.query(By.css('notification'));
        expect(notification).toBeNull('notifications emtpy');
    }));

    it('should be empty after click', fakeAsync(() =>
    {
        let notificationsSvc = fixture.debugElement.injector.get(LocalNotificationsService);

        notificationsSvc.error("text");

        let notification = mainDivDElement.query(By.css('notification>div'));
        expect(notification).toBeDefined('notification found');

        notification.triggerEventHandler('click', null);
        fixture.detectChanges();
        
        notification = mainDivDElement.query(By.css('notification'));
        expect(notification).toBeNull('notifications emtpy');
    }));
});