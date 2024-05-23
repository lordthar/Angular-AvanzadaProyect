import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MapaService } from '../../servicios/mapa.service';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroNegocioDTO } from '../../dto/registroNegocioDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { AlertaComponentComponent } from '../alerta-component/alerta-component.component';
import { FormsModule } from '@angular/forms';
import { MensajeDTO } from '../../dto/mensaje-dto';
import { Alerta } from '../../dto/alerta';
import { ImagenService } from '../../servicios/imagen.service';
import { horariosDTO } from '../../dto/horariosDTO';
import { TokenService } from '../../servicios/token.service';


@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [RouterModule, CommonModule, AlertaComponentComponent, FormsModule],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent implements OnInit {
  
  registroNegocioDTO: RegistroNegocioDTO;
  alerta!: Alerta;
  dias: string[];
  tiposNegocio: string[] = ['BAR', 'TIENDA', 'SUPERMERCADO', 'DISCOTECA', 'PANADERIA', 'MUSEO', 'RESTAURANTE', 'CAFETERIA', 'OTRO'];
  archivos!:any[];
  longitud:string =''
  latitud:string =''

  constructor(private router: Router,private mapaService: MapaService,private tokenService: TokenService ,private negocioService: NegociosService, private imagenService: ImagenService) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.dias = [];
    this.tiposNegocio= [];
    this.archivos= [];
    this.cargarDiasSemana();
   }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }
 
  private cargarDiasSemana(){
    this.dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo" ]
  }

  public subirImagen() {
    if (this.archivos && this.archivos.length > 0) {
      this.archivos.forEach(foto => {
        const formData = new FormData();
        formData.append('file', foto);
        this.imagenService.subir(formData).subscribe({
          next: data => {
            this.registroNegocioDTO.imagenes.push(data.respuesta.url);
            this.alerta = new Alerta("Se ha subido la foto", "success");
          },
          error: error => {
            this.alerta = new Alerta(error.error, "danger");
          }
        });
      });
    } else {
      this.alerta = new Alerta("Debe seleccionar una imagen y subirla", "danger");
    }
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos.push(event.target.files[0]);
    }
  }

  crearNegocio(): void {
    this.registroNegocioDTO.codigoCliente = this.tokenService.getCodigo();
    console.log(this.registroNegocioDTO)
    this.negocioService.crear(this.registroNegocioDTO).subscribe({
      next: (mensaje: MensajeDTO) => {
        this.alerta = new Alerta(mensaje.respuesta, 'success');
        this.router.navigate(['/gestion-negocios'])
      },
      error: (error) => {
        this.alerta = new Alerta(error.error.respuesta, 'danger');
      }
    });
  }


  agregarTelefono() {
    this.registroNegocioDTO.telefonos.push("");
  }
  eliminarTelefono(index: number) {
    if (this.registroNegocioDTO.telefonos.length > 1) {
      this.registroNegocioDTO.telefonos.splice(index, 1);
    }
  }

  agregarHorario() {
    const nuevoHorario = new horariosDTO("", "", "");
    this.registroNegocioDTO.horarios.push(nuevoHorario);
  }
  
  eliminarHorario(index: number) {
    if (this.registroNegocioDTO.horarios.length > 1) {
      this.registroNegocioDTO.horarios.splice(index, 1);
    }
  }
}
