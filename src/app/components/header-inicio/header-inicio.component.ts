import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MapaService } from '../../servicios/mapa.service';
@Component({
  selector: 'app-header-inicio',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header-inicio.component.html',
  styleUrl: './header-inicio.component.css'
})
export class HeaderInicioComponent {
 
  constructor(private router: Router, private mapaService: MapaService) {

  }
  public iraBusqueda(valor:string){
  if(valor){
  this.router.navigate(["/busqueda", valor]);
  }
  }
}
