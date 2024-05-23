export class RegistroClienteDTO {
    constructor(
    public nombre: string = '',
    public nickname: string = '',
    public fotoPerfil: string = '',
    public ciudadRecidencia: string = '',
    public email: string = '',
    public password: string = '',
    public telefonos:string[]= [],
    public confirmarPassword= ''
    ) { }
    }