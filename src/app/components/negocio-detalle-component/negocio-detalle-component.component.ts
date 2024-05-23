import { Component, Input } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/itemNegocioDTO';
import { ActivatedRoute } from '@angular/router';
import { MapaService } from '../../servicios/mapa.service';
import { NegociosService } from '../../servicios/negocios.service';

@Component({
  selector: 'app-negocio-detalle-component',
  standalone: true,
  imports: [],
  templateUrl: './negocio-detalle-component.component.html',
  styleUrl: './negocio-detalle-component.component.css'
})
export class NegocioDetalleComponentComponent {
  @Input() negocio!: ItemNegocioDTO;

  constructor(
    private route: ActivatedRoute,
    private negocioService: NegociosService,
    private mapaService: MapaService
  ) {}

  mostrarRuta(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const origen: [number, number] = [position.coords.longitude, position.coords.latitude];
        const destino: [number, number] = [this.negocio.ubicacion.longitud, this.negocio.ubicacion.latitud];
        this.mapaService.mostrarRuta(origen, destino);
      });
    }
  }
}
