import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import { LoginDTO} from '../../dto/login-dto';
import { Alerta } from '../../dto/alerta';
import { AlertaComponentComponent } from '../alerta-component/alerta-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, AlertaComponentComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginDTO: LoginDTO = new LoginDTO();
  alerta!: Alerta
  constructor(private authService: AuthService, private tokenService: TokenService) { }
  
  public login() {
    this.authService.loginCliente(this.loginDTO).subscribe({
    next: data => {
    this.tokenService.login(data.respuesta.token);
    },
    error: error => {
    this.alerta = new Alerta(error.error.respuesta, "danger" );
    }
    });
    }
}
