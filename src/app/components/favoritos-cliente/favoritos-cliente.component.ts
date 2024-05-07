import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';
@Component({
  selector: 'app-favoritos-cliente',
  standalone: true,
  imports: [RouterModule, HeaderClienteComponent],
  templateUrl: './favoritos-cliente.component.html',
  styleUrl: './favoritos-cliente.component.css'
})
export class FavoritosClienteComponent {

}
