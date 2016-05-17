if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    var camera = setupCamera();
/*    var sun = new BABYLON.PointLight("sun", new BABYLON.Vector3(50, 50, 30), scene);*/

    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    window.addEventListener("resize", function () {
        engine.resize();
    });

    engine.runRenderLoop(function () {
        scene.render();
    });

    var options ={
        seed : 0.30,
        cloudSeed : 0.60,
        clouds : false,
        generator : 'Shrinker'
    };

 /*   addSkybox();*/
    addSpheres(100);

}