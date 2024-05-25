import { horariosDTO } from "./horariosDTO";
import { ubicacionDTO } from "./ubicacionDTO";

export class ActualizarNegocioDTO {
    constructor(
       public  idNegocio: string='',
        public nombre: string= '',
        public descripcion: string= '',
        public imagenes: string[]=[],
        public telefonos: string[]=[],
        public horarios: horariosDTO[]= [],
        public ubicacion: ubicacionDTO = new ubicacionDTO(0.0),
        public tipoNegocio: string = ''
    ){}
}
