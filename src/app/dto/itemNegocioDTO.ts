import { ImagenDTO } from "./imagen-dto";
import { ubicacionDTO } from "./ubicacionDTO";
export class ItemNegocioDTO {
    constructor(
        public codigoNegocio: string = '',
        public nombre: string = '',
        public descripcion: string = '',
        public codigoCliente: string = '',
        public imagenes: ImagenDTO[] = [],
        public estadoNegocio: string = '',
        public tipoNegocio: string = '',
        public ubicacion: ubicacionDTO = new ubicacionDTO(),
        public calificacionPromedio: number = 0,
    ) { }
}