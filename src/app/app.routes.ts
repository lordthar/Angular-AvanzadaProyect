import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GestionNegociosComponent } from './components/gestion-negocios/gestion-negocios.component';
import { CrearNegocioComponent } from './components/crear-negocio/crear-negocio.component';
import { FavoritosClienteComponent } from './components/favoritos-cliente/favoritos-cliente.component';
import { ComentariosNegocioComponent } from './components/comentarios-negocio/comentarios-negocio.component';
import { PqrsNegocioComponent } from './components/pqrs-negocio/pqrs-negocio.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { InicioClienteComponent } from './components/inicio-cliente/inicio-cliente.component';
import { CategoriasClienteComponent } from './components/categorias-cliente/categorias-cliente.component';
import { CategoriasGuestComponent } from './components/categorias-guest/categorias-guest.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
export const routes: Routes = [
{ path: '', component: InicioComponent },
{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
{ path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
{ path: "gestion-negocios", component: GestionNegociosComponent}, //canActivate: [RolesGuard],data: { expectedRole: ["CLIENTE"] } },
{ path: "crear-negocio", component: CrearNegocioComponent}, //canActivate: [RolesGuard], data: {expectedRole: ["CLIENTE"] } },
{path: "favoritos-cliente", component:FavoritosClienteComponent},
{path: "comentarios-negocio", component:ComentariosNegocioComponent},
{path: "pqrs-negocio", component:PqrsNegocioComponent},
{ path: "busqueda/:texto", component: BusquedaComponent },
{path: "inicio-cliente", component: InicioClienteComponent}, //canActivate:[RolesGuard], data: {expectedRole: ["CLIENTE"] }},
{path: "categorias-cliente", component: CategoriasClienteComponent},
{path: "categorias-guest", component: CategoriasGuestComponent},
{ path: "**", pathMatch: "full", redirectTo: "" }
];