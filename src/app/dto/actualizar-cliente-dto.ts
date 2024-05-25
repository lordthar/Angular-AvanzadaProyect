export class ActualizarClienteDTO {
    constructor(
       public id: string= '',
        public nombre: string = '',
        public nickname: string = '',
        public fotoPerfil: string = '',
        public ciudadRecidencia: string = '',
        public telefonos: string[]= []
    ){}
}
