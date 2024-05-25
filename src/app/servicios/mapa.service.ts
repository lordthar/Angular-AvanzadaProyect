import { EventEmitter, Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/itemNegocioDTO';
import { Observable } from 'rxjs';
import { NegociosService } from './negocios.service';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

declare var mapboxgl: any;
@Injectable({
  providedIn: 'root'
})
export class MapaService {
  mapa: any;
  style: string = 'mapbox://styles/mapbox/outdoors-v12';
  marcadores: any[];
  private directions!: MapboxDirections;
  popup: any;
  marcadorSeleccionado: EventEmitter<ItemNegocioDTO> = new EventEmitter<ItemNegocioDTO>();
  private disableAddRoute: boolean = false;
  constructor(private negociosService: NegociosService) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGFudGhhcnVzIiwiYSI6ImNsdnBkanNwZDAweTUybXF0YzRsempqZngifQ.YYVc3CGkIxdnrb6_JxxA4w';
    this.marcadores = [];
  }
  public crearMapa() {
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: this.style,
      center: [-72.309, 4.473],
      zoom: 4.5
    });
    this.mapa.addControl(new mapboxgl.NavigationControl());
    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      })
    );
  }


  
  public agregarMarcador(): Observable<any> {
    const mapaGlobal = this.mapa;
    const marcadores = this.marcadores;
    return new Observable<any>(observer => {
      mapaGlobal.on('click', function (e: any) {
        marcadores.forEach(marcador => marcador.remove());
        const marcador = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(mapaGlobal);
        marcadores.push(marcador);
        observer.next(marcador._lngLat);
      });
    });
  }

  public agregarMarcadorRutas(coordenadas: number[]): void {
    const marker = new mapboxgl.Marker()
      .setLngLat(coordenadas)
      .addTo(this.mapa);
    this.marcadores.push(marker);
  }


  public pintarMarcadores(negocios: ItemNegocioDTO[]): void {
    negocios.forEach(negocio => {
      const markerElement = document.createElement('div');
      markerElement.className = 'marker';
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([negocio.ubicacion.longitud, negocio.ubicacion.latitud])
        .addTo(this.mapa);
  
      marker.getElement().addEventListener('click', (event: MouseEvent) => {
        if (!this.disableAddRoute) {
          this.marcadorSeleccionado.emit(negocio);
        }
        this.disableAddRoute = true;
        setTimeout(() => this.disableAddRoute = false, 0);
      });
      this.marcadores.push(marker);
    });
  }

  public mostrarNegociosCercanos(latitude: number, longitude: number): void {
    const negocios = this.negociosService.listarNegocios();
    negocios.forEach(negocio => {
      const markerElement = document.createElement('div');
      markerElement.className = 'marker';
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([ negocio.ubicacion.latitud,negocio.ubicacion.longitud])
        .addTo(this.mapa);
      marker.getElement().addEventListener('click', () => {
        this.marcadorSeleccionado.emit(negocio);
      });
      this.marcadores.push(marker);
    });
  }

  public mostrarRuta(origen: [number, number], destino: [number, number]): void {
    this.directions.setOrigin(origen);
    this.directions.setDestination(destino);
  }
}

