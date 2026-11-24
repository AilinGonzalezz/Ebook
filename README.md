# Libros para tu Kindle

Sitio estático (HTML + CSS + JS, sin instalaciones) para publicar en GitHub Pages.

## Publicar en GitHub Pages

1. En GitHub, crea un repositorio nuevo (por ejemplo `libros-kindle`).
2. Sube **el contenido de esta carpeta** (no la carpeta en sí): `index.html`, `css/`, `js/`, `assets/` y `libros/`.
3. Ve a **Settings → Pages**. En *Build and deployment* elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
4. En uno o dos minutos el sitio queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.

## Estructura

```
index.html            página (incluye la ilustración animada de la intro)
css/styles.css        estilos y animación de la intro
js/main.js            control de la intro (primera visita, saltar, repetir)
assets/portadas/      portadas de los libros
assets/ilustracion.svg, fondo.svg   ilustración y fondo de la portada
assets/guia-kindle.mp4              video con los 4 pasos
libros/               archivos .epub (enlaces «Para Kindle»)
```

## Cosas que puedes cambiar

- **Intro:** se ve solo la primera vez (se guarda en el navegador de cada persona). Para probarla, agrega `?intro` a la dirección, o usa «Ver la bienvenida otra vez» en el pie.
- **Enlaces «Para Kindle»:** en `index.html`, cada libro tiene un `<a class="btn" href="libros/….epub">`. Si prefieres Google Drive u otro lugar, reemplaza solo ese `href` (y quita el atributo `download`).
- **Duración de la intro:** `DURACION_AUTO` al inicio de `js/main.js` (en milisegundos).
- **Colores:** variables al inicio de `css/styles.css`.
- **Tipografías:** se cargan desde Google Fonts (Young Serif y Outfit); si no hay conexión, el sitio usa tipografías del sistema.
