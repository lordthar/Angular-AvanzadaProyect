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

export const routes: Routes = [
{ path: '', component: InicioComponent },
{ path: 'login', component: LoginComponent },
{ path: 'registro', component: RegistroComponent },
{ path: "gestion-negocios", component: GestionNegociosComponent },
{path: "crear-negocio", component:CrearNegocioComponent},
{path: "favoritos-cliente", component:FavoritosClienteComponent},
{path: "comentarios-negocio", component:ComentariosNegocioComponent},
{path: "pqrs-negocio", component:PqrsNegocioComponent},
{ path: "busqueda/:texto", component: BusquedaComponent },
{ path: "**", pathMatch: "full", redirectTo: "" }
];