import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-header-moderador',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './header-moderador.component.html',
  styleUrl: './header-moderador.component.css'
})
export class HeaderModeradorComponent {

  constructor(private router: Router, private tokenService: TokenService) { }

  esPaginaInicio(): boolean {
    return this.router.url.endsWith("/moderador");
  }

  public logout() {
    this.tokenService.logout();
  }
}
