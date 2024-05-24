import { Component } from '@angular/core';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { HeaderModeradorComponent } from '../header-moderador/header-moderador.component';
import { ItemNegocioDTO } from '../../dto/itemNegocioDTO';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { ModeradorService } from '../../servicios/moderador.service';

@Component({
  selector: 'app-gestion-negocios-moderador',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponentComponent, HeaderModeradorComponent],
  templateUrl: './gestion-negocios-moderador.component.html',
  styleUrl: './gestion-negocios-moderador.component.css'
})
export class GestionNegociosModeradorComponent {

  negocios: ItemNegocioDTO[];

  constructor(private moderadorService: ModeradorService, private token: TokenService) {
    this.negocios = [];
    this.listarNegocios();
  }

  public listarNegocios() {
    this.moderadorService.filtrarPorEstadoNegocio('APROBADO').subscribe({
      next: (data) => {
        this.negocios = data.respuesta;
        console.log(data)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
