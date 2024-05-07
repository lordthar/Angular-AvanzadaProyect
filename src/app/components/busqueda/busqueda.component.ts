import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { MapaService } from '../../servicios/mapa.service';
import { ItemNegocioDTO } from '../../dto/itemNegocioDTO';
import { HeaderInicioComponent } from '../header-inicio/header-inicio.component';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
@Component({
selector: 'app-busqueda',
standalone: true,
imports: [HeaderInicioComponent, FooterComponentComponent],
templateUrl: './busqueda.component.html',
styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit {
textoBusqueda: string;
resultados: ItemNegocioDTO[];
constructor(private route: ActivatedRoute, private negociosService: NegociosService, private mapaService: MapaService) {
    this.resultados = [];  
    this.textoBusqueda = "";
    this.route.params.subscribe(params => {
    this.textoBusqueda = params['texto'];
    this.resultados = this.negociosService.buscar(this.textoBusqueda);
    });
}
    ngOnInit(): void {
        this.mapaService.crearMapa();
        this.mapaService.pintarMarcadores(this.resultados);
    }
}