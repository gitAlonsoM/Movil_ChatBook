# Aplicación "Libreta + Chat con LLM"

## Descripción
Esta aplicación permite a los usuarios interactuar con un modelo de lenguaje (LLM) a través de un chat, y gestionar sus tareas diarias mediante una libreta de recordatorios. La aplicación está diseñada para funcionar tanto en dispositivos móviles como en navegadores web, utilizando Ionic y Angular.

## Páginas y Componentes principales
# Aun en desarrollo la mayoria de las funcionalidades
1. **Login**: Página de autenticación de usuarios.
2. **Creación de Cuenta**: Formulario para el registro de nuevos usuarios, requiere un email unico y una contraseña.
3. **Chat**: Interfaz de chat para interactuar con el modelo de lenguaje (LLM), tiene la capacidad de guardar tareas de forma automatica en la libreta, ademas de asignarle una hora de alarma.
4. **Libreta**: Página para gestionar tareas con funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar). Cada tarea puede tener de forma opcional un horario de notificacion en el celular.
5. **Menú Desplegable**: Componente reutilizable para la navegación y opciones varias dentro de la aplicación.
6. **Componentes adicionales**:
   - **Formulario de Tareas**: Para la gestión de tareas dentro de la página de Libreta.
   - **Botones Personalizados**: Elementos de interfaz diseñados para mejorar la experiencia de usuario.
   - **Animaciones** con angular material.
   - **Otras paginas** adicionales para restablecer contraseña, u otros servicios secundarios.


## Estructura del Proyecto
El proyecto sigue una estructura típica de una aplicación Angular con Ionic. Las carpetas de paginas,  componentes y servicios se encuentran todos en la carpeta src/app:
La mayoria se encuetra solo en estado de frontend sin funcionalidad completa.
- chat: Contiene el código para la página de chat y el servicio para gestionar la API de OpenAI.(Funcionando)
- libreta: Página para la gestión de tareas y recordatorios(Aun no funcional).
- login: Página de autenticación de usuarios(Aun no funcional).
- menu: Componente de menú desplegable con futuras opciones (aun no funcional).
- register: Página de registro de nuevos usuarios (aun no funcional).
- home: Página de inicio o bienvenida de la aplicación (no usada en el proyecto).
- recover-key: Pagina dedicada para recuperar contraseña, solicita el email, y se envia la contraseña de recuperacion     de cuenta al correo (en desarrollo).


## Futuras Funcionalidades
- **Guardado de tareas con LLM** : El sistema LLM puede guardar tareas de forma automatizada a peticion del usuario en la libreta. Agregando cada tarea en un formato predeterminado, más un horario determinado de notificacion, en donde podra visualizarse la tarea en la seccion de la libreta.
- **Tareas con horario de notificacion** : Las tareas tiene un horario asignado de notificacion, por lo que, segun la configuracion de notificacion de cada tarea, el celular activara la notificacion en el horario acordado.
- **Soporte Multimedia y Geolocalización en el Chat**: Permitir el envío de fotos, audios y la ubicación actual a través del chat.


## Inicia el servidor de desarrollo con Ionic:
ionic serve




## Dependencias Clave
Ionic: Framework para construir aplicaciones móviles y web híbridas.
Angular: Framework para desarrollo de aplicaciones web.
Capacitor: Herramienta para acceder a APIs nativas en aplicaciones móviles.
SQLite: Base de datos ligera para almacenamiento local de datos.


## Archivos Importantes
angular.json: Configuración del proyecto Angular.
ionic.config.json: Configuración específica de Ionic.
capacitor.config.ts: Configuración de Capacitor para integrar funcionalidades nativas.
src/app: Contiene todos los componentes y páginas de la aplicación.
package.json: Listado de todas las dependencias y scripts del proyecto.


## Version usada en el proyecto
IONIC: ionic --version   "7.2.0"
ANGULAR: ng --version   "18.2.3"

## Instalaciones realizadas
Angular Animations: npm install @angular/animations




