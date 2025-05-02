import { Component, Inject } from '@angular/core';
import { Role, User } from '../interfaces/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  user:User = {
    nombre: '',
    apellidos: '',
    tlfno: '',
    correo: '',
    dni: '',
    pais: '',
    pass: '',
    roles: []
  };

  roles: Role[] = [
    { id: 1, descripcion: 'Admin' },
    { id: 2, descripcion: 'Cliente' }
  ];

  constructor(
    private dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.validateUser()) {
      this.userService.createUser(this.user).subscribe({
        next: (res) => this.dialogRef.close(res),
        error: (err) => console.error('Error al crear usuario', err)
      });
    }
  }

  private validateUser(): boolean {
    const { nombre, apellidos, tlfno, correo, dni, pais, pass, roles } = this.user;
    return !!(nombre && apellidos && tlfno && correo && dni && pais && pass && roles.length);
  }
}

