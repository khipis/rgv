var stage
[3] = {true, true, true};

var reg1
[20] = {1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
var reg2
[20] = {1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
var reg3
[20] = {1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

function lfsr_1() {
    if (stage[0]) {
        stage[0] = false;
        return reg1[0];
    }
    var n = 18, temp = reg1[6] ^ reg1[17];   //1+x7+x18
    for (var k = n - 1; k > 0; k--) {
        reg1[k] = reg1[k - 1];
    }
    reg1[0] = temp;
    return temp;
}

function lfsr_2() {
    if (stage[1]) {
        stage[1] = false;
        return reg2[0];
    }
    var n = 19, temp = reg2[0] ^ reg2[1] ^ reg2[4] ^ reg2[18]; //1+x+x2+x5+x19
    for (var k = n - 1; k > 0; k--) {
        reg2[k] = reg2[k - 1];
    }
    reg2[0] = temp;
    return temp;
}

function lfsr_3() {
    if (stage[2]) {
        stage[2] = false;
        return reg3[0];
    }
    var n = 20, temp = reg3[2] ^ reg3[19];   //1+x3+x20
    for (var k = n - 1; k > 0; k--) {
        reg3[k] = reg3[k - 1];
    }
    reg3[0] = temp;
    return temp;
}

function geffe() {
    var lf1 = lfsr_1();
    var lf2 = lfsr_2();
    var lf3 = lfsr_3();
    var and1 = lf1 & lf2;
    var and2;
    if (lf2 == 1) {
        and2 = 0 & lf3;
    } else {
        and2 = 1 & lf3;
    }
    return and1 ^ and2;
}

function stop_and_go() {
    var lf2, lf3;
    if (lfsr_1() === 1) {
        lf2 = lfsr_2();
        lf3 = reg3[0];
    }
    else {
        lf3 = lfsr_3();
        lf2 = reg2[0];
    }
    return lf2 ^ lf3;
}

function shrinker() {
    var lf1 = lfsr_1();
    var lf2 = lfsr_2();

    while (lf1 !== 1) {
        lf1 = lfsr_1();
        lf2 = lfsr_2();
    }
    return lf2;
}

// for (var i = 0; i < 100; i++) {
//     putchar(geffe() + 48);
// }

