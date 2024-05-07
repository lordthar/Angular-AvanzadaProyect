import { Component } from '@angular/core';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';
import { PublicoService } from '../../servicios/publico.service';
import { AuthService } from '../../servicios/auth.service';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroClienteDTO: RegistroClienteDTO;
  ciudades: string[];
  archivos!:FileList;
  constructor(private publicoService: PublicoService,private authService: AuthService) {
  this.registroClienteDTO = new RegistroClienteDTO();
  this.ciudades = [];
  this.cargarCiudades();
}
public registrar() {
  if (this.registroClienteDTO.fotoPerfil != "") {
  this.authService.registrarCliente(this.registroClienteDTO).subscribe({
  next: (data) => {
  console.log("Cliente registrado");
  },
  error: (error) => {
  console.log("Error al registrar el cliente");
  }
  });
  } else {
  console.log("Debe cargar una foto");
  }
  }
  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confimarPassword;
  }
  
  private cargarCiudades() {
    this.publicoService.listarCiudades().subscribe({
    next: (data) => {
    this.ciudades = data.respuesta;
    },
    error: (error) => {
    console.log("Error al cargar las ciudades");
    }
    });
    }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
    }
    }
}
