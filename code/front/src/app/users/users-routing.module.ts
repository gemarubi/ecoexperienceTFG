import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AdminGuard } from '../auth/auth.guard';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ReservasListComponent } from '../reservas/reservas-list/reservas-list.component';

const routes: Routes = [
    {
    path: '',
     canActivate: [AdminGuard],
    component: AdminPageComponent,
    children: [
      { path: 'users-list', component: UsersListComponent },
      { path: 'reservas', component: ReservasListComponent},
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
