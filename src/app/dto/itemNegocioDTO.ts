import { ubicacionDTO } from "./ubicacionDTO";
export class ItemNegocioDTO {
constructor(
public codigoNegocio: string = '',
public nombre: string = '',
public imagenDestacada: string = '',
public tipoNegocio: string = '',
public ubicacion: ubicacionDTO = new ubicacionDTO(),
public calificacionPromedio: number = 0,
public estadoNegocio:string = ''
){}
}