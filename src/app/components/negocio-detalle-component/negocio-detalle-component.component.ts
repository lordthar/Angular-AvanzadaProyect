import { Component, Input } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/itemNegocioDTO';
import { ActivatedRoute } from '@angular/router';
import { MapaService } from '../../servicios/mapa.service';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-negocio-detalle-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './negocio-detalle-component.component.html',
  styleUrl: './negocio-detalle-component.component.css'
})
export class NegocioDetalleComponentComponent {
  @Input() negocio!: ItemNegocioDTO;

  mostrarPopupPQRS: boolean = false;
  tipoPQRS: string = '';
  tituloPQRS: string = '';
  descripcionPQRS: string = '';

  constructor(
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


  abrirPopupPQRS(): void {
    this.mostrarPopupPQRS = true;
  }

  CancelarPQRS():void{
    this.mostrarPopupPQRS= false;
  }
}
