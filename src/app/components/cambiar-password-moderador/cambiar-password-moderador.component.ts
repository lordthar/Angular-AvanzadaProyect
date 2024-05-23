import { Component } from '@angular/core';
import { HeaderModeradorComponent } from '../header-moderador/header-moderador.component';
import { FooterComponentComponent } from '../footer-component/footer-component.component';

@Component({
  selector: 'app-cambiar-password-moderador',
  standalone: true,
  imports: [HeaderModeradorComponent, FooterComponentComponent],
  templateUrl: './cambiar-password-moderador.component.html',
  styleUrl: './cambiar-password-moderador.component.css'
})
export class CambiarPasswordModeradorComponent {

}
