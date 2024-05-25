import { horariosDTO } from "./horariosDTO";
import { ubicacionDTO } from "./ubicacionDTO";
export class DetalleNegocioDTO {
    constructor(
        public nombre: string = '',
        public confirmarNombre: string = '',
        public descripcion: string = '',
        public codigoCliente: string = '',
        public codigoNegocio: string = '',
        public imagenes: string[]= [],
        public telefonos: string[] = [],
        public horarios: horariosDTO[] = [],
        public tipoNegocio: string='',
        public ubicacion: ubicacionDTO = new ubicacionDTO(0.0)
      ) {}
}
