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
    sphereMaterial.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);
    sphereMaterial.emissiveColor = new BABYLON.Color3(0.00, 0.00, 1.0);
    sphereMaterial.ambientColor = new BABYLON.Color3(0.00, 0.00, 0.00);
    sphereMaterial.specularColor = new BABYLON.Color3(1.00, 1.00, 1.00);
    return sphereMaterial;
}

function addSphere(x, y, z, size) {
    var sphere = BABYLON.Mesh.CreateSphere('sphere', 10, 5, scene);
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
    sphere.material = sphereMaterial();
}

function addSpheres(count, size) {
    for (var i = 0; i < count; i++) {
        var x = random(options.x_min_range, options.x_max_range);
        var y = random(options.y_min_range, options.y_max_range);
        var z = random(options.z_min_range, options.z_max_range);
        addSphere(x, y, z, size);
    }
}

function random(from, to) {
    return Math.floor(Math.random() * (from * 2)) + to;
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