// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ChildComponent } from './child/child.component';
// import { WeirdCasePipe } from "../weird-case.pipe";

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [ChildComponent, FormsModule, WeirdCasePipe],
//   template: `
//  <h3>Composant Parent</h3>
// <input [(ngModel)]="parentInput" placeholder="Message du parent">
// <button (click)="sendToChild()">Envoyer à l'enfant</button>
// <p>Message reçu de l'enfant: {{ childMessage | weirdCase}}</p>

// <hr>
// <app-child 
//   [parentMessage]="parentMessage"
//   (messageEvent)="receiveMessage($event)">
// </app-child>

//   `
// })
// export class AppComponent {
//   parentInput = '';
//   parentMessage = ''; // Ce qu’on envoie à l’enfant
//   childMessage = '';

//   sendToChild() {
//     this.parentMessage = this.parentInput;
//   }

//   receiveMessage(message: string) {
//     this.childMessage = message;
//   }
// }
import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent],
  template: `
    <app-table></app-table>
  `
})
export class AppComponent {
  title = 'imbriquer-app';
}