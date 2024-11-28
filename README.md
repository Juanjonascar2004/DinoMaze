# Proyecto: Laberinto de la Prehistoria (DinoMaze)

Este proyecto utiliza [Three.js](https://threejs.org/) para crear una escena 3D interactiva con un personaje, esferas, huevos y colisiones en un entorno tipo laberinto.
Somos Juan José, Angie Natalia y Camila y este es nuestro proyecto final.

## Características principales

- **Personaje principal (caveman): El modelo se carga desde un archivo GLTF y se posiciona en el inicio del laberinto.
- *Objetos dinámicos*:
  - **Huevos (eggs): Generados en posiciones aleatorias.
- *Física y colisiones*: Utiliza un octree para gestionar colisiones entre el personaje y el entorno.
- *Iluminación*:
  - Luz puntual dinámica para seguir al personaje.
  - Luz ambiental para iluminar la escena.
- *Controles del jugador*: Movimiento controlado por teclado (W, A, S, D y barra espaciadora para saltar).
- *Cámara dinámica*: Sigue al personaje mientras se mueve por la escena.

## Estructura del proyecto

- **games_fps.html**: Contiene el código principal.
- *Modelos 3D*:
  - caveman.gltf: Personaje principal.
  - eggs.gltf: Modelo de huevo.
  - collision-world.glb: Laberinto y entorno.
- *Librerías utilizadas*:
  - Three.js (Renderizado y físicas).
  - GLTFLoader (Carga de modelos GLTF).
  - Octree (Gestión de colisiones).

## Código principal (games_fps.html)
```javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

##Carga del personaje
loader.load('caveman.gltf', (gltf) => {
    caveman = gltf.scene;
    caveman.position.set(-20, -9, 1); // Posición inicial
    scene.add(caveman);
});
```
### Inicialización de la escena

javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });




##Carga del personaje
loader.load('caveman.gltf', (gltf) => {
    caveman = gltf.scene;
    caveman.position.set(-20, -9, 1); // Posición inicial
    scene.add(caveman);
});

## Controles para jugar
Movimiento:
W: Avanzar.
S: Retroceder.
A: Mover a la izquierda.
D: Mover a la derecha.
Espacio: Saltar.

## Cómo ejecutar el proyecto
Clona este repositorio.
Coloca los archivos GLTF en la carpeta models/gltf/.
Asegúrate de tener un servidor local (como Live Server).
Abre el html en el navegador con un servidor local.

# Disfruta
Ahora que ya estan las instrucciones, que esperas, disfruta el proyecto.




El index se para abrir el proyecto se llama: games_fps.html dentro de la carpeta de examples



