var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x2ddbdd } );
var cube = new THREE.Mesh( geometry, material );
cube.position.set(1, 1, 1);
var boundingBox = new THREE.Box3()
scene.add( cube );


var plane_geometry = new THREE.BoxGeometry( 10, 1, 1 );
var plane_material = new THREE.MeshBasicMaterial( { color:  0x0000FF} );
var plane = new THREE.Mesh( plane_geometry, plane_material );
plane.position.y = -1
var otherBoundingBox = new THREE.Box3()
scene.add( plane );

plane.geometry.computeBoundingBox(); // Compute the initial bounding box

// Reduce the size of the plane by setting the scale
 // Set the scale to 50% of the original size

// Recalculate the bounding box to reflect the new dimensions
plane.geometry.computeBoundingBox();
// Runs every frame
function animate() {
    requestAnimationFrame( animate );


// collision detection
    boundingBox.setFromObject(cube);  
    otherBoundingBox.setFromObject(plane);

    if (boundingBox.intersectsBox(otherBoundingBox)) {
      // The meshes are colliding, prevent them from moving
      cube.position.copy(cube.lastPosition);
      plane.position.copy(plane.lastPosition);
    } else {
      // The meshes are not colliding, allow them to move
      cube.lastPosition = cube.position.clone();
      plane.lastPosition = plane.position.clone();
    }
    
  
    renderer.render( scene, camera );
}
animate();

// Key Input
document.addEventListener("keydown", keyInput, false);
function keyInput(event) {
  var keyCode = event.which;
  if (keyCode == 37) {
    cube.position.x -= 1
     camera.position.x-=1
  }
  if (keyCode == 39) {
    cube.position.x += 1
    camera.position.x+=1
  }
  if (keyCode == 38) {
    cube.position.y += 1
    cube.rotation.z -= 1
    camera.position.y += 1
  }
  if (keyCode == 40) {
    cube.position.y -= 1
    cube.rotation.z += 1
    camera.position.y -= 1
  }

  if (keyCode == 32) {
    camera.position.y = 1
    cube.position.y = 2
  }
}

renderer.domElement.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
  // Determine the position of the mouse click relative to the canvas element
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Create a raycaster to check for intersections with the mesh
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections with the mesh
  const intersects = raycaster.intersectObject(cube);

  // Perform an action in response to the mouse click
  if (intersects.length > 0) {
    console.log('Mesh clicked!');
  }
}