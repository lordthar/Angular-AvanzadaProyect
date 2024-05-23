import { Component, Input } from '@angular/core';
import { Alerta } from '../../dto/alerta';

@Component({
  selector: 'app-alerta-component',
  standalone: true,
  imports: [],
  templateUrl: './alerta-component.component.html',
  styleUrl: './alerta-component.component.css'
})
export class AlertaComponentComponent {
  @Input() alerta!: Alerta | null;
  public ocultar() {
  this.alerta = null;
}
}
