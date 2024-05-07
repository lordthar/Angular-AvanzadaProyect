import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../servicios/mapa.service';
import { HeaderInicioComponent } from '../header-inicio/header-inicio.component';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HeaderInicioComponent, FooterComponentComponent, BusquedaComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  constructor(private mapaService: MapaService) { }
  
  ngOnInit(): void {
    this.mapaService.crearMapa();
  }
}
