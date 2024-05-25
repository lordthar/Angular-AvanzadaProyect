import { Component } from '@angular/core';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { HeaderModeradorComponent } from '../header-moderador/header-moderador.component';
import { ItemNegocioDTO } from '../../dto/itemNegocioDTO';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { ModeradorService } from '../../servicios/moderador.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-negocios-moderador',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponentComponent, HeaderModeradorComponent, FormsModule],
  templateUrl: './gestion-negocios-moderador.component.html',
  styleUrl: './gestion-negocios-moderador.component.css'
})
export class GestionNegociosModeradorComponent {

  negocios: ItemNegocioDTO[];
  estadosNegocio: string[];
  filtroEstadoNegocio: string;

  constructor(private moderadorService: ModeradorService, private token: TokenService) {
    this.negocios = [];
    this.estadosNegocio = [];
    this.filtroEstadoNegocio = 'PENDIENTE';
    this.filtrarPorEstadoNegocio();
    this.listarEstadosNegocio();
  }

  public listarEstadosNegocio() {
    this.moderadorService.listarEstadosNegocio().subscribe({
      next: data => {
        this.estadosNegocio = data.respuesta;
      }
    })
  }

  onSelectChange(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    console.log('Selected value:', selected);
    this.filtrarPorEstadoNegocio();
  }

  public filtrarPorEstadoNegocio() {
    this.moderadorService.filtrarPorEstadoNegocio(this.filtroEstadoNegocio).subscribe({
      next: (data) => {
        this.negocios = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
