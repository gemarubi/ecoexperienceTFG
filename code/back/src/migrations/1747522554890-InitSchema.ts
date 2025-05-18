import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1747522554890 implements MigrationInterface {
    name = 'InitSchema1747522554890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rutas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipo\` varchar(255) NOT NULL, \`titulo\` varchar(255) NOT NULL, \`subtitulo\` varchar(255) NOT NULL, \`descripcion\` text NOT NULL, \`imagen\` varchar(255) NULL, \`precio\` decimal(10,2) NOT NULL, \`duracion\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tuktuk\` (\`matricula\` varchar(255) NOT NULL, \`capacidad\` int NOT NULL, PRIMARY KEY (\`matricula\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fecha\` date NOT NULL, \`hora\` varchar(255) NOT NULL, \`asistentes\` int NOT NULL, \`observaciones\` varchar(255) NULL, \`clienteId\` int NULL, \`guiaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descripcion\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(50) NOT NULL, \`apellidos\` varchar(150) NOT NULL, \`tlfno\` varchar(20) NOT NULL, \`correo\` varchar(255) NOT NULL, \`dni\` varchar(255) NULL, \`pais\` varchar(255) NOT NULL, \`pass\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, UNIQUE INDEX \`IDX_d3cf8c651c0e94ea522b61ca3a\` (\`correo\`), UNIQUE INDEX \`IDX_5fe9cfa518b76c96518a206b35\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rutas_reserva\` (\`id_reserva\` int NOT NULL, \`id_ruta\` int NOT NULL, INDEX \`IDX_e6f5eb767b19364830a45def77\` (\`id_reserva\`), INDEX \`IDX_0b8ba620bd6790db793d2bfd02\` (\`id_ruta\`), PRIMARY KEY (\`id_reserva\`, \`id_ruta\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tuk_tuk_reserva\` (\`id_reserva\` int NOT NULL, \`matricula_tuk_tuk\` varchar(255) NOT NULL, INDEX \`IDX_5274e5e729a26b503944cc1bc8\` (\`id_reserva\`), INDEX \`IDX_e9c5c1a233139d2f671d0061d5\` (\`matricula_tuk_tuk\`), PRIMARY KEY (\`id_reserva\`, \`matricula_tuk_tuk\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_asignados\` (\`id_rol\` int NOT NULL, \`id_user\` int NOT NULL, INDEX \`IDX_5667a03d4021fa069ea7669539\` (\`id_rol\`), INDEX \`IDX_35e9c57b3302b82320f63e7aaf\` (\`id_user\`), PRIMARY KEY (\`id_rol\`, \`id_user\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservas\` ADD CONSTRAINT \`FK_8ee0c58de71f30301e1b6994695\` FOREIGN KEY (\`clienteId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservas\` ADD CONSTRAINT \`FK_83cd86b407ad89400b3c4d4283e\` FOREIGN KEY (\`guiaId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rutas_reserva\` ADD CONSTRAINT \`FK_e6f5eb767b19364830a45def77b\` FOREIGN KEY (\`id_reserva\`) REFERENCES \`reservas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rutas_reserva\` ADD CONSTRAINT \`FK_0b8ba620bd6790db793d2bfd02e\` FOREIGN KEY (\`id_ruta\`) REFERENCES \`rutas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tuk_tuk_reserva\` ADD CONSTRAINT \`FK_5274e5e729a26b503944cc1bc83\` FOREIGN KEY (\`id_reserva\`) REFERENCES \`reservas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tuk_tuk_reserva\` ADD CONSTRAINT \`FK_e9c5c1a233139d2f671d0061d56\` FOREIGN KEY (\`matricula_tuk_tuk\`) REFERENCES \`tuktuk\`(\`matricula\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_asignados\` ADD CONSTRAINT \`FK_5667a03d4021fa069ea76695391\` FOREIGN KEY (\`id_rol\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_asignados\` ADD CONSTRAINT \`FK_35e9c57b3302b82320f63e7aafb\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_asignados\` DROP FOREIGN KEY \`FK_35e9c57b3302b82320f63e7aafb\``);
        await queryRunner.query(`ALTER TABLE \`roles_asignados\` DROP FOREIGN KEY \`FK_5667a03d4021fa069ea76695391\``);
        await queryRunner.query(`ALTER TABLE \`tuk_tuk_reserva\` DROP FOREIGN KEY \`FK_e9c5c1a233139d2f671d0061d56\``);
        await queryRunner.query(`ALTER TABLE \`tuk_tuk_reserva\` DROP FOREIGN KEY \`FK_5274e5e729a26b503944cc1bc83\``);
        await queryRunner.query(`ALTER TABLE \`rutas_reserva\` DROP FOREIGN KEY \`FK_0b8ba620bd6790db793d2bfd02e\``);
        await queryRunner.query(`ALTER TABLE \`rutas_reserva\` DROP FOREIGN KEY \`FK_e6f5eb767b19364830a45def77b\``);
        await queryRunner.query(`ALTER TABLE \`reservas\` DROP FOREIGN KEY \`FK_83cd86b407ad89400b3c4d4283e\``);
        await queryRunner.query(`ALTER TABLE \`reservas\` DROP FOREIGN KEY \`FK_8ee0c58de71f30301e1b6994695\``);
        await queryRunner.query(`DROP INDEX \`IDX_35e9c57b3302b82320f63e7aaf\` ON \`roles_asignados\``);
        await queryRunner.query(`DROP INDEX \`IDX_5667a03d4021fa069ea7669539\` ON \`roles_asignados\``);
        await queryRunner.query(`DROP TABLE \`roles_asignados\``);
        await queryRunner.query(`DROP INDEX \`IDX_e9c5c1a233139d2f671d0061d5\` ON \`tuk_tuk_reserva\``);
        await queryRunner.query(`DROP INDEX \`IDX_5274e5e729a26b503944cc1bc8\` ON \`tuk_tuk_reserva\``);
        await queryRunner.query(`DROP TABLE \`tuk_tuk_reserva\``);
        await queryRunner.query(`DROP INDEX \`IDX_0b8ba620bd6790db793d2bfd02\` ON \`rutas_reserva\``);
        await queryRunner.query(`DROP INDEX \`IDX_e6f5eb767b19364830a45def77\` ON \`rutas_reserva\``);
        await queryRunner.query(`DROP TABLE \`rutas_reserva\``);
        await queryRunner.query(`DROP INDEX \`IDX_5fe9cfa518b76c96518a206b35\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_d3cf8c651c0e94ea522b61ca3a\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`reservas\``);
        await queryRunner.query(`DROP TABLE \`tuktuk\``);
        await queryRunner.query(`DROP TABLE \`rutas\``);
    }

}
