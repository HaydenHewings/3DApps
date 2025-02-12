var scene, camera, renderer, clock, mixer,action = [], mode;

init();

function init(){

    const assetPath = './';

    clock = new THREE.Clock();

    scene=new THREE.Scene();

    scene.background = new THREE.Color(0x00aaff);

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 )
  camera.position.ser(-5, 25, 20);

// Add lighting
const ambient = new THREE.hemisphereLight(0xffffbb, 0x080820, 1);
scene.add(ambient);

const light = new THREE.DirectionalLight();
light.position.set(0,1,2);
scene.add(light);

renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(1,2,0);
    controls.update();

mode = 'open'
const btn = document.getElementById("btn");
btn.addEventListener('click', function() {
if (actions.length === 2) {
    if (mode==="open"){
        actions.forEach(action => {
            action.timeScale = 1;
            actions.reset();
            actions.play();
        });
    }
}

});

//GLFT loader

const loader = new THREE.GLTFLoader();
loader.load(assetPath + 'assets/models/CanModel.glb', function(gltf){
const model = gltf.scene;
scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    const animations = gltf.animations;

    animations.forEach(clip =>{
        const action = mixer.clipAction(clip);
        actions.push(action);
    });
});



// Handle resizing
window.addEventListener('resize', onResize,false);

// Start the animation loop
animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Update animations
    if (mixer) {
        mixer.update(clock.getDelta());
    }

    renderer.render(scene, camera);
}

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}