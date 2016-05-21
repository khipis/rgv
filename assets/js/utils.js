function addSkybox(addSkybox) {
    if (addSkybox) {
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
        return skybox;
    }
}

function sphereMaterial() {
    var sphereMaterial = new BABYLON.StandardMaterial('sphereMaterial', scene);
    sphereMaterial.alpha = 1;
    sphereMaterial.backFaceCulling = true;
    sphereMaterial.specularPower = 50;
    sphereMaterial.useSpecularOverAlpha = true;
    sphereMaterial.useAlphaFromDiffuseTexture = false;
    sphereMaterial.diffuseColor = new BABYLON.Color3(0.00, 0.3, 1.00);
    sphereMaterial.emissiveColor = new BABYLON.Color3(0.00, 0.00, 0.5);
    return sphereMaterial;
}

function addSphere(x, y, z) {
    var sphere = BABYLON.Mesh.CreateSphere('sphere', 10, options.sphereSize, scene);
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
    sphere.material = sphereMaterial();
}

function addSpheres() {
    for (var i = 0; i < options.spheres; i++) {
        var x = generator();
        var y = generator();
        var z = 0;
        if (options._3d) {
            z = generator();
        }
        addSphere(x, y, z);
    }
}

function generator() {
    var byte = getByte();
    var integer = binaryToInteger(byte);
    return integer - 127;
}

function getByte() {
    var byte = '';
    for (var i = 0; i < 8; i++) {
        byte = byte + shrinker();
    }
    return byte;
}

function setupCamera() {
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0),
        scene);

    camera.setPosition(new BABYLON.Vector3(0, 5, 500));
    camera.attachControl(canvas, false);
    camera.lowerRadiusLimit = 50;
    camera.upperRadiusLimit = 500;
    return camera;
}

function binaryToInteger(binary) {
    return parseInt(binary, 2);
}
