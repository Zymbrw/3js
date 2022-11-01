import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);

camera.position.set(-10,30,30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});

const box = new THREE.Mesh(boxGeometry,boxMaterial);

const sphereGeometry = new THREE.SphereGeometry(2,3,3);
const sphereMaterial = new THREE.MeshLambertMaterial({color: new THREE.Color( 0xff0000 ), wireframe: true});

const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

sphere.position.set(0,2,-2);

//scene.add(box);

//scene.add(sphere);

const light = new THREE.AmbientLight( 0xff0000 ); // soft white light
scene.add( light );

const MAX_POINTS = 500;

// geometry
const geometry = new THREE.BufferGeometry();

// attributes
let positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
positions[0] = 1;
positions[1] = 0;
positions[2] = 0;
positions[3] = 0;
positions[4] = 1;
positions[5] = 0;
positions[6] = 0;
positions[7] = 0;
positions[8] = 1;
geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

// draw range
const drawCount = 3; // draw the first 2 points, only
geometry.setDrawRange( 0, drawCount );
geometry.attributes.position.needsUpdate = true;


// material
const material = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 1000, vertexColors: THREE.VertexColors } );

console.log(THREE.VertexColors)

// line
const line = new THREE.Line( geometry, material );
scene.add( line );

line.geometry.attributes.position.needsUpdate = true;
let linesDrawn = 1; 

function animateLine()
{
    positions = line.geometry.attributes.position.array;

    positions[ linesDrawn*9 ] += positions[ linesDrawn-1 ] + 1;
    positions[ linesDrawn*9+1 ] += 0;
    positions[ linesDrawn*9+2 ] += 0;

    positions[ linesDrawn*9+3 ] += 0;
    positions[ linesDrawn*9+4 ] += positions[ linesDrawn+3 ]+ 1;
    positions[ linesDrawn*9+5 ] += 0;

    positions[ linesDrawn*9+6 ] += 0;
    positions[ linesDrawn*9+7 ] += 0;
    positions[ linesDrawn*9+8 ] += positions[ linesDrawn+7 ]+ 1;

    linesDrawn+=1;
    line.geometry.setDrawRange( 0, linesDrawn*3 );
    line.geometry.attributes.position.needsUpdate = true;
    line.material.setValues({color: new THREE.Color().setRGB(Math.random(),Math.random(),Math.random())});
    line.material.needsUpdate = true;
}

console.log(line.material)

//var createLines = setInterval(animateLine(linesDrawn),1000)

setInterval(animateLine,100)
function animate(time)
{
    box.rotation.x += 0.05;
    box.rotation.y -= 0.05;
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//scene.add(plane);
plane.rotateX(-0.5 * Math.PI);

const gridHelper = new THREE.GridHelper(30);
//scene.add(gridHelper);



