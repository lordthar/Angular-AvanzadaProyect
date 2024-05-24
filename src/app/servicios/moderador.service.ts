import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemNegocioDTO } from '../dto/itemNegocioDTO';
import { MensajeDTO } from '../dto/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class ModeradorService {

  private moderadoresUrl = "http://localhost:8080/api/moderadores";

  constructor(private http: HttpClient) { }

  public filtrarPorEstadoNegocio(estadoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadoresUrl}/filtrar-negocio-estado-negocio/${estadoNegocio}`);
  }

  public buscarNegocio(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadoresUrl}/buscar-negocio/${codigoNegocio}`);
  }
}
