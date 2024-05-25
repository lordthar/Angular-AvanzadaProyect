import { Component, ElementRef, ViewChild } from '@angular/core';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { TokenService } from '../../servicios/token.service';
import { ActualizarNegocioDTO } from '../../dto/actualizar-negocio-dto';
import { FormsModule } from '@angular/forms';
import { MapaService } from '../../servicios/mapa.service';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
import { Alerta } from '../../dto/alerta';
@Component({
  selector: 'app-gestion-negocios',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderClienteComponent, FooterComponentComponent, FormsModule],
  templateUrl: './gestion-negocios.component.html',
  styleUrl: './gestion-negocios.component.css'
})
export class GestionNegociosComponent {
  negocios: DetalleNegocioDTO[];
  FuncionNegocio : DetalleNegocioDTO;
  actualizarNegocioDTO: ActualizarNegocioDTO;
  mostrarPopup: boolean = false;
  mostrarPopupE: boolean = false;
  nombreNegocioInput: string = '';
  alerta!:Alerta;
  constructor(private router: Router,private negocioService: NegociosService,private tokenService: TokenService,private mapaService: MapaService
  ) {
    this.FuncionNegocio= new DetalleNegocioDTO;
    this.listarNegocios();
    this.actualizarNegocioDTO= new ActualizarNegocioDTO;
    this.negocios = [];
  
  }
  
  public mostrarPopupEditar(negocio: DetalleNegocioDTO, idNegocio:string): void {
    this.FuncionNegocio.codigoNegocio = idNegocio;
    this.mostrarPopupE = true;
    setTimeout(() => {
      this.mapaService.crearMapa();
      this.mapaService.agregarMarcador().subscribe((marcador) => {
       this.actualizarNegocioDTO.ubicacion.latitud = marcador.lat;
        this.actualizarNegocioDTO.ubicacion.longitud = marcador.lng;
      });
    }, 0);
  }

  // mostrarNegocioaEditar(){
  //   this.negocioService.obtener(this.codigoNegocio).subscribe({
  //     next: data => {
  //       this.negocio = data.respuesta;
  //       this.telefonos = this.negocio.telefonos;
  //       this.horarios = this.negocio.horarios;
  //       this.mapaService.pintarMarcador(this.negocio);
  //       console.log(this.negocio);

  //     },
  //     error: error => {
  //       console.log(error.error);
  //       this.alerta = new Alerta(error.error.respuesta, "danger");
  //     }
  //   });
  //   if(this.negocio){
  //     this.horarios = this.negocio.horarios;
  //     this.telefonos = this.negocio.telefonos;
  
  //   }else{
  //     this.horarios = [ new Horario() ];
  //     this.telefonos = [""];
  //   }
  //   this.alerta = new Alerta("", "");
  //   this.actualizarNegocioDTO = new ActualizarNegocioDTO();
  //   this.fotos = [];
  // }
 

  public listarNegocios() {
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

  public actualizarNegocio(){
    if(this.actualizarNegocioDTO.nombre != ""){
      this.negocioService.editarNegocio(this.actualizarNegocioDTO).subscribe({
        next:(data) =>{
          this.alerta = new Alerta(data.respuesta, "success");
          this.router.navigate(['/gestion-negocios']);
        }
      },)
    }
  }


  public mostrarPopupEliminar(idNegocio:string): void {
    this.FuncionNegocio.codigoNegocio=idNegocio;
    this.mostrarPopup = true;
  }

  public confirmarEliminar(): void {
    this.negocioService.eliminar(this.FuncionNegocio.codigoNegocio).subscribe({
      next: (response) => {
        this.mostrarPopup = false;
      },
      error: (error) => {
        console.error('Error al eliminar el negocio', error);
      }
    });
  }

  public sonIguales(): boolean {
    return this.nombreNegocioInput === this.FuncionNegocio.nombre;
  }

  public cancelarEliminar(): void {
    this.mostrarPopup = false;
  }

  public cancelarEdit(): void {
    this.mostrarPopupE = false;
  }



}

