import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  standalone: false,
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['nombre', 'apellidos','dni', 'correo', 'pais', 'roles', 'accion'];

  constructor(private userService: UserService,private dialog: MatDialog, private snackBar: MatSnackBar, private confirmDialog:MatDialog) {}

  ngOnInit(): void {
    this.loadUsers()
  }

  createUser(user?:User): void {
    const dialogRef = this.dialog.open(CreateUserComponent, { width: '900px', data:{user} });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
        this.snackBar.open(result.message, 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      }
    });
  }
  deleteUser(user:User):void{
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, { width: '500px', height:'250px', data:{user} });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        console.log(user)
        this.userService.deleteUser(user.id!).subscribe({
          next: () => {
            this.loadUsers();
            this.snackBar.open('Usuario borrado con éxito', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          },
          error: (err) => {
            console.error('Error al borrar usuario:', err);
            this.snackBar.open('Error al borrar usuario', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          }
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
