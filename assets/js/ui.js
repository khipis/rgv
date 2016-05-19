var gui = new dat.GUI();

gui.add(options, 'generator', ['Shrinker', 'Geffe', 'Stop and go', 'A5/1']).onChange(function () {
    options.generator = value;
});

gui.add(options, 'lights').onChange(function (value) {
    sun.isEnabled = value;
});

gui.add(options, 'intensity', 0.0, 5.0).onFinishChange(function (value) {
    sun.intensity = value;
});


