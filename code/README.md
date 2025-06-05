# 🗒️ Proyecto EcoExperienceTFG



## 🚀 Instalación y ejecución del proyecto 
Sigue los pasos a continuación para clonar y ejecutar la aplicación en tu entorno local. 

### 1️⃣ Clona el repositorio 
```bash 
	git clone https://github.com/gemarubi/ecoexperienceTFG 
	cd code
```
### 2️⃣ Instalación de dependencias
Es necesario instalar las dependencias :


#### ⚙️ Back-end:
1. Navega a la carpeta `back`: 
```bash
	cd back
```
2. Instala las dependencias de NestJS:
```bash
	npm install --legacy-peer-deps
```
#### 🎨 Front-end:
1. Navega a la carpeta `front`: 
```bash
	cd front
```
2. Instala las dependencias de Angular:
```bash
	npm install
```

### 3️⃣ Configuración del entorno

#### ⚙️ Back-end:

1. Configura la conexión a la base de datos en el archivo `.env`.

#### 🗄️ Base de datos:
En este punto puedes recurrir a dos opciones según tu preferencia:

1. Genera una base de datos vacía desde `phpMyAdmin` con el nombre que pongas en el archivo  `.env` en el parámetro `DB_DEV`, por ejemplo `ecoexperience`. Ahora ejecuta los comandos para lanzar las migraciones y poblar la base de datos mediante los seeders con:
```bash
	yarn typeorm migration:run -d data-source.ts
	yarn ts-node -r tsconfig-paths/register src/seeds/seed.ts
```
2. Importa la base de datos en tu `phpMyAdmin` con el archivo `.sql` que encontrarás en la carpeta del proyecto `/code`.

### 4️⃣ Conecta el proyecto con tu bbdd
En la carpeta back crea un archivo .env con la siguiente estructura y tus datos de la bbdd
```bash
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=nombreBBDD
DB_USER=tuUsuario
DB_PASS=tuContraseña
GOOGLE_API_KEY=AIzaSyB3SuMTfclsGIATMJHUdoyPgcu1BwK5GBM
GOOGLE_PLACE_ID=ChIJtdbC0aMgbQ0REWfdU78a2JY
```
### 4️⃣ Levanta el proyecto
Es necesario levantar el back y el front 

### 🌐 Aplicación principal

#### ⚙️ Back-end:
1. Inicia el servidor de desarrollo con NestJS. Asegúrate de abrir una terminal en `./code/back`.
```bash
	yarn start:dev
```
El servidor utiliza la dirección: http://localhost:3000.

#### 🎨 Front-end:
1. Inicia el servidor de desarrollo con Angular. Asegúrate de abrir una terminal en `./code/front`.
```bash
	ng serve 
```
El servidor utiliza la dirección: http://localhost:4200.


### 📝 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes consultar más detalles en el archivo `LICENSE`.

## 🔑 Credenciales de acceso
Para que puedas explorar la aplicación y probar sus funcionalidades, te proporcionamos esta cuenta: 

### 👑 Administrador
- **Correo:** `admin@nest.com` 
- **Contraseña:** `1234` 