import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ReservasModule } from '../reservas/reservas.module';


@NgModule({
  declarations: [
    UsersListComponent,
    CreateUserComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    ReservasModule,
    UsersRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatSnackBarModule,
    MatInputModule

  ],
  exports:[
    UsersListComponent,
    CreateUserComponent
  ]
})
export class UsersModule { }
