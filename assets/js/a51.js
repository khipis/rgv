var REG_1_COUNT = 19;
var REG_2_COUNT = 22;
var REG_3_COUNT = 23;
var KEY_COUNT = 64;

var a51_reg1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var a51_reg2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var a51_reg3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var key = [
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];

function a51_init() {
    for (var i = 0; i < KEY_COUNT; i++) {
        a51_reg1[0] = key[i] ^ a51_reg1[0];
        a51_reg2[0] = key[i] ^ a51_reg2[0];
        a51_reg3[0] = key[i] ^ a51_reg3[0];

        lfsr_1();
        lfsr_2();
        lfsr_3();
    }

    for (var i = 0; i < 100; i++) {
        a51();
    }

}

function lfsr_1() {
    var temp = a51_reg1[18] ^ a51_reg1[17] ^ a51_reg1[16] ^ a51_reg1[13];   //1+x14+x17+x18+x19
    for (var k = REG_1_COUNT - 1; k > 0; k--) {
        a51_reg1[k] = a51_reg1[k - 1];
    }
    a51_reg1[0] = temp;
    return a51_reg1[18];
}

function lfsr_2() {
    var temp = a51_reg2[21] ^ a51_reg2[20]; //x22+x21+1
    var k = 0;
    for (k = REG_2_COUNT - 1; k > 0; k--) {
        a51_reg2[k] = a51_reg2[k - 1];
    }
    a51_reg2[0] = temp;
    return a51_reg2[21];
}

function lfsr_3() {
    var temp = a51_reg3[22] ^ a51_reg3[21] ^ a51_reg3[20] ^ a51_reg3[7];   //1+x8+x21+x22+x23
    for (var k = REG_3_COUNT - 1; k > 0; k--) {
        a51_reg3[k] = a51_reg3[k - 1];
    }
    a51_reg3[0] = temp;
    return a51_reg3[22];
}

function a51() {
    var clock1 = a51_reg1[8];
    var clock2 = a51_reg2[10];
    var clock3 = a51_reg3[10];

    var lf1 = a51_reg1[18]; //Old bit value
    var lf2 = a51_reg2[21]; //Old bit value
    var lf3 = a51_reg3[22]; //Old bit value

    if (clock1 === clock2 || clock1 === clock3) {
        lfsr_1();
    }
    if (clock2 === clock1 || clock2 === clock3) {
        lfsr_2();
    }
    if (clock3 === clock2 || clock3 === clock1) {
        lfsr_3();
    }

    return lf1 ^ lf2 ^ lf3;
}

function resetA51registers() {
    a51_reg1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    a51_reg2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    a51_reg3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    key = [
        1, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ];
}