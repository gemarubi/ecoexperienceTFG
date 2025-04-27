import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
        id: number;
    @Column()
    descripcion:string;

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable({
      name: 'roles_asignados', // Nombre de la tabla intermedia en la BD
      joinColumn: { name: 'id_rol', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'id_user', referencedColumnName: 'id' },
    })
    rolesAsignados: User[];
}
