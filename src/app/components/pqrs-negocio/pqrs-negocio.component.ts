import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';

@Component({
  selector: 'app-pqrs-negocio',
  standalone: true,
  imports: [RouterModule, HeaderClienteComponent],
  templateUrl: './pqrs-negocio.component.html',
  styleUrl: './pqrs-negocio.component.css'
})
export class PqrsNegocioComponent {

}
