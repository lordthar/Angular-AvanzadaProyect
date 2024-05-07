import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-header-inicio',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header-inicio.component.html',
  styleUrl: './header-inicio.component.css'
})
export class HeaderInicioComponent {
 
  constructor(private router: Router) { }
  public iraBusqueda(valor:string){
  if(valor){
  this.router.navigate(["/busqueda", valor]);
  }
  }
}
