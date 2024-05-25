import { ubicacionDTO } from "./ubicacionDTO";
export class ItemNegocioDTO {
constructor(
public nombre: string = '',
public descripcion: string = '',
public codigoCliente: string = '',
public codigoNegocio: string = '',
public tipoNegocio: string = '',
public imagenes: string[]=[], 
public ubicacion: ubicacionDTO = new ubicacionDTO(),
public calificacionPromedio: number = 0,
public estadoNegocio:string = ''
){}
}