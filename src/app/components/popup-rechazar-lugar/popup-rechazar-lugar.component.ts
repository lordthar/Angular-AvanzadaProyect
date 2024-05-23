import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-rechazar-lugar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './popup-rechazar-lugar.component.html',
  styleUrl: './popup-rechazar-lugar.component.css'
})
export class PopupRechazarLugarComponent {


  @Input('show')
  show = true

  @Output('close')
  onClose = new EventEmitter()

}
