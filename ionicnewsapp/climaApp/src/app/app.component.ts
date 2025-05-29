import { Component } from '@angular/core';
import { PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    this.initPush();
  }

  initPush() {
    PushNotifications.requestPermissions().then((result: any) => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log('Permissão para notificações negada');
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Token de push recebido:', token.value);
    });

    PushNotifications.addListener('registrationError', (error) => {
      console.error('Erro no registro do push:', error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Notificação recebida:', notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      console.log('Notificação clicada:', notification);
    });
  }

}
