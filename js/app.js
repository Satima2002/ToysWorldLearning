
import * as THREE from './mods/three.module.js';
import Stats from './mods/stats.module.js';
import { OrbitControls } from './mods/OrbitControls.js';
import { TWEEN } from './mods/tween.module.min.js';
import { GUI } from './mods/dat.gui.module.js';
// Global variables
let mainContainer = null;
let fpsContainer
let stats = null;
let camera = null;
let renderer = null;
let scene = null;
let camControls = null;
let torus=null;
let isohendra=null;
let gui = null;
let vduStoneCtrlParams = {
	radius: 1.5,
	height: 2,
	posX: 12,
	posY: 3.03,
	posZ: 4,
};
let changeCube=null;
let group=null
let ballMesh=null;
let ballAnimation = {
	direction: 1,
	posY: 10,
};

let animationMixer = {
	posZ: 0,
	rotY: 0
};
let plane, box, sphere, cone = null;
function init(){
        fpsContainer = document.querySelector( '#fps' );
        mainContainer = document.querySelector( '#webgl-secne' );
        scene = new THREE.Scene();
        scene.background = new THREE.Color( '#000000' );      
        createStats();
        createCamera();
        createControls();
        createMeshes();
        createSpotLight();
        createAmbientLight();      
        createRenderer();
        createTween();
        createCtrlBox();
        renderer.setAnimationLoop( () => {
                TWEEN.update();
    update();

    render();
  } );
}

//creating Cube Rubik
function cubeRubik(){
        var geometry=new THREE.BoxGeometry(5,5,5);
        var cubeMaterials=[
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 1.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 2.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 3.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 4.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 5.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 6.png'),side:THREE.DoubleSide}),   

        ]
        var material=new THREE.MeshFaceMaterial(cubeMaterials);
        var cube=new THREE.Mesh(geometry,material);
        cube.position.x=10;
        cube.position.z=7;
        cube.position.y=2.5;
        cube.rotateY=Math.PI/8;
        cube.castShadow=true;
        scene.add(cube);
        
}
function cubeToy1(){
        var geometry=new THREE.BoxGeometry(4,4,4);
        var cubeMaterials=[
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 13.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 27.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 15.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 22.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 25.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 29.png'),side:THREE.DoubleSide}),   
        ]
        var material=new THREE.MeshFaceMaterial(cubeMaterials);
        var cube=new THREE.Mesh(geometry,material);
        cube.position.x=11;
        cube.position.z=-10;
        cube.position.y=2;
        cube.rotateY(Math.PI/10);
        cube.castShadow=true;
        scene.add(cube);
}
function cubeToy2(){
        var geometry=new THREE.BoxGeometry(4,4,4);
        var cubeMaterials=[
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 10.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 11.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 12.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 26.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 29.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 28.png'),side:THREE.DoubleSide}),   
        ]
        var material=new THREE.MeshFaceMaterial(cubeMaterials);
        var cube=new THREE.Mesh(geometry,material);
        cube.position.x=7; //x axis-red
        cube.position.z=-15;  //z axis -blue
        cube.position.y=2;  //y axis-green
        cube.rotateY(-Math.PI/20);
        cube.castShadow=true;
        scene.add(cube);
}
function cubeToy3(){
        var geometry=new THREE.BoxGeometry(4,4,4);
        var cubeMaterials=[
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 27.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 7.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 8.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 9.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 31.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/Group 30.png'),side:THREE.DoubleSide}),   
        ]
        var material=new THREE.MeshFaceMaterial(cubeMaterials);
        var cube=new THREE.Mesh(geometry,material);
        cube.position.x=9; //x axis-red   //to have orentation
        cube.position.z=-13;  //z axis -blue
        cube.position.y=6;  //y axis-green
        cube.rotateY(Math.PI/4);
        cube.castShadow=true;
        scene.add(cube);
}
function createBall(){
        var sphereGeometry = new THREE.SphereGeometry(4, 60, 60);
        var sphereMaterial = createBallMaterial();
        ballMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        ballMesh.position.y=4;
        ballMesh.position.x=10;
        ballMesh.position.z=-1;
        ballMesh.rotateY(Math.PI);
        ballMesh.rotateX(Math.PI/4);
        ballMesh.castShadow=true;
        scene.add(ballMesh);


        function createBallMaterial() {
        var ballTexture = THREE.ImageUtils.loadTexture("../img/texture.png");

        var ballMaterial = new THREE.MeshBasicMaterial();
        ballMaterial.map = ballTexture;
        
        return ballMaterial;
        
    }
}
//create toy with tonuses
//i need 3, so i compounded them into one function
function createTonusToy(){
        group = new THREE.Group();


        var geometry = new THREE.TorusGeometry( 3,1,30,100 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffff00 } );
        torus = new THREE.Mesh( geometry, material );
        torus.rotateX(Math.PI/2);
        torus.position.x=13; //x axis-red
        torus.position.z=15; //z axis -blue
        torus.position.y=1;  //y axis-green
        torus.castShadow=true;
        group.add( torus );
        var geometry2 = new THREE.TorusGeometry( 2.2,1,30,100 );
        var material2= new THREE.MeshLambertMaterial( { color: "red" } );
        var torus2 = new THREE.Mesh( geometry2, material2 );
        torus2.rotateX(Math.PI/2);
        torus2.position.x=13; //x axis-red
        torus2.position.z=15; //z axis -blue
        torus2.position.y=2.8;  //y axis-green
        torus2.castShadow=true;
        group.add( torus2 );
        var geometry3 = new THREE.TorusGeometry( 1.6,1,30,100 );
        var material3= new THREE.MeshLambertMaterial( { color: "green"} );
        var torus3 = new THREE.Mesh( geometry3, material3 );
        torus3.rotateX(Math.PI/2);
        torus3.position.x=13; //x axis-red
        torus3.position.z=15; //z axis -blue
        torus3.position.y=4.6;  //y axis-green
        torus3.castShadow=true;
        group.add( torus3 );

        var geometry4 = new THREE.TorusGeometry( 0.8,0.8,30,100 );
        var material4= new THREE.MeshLambertMaterial( { color: "blue"} );
        var torus4 = new THREE.Mesh( geometry4, material4 );
        torus4.rotateX(Math.PI/2);
        torus4.position.x=13; //x axis-red
        torus4.position.z=15; //z axis -blue
        torus4.position.y=6.2;  //y axis-green
        torus4.castShadow=true;
        group.add( torus4 );

scene.add( group );
}
// Animations
function update(){
camControls.update( 1 );
if (typeof ballMesh !== 'undefined') {		
        // console.log("kdkddkkdk: ", oringeGroup.position.x);
        if (ballAnimation.direction == 1) {
                ballAnimation.posY += 0.1;
        } else  {
                ballAnimation.posY -= 0.1;
        }

        if (ballAnimation.posY >= 20.0) {
                ballAnimation.direction = 0;
        } else if (ballAnimation.posY <= 5.0) {
                ballAnimation.direction = 1;
        }
        ballMesh.position.y = ballAnimation.posY;
        ballMesh.rotation.y+=0.05;		
}
if (typeof group !== 'undefined') {		
        // console.log("kdkddkkdk: ", oringeGroup.position.x);
        
        group.rotation.y+=0.01;		
}
        
        
}

function render(){
        stats.begin();
        renderer.render( scene, camera );
        
        stats.end();
}

// FPS 
function createStats(){
        stats = new Stats();
        stats.showPanel( 0 );      
        fpsContainer.appendChild( stats.dom );
}

// Camera
function createCamera(){
        const fov = 45;
        const aspect =  mainContainer.clientWidth / mainContainer.clientHeight;
        const near = 0.1;
        const far = 500;        // meters
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.x = 10;
        camera.position.y = 20;
        camera.position.z = 50;
        camera.lookAt(scene.position);

}

// Controls orbit controls
function createControls(){
    camControls = new OrbitControls(camera, mainContainer);
    camControls.autoRotate = false;
}

function createSpotLight(){
    let spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -10, 18, 10 );
    // Makes the shadows with less blurry edges
    spotLight.shadow.mapSize.width = 2048; // default 512
    spotLight.shadow.mapSize.height = 2048; //default 512
    // change lighting params
    spotLight.intensity = 1.5;
    spotLight.distance = 200;
    spotLight.angle = Math.PI/3;
    spotLight.penumbra = 0.4;   // 0 - 1
    spotLight.decay = 0.2;      // how quickly light dimishes
    // enable shadows for light source
    spotLight.castShadow = true;
    scene.add( spotLight );
    //const spotLightHelper = new THREE.SpotLightHelper( spotLight, 0xcc0000 );
    //scene.add( spotLightHelper );   
}

function createAmbientLight(){
    // If the want to make the whole scene lighter or add some mood, usually it should be some grey tone
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 ); // 0x111111 - 0xaaaaaa, 1 ; 0xffffff, 0.1 - 0.3; 0x404040
    scene.add( ambientLight );
}

// Creating plane
function createPlane(plane){        
        
        var loader=new THREE.TextureLoader();
        //importing picture as a floor
        var material=new THREE.MeshLambertMaterial({
                map:
                loader.load('../img/planetexture.png')
        });
        var geometry=new THREE.PlaneGeometry(40,40);
        plane=new THREE.Mesh(geometry,material);
        plane.rotation.x = -0.5*Math.PI;
        plane.position.x = 8;
        plane.position.y = 0;
        plane.position.z = 0;
        plane.receiveShadow = true;
        scene.add(plane);        
}

//puzzle will be just as a plane
function createPuzzle(plane){        
        var loader=new THREE.TextureLoader();
        var material=new THREE.MeshLambertMaterial({
                map:
                loader.load('../img/puzzle1.jpg')
        });
        var geometry=new THREE.PlaneGeometry(16,10);

        var plane=new THREE.Mesh(geometry,material);

                
        plane.rotation.x = -0.5*Math.PI;
        plane.rotateZ(Math.PI*1.5);
        plane.position.x = 0;
        plane.position.y = 0.5;
        plane.position.z = 0;
        plane.receiveShadow = true;

        scene.add(plane);        
}
//two below for creating castle
function createHome(){
        const radius =  4;  
        const height =  6;  
        const radialSegments = 50;
        const geometry = new THREE.ConeBufferGeometry(radius, height, radialSegments);
        const material =  new THREE.MeshLambertMaterial({color: 'red'});
        const house=new THREE.Mesh(geometry,material);
        house.castShadow=true;
        house.position.set(-2,10,-15);
        house.receiveShadow=true;
        scene.add(house);       
}
function createHouse(){
        const radiusTop =  2.5;  
        const radiusBottom =  2.5;  
        const height = 7.0;  
        const radialSegments = 50;  
        const geometry = new THREE.CylinderBufferGeometry(
        radiusTop, radiusBottom, height, radialSegments);
        const texture= new THREE.ImageUtils.loadTexture('../img/castletxt.png');

        const material =  new THREE.MeshPhongMaterial({map:texture});
        const house=new THREE.Mesh(geometry,material);
        house.castShadow=true;
        house.receiveShadow=true;
        house.position.set(-2,3.5,-15);
        scene.add(house);       
}
//just a toy
function createIcosahedron(){
        const radius =  3.0;
        const geometry = new THREE.IcosahedronBufferGeometry(radius);   
        const texture= new THREE.ImageUtils.loadTexture('../img/castle.jpg');

        const material =  new THREE.MeshPhongMaterial({map:texture});
        isohendra=new THREE.Mesh(geometry,material);
        isohendra.castShadow=true;
        isohendra.position.set(-8,2.8,15);
        scene.add(isohendra); 
}

function createRoot1(){
        const boxGeometry = new THREE.BoxBufferGeometry(3,8,3);
        const texture= new THREE.ImageUtils.loadTexture('../img/castle1.png');
        const material =  new THREE.MeshPhongMaterial({map:texture});
        const box=new THREE.Mesh(boxGeometry,material);
        box.position.x=21;
        box.position.y=4;
        box.position.z=-15;
        box.castShadow = true;
        box.receiveShadow=true;
        scene.add(box);
}
function createRoot2(){
        const boxGeometry = new THREE.BoxBufferGeometry(3,8,3);
        const texture= new THREE.ImageUtils.loadTexture('../img/castle1.png');
        const material =  new THREE.MeshPhongMaterial({map:texture});
        const box=new THREE.Mesh(boxGeometry,material);
        box.position.x=21;
        box.position.y=4;
        box.position.z=15;
        box.castShadow = true;
        box.receiveShadow=true;
        scene.add(box);
}
function toyWord(){
        var cubeMaterials=[
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/redcube.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/toys.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/redcube.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/redcube.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/redcube.png'),side:THREE.DoubleSide}),
                new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../img/redcube.png'),side:THREE.DoubleSide}),

        ]
        var material=new THREE.MeshFaceMaterial(cubeMaterials);
        const boxGeometry = new THREE.BoxBufferGeometry(4,4,34);
        const box=new THREE.Mesh(boxGeometry,material);
        box.position.x=21;
        box.position.y=10;
        box.position.z=0;
        box.castShadow = true;
        scene.add(box);
}
// all meshes(toys)
function createMeshes(){
        //const axes = new THREE.AxesHelper( 10 );
        //scene.add(axes);
        cubeRubik();
        createPlane(plane);
        createPuzzle();
        createTonusToy();
        cubeToy1();
        cubeToy2();
        cubeToy3();
        createBall();
        createHome();
        createHouse();
        createIcosahedron();
        createRoot1();
        createRoot2();
        toyWord();
        createCube();
       
}

