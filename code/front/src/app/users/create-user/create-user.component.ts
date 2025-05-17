import { Component, Inject, OnInit } from '@angular/core';
import { Role, User } from '../interfaces/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {
  user: User = {
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
    { id: 1, descripcion: 'Administrador' },
    { id: 2, descripcion: 'Cliente' },
    { id: 3, descripcion: 'Guía' }
  ];

  isEditMode = false;

  constructor(
    private dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.data?.user) {
      this.isEditMode = true;

      this.user = {
        ...this.data.user,
        roles: this.data.user.roles.map((r: Role) => r.id)
      };
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.validateUser()) {
      if (this.isEditMode) {
        this.userService.updateUser(this.user.id!, this.user).subscribe({
          next: (res) => this.dialogRef.close({ user: res, message:"Usuario actualizado correctamente" }),
          error: (err) => console.error('Error al actualizar usuario', err)
        });
      } else {
        this.userService.createUser(this.user).subscribe({
          next: (res) => this.dialogRef.close({ user: res, message:"Usuario creado correctamente" }),
          error: (err) => console.error('Error al crear usuario', err)
        });
      }
    }
  }

  private validateUser(): boolean {
    const { nombre, apellidos, tlfno, correo, dni, pais, pass, roles } = this.user;
    return !!(nombre && apellidos && tlfno && correo && dni && pais && pass && roles.length);
  }
}

