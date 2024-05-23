import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../servicios/mapa.service';
import { HeaderInicioComponent } from '../header-inicio/header-inicio.component';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';
import { ItemNegocioDTO } from '../../dto/itemNegocioDTO';
import { CommonModule } from '@angular/common';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { NegocioDetalleComponentComponent } from '../negocio-detalle-component/negocio-detalle-component.component';
declare var mapboxgl: any;
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HeaderInicioComponent, FooterComponentComponent, BusquedaComponent,NegocioDetalleComponentComponent , CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  
  negocioSeleccionado: ItemNegocioDTO = new ItemNegocioDTO();
  mostrarCard: boolean = false;
  private directions!: MapboxDirections;
  constructor(private mapaService: MapaService){ }
  
  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: { inputs: true, instructions: true }
    });
    this.mapaService.mapa.addControl(this.directions, 'top-left');
    this.mapaService.marcadorSeleccionado.subscribe((negocio: ItemNegocioDTO) => {
      this.negocioSeleccionado = negocio;
    });
  }

  obtenerUbicacion(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.mapaService.mostrarNegociosCercanos(latitude, longitude)
        }
      );
    }
  }

  onMapClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const esMarcador = target.classList.contains('marker');
    if (esMarcador) {
        this.mostrarCard = true;
        setTimeout(() => {
            this.aplicarAnimationClass();
        }, 100);
    } else {
       this.mostrarCard=false;
    }
}
      
        aplicarAnimationClass(): void {
          const cardElement = document.querySelector('.card-animation');
          if (cardElement) {
                cardElement.classList.add('show-card');
            }
    }

}
