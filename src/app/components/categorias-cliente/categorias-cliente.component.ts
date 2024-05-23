import { Component } from '@angular/core';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';

@Component({
  selector: 'app-categorias-cliente',
  standalone: true,
  imports: [HeaderClienteComponent],
  templateUrl: './categorias-cliente.component.html',
  styleUrl: './categorias-cliente.component.css'
})
export class CategoriasClienteComponent {

}
