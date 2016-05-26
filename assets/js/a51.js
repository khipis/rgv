var a51_reg1 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var a51_reg2 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var a51_reg3 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var key = [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0,
           0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
           1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0];

function a51_init() {
    for (var i = 0; i < key.length; i++) {
        a51_reg1[0] = key[i] ^ a51_reg1[0];
        a51_reg2[0] = key[i] ^ a51_reg2[0];
        a51_reg3[0] = key[i] ^ a51_reg3[0];

        a51_lfsr_1();
        a51_lfsr_2();
        a51_lfsr_3();
    }

    for (i = 0; i < 100; i++) {
        a51();
    }

}

function a51_lfsr_1() {
    var temp = a51_reg1[18] ^ a51_reg1[17] ^ a51_reg1[16] ^ a51_reg1[13];   //1+x14+x17+x18+x19
    for (var k = a51_reg1.length - 1; k > 0; k--) {
        a51_reg1[k] = a51_reg1[k - 1];
    }
    a51_reg1[0] = temp;
    return a51_reg1[18];
}

function a51_lfsr_2() {
    var temp = a51_reg2[21] ^ a51_reg2[20]; //x22+x21+1
    for (var k = a51_reg2.length - 1; k > 0; k--) {
        a51_reg2[k] = a51_reg2[k - 1];
    }
    a51_reg2[0] = temp;
    return a51_reg2[21];
}

function a51_lfsr_3() {
    var temp = a51_reg3[22] ^ a51_reg3[21] ^ a51_reg3[20] ^ a51_reg3[7];   //1+x8+x21+x22+x23
    for (var k = a51_reg3.length - 1; k > 0; k--) {
        a51_reg3[k] = a51_reg3[k - 1];
    }
    a51_reg3[0] = temp;
    return a51_reg3[22];
}

function a51() {
    var clock1 = a51_reg1[8];
    var clock2 = a51_reg2[10];
    var clock3 = a51_reg3[10];

    var lf1 = a51_reg1[18];
    var lf2 = a51_reg2[21];
    var lf3 = a51_reg3[22];

    if (clock1 === clock2 || clock1 === clock3) {
        a51_lfsr_1();
    }
    else if (clock2 === clock1 || clock2 === clock3) {
        a51_lfsr_2();
    }
    else if (clock3 === clock2 || clock3 === clock1) {
        a51_lfsr_3();
    }

    return lf1 ^ lf2 ^ lf3;
}

function resetA51registers() {
    a51_reg1 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    a51_reg2 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    a51_reg3 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    key = [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0,
           0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
           1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0];
}