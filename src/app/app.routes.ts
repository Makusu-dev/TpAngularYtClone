import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
    {path: '', redirectTo: "/home", pathMatch:"full"},
    {path: 'home', loadComponent: ()=> import("./pages/home/home").then(m =>m.Home)},
    {path: 'login', loadComponent: ()=> import("./pages/login/login").then(m =>m.Login)},
    {path: 'register', loadComponent: ()=> import("./pages/register/register").then(m =>m.Register)},
    {path: 'login', loadComponent: ()=> import("./pages/login/login").then(m =>m.Login)},
    {path: 'potd', loadComponent: ()=> import("./pages/potd/potd").then(m =>m.POTD)},
    {path: 'search', loadComponent: ()=> import("./pages/search/search").then(m =>m.Search)},
    {path: 'admin',canActivate: [adminGuard], loadChildren: () => import('./pages/admin/admin').then(m => m.Admin), data: { role: 'ADMIN' } },
    //version si besoin de multiplier les routes admin
    // {path: 'admin',canActivate: [adminGuard], loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES), data: { role: 'ADMIN' } },
    {path: '**',loadComponent: ()=> import("./pages/not-found/not-found").then(m =>m.NotFound) }

];
