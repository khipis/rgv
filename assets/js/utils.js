function addSkybox() {
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    var files = [
        "./assets/images/sky.jpg",
        "./assets/images/sky.jpg",
        "./assets/images/sky.jpg",
        "./assets/images/sky.jpg",
        "./assets/images/sky.jpg",
        "./assets/images/sky.jpg"
    ];

    skyboxMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromImages(files, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
}

function addSphere(x, y, z) {
    var sphere = BABYLON.Mesh.CreateSphere('sphere', 10, 3, scene);
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
}

function addSpheres(count) {
    for (var i = 0; i < count; i++) {
        var x = random();
        var y = random();
        var z = random();
        addSphere(x, y, z);
    }
}

var from = -100;
var to = 100;

function random() {
    return Math.floor(Math.random() * (to * 2)) + from;
}

function setupCamera() {
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0),
        scene);

    camera.setPosition(new BABYLON.Vector3(0, 5, 10));
    camera.attachControl(canvas, false);

    camera.lowerRadiusLimit = 50;
    camera.upperRadiusLimit = 500;
    return camera;
}