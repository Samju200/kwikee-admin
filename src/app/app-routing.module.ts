import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    loadChildren: () => import('./shared/components/layout/layout.module').then(m => m.LayoutModule)
  },
  { path: 'list-kwik-max-rates', loadChildren: () => import('./pages/kwikmax-rate/list-kwik-max-rates/list-kwik-max-rates.module').then(m => m.ListKwikMaxRatesModule) },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
