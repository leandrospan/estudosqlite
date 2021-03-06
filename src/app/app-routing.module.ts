import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'desenvolvedores', loadChildren: './desenvolvedores/desenvolvedores.module#DesenvolvedoresPageModule' },
  { path: 'desenvolvedor', loadChildren: './desenvolvedor/desenvolvedor.module#DesenvolvedorPageModule' },
  { path: 'banco001', loadChildren: './banco001/banco001.module#Banco001PageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
