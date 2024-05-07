import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/itemNegocioDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
@Component({
selector: 'app-gestion-negocios',
standalone: true,
imports: [CommonModule, RouterModule, HeaderClienteComponent, FooterComponentComponent],
templateUrl: './gestion-negocios.component.html',
styleUrl: './gestion-negocios.component.css'
})
export class GestionNegociosComponent {
negocios: ItemNegocioDTO[];
constructor(private negocioService: NegociosService) {
this.negocios = [];
this.listarNegocios();
}
public listarNegocios(){
this.negocios = this.negocioService.listar();
}
}
