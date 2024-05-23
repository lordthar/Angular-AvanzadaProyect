import { Component } from '@angular/core';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';
import { MapaService } from '../../servicios/mapa.service';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
declare var mapboxgl: any;
@Component({
  selector: 'app-inicio-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, FooterComponentComponent, BusquedaComponent],
  templateUrl: './inicio-cliente.component.html',
  styleUrl: './inicio-cliente.component.css'
})
export class InicioClienteComponent {
  private directions!: MapboxDirections;
  constructor(private mapaService: MapaService) { }
  
  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: { inputs: true, instructions: true }
    });
    this.mapaService.mapa.addControl(this.directions, 'top-left');
  }
}
