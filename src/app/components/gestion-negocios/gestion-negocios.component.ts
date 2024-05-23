import { Component, ElementRef, ViewChild } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/itemNegocioDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { TokenService } from '../../servicios/token.service';
import { FormsModule } from '@angular/forms';
import { MapaService } from '../../servicios/mapa.service';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
@Component({
selector: 'app-gestion-negocios',
standalone: true,
imports: [CommonModule, RouterModule, HeaderClienteComponent, FooterComponentComponent, FormsModule],
templateUrl: './gestion-negocios.component.html',
styleUrl: './gestion-negocios.component.css'
})
export class GestionNegociosComponent {
negocios: DetalleNegocioDTO[];
mostrarPopup: boolean = false;
mostrarPopupE: boolean = false;
codigoNegocioEliminar: string = '';
password: string = '';
  constructor(
    private negocioService: NegociosService,
    private tokenService: TokenService,
    private mapaService: MapaService
  ) {
    this.listarNegocios();
    this.negocios = [];
  }

  public mostrarPopupEditar(negocio: DetalleNegocioDTO): void {
    this.mostrarPopupE = true;
    setTimeout(() => {
      this.mapaService.crearMapa();
       this.mapaService.agregarMarcador()
    }, 0);
  }

    public listarNegocios(){
        const codigoCliente = this.tokenService.getCodigo();
        this.negocioService.listarNegociosPropietario(codigoCliente).subscribe({
            next: (data) => {
            this.negocios = data.respuesta;
        },
            error: (error) => {
            console.error(error);
            }
        });
    }


    public mostrarPopupEliminar(codigoNegocio: string): void {
        this.codigoNegocioEliminar = codigoNegocio;
        this.mostrarPopup = true;
      }
    
      public confirmarEliminar(): void {
        this.negocioService.eliminar(this.codigoNegocioEliminar).subscribe({
          next: (response) => {
            console.log(this.codigoNegocioEliminar);
            console.log('Negocio eliminado', response);
            this.mostrarPopup = false;
            this.password = this.tokenService.getContraseña();
            this.listarNegocios(); 
          },
          error: (error) => {
            console.error('Error al eliminar el negocio', error);
          }
        });
      }
    
      public cancelarEliminar(): void {
        this.mostrarPopup = false;
        this.password = '';
      }

      public cancelarEdit():void{
        this.mostrarPopupE = false;
      }


}


