var gui = new dat.GUI();

gui.add(options, 'generator', ['Shrinker', 'Geffe', 'Stop and go', 'A5/1']).onChange(function () {
    options.generator = value;
});

gui.add(options, 'skybox').onChange(function (value) {
    options.skybox = value;
});

gui.add(options, 'intensity', 0.0, 5.0).onFinishChange(function (value) {
    sun.intensity = value;
});

gui.add(options, 'sphereSize', 0, 100).onFinishChange(function (value) {
    options.sphereSize = value;
});

gui.add(options, 'spheres', 1, 10000).onFinishChange(function (value) {
    options.spheres = value;
});

gui.add(options, 'x_min_range', -400, 400).onFinishChange(function (value) {
    options.x_min_range = value;
});

gui.add(options, 'x_max_range', -400, 400).onFinishChange(function (value) {
    options.x_max_range = value;
});

gui.add(options, 'y_min_range', -400, 400).onFinishChange(function (value) {
    options.y_min_range = value;
});

gui.add(options, 'y_max_range', -400, 400).onFinishChange(function (value) {
    options.y_max_range = value;
});

gui.add(options, 'z_min_range', -400, 400).onFinishChange(function (value) {
    options.z_min_range = value;
});

gui.add(options, 'z_max_range', -400, 400).onFinishChange(function (value) {
    options.z_max_range = value;
});

gui.add(options,'rerender').add();