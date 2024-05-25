import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { HttpClient } from '@angular/common/http';
@Injectable({
providedIn: 'root'
})
export class PublicoService {
private publicoURL = "https://unilocal-proyect.onrender.com/api/publico";
constructor(private http: HttpClient) { }
public listarCiudades(): Observable<MensajeDTO> {
return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-ciudades`);
}
public listarTiposNegocio(): Observable<MensajeDTO> {
return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-tipos-negocio`);
}
}