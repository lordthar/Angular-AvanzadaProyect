import { Component } from '@angular/core';
import { HeaderModeradorComponent } from '../header-moderador/header-moderador.component';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CambiarPasswordDto } from '../../dto/cambiar-password-dto';
import { ModeradorService } from '../../servicios/moderador.service';
import { Alerta } from '../../dto/alerta';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-cambiar-password-moderador',
  standalone: true,
  imports: [HeaderModeradorComponent, FooterComponentComponent, NgIf, CommonModule, FormsModule],
  templateUrl: './cambiar-password-moderador.component.html',
  styleUrl: './cambiar-password-moderador.component.css'
})
export class CambiarPasswordModeradorComponent {
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  confirmarPassword = '';
  alerta !: Alerta;
  cambiarNegocioDto: CambiarPasswordDto = new CambiarPasswordDto();

  constructor(private moderadorService: ModeradorService, private tokenService: TokenService) { }

  public cmabiarPassword() {
    this.cambiarNegocioDto.id = this.tokenService.getCodigo();
    this.cambiarNegocioDto.token =this.tokenService.getToken();
    console.log(this.cambiarNegocioDto);
    
    this.moderadorService.cambiarPassword(this.cambiarNegocioDto).subscribe({
      next: (data) => {
        this.alerta = new Alerta(data.respuesta, "success");
      },
      error: (error) => {
        console.log(error);
        
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
  }

  public sonIguales(): boolean {
    return this.cambiarNegocioDto.newPassword == this.confirmarPassword;
  }

  toggleCurrentPasswordVisibility(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
