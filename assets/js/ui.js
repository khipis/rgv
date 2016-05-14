
var gui = new dat.GUI();

var updateUI = function () {
    // Iterate over all controllers
    for (var i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
};

gui.add(options, 'biomes', ['earth', "volcanic", "jungle", "icy", "desert", "islands",
                            "moon"]).onFinishChange(function (biome) {
    switch (biome) {
        case "earth":
            earthSetup();
            break;
        case "volcanic":
            options.upperColor = new BABYLON.Color3(0.9, 0.45, 0.45);
            options.lowerColor = new BABYLON.Color3(1.0, 0, 0);
            options.haloColor = new BABYLON.Color3(1.0, 0, 0.3);
            options.seed = 0.30;
            options.cloudSeed = 0.60;
            options.clouds = false;
            options.lowerClamp = new BABYLON.Vector2(0, 1);
            options.maxResolution = 256;
            options.cloudAlbedo = 0;
            options.groundAlbedo = 1.0;
            options.rings = false;
            options.directNoise = false;
            options.lowerClip = new BABYLON.Vector2(0, 0);
            options.range = new BABYLON.Vector2(0.3, 0.4);
            break;
        case "jungle":
            options.upperColor = new BABYLON.Color3(0.1, 0.6, 0.4);
            options.lowerColor = new BABYLON.Color3(0, 1.0, 0.1);
            options.haloColor = new BABYLON.Color3(0.5, 1.0, 0.5);
            options.seed = 0.40;
            options.cloudSeed = 0.70;
            options.clouds = true;
            options.lowerClamp = new BABYLON.Vector2(0, 1);
            options.maxResolution = 512;
            options.cloudAlbedo = 1.0;
            options.groundAlbedo = 1.1;
            options.rings = false;
            options.directNoise = false;
            options.lowerClip = new BABYLON.Vector2(0, 0);
            options.range = new BABYLON.Vector2(0.2, 0.4);
            break;
        case "icy":
            options.upperColor = new BABYLON.Color3(1.0, 1.0, 1.0);
            options.lowerColor = new BABYLON.Color3(0.7, 0.7, 0.9);
            options.haloColor = new BABYLON.Color3(1.0, 1.0, 1.0);
            options.seed = 0.80;
            options.cloudSeed = 0.40;
            options.clouds = true;
            options.lowerClamp = new BABYLON.Vector2(0, 1);
            options.maxResolution = 256;
            options.cloudAlbedo = 1.0;
            options.groundAlbedo = 1.1;
            options.rings = true;
            options.ringsColor = new BABYLON.Color3(0.6, 0.6, 0.6);
            options.directNoise = false;
            options.lowerClip = new BABYLON.Vector2(0, 0);
            options.range = new BABYLON.Vector2(0.3, 0.4);
            break;
        case "desert":
            options.upperColor = new BABYLON.Color3(0.9, 0.30, 0);
            options.lowerColor = new BABYLON.Color3(1.0, 0.5, 0.1);
            options.haloColor = new BABYLON.Color3(1.0, 0.5, 0.1);
            options.seed = 0.18;
            options.cloudSeed = 0.60;
            options.clouds = false;
            options.lowerClamp = new BABYLON.Vector2(0.3, 1);
            options.maxResolution = 512;
            options.cloudAlbedo = 1.0;
            options.groundAlbedo = 1.0;
            options.rings = false;
            options.directNoise = false;
            options.lowerClip = new BABYLON.Vector2(0, 0);
            options.range = new BABYLON.Vector2(0.3, 0.4);
            break;
        case "islands":
            options.upperColor = new BABYLON.Color3(0.4, 2.0, 0.4);
            options.lowerColor = new BABYLON.Color3(0, 0.2, 2.0);
            options.haloColor = new BABYLON.Color3(0, 0.2, 2.0);
            options.seed = 0.15;
            options.cloudSeed = 0.60;
            options.clouds = true;
            options.lowerClamp = new BABYLON.Vector2(0.6, 1);
            options.maxResolution = 512;
            options.cloudAlbedo = 1.0;
            options.groundAlbedo = 1.2;
            options.rings = false;
            options.directNoise = false;
            options.lowerClip = new BABYLON.Vector2(0, 0);
            options.range = new BABYLON.Vector2(0.2, 0.3);
            break;
        case "moon":
            options.haloColor = new BABYLON.Color3(0, 0, 0);
            options.seed = 0.5;
            options.clouds = false;
            options.maxResolution = 256;
            options.groundAlbedo = 0.7;
            options.rings = false;
            options.directNoise = true;
            options.lowerClip = new BABYLON.Vector2(0.5, 0.9);
            break;
    }

    generateBiome();

    updateUI();
});

gui.add(options, 'maxResolution', [128, 256, 512]).onChange(function () {
    generateBiome();
});

gui.add(options, 'clouds').onChange(function (value) {
    options.clouds = value
});

gui.add(options, 'rings').onChange(function (value) {
    options.rings = value;
    engageRings();
});

gui.add(options, 'seed', 0.1, 1.0).onFinishChange(function () {
    generateBiome();
});

gui.add(options, 'cloudSeed', 0.1, 1.0).onFinishChange(function () {
    generateBiome();
});

generateBiome();
}
