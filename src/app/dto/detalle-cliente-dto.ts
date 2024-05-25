export class DetalleClienteDTO {
    constructor(
        public codigoCliente: string='',
        public nombre: string= '',
        public fotoPerfil: string='',
        public nickname: string='',
        public email: string='',
        public ciudadResidencia: string='',
        public telefonos: string[]=[],
    ){}
}
