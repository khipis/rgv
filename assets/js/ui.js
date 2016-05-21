var gui = new dat.GUI();

gui.add(options, 'generator', ['Shrinker', 'Geffe', 'Stop and go', 'A5/1']).onChange(function () {
    resetA51registers();
    resetRegisters();
    a51_init();
    options.generator = value;
});

gui.add(options, 'skybox').onChange(function (value) {
    options.skybox = value;
});

gui.add(options, '_3d').onChange(function (value) {
    options._3d = value;
});

gui.add(options, 'intensity', 0.0, 2.0).onFinishChange(function (value) {
    sun.intensity = value;
});

gui.add(options, 'sphereSize', 1, 100).onFinishChange(function (value) {
    options.sphereSize = Math.round(value);
});

gui.add(options, 'spheres', 1, 10000).onFinishChange(function (value) {
    options.spheres = value;
});

gui.add(options, 'resetRegisters');

gui.add(options, 'rerender');