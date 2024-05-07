import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';

@Component({
  selector: 'app-comentarios-negocio',
  standalone: true,
  imports: [RouterModule, HeaderClienteComponent],
  templateUrl: './comentarios-negocio.component.html',
  styleUrl: './comentarios-negocio.component.css'
})
export class ComentariosNegocioComponent {

}
