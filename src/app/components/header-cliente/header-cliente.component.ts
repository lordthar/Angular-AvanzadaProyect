import { Component, HostListener } from '@angular/core';
import {RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../servicios/cliente.service';
import { DetalleClienteDTO } from '../../dto/detalle-cliente-dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.css'
})
export class HeaderClienteComponent {
  isLogged = false;
  email: string = "";
  dropdownVisible = false;
  confirmPopUp = false;
  cliente: DetalleClienteDTO;
  myAccount = false;
  nombreClienteInput: string = '';
  constructor(private tokenService: TokenService, private clienteService: ClienteService) {
    this.cliente= new DetalleClienteDTO;
   }

   
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
    }
    this.obtenerDatosCliente();
  }
  public logout() {
    this.tokenService.logout();
  }
  toggleDropdown() {
    this.dropdownVisible = true;
  }

  myAccountSettings(){
     this.myAccount= true;
  }

  cancelarAccoutSettings(){
    this.myAccount=false;
  }
  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isDropdownButton = target.closest('.dropdown-button');
    if (!isDropdownButton && this.dropdownVisible) {
      this.dropdownVisible = false;
    }
  }

  obtenerDatosCliente(): void {
    const codigoCliente = this.tokenService.getCodigo(); 
    this.clienteService.obtenerCliente(codigoCliente).subscribe({
      next: (data) => {
        this.cliente = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  mostrarPopUpEliminarCuenta(idCliente: string){
    this.cliente.codigoCliente=idCliente;
    this.confirmPopUp=true;
  }

  cancelarPopUp(){
    this.confirmPopUp=false;
  }

  public sonIguales(): boolean {
    return this.nombreClienteInput === this.cliente.nombre;
  }

  public confirmarEliminar(): void {
    this.clienteService.eliminarCuenta(this.cliente.codigoCliente).subscribe({
      next: (response) => {
        this.confirmPopUp = false;
      },
      error: (error) => {
        console.error('Error al eliminar el negocio', error);
      }
    });
  }
}
