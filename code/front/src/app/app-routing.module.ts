import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/auth.guard';
import { HomePageComponent } from './home/home-page/home-page.component';
import { RutasModule } from './rutas/rutas.module';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'users',
    canActivate: [AdminGuard],
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
 { path: 'rutas',
    loadChildren: () => import('./rutas/rutas.module').then(m => m.RutasModule)},
    {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
