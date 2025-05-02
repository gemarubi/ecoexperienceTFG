import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  standalone: false,
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['nombre', 'apellidos', 'correo', 'pais', 'roles', 'accion'];

  constructor(private userService: UserService,private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUsers()
  }

  createUser(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, { width: '900px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
        this.snackBar.open('Usuario creado con éxito', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      }
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error al obtener usuarios', err)
    });
  }
}
