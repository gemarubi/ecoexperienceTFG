import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AdminGuard } from '../auth/auth.guard';

const routes: Routes = [
 { path:'users-list',
  canActivate: [AdminGuard],
  component:UsersListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
