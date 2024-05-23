import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-moderador',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header-moderador.component.html',
  styleUrl: './header-moderador.component.css'
})
export class HeaderModeradorComponent {

  constructor(private router: Router) { }

  esPaginaInicio(): boolean {
    return this.router.url.endsWith("/moderador");
  }
}
