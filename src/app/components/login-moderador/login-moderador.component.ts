import { Component } from '@angular/core';
import { Alerta } from '../../dto/alerta';
import { LoginDTO } from '../../dto/login-dto';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertaComponentComponent } from '../alerta-component/alerta-component.component';

@Component({
  selector: 'app-login-moderador',
  standalone: true,
  imports: [RouterModule, FormsModule, AlertaComponentComponent],
  templateUrl: './login-moderador.component.html',
  styleUrl: './login-moderador.component.css'
})
export class LoginModeradorComponent {
  loginDTO: LoginDTO = new LoginDTO();
  alerta!: Alerta;

  constructor(private authService: AuthService, private tokenService: TokenService) { }

  public login() {
    this.authService.loginModerador(this.loginDTO).subscribe({
      next: data => {
        console.log("imprimo");
        
        this.tokenService.loginModerador(data.respuesta.token);
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
  }
}
