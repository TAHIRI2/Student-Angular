import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { WeirdCasePipe } from '../../weird-case.pipe';

@Component({
  standalone: true,
  selector: 'app-child',
  imports: [FormsModule, WeirdCasePipe],
  templateUrl: './child.component.html'
})
export class ChildComponent {
  @Input() parentMessage = '';
  @Output() messageEvent = new EventEmitter<string>();
  
  tempChildMessage = ''; // Message temporaire avant envoi
  childMessage = '';    // Message final

  sendMessage() {
    if (this.tempChildMessage) {
      this.childMessage = this.tempChildMessage;
      this.messageEvent.emit(this.childMessage);
      this.tempChildMessage = ''; // Réinitialiser le champ
    }
  }
}