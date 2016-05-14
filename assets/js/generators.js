bool stage[3] = {true, true, true};

int reg1[20] = {1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
int reg2[20] = {1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
int reg3[20] = {1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

int lfsr_1() {
    if (stage[0]) {
        stage[0] = false;
        return reg1[0];
    }
    int n = 18, temp = reg1[6] ^reg1[17];   //1+x7+x18
    int k = 0;
    for (k = n - 1; k > 0; k--) reg1[k] = reg1[k - 1];
    reg1[0] = temp;
    return temp;
}

int lfsr_2() {
    if (stage[1]) {
        stage[1] = false;
        return reg2[0];
    }
    int n = 19, temp = reg2[0] ^reg2[1] ^reg2[4] ^reg2[18]; //1+x+x2+x5+x19
    int k = 0;
    for (k = n - 1; k > 0; k--) reg2[k] = reg2[k - 1];
    reg2[0] = temp;
    return temp;
}

int lfsr_3() {
    if (stage[2]) {
        stage[2] = false;
        return reg3[0];
    }
    int n = 20, temp = reg3[2] ^reg3[19];   //1+x3+x20
    int k = 0;
    for (k = n - 1; k > 0; k--) reg3[k] = reg3[k - 1];
    reg3[0] = temp;
    return temp;
}


int geffe() {
    int lf1 = lfsr_1();
    int lf2 = lfsr_2();
    int lf3 = lfsr_3();
    int and1 = lf1 & lf2;
    int and2;
    if (lf2 == 1) and2 = 0 & lf3;
    else and2 = 1 & lf3;
    return and1 ^ and2;
}

int stop_and_go() {
    int lf2, lf3;
    if (lfsr_1() == 1) {
        lf2 = lfsr_2();
        lf3 = reg3[0];
    }
    else {
        lf3 = lfsr_3();
        lf2 = reg2[0];
    }
    return lf2 ^ lf3;
}

int shrinker() {
    int lf1 = lfsr_1();
    int lf2 = lfsr_2();

    while (lf1 != 1) {
        lf1 = lfsr_1();
        lf2 = lfsr_2();
    }
    return lf2;
}

int i = 0;
for (i = 0; i < 100; i++) {
    putchar(geffe() + 48);
}

