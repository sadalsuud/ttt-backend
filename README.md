<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Proyecto TTT

1. Clonar proyecto
2. ```npm install```
3. Renombrar el archivo ```.env.template``` a ```.env```
4. Cambiar las variables de entorno
5. Tener servidor de bd postgresql corriendo
6. Levantar proyecto: ```npm run start:dev```

# Explicación técnica
El proyecto se compone de dos modulos, auth para autenticación y registro. Tarea para la gestión de tareas. Se usa typeORM para mapear la
a base de datos postgresql y usando el decorador personalizado Auth() se obtiene el usuario
que le corresponde el token envíado en la petición de modo que se obtine el usuario de dicha petición y se usa para validar
pertenencia de la tarea que está tratando de editar o eliminar. Eto gracias a un bloque de nestJS llamado guard y el decorador
```UseGuards``` 

Se usa también uuid para identificar cada usuario y tearea, es decir como llave primaria, y en cada petición se envía codificado ese uuid 
dentro del JWT que se envía al cliente. 