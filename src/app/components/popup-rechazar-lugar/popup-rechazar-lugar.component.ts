import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModeradorService } from '../../servicios/moderador.service';
import { Alerta } from '../../dto/alerta';
import { TokenService } from '../../servicios/token.service';
import { RechazarNegocioDto } from '../../dto/rechazar-negocio-dto';
import { AlertaComponentComponent } from '../alerta-component/alerta-component.component';
import { AprobarNegocioDto } from '../../dto/aprobar-negocio-dto';

@Component({
  selector: 'app-popup-rechazar-lugar',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule, AlertaComponentComponent],
  templateUrl: './popup-rechazar-lugar.component.html',
  styleUrl: './popup-rechazar-lugar.component.css'
})
export class PopupRechazarLugarComponent {

  @Input() isRechazar: boolean = false;
  rechazarNegocioDto: RechazarNegocioDto = new RechazarNegocioDto();
  aprobarNegocioDto: AprobarNegocioDto = new AprobarNegocioDto();
  @Input() idNegocio: string = '';
  alerta!: Alerta
  @Input('show')
  show = true

  @Output('close')
  onClose = new EventEmitter()

  constructor(private moderadorService: ModeradorService, private tokenService: TokenService) { 
    let codigoModerador = this.tokenService.getCodigo();
    this.rechazarNegocioDto.idModerador = codigoModerador;
    this.aprobarNegocioDto.codigoModerador = codigoModerador;
  }

  public rechazarOAprobar() {
    if (this.isRechazar) {
      this.rechazarNegocio();
    } else {
      this.aprobarNegocio();
    }
  }

  public rechazarNegocio() {
    this.rechazarNegocioDto.idNegocio = this.idNegocio;

    this.moderadorService.rechazarNegocio(this.rechazarNegocioDto).subscribe({
      next: data => {
        console.log("Rechazando negocio");
        
        console.log(data);
        
        this.alerta = new Alerta(data.respuesta, "succes");
      },
      error: error => {
        console.log("Rechazar");
        console.log(error);
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
    this.onClose.emit();
  }

  public aprobarNegocio() {
    this.aprobarNegocioDto.codigoNegocio = this.idNegocio;

    this.moderadorService.aprobarNegocio(this.aprobarNegocioDto).subscribe({
      next: data => {
        console.log("Aprobar negocio");
        
        console.log(data);
        this.alerta = new Alerta(data.respuesta, "succes");
      },
      error: error => {
        console.log("Rechazar");
        console.log(error);
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
    this.onClose.emit();
  }
}
