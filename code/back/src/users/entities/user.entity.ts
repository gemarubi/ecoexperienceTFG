import { Role } from "src/roles/entities/role.entity";
import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate, BeforeRemove, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany, ManyToMany } from "typeorm";

@Entity('users')

export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    @Column({ type: 'varchar', length: 150 })
    apellidos: string;
  
    @Column({ type: 'varchar', length: 20})
    tlfno: string;
  
    @Column({ type: 'varchar', unique: true  })
    correo: string;

    @Column({ type: 'varchar', unique: true, nullable:true })
    dni: string;

    @Column({ type: 'varchar' })
    pais: string;

    @Column({ type: 'varchar', nullable:true })
    pass?: string;
    
    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true }) 
    deletedAt?: Date;

    @ManyToMany(() => Role, (rol) => rol.rolesAsignados)
    roles: Role[];
}
