import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/itemNegocioDTO';
import { RegistroNegocioDTO } from '../dto/registroNegocioDTO';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { ActualizarNegocioDTO } from '../dto/actualizar-negocio-dto';
@Injectable({
    providedIn: 'root'
})
export class NegociosService {
    negocios: ItemNegocioDTO[];
    private negociosURL = "http://localhost:8080/api/guests";
    constructor(private http: HttpClient) {
        this.negocios = [];
    }
    public crear(negocioNuevo: RegistroNegocioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.negociosURL}/crear-negocio`, negocioNuevo);
    }

    public editarNegocio(negocioNuevo: ActualizarNegocioDTO): Observable<MensajeDTO> {
        return this.http.post<MensajeDTO>(`${this.negociosURL}/editar-negocio`, negocioNuevo);
        }
    public buscar(nombre: string): Observable<MensajeDTO> {
        return this.http.get<MensajeDTO>(`${this.negociosURL}/filtrar-por-nombre/${nombre}`);
      }
    public obtener(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/buscarNegocio/${codigoNegocio}`);
    }
    public eliminar(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.negociosURL}/eliminar-negocio/${codigoNegocio}`);
    }
    public listarNegociosPropietario(codigoCliente: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/listar-negocios-propietario/${codigoCliente}`);
    }
    public listarNegocios(): Observable<ItemNegocioDTO> {
        return this.http.get<ItemNegocioDTO>(`${this.negociosURL}/listar-negocios`);
        }

    
    
}