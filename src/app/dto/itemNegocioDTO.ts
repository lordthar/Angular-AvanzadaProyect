import { ubicacionDTO } from "./ubicacionDTO";
export class ItemNegocioDTO {
constructor(
public codigoNegocio: string = '',
public nombre: string = '',
public tipoNegocio: string = '',
public imagenes: string[]=[], 
public ubicacion: ubicacionDTO = new ubicacionDTO(),
public calificacionPromedio: number = 0,
public estadoNegocio:string = ''
){}
}