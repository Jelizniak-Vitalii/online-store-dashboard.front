import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { AppRoutes } from './shared/constants';
import { AuthType } from './modules/auth/models';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // {
  //   path: AppRoutes.LOGIN,
  //   loadComponent: () => import('./modules/auth/auth.component').then(m => m.AuthComponent),
  //   data: { page: AuthType.LOGIN }
  // },
  // {
  //   path: AppRoutes.REGISTER,
  //   loadComponent: () => import('./modules/auth/auth.component').then(m => m.AuthComponent),
  //   data: { page: AuthType.REGISTER }
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
