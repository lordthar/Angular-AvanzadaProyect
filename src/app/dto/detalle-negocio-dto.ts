import { HistorialRevision } from "./historial-revision";
import { horariosDTO } from "./horariosDTO";
import { ImagenDTO } from "./imagen-dto";
import { ubicacionDTO } from "./ubicacionDTO";
export class DetalleNegocioDTO {
    constructor(
        public nombre: string = '',
        public confirmarNombre: string = '',
        public descripcion: string = '',
        public codigoCliente: string = '',
        public codigoNegocio: string = '',
        public imagenes: ImagenDTO[]= [],
        public telefonos: string[] = [],
        public horarios: horariosDTO[] = [],
        public tipoNegocio: string = '',
        public ubicacion: ubicacionDTO = new ubicacionDTO(0.0),
        public estadoRegistro: string = '',
        public estadoNegocio: string = '',
        public historialRevisiones: HistorialRevision[] = []
      ) {}
}
