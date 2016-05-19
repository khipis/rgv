if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    var camera = setupCamera();

    var options = {
        intensity: 0.30,
        skybox: true,
        spheres: 100,
        fromRange: -100,
        toRange: 100,
        generator: 'Shrinker',
        rerender: function () {
            scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color3(0, 0, 0);
            camera = setupCamera();
            addSpheres(options.spheres);
            addSkybox(options.skybox);
        }
    };

    var sun = new BABYLON.PointLight("sun", new BABYLON.Vector3(50, 50, 30), scene);
    sun.intensity = options.intensity;


    window.addEventListener("resize", function () {
        engine.resize();
    });

    engine.runRenderLoop(function () {
        scene.render();
    });

    addSkybox();
    addSpheres(options.spheres);

}