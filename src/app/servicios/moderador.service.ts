import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { RechazarNegocioDto } from '../dto/rechazar-negocio-dto';
import { CambiarPasswordDto } from '../dto/cambiar-password-dto';
import { AprobarNegocioDto } from '../dto/aprobar-negocio-dto';

@Injectable({
  providedIn: 'root'
})
export class ModeradorService {

  private moderadoresUrl = "http://localhost:8080/api/moderadores";

  constructor(private http: HttpClient) { }

  public listarEstadosNegocio(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadoresUrl}/listar-estados-negocio`);
  }

  public eliminarCuenta(idModerador: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.moderadoresUrl}/eliminar-cuenta/${idModerador}`);
  }

  public cambiarPassword(cambioPasswordDTO: CambiarPasswordDto): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.moderadoresUrl}/cambiar-password`, cambioPasswordDTO);
  }

  public aprobarNegocio(aprobarNegocioDTO: AprobarNegocioDto): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.moderadoresUrl}/aprobar-negocio`, aprobarNegocioDTO);
  }

  public rechazarNegocio(rechazarNegocioDTO: RechazarNegocioDto): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.moderadoresUrl}/rechazar-negocio`, rechazarNegocioDTO);
  }

  public obtenerModerador(idModerador: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadoresUrl}/obtener-moderador/${idModerador}`);
  }

  public buscarNegocio(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadoresUrl}/buscar-negocio/${codigoNegocio}`);
  }

  public filtrarPorNombreNegocio(nombreNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadoresUrl}/filtrar-negocio-nombre/${nombreNegocio}`);
  }

  public filtrarPorEstadoNegocio(estadoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadoresUrl}/filtrar-negocio-estado-negocio/${estadoNegocio}`);
  }
}
