import { Component } from '@angular/core';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { HeaderModeradorComponent } from '../header-moderador/header-moderador.component';

@Component({
  selector: 'app-eliminar-cuenta-moderador',
  standalone: true,
  imports: [FooterComponentComponent, HeaderModeradorComponent],
  templateUrl: './eliminar-cuenta-moderador.component.html',
  styleUrl: './eliminar-cuenta-moderador.component.css'
})
export class EliminarCuentaModeradorComponent {

}
