var gui = new dat.GUI();

gui.add(options, 'maxResolution', [128, 256, 512]).onChange(function () {

});

gui.add(options, 'clouds').onChange(function (value) {
    options.clouds = value
});

gui.add(options, 'seed', 0.1, 1.0).onFinishChange(function () {

});

gui.add(options, 'cloudSeed', 0.1, 1.0).onFinishChange(function () {

});

