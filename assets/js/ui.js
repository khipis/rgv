var gui = new dat.GUI();

gui.add(options, 'generator', ['Shrinker', 'Geffe', 'Stop and go', 'A5/1']).onChange(function () {
    options.generator = value;
});

gui.add(options, 'clouds').onChange(function (value) {
    options.clouds = value
});

gui.add(options, 'seed', 0.1, 1.0).onFinishChange(function () {
    options.seed = value;
});


