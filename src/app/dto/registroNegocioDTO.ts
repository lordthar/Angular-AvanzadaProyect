import { horariosDTO } from "./horariosDTO";
import { ubicacionDTO } from "./ubicacionDTO";
export class RegistroNegocioDTO {
constructor(
public nombre: string = '',
public descripcion: string = '',
public codigoCliente: string = '',
public ubicacion: ubicacionDTO = new ubicacionDTO(0.0),
public imagenes: string[] = [],
public tipoNegocio: string = '',
public horarios: horariosDTO[] = [],
public telefonos: string[] = []
) { }
}