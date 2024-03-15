import GUI from 'lil-gui';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

window.addEventListener("DOMContentLoaded", main);
window.addEventListener( 'resize', onWindowResize, false );

let canvas : HTMLCanvasElement;
let renderer : THREE.WebGLRenderer;
let camera : THREE.PerspectiveCamera;
let scene : THREE.Scene;

/**
 * Creates and returns a Box centered at (0,0,0) with the provided
 * side lengths.
 * 
 * @param x the length of the edges parallel to the x axis
 * @param y the length of the edges parallel to the y axis
 * @param z the length of the edges parallel to the z axis
 * @param color the color of the box as a 32-bit RGB (example (red): 0xff0000)
 * @returns the box
 */
function makeBox(x : number, y: number, z: number, color : number) : THREE.Object3D {
    const cubeGeom = new THREE.BoxGeometry(x,y,z);
    const cubeEdges = new THREE.EdgesGeometry( cubeGeom );
    const cubeGroup = new THREE.Object3D();
    const line = new THREE.LineSegments(cubeEdges, new THREE.LineBasicMaterial( { color: 0xf000000 }));
    const cube = new THREE.Mesh(cubeGeom, new THREE.MeshBasicMaterial({ color: color }));
    cubeGroup.add(cube);
    cubeGroup.add(line);
    return cubeGroup;
}

/**
 * Creates a cylinder centered at the origin.
 * 
 * @param r1 the radius of the top of the cylinder
 * @param r2 the radius of the bottom of the cylinder
 * @param length the length of the cylinder
 * @param color color of the cylinder as 32-bit RGB (example (green): 0x00ff00)
 * @returns the cylinder
 */
function makeCylinder( r1 : number, r2 : number, length: number, color: number ) : THREE.Object3D {
    const cyl = new THREE.CylinderGeometry(r1, r2, length, 20, 20);
    const cylEdges = new THREE.EdgesGeometry(cyl);
    const group = new THREE.Object3D();
    const line = new THREE.LineSegments(cylEdges, new THREE.LineBasicMaterial( { color: 0xf000000 }));
    const mesh = new THREE.Mesh(cyl, new THREE.MeshBasicMaterial({color: color}));
    group.add(mesh);
    group.add(line);
    return group;
}

function main() {
    canvas = document.getElementById('main-canvas') as HTMLCanvasElement;

    scene = new THREE.Scene();
    canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    camera = new THREE.PerspectiveCamera( 48, canvas.width / canvas.height, 0.1, 1000 );
    const controls = new OrbitControls(camera, canvas);
    camera.position.z = 2.5;
    renderer = new THREE.WebGLRenderer({ canvas });

    ///////////////////////////////////////////////////////////////
    // TODO
    // Practice exercise - Build your hierarchy here....  use the functions makeCylinder
    // and makeBox to create objects.  Use THREE.Matrix4 to create transformation matrices and
    // apply them to objects using obj.applyMatrix4(matrix).  Add the root object to the scene.
    ///////////////////////////////////////////////////////////////

    onWindowResize();
    draw();
}

function draw() {
    renderer.render( scene, camera );
    window.requestAnimationFrame( draw );
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    
    // Resize the canvas
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    renderer.setSize( container.clientWidth, container.clientHeight );
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
}