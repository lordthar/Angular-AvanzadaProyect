import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemNegocioDTO } from '../../dto/itemNegocioDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { HeaderModeradorComponent } from '../header-moderador/header-moderador.component';
import { PopupRechazarLugarComponent } from '../popup-rechazar-lugar/popup-rechazar-lugar.component';
import 'flowbite/plugin';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-negocio-moderador',
  standalone: true,
  imports: [FooterComponentComponent, HeaderModeradorComponent, PopupRechazarLugarComponent],
  templateUrl: './negocio-moderador.component.html',
  styleUrl: './negocio-moderador.component.css'
})
export class NegocioModeradorComponent {

  private idNegocio: string;
  mostrarPopup = false
  negocio: ItemNegocioDTO;
  lista: string[]

  constructor(private route: ActivatedRoute, private negocioService: NegociosService) {
    this.idNegocio = "";

    this.route.params.subscribe(params => {
      this.idNegocio = params["id-negocio"]
    });

    this.negocio = new ItemNegocioDTO;


    this.lista = [
      "https://picsum.photos/100", "https://picsum.photos/100", "https://picsum.photos/100",
      "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200",
      "https://picsum.photos/300", "https://picsum.photos/300", "https://picsum.photos/300",
      "https://picsum.photos/400", "https://picsum.photos/400", "https://picsum.photos/400",
    ]
  }

  public buscarNegocio() {
    this.negocioService.obtener(this.idNegocio).subscribe({
      next: data => {
        this.negocio = data.respuesta[0];
        console.log(this.negocio);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.buscarNegocio();
    setTimeout(() => {
      initFlowbite();
    }, 500);
  }
}
