import React, { Component } from 'react';
import {Notification, Notifications} from 'react-native-notifications';

class NotificationService extends Component {
  constructor(props: any) {
    super(props);
    Notifications.registerRemoteNotifications();

    Notifications.ios.checkPermissions();

    Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
      console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
      completion({alert: false, sound: false, badge: false});
    });

    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
      console.log(`Notification opened: ${notification.payload}`);
      completion();
    });
  }
}

export default NotificationService;