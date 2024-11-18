# Aplicación "Libreta + Chat con LLM"

## Descripción
Esta aplicación permite a los usuarios interactuar con un modelo de lenguaje (LLM) a través de un chat y gestionar sus tareas diarias mediante una libreta de recordatorios. La aplicación está diseñada para funcionar tanto en dispositivos móviles como en navegadores web, utilizando Ionic y Angular, usando autentificacion de usuarios mediante firebase.


## Páginas y Componentes principales
La mayoría de las funcionalidades aún están en desarrollo, pero se destacan las siguientes:
1. **Login**: Página de autenticación de usuarios.
2. **Creación de Cuenta**: Formulario para el registro de nuevos usuarios, que requiere un email único y una contraseña.
3. **Chat**: Interfaz de chat para interactuar con el modelo de lenguaje (LLM), con la capacidad de guardar tareas de forma automática en la libreta y asignar un horario de alarma.
4. **Libreta**: Página para gestionar tareas con funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar). Las tareas pueden ser visualizadas, editadas y eliminadas directamente desde la lista. Cada tarea puede tener, opcionalmente, un horario de notificación en el dispositivo móvil.
5. **Menú Desplegable**: Componente reutilizable para la navegación y opciones varias dentro de la aplicación.
6. **Componentes adicionales**:
   - **Formulario de Tareas**: Permite crear y editar tareas dentro de la página de Libreta.
   - **Botones Personalizados**: Elementos de interfaz diseñados para mejorar la experiencia del usuario.
   - **Animaciones** con Angular Material.
   - **Otras Páginas**: Adicionales para restablecer contraseña, entre otros servicios secundarios.



## Estructura del Proyecto
El proyecto sigue una estructura típica de una aplicación Angular con Ionic. A continuación, se detalla la estructura principal del proyecto:
## Estructura del Proyecto

myApp/
│
├── .angular/                # Configuración de Angular
├── .vscode/                 # Configuración de Visual Studio Code
├── node_modules/            # Dependencias instaladas del proyecto
├── src/                     # Código fuente del proyecto
│   ├── app/                 # Contiene todas las páginas, componentes y servicios de la app
│   │   ├── chat/            # Código de la página de chat y servicios relacionados con LLM
│   │   |──connection-status # Componente que indica y gestiona el estado de conexion.
│   │   ├── home/            # Página de inicio (no utilizada en este proyecto)
│   │   ├── libreta/         # Página de la libreta de tareas con CRUD implementado
│   │   ├── login/           # Página de autenticación de usuarios
│   │   ├── recover-key/     # Página para recuperación de contraseñas
│   │   ├── register/        # Página para el registro de nuevos usuarios
│   │   ├── services/        # Servicios, incluyendo el servicio de tareas y autentificación (TaskService, auth)
│   │   ├── app-routing.module.ts  # Módulo de enrutamiento de la aplicación
│   │   ├── app.component.ts       # Componente principal de la aplicación
│   │   ├── app.module.ts          # Módulo principal de la aplicación
│   │
│   ├── assets/              # Recursos estáticos (imágenes, íconos, etc.)
│   ├── environments/        # Configuración de entornos (producción/desarrollo)
│   ├── theme/               # Estilos globales de la aplicación (SCSS)
│
├── angular.json             # Configuración del proyecto Angular
├── capacitor.config.ts      # Configuración de Capacitor
├── ionic.config.json        # Configuración específica de Ionic
├── package.json             # Dependencias y scripts del proyecto
├── readme.md                # Archivo de documentación del proyecto
├── tsconfig.json            # Configuración de TypeScript


## Funcionalidades Implementadas
- **CRUD en la Libreta**: Es posible crear, editar y eliminar tareas en la libreta. Las tareas se almacenan localmente usando **Ionic Storage**, y son persistentes incluso después de cerrar y reabrir la aplicación.
- **Persistencia Local**: La libreta de tareas usa **Capacitor Preferences** para asegurar que las tareas se guarden de manera local en dispositivos móviles y navegadores.
- **Deslizamiento para Editar y Eliminar**: Las opciones de **Editar** y **Eliminar** están disponibles al deslizar cada tarea.
- **Autentificacion de usuario**: Es posible crear cuentas de usuario y autentificarse correctamente, haciendo uso de "firebase".
- **Recuperacion contraseña**: Es posible entregar el correo de cuenta, y recuperar la contraseña en el correo personal.
- **Desconectarse de la cuenta**: Es posible desconectarse de la cuenta al hacer click aparece un mensaje que dice se ha desconectado de forma exitosa.
- **Logo de coneccion**: Funciona correctamente al entrar como usuario autenticado o como invitado aparece un mensaje en cada uno con una barra que se despliega y luego desaparece, ademas aparece el logo con un mensaje que dice iniciando sesion
- **Boton de desconexion**: El boton de desconexion funciona correctamente y aparece como invisible al estar como invitado
- **Boton de Libreta**: El boton de libreta funciona correctamente y aparece el mensaje debes iniciar sesion para hacer uso de esta caracteristica.
- **Luz verde - gris de coneccion**: Funciona correctamente tanto como para entrar como usuario autenticado y invitado, es decir si se entra como usuario aparece con un circulo de color verde y si es invitado cambia a color gris.
**Arreglo de animacion: La animacion funciona de forma exitosa al iniciar sesion y al desconectarse.