function createRenderer(){

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize(mainContainer.clientWidth, mainContainer.clientHeight);
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
        mainContainer.appendChild( renderer.domElement );
}

function createTween(){
	// easing functions: http://tweenjs.github.io/tween.js/examples/03_graphs.html
	// define move animation
	let tween = new TWEEN.Tween(animationMixer).to({posZ: -18, rotY: Math.PI * 2}, 10000);
	tween.easing(TWEEN.Easing.Sinusoidal.InOut);
	let tweenBack = new TWEEN.Tween(animationMixer).to({posZ: 18, rotY: 0}, 10000);
	tweenBack.easing(TWEEN.Easing.Sinusoidal.InOut);

	// define bounce animation
	// let tween = new TWEEN.Tween(bounceMixer).to({bounceStep: 3.14}, 3000);
	// tween.easing(TWEEN.Easing.Linear.None);
	// let tweenBack = new TWEEN.Tween(bounceMixer).to({bounceStep: 0}, 3000);
	// tweenBack.easing(TWEEN.Easing.Linear.None);

	tween.chain(tweenBack);	// make tweenBack animation to start after tween animation
	tweenBack.chain(tween);	// make tween animation to start after tweenBack animation
	tween.onUpdate(animateIsohendra);	// set functions which will update screen
	tweenBack.onUpdate(animateIsohendra); // set functions which will update screen
	// https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md
	// starts animation, you can also use stop, repeat, yoyo
	tween.start();
}
function createCube(){
        const mesh=new THREE.BoxGeometry(3,3,3);
        const material=new THREE.MeshLambertMaterial({color: "blue"});
        changeCube=new THREE.Mesh(mesh,material);
        changeCube.position.set(0,2,14);
        changeCube.castShadow=true;
        scene.add(changeCube);
 
}
function createCtrlBox(){
	gui = new GUI();
	gui.remember(vduStoneCtrlParams);
	let cntRadius = gui.add(vduStoneCtrlParams, 'radius').min(0.5).max(3.0).step(0.1).name('Blue Cube Width');
	cntRadius.listen();	
	cntRadius.onChange(function(value) {
		let boxGeometry = new THREE.BoxBufferGeometry(value * 2, vduStoneCtrlParams.height, value * 2);
		changeCube.geometry = boxGeometry;
	});

	let cntHeight = gui.add(vduStoneCtrlParams, 'height').min(1.0).max(5.0).step(0.1).name('Blue Cube Height');
	cntHeight.listen();	
	cntHeight.onChange(function(value) {
		let boxGeometry = new THREE.BoxBufferGeometry(vduStoneCtrlParams.radius * 2, value, vduStoneCtrlParams.radius * 2);
		changeCube.geometry = boxGeometry;
		changeCube.position.y = 2.03 + value/2.0;
	});

	let cntPosY = gui.add(vduStoneCtrlParams, 'posY').min(-15).max(15).step(0.5).name('Isohendr PosY');
	cntPosY.listen();	
	cntPosY.onChange(function(value) {
		isohendra.position.y = value;
	});
}
function animateIsohendra() {
	// console.log("vduStonevduStonevduStone: ", vduStone.position.z);
	isohendra.position.z = animationMixer.posZ;
	isohendra.rotation.y = animationMixer.rotY;
}
window.addEventListener('resize', e => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
});

init();

 