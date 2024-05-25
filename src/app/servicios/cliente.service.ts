import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { ActualizarClienteDTO } from '../dto/actualizar-cliente-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientURL = "http://localhost:8080/api/clientes"

  constructor(private http: HttpClient) {}
  public obtenerCliente (codigo: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clientURL}/obtener-Cliente/${codigo}`);
  }
  public editarCliente (clienteActualizado: ActualizarClienteDTO): Observable<MensajeDTO>{
    return this.http.put<MensajeDTO>(`${this.clientURL}/editar-perfil`, clienteActualizado)
  }

  public eliminarCuenta(codigoCliente: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.clientURL}/eliminarCuentaCliente/${codigoCliente}`);
    }
}
