## Descripcion:
Geek Shop es una tienda virtual para productos Geeks, especificamente sobre Animes y Comics.
Tecnologías: 
-Next.js: para el desarrollo del frontend, garantizando una tienda rápida y optimizada.
-Tailwind CSS: para diseñar una interfaz moderna y adaptable a múltiples dispositivos.
-Prisma + PostgreSQL: para la estructuración y manejo de la base de datos.
-Auth.js: Para manejar autenticación segura de los usuarios.
-Zustand y Redux Toolkit: para la gestión de estados.
-Swiper: para mejorar la visualización de productos a través de sliders interactivos.
-GitHub: para el control de versiones.

## Empezando
Este es un proyecto [Next.js](https://nextjs.org) arrancado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Correr en dev

1-Clonar repositori
2-Crea copia del `.env.template` y cambiarle el nombre a `.env`
3-Cambiar variables de entorno
4-Instalar dependencias con `npm install`
5-Levantar la base de datos con `docker compose up -d`
6-Correr las migraciones de Prisma con `npx prisma migrate dev`
7-Ejecutar seed `npm run seed`
7-Correr el proyecto con `npm run dev`

## Más información

Para saber más sobre Next.js, echa un vistazo a los siguientes recursos:

-Documentación de Next.js](https://nextjs.org/docs): información sobre las características y la API de Next.js.
-Learn Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.

Puedes consultar [el repositorio GitHub de Next.js](https://github.com/vercel/next.js)