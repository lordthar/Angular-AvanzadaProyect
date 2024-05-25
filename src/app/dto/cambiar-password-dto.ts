export class CambiarPasswordDto {
    constructor(
        public newPassword: string = '',
        public actualPassword: string = '',
        public id: string = '',
        public token: string | null = ''
    ) {}
}
