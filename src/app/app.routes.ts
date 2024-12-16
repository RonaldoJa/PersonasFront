import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './Guards/authenticated.guard';
import { NgModule } from '@angular/core';
import { AuthGuard } from './Guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },    
    {
      path: 'login',
      loadComponent: () => import('./auth/login/login.component'),
      canActivate: [AuthenticatedGuard],
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component'),
        canActivate: [AuthGuard],
      },
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}