import { Component,HostListener,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { MapaService } from '../../servicios/mapa.service';
import { ItemNegocioDTO } from '../../dto/itemNegocioDTO';
import { HeaderInicioComponent } from '../header-inicio/header-inicio.component';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { NegocioDetalleComponentComponent } from '../negocio-detalle-component/negocio-detalle-component.component';
import { CommonModule } from '@angular/common';
declare var mapboxgl: any;
@Component({
selector: 'app-busqueda',
standalone: true,
imports: [HeaderInicioComponent, FooterComponentComponent, NegocioDetalleComponentComponent, CommonModule],
templateUrl: './busqueda.component.html',
styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit {
textoBusqueda: string;
resultados: ItemNegocioDTO[];
negocioSeleccionado: ItemNegocioDTO = new ItemNegocioDTO();
mostrarCard: boolean = false;
private directions!: MapboxDirections;
constructor(private route: ActivatedRoute, private negociosService: NegociosService, private mapaService: MapaService) {
    this.resultados = [];  
    this.textoBusqueda = "";
    this.route.params.subscribe(params => {
    this.textoBusqueda = params['texto'];

    });
}
    ngOnInit(): void {
        this.mapaService.crearMapa();
        this.buscarNegocios(this.textoBusqueda);
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

    buscarNegocios(nombre: string): void {
        this.negociosService.buscar(nombre).subscribe({
          next: (resultados) => {
              this.resultados = resultados;
              console.log(this.resultados);
              this.mapaService.pintarMarcadores(this.resultados);
          },
          error: (error) => {
            console.error('Error al buscar negocios', error);
          }
        });
      }


}

