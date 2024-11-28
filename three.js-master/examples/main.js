var clock=null,
scene=null,
renderer=null,
camera=null
conteiner=null,
stats=null;

const loader = new GLTFLoader().setPath( './models/gltf/' );
let caveman=null;

const GRAVITY = 25;
const STEPS_PER_FRAME = 5;
const worldOctree = new Octree();
let playerOnFloor = false;
let mouseTime = 0;
const keyStates = {};
let isCavemanLoaded = false;
const vector1 = new THREE.Vector3();
const vector2 = new THREE.Vector3();
const vector3 = new THREE.Vector3();

function start(){
    window.onresize = onWindowResize;
    initScene();
    animate();
}

function initScene(){
    initBasicElements(); // Scene, Camera and Render
    initSound();         // To generate 3D Audio
    createLight();       // Create light
    initWorld();
    createCaveman();
    //createPlayerMove();
    //createFrontera();
    createCollectibles(5);
    
}

function initBasicElements(){
			clock = new THREE.Clock();

			 scene = new THREE.Scene();
			scene.background = new THREE.Color( 0x000000 );
			//scene.fog = new THREE.Fog( 0x88ccee, 0, 50 );

			 camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
			camera.rotation.order = 'YXZ';

			/*const fillLight1 = new THREE.HemisphereLight( 0x8dc1de, 0x00668d, 1.5 );
			fillLight1.position.set( 2, 1, 1 );
			scene.add( fillLight1 );*/

			/*const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
			directionalLight.position.set( - 5, 25, - 1 );
			directionalLight.castShadow = true;
			directionalLight.shadow.camera.near = 0.01;
			directionalLight.shadow.camera.far = 500;
			directionalLight.shadow.camera.right = 30;
			directionalLight.shadow.camera.left = - 30;
			directionalLight.shadow.camera.top	= 30;
			directionalLight.shadow.camera.bottom = - 30;
			directionalLight.shadow.mapSize.width = 1024;
			directionalLight.shadow.mapSize.height = 1024;
			directionalLight.shadow.radius = 4;
			directionalLight.shadow.bias = - 0.00006;
			scene.add( directionalLight );*/

			 container = document.getElementById( 'container' );

		    renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setAnimationLoop( animate );
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.VSMShadowMap;
			renderer.toneMapping = THREE.ACESFilmicToneMapping;
			container.appendChild( renderer.domElement );

		    stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '0px';
			//container.appendChild( stats.domElement );
}

function createLight(){
    const light = new THREE.PointLight( 0xd68910, 10, 0 );
			scene.add( light );
}


function createCaveman(){
  loader.load( 'caveman.gltf', ( gltf ) => {

    caveman = gltf.scene; // Nodo raíz del modelo
    caveman.scale.set(1, 1, 1); // Escalar el modelo para que se vea correctamente
    //caveman.position.set(0,-9,1)
    scene.add( caveman ); // Agregar el modelo a la escena

    // Aquí se pueden configurar propiedades del modelo si es necesario
    caveman.castShadow = true; // Hacer que el modelo proyecte sombras
    caveman.receiveShadow = true; // Hacer que el modelo reciba sombras

    // Si el modelo tiene texturas, podemos configurar la anisotropía para mejorar la calidad visual
    caveman.traverse( child => {
      if ( child.isMesh && child.material.map ) {
        child.material.map.anisotropy = 4; // Mejorar la calidad de las texturas
      }
    });
	isCavemanLoaded = true;

    // Si es necesario, puedes agregar la octree para el modelo
//    worldOctree.fromGraphNode( model );

    console.log("Modelo 'caveman' cargado correctamente.");

  }, undefined, ( error ) => {
    console.error( 'Ocurrió un error al cargar el modelo GLTF:', error );
  });
}

function createCollectibles (factor2Create){
    let posIntX = -2;
  
    for (k = 0; k<factor2Create; k++){
      createEggs(k);
      posIntX =+10;
    }
  }