## Funcionalidades del LLM
La aplicación utiliza un modelo de lenguaje (LLM) de OpenAI para interactuar con los usuarios en un chat. Las funciones implementadas incluyen:
- **Generación de Respuestas**: El LLM crea respuestas contextuales basadas en los mensajes del usuario.
- **Personalización**: Se ha configurado un *prompt customizable*.


### Módulos y Librerías Clave

- **@angular/common/http**: Facilita las solicitudes HTTP a la API de OpenAI.
- **rxjs**: Permite gestionar de manera reactiva la comunicación asíncrona con la API.


## Futuras Funcionalidades
- **Guardado de tareas con LLM**: El sistema LLM podrá guardar tareas de forma automatizada a petición del usuario, agregándolas a la libreta con un formato y horario predefinidos.(Alonso)
- **Tareas con Horario de Notificación**: Cada tarea podrá tener un horario de notificación asignado, y el celular activará la notificación en el horario acordado.(Alonso)



## Inicia el Servidor de Desarrollo con Ionic
Para iniciar el servidor de desarrollo y probar la aplicación en un navegador, utiliza el siguiente comando:

ionic serve


## Dependencias Clave
Ionic: Framework para construir aplicaciones móviles y web híbridas.
Angular: Framework para desarrollo de aplicaciones web.
Capacitor: Herramienta para acceder a APIs nativas en aplicaciones móviles.
Ionic Storage: Para la persistencia de datos localmente.
Capacitor Preferences: Utilizado para manejar el almacenamiento clave-valor en Capacitor 6.
SQLite: Base de datos ligera para almacenamiento local en dispositivos móviles.

## Archivos Importantes
angular.json: Configuración del proyecto Angular.
ionic.config.json: Configuración específica de Ionic.
capacitor.config.ts: Configuración de Capacitor para integrar funcionalidades nativas.
src/app: Contiene todos los componentes y páginas de la aplicación.
package.json: Listado de todas las dependencias y scripts del proyecto.

## Versiones usadas en el Proyecto
- **IONIC**: ionic --version "7.2.0"
- **ANGULAR**: ng --version "18.2.3"
--**FIREBASE**: firebase --version "10.14.0"
--**EXPRESS**: express --version "4.21.0"
--**SOCKET.IO**: socket.io --version "4.8.0"
--**TSLIB**: tslib --version "2.3.0"
--**ZONE.JS** zone.js --version "0.14.10"

- **CAPACITOR**:
   @capacitor/core: 6.1.2
   @capacitor/preferences: 1.2.5

## Firebase
   @angular/fire@18.0.1

## Instalaciones Realizadas
Para soportar las nuevas funcionalidades, se realizaron las siguientes instalaciones:

Angular Animations:
npm install @angular/animations

Ionic Storage:
npm install @ionic/storage-angular

Capacitor Preferences:
npm install @capacitor/preferences

Módulo HTTP de Angular: permite hacer solicitudes HTTP (como POST) al servidor de OpenAI.
npm install @angular/common/http


## Comando relacionados con capacitor y uso de la camara
npm install @capacitor/camera  Instala el plugin de la cámara
npx cap sync  Sincroniza las dependencias de Capacitor con las plataformas nativas.

ionic build  compila la aplicación, generando archivos 
npm run build compila la aplicación, generando scripts en packege.json


## Posibles errores de inicio y solucion
"Node packages may not be installed. Try installing with 'npm install'."
npm install firebase @angular/fire




## Reconstruir, Sincronizar y emular con android studio
ionic build
npx cap sync android
npx cap open android 
*Medium phone API TyramisuPrivacySandbox -->Run app.


## APK Sin Firmar
npx cap add android
npx cap sync
ionic capacitor build android
npx cap open android
*En Android Studio, selecciona Build > Build APK.
Esto generará la APK sin firmar, y Android Studio te proporcionará la ruta donde se guarda.

