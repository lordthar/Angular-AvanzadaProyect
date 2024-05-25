export class RechazarNegocioDto {
    constructor(
        public idNegocio: string = '',
        public idModerador: string = '',
        public motivo: string = ''
    ) { }
}