function createEggs(iden){
		loader.load( 'eggs.gltf', ( gltf ) => {

eggs = gltf.scene; // Nodo raíz del modelo
eggs.scale.set(1, 1, 1); // Escalar el modelo para que se vea correctamente
var randomX = Math.random() * 8 - 0; // Rango de -3 a 3
var randomZ = Math.random() * 6 - 0; // Rango de -3 a 3

  eggs.position.x= randomX;
  eggs.position.z= randomZ;
scene.add( eggs ); // Agregar el modelo a la escena

eggs.name ="eggs"+ iden;
  eggs.id  ="eggs"+ iden;

// Aquí se pueden configurar propiedades del modelo si es necesario
egg.castShadow = true; // Hacer que el modelo proyecte sombras
egg.receiveShadow = true; // Hacer que el modelo reciba sombras

// Si el modelo tiene texturas, podemos configurar la anisotropía para mejorar la calidad visual
egg.traverse( child => {
  if ( child.isMesh && child.material.map ) {
	child.material.map.anisotropy = 4; // Mejorar la calidad de las texturas
  }
});
//isCavemanLoaded = true;

// Si es necesario, puedes agregar la octree para el modelo
//    worldOctree.fromGraphNode( model );

console.log("Modelo 'eggs' cargado correctamente.");

}, undefined, ( error ) => {
console.error( 'Ocurrió un error al cargar el modelo GLTF:', error );
});
	}


			const cubeCollider = new Capsule( new THREE.Vector3( 0, 0.35, 0 ), new THREE.Vector3( 0, 1, 0 ), 0.35 );
			const cubeVelocity = new THREE.Vector3();
			const cubeDirection = new THREE.Vector3();


			document.addEventListener( 'keydown', ( event ) => {

				keyStates[ event.code ] = true;

			} );

			document.addEventListener( 'keyup', ( event ) => {

				keyStates[ event.code ] = false;

			} );

			container.addEventListener( 'mousedown', () => {

				document.body.requestPointerLock();

				mouseTime = performance.now();

			} );

			/*document.addEventListener( 'mouseup', () => {

				if ( document.pointerLockElement !== null ) throwBall();

			} );*/

			document.body.addEventListener( 'mousemove', ( event ) => {

				if ( document.pointerLockElement === document.body ) {

					caveman.rotation.y -= event.movementX / 500;
				//	cube.rotation.x -= event.movementY / 500;
				}

			} );

			window.addEventListener( 'resize', onWindowResize );

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function playerCollisions() {

				const result = worldOctree.capsuleIntersect( cubeCollider );

				playerOnFloor = false;

				if ( result ) {

					playerOnFloor = result.normal.y > 0;

					if ( ! playerOnFloor ) {

						cubeVelocity.addScaledVector( result.normal, - result.normal.dot( cubeVelocity ) );

					}

					if ( result.depth >= 1e-10 ) {

						cubeCollider.translate( result.normal.multiplyScalar( result.depth ) );

					}

				}

			}

			function updatePlayer( deltaTime ) {
				if (!isCavemanLoaded) return;

				let damping = Math.exp( - 4 * deltaTime ) - 1;

				if ( ! playerOnFloor ) {

					cubeVelocity.y -= GRAVITY * deltaTime;

					// small air resistance
					damping *= 0.1;

				}

				cubeVelocity.addScaledVector( cubeVelocity, damping );

				const deltaPosition = cubeVelocity.clone().multiplyScalar( deltaTime );
				cubeCollider.translate( deltaPosition );

				playerCollisions();

				caveman.position.copy( cubeCollider.end );

			}

			function getForwardVector() {

				caveman.getWorldDirection( cubeDirection );
				cubeDirection.y = 0;
				cubeDirection.normalize();

				return cubeDirection;

			}

			function getSideVector() {

				caveman.getWorldDirection( cubeDirection );
				cubeDirection.y = 0;
				cubeDirection.normalize();
				cubeDirection.cross(caveman.up );

				return cubeDirection;

			}

			function controls( deltaTime ) {
				if (!isCavemanLoaded) return;
				// gives a bit of air control
				const speedDelta = deltaTime * ( playerOnFloor ? 25 : 8 );

				if ( keyStates[ 'KeyW' ] ) {

					cubeVelocity.add( getForwardVector().multiplyScalar( speedDelta ) );
					

				}

				if ( keyStates[ 'KeyS' ] ) {

					cubeVelocity.add( getForwardVector().multiplyScalar( - speedDelta ) );

				}

				if ( keyStates[ 'KeyA' ] ) {

					cubeVelocity.add( getSideVector().multiplyScalar( - speedDelta ) );

				}

				if ( keyStates[ 'KeyD' ] ) {

					cubeVelocity.add( getSideVector().multiplyScalar( speedDelta ) );

				}

				if ( playerOnFloor ) {

					if ( keyStates[ 'Space' ] ) {

						cubeVelocity.y = 15;

					}

				}

			}

		function initWorld(){

			loader.load( 'collision-world.glb', ( gltf ) => {

				const model = gltf.scene; // Nodo raíz del modelo
        		model.scale.set(5, 3, 5); // Escalar el modelo uniformemente (x, y, z)
				console.log("hola");

				scene.add( gltf.scene );

				worldOctree.fromGraphNode( gltf.scene );

				gltf.scene.traverse( child => {

					if ( child.isMesh ) {

						child.castShadow = true;
						child.receiveShadow = true;

						if ( child.material.map ) {

							child.material.map.anisotropy = 4;

						}

					}

				} );

				const helper = new OctreeHelper( worldOctree );
				helper.visible = false;
				scene.add( helper );

			
			} );
        }

			function teleportPlayerIfOob() {
				if (!isCavemanLoaded) return;
				if ( camera.position.y <= - 25 ) {

					cubeCollider.start.set( 0, 0.35, 0 );
					cubeCollider.end.set( 0, 1, 0 );
					//playerCollider.radius = 0.35;
					caveman.position.copy( cubeCollider.end );
					caveman.position.y = 
					caveman.rotation.set( 0, 0, 0 );

				}

			}

function updateCamera() {
			if (!isCavemanLoaded) return;
    // Ajustar la posición de la cámara relativa al jugador
    camera.position.set(
	caveman.position.x,       // Coincidir en el eje X
    caveman.position.y + 16,   // Elevar un poco la cámara en el eje Y
	caveman.position.z -2   // Colocar la cámara detrás en el eje Z
    );

	light.position.set( caveman.position.x-0.2, caveman.position.y-0.1, caveman.position.z+0.5 );

    // Hacer que la cámara mire hacia el jugador
    camera.lookAt(caveman.position);
}


			function animate() {

				const deltaTime = Math.min( 0.05, clock.getDelta() ) / STEPS_PER_FRAME;


				for ( let i = 0; i < STEPS_PER_FRAME; i ++ ) {

					controls( deltaTime );

					updatePlayer( deltaTime );

					//updateSpheres( deltaTime );

					teleportPlayerIfOob();

				}
				updateCamera();
				renderer.render( scene, camera );

				stats.update();
				

			}
