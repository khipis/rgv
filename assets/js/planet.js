function addSkybox() {
// Space
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
    var sphere = BABYLON.Mesh.CreateSphere('sphere', 16, 5, scene);
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
};

function random(from, to) {
    return Math.floor(Math.random() * (to*2)) + from;
}

if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");

    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0),
        scene);

    camera.setPosition(new BABYLON.Vector3(0, 5, 10));
    camera.attachControl(canvas, false);

    camera.lowerRadiusLimit = 50;
    camera.upperRadiusLimit = 500;

    var sun = new BABYLON.PointLight("sun", new BABYLON.Vector3(50, 50, 30), scene);

    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    window.addEventListener("resize", function () {
        engine.resize();
    });

    engine.runRenderLoop(function () {
        scene.render();
    });

    var options;

    var earthSetup = function () {
        options = {
            biomes: "earth",
            clouds: true,
            mapSize: 1024,
            upperColor: new BABYLON.Color3(2.0, 1.0, 0),
            lowerColor: new BABYLON.Color3(0, 0.2, 1.0),
            haloColor: new BABYLON.Color3(0, 0.2, 1.0),
            maxResolution: 128,
            seed: 0.30,
            cloudSeed: 0.55,
            lowerClamp: new BABYLON.Vector2(0.6, 1),
            groundAlbedo: 1.2,
            cloudAlbedo: 1.0,
            directNoise: false,
            lowerClip: new BABYLON.Vector2(100, 0),
            range: new BABYLON.Vector2(0.3, 0.35)
        };
    };

    earthSetup();

    addSkybox();

    // Lens flares
    BABYLON.Engine.ShadersRepository = "/src/shaders/";

    for (var i = 0; i < 1000; i++) {
        var x = random(-200, 200);
        var y = random(-200, 200);
        var z = random(-200, 200);
        addSphere(x, y, z);
    }

    // Material
    var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
            vertex: "./planet",
            fragment: "./planet"
        },
        {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true
        });
    shaderMaterial.setVector3("cameraPosition", camera.position);
    shaderMaterial.setVector3("lightPosition", sun.position);





    // Biome generator
    var generateBiome = function () {

        shaderMaterial.setTexture("textureSampler", noiseTexture);
        shaderMaterial.setColor3("haloColor", options.haloColor);
    }

}