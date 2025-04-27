import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1745746382085 implements MigrationInterface {
    name = 'InitSchema1745746382085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descripcion\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(50) NOT NULL, \`apellidos\` varchar(150) NOT NULL, \`tlfno\` varchar(20) NOT NULL, \`correo\` varchar(255) NOT NULL, \`dni\` varchar(255) NULL, \`pais\` varchar(255) NOT NULL, \`pass\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, UNIQUE INDEX \`IDX_d3cf8c651c0e94ea522b61ca3a\` (\`correo\`), UNIQUE INDEX \`IDX_5fe9cfa518b76c96518a206b35\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_asignados\` (\`id_rol\` int NOT NULL, \`id_user\` int NOT NULL, INDEX \`IDX_5667a03d4021fa069ea7669539\` (\`id_rol\`), INDEX \`IDX_35e9c57b3302b82320f63e7aaf\` (\`id_user\`), PRIMARY KEY (\`id_rol\`, \`id_user\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`roles_asignados\` ADD CONSTRAINT \`FK_5667a03d4021fa069ea76695391\` FOREIGN KEY (\`id_rol\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_asignados\` ADD CONSTRAINT \`FK_35e9c57b3302b82320f63e7aafb\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`
            INSERT INTO roles (descripcion) VALUES 
              ('Admin'),
              ('Cliente'),
              ('Guia')
          `);
        await queryRunner.query(`
            INSERT INTO users (nombre, apellidos, tlfno, correo,dni,pais,pass) VALUES 
              ('Lucía','Rubio Sánchez','+34666666666','admin@nest.com','123456','España','1234')
            `)
        await queryRunner.query(`
                INSERT INTO roles_asignados (id_rol, id_user) VALUES 
                  (1,1)
                `)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_asignados\` DROP FOREIGN KEY \`FK_35e9c57b3302b82320f63e7aafb\``);
        await queryRunner.query(`ALTER TABLE \`roles_asignados\` DROP FOREIGN KEY \`FK_5667a03d4021fa069ea76695391\``);
        await queryRunner.query(`DROP INDEX \`IDX_35e9c57b3302b82320f63e7aaf\` ON \`roles_asignados\``);
        await queryRunner.query(`DROP INDEX \`IDX_5667a03d4021fa069ea7669539\` ON \`roles_asignados\``);
        await queryRunner.query(`DROP TABLE \`roles_asignados\``);
        await queryRunner.query(`DROP INDEX \`IDX_5fe9cfa518b76c96518a206b35\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_d3cf8c651c0e94ea522b61ca3a\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
