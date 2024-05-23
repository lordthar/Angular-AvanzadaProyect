import { Component } from '@angular/core';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';
import { GuestService} from '../../servicios/guest.service';
import { AuthService } from '../../servicios/auth.service';
import { ImagenService } from '../../servicios/imagen.service';
import { AlertaComponentComponent } from '../alerta-component/alerta-component.component';
import { CommonModule } from '@angular/common';
import { Alerta } from '../../dto/alerta';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, AlertaComponentComponent, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroClienteDTO: RegistroClienteDTO;
  ciudades: string[];
  archivos!:FileList;
  alerta!:Alerta;
  constructor(private guestService: GuestService,private authService: AuthService, private imagenService: ImagenService) {
  this.registroClienteDTO = new RegistroClienteDTO();
  this.ciudades = [];
  this.cargarCiudades();
}
public registrar() {
  if (this.registroClienteDTO.fotoPerfil != "") {
  this.authService.registrarCliente(this.registroClienteDTO).subscribe({
  next: (data) => {
  this.alerta = new Alerta(data.respuesta, "success");
  },
  error: (error) => {
  this.alerta = new Alerta(error.error.respuesta, "danger");
  }
  });
  } else {
  this.alerta = new Alerta("Debe subir una imagen", "danger");
  }
  }
  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmarPassword;
  }
  
  private cargarCiudades() {
    this.ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
    }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
    }
    }

    public subirImagen() {
      if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
      next: data => {
      this.registroClienteDTO.fotoPerfil = data.respuesta.url;
      this.alerta = new Alerta("Se ha subido la foto", "success");
      },
      error: error => {
      this.alerta = new Alerta(error.error, "danger");
      }
      });
      } else {
      this.alerta = new Alerta("Debe seleccionar una imagen y subirla", "danger");
      }
      }

      agregarTelefono() {
        this.registroClienteDTO.telefonos.push('');
      }
      eliminarTelefono(index: number) {
        if (this.registroClienteDTO.telefonos.length > 1) {
          this.registroClienteDTO.telefonos.splice(index, 1);
        }
      }
}
