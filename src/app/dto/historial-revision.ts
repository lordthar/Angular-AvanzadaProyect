export class HistorialRevision {
    constructor(
        public codigoModerador: string = '',
        public fecha: Date = new Date(),
        public descripcion: string = '',
        public estadoNegocio: string = ''
    ) {}
}
