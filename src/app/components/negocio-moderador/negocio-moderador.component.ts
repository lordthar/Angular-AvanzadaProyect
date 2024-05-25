  import { Component } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { FooterComponentComponent } from '../footer-component/footer-component.component';
  import { HeaderModeradorComponent } from '../header-moderador/header-moderador.component';
  import { PopupRechazarLugarComponent } from '../popup-rechazar-lugar/popup-rechazar-lugar.component';
  import 'flowbite/plugin';
  import { initFlowbite } from 'flowbite';
  import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
  import { ModeradorService } from '../../servicios/moderador.service';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-negocio-moderador',
    standalone: true,
    imports: [FooterComponentComponent, HeaderModeradorComponent, PopupRechazarLugarComponent, CommonModule],
    templateUrl: './negocio-moderador.component.html',
    styleUrl: './negocio-moderador.component.css'
  })
  export class NegocioModeradorComponent {

    private idNegocio: string;
    isRechazar: boolean = false;
    mostrarPopup = false
    negocio: DetalleNegocioDTO;

    constructor(private route: ActivatedRoute, private moderadorService: ModeradorService) {
      this.idNegocio = "";
      this.negocio = new DetalleNegocioDTO();
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.idNegocio = params["id-negocio"];
        this.buscarNegocio();
      });
    }

    public cerrarPopUp() {
      this.mostrarPopup=false;
      this.buscarNegocio();
      window.location.reload();
    }

    buscarNegocio(): void {
      this.moderadorService.buscarNegocio(this.idNegocio).subscribe({
        next: data => {
          this.negocio = data.respuesta;
        },
        error: error => {
          console.error(error);
        }
      });
    }

    ngAfterViewInit(): void {
      setTimeout(() => {
        initFlowbite();
      }, 500);
    }
  }
