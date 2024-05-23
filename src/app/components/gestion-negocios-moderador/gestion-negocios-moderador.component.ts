import { Component } from '@angular/core';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { HeaderModeradorComponent } from '../header-moderador/header-moderador.component';
import { ItemNegocioDTO } from '../../dto/itemNegocioDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestion-negocios-moderador',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponentComponent, HeaderModeradorComponent],
  templateUrl: './gestion-negocios-moderador.component.html',
  styleUrl: './gestion-negocios-moderador.component.css'
})
export class GestionNegociosModeradorComponent {

  negocios: ItemNegocioDTO[];

  constructor(private negocioService: NegociosService) {
    this.negocios = [];
    this.listarNegocios();
  }

  public listarNegocios() {
    this.negocios = this.negocioService.listar();
  }

}
