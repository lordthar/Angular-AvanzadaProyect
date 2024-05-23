import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.css'
})
export class HeaderClienteComponent {
  isLogged = false;
  email: string = "";
  menuVisible = false;
  dropdownVisible = false;
  constructor(private tokenService: TokenService) { }
  ngOnInit(): void {
  this.isLogged = this.tokenService.isLogged();
  if (this.isLogged) {
  this.email = this.tokenService.getEmail();
  }
  }
  public logout() {
  this.tokenService.logout();
  }
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
