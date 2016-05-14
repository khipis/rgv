#include <stdio.h>

#define REG_1_COUNT 19
#define REG_2_COUNT 22
#define REG_3_COUNT 23
#define KEY_COUNT 64

int reg1[REG_1_COUNT] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
int reg2[REG_2_COUNT] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
int reg3[REG_3_COUNT] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

int key[KEY_COUNT] = {
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
};


void a51_init();

int lfsr_1();

int lfsr_2();

int lfsr_3();

int a51();


int main(int argc, char **argv) {

    a51_init();

    int i = 0;
    for (i = 0; i < 10; i++) {
        putchar(a51() + 48);
    }
}

void a51_init() {
    int i = 0;
    for (i = 0; i < KEY_COUNT; i++) {
        reg1[0] = key[i] ^ reg1[0];
        reg2[0] = key[i] ^ reg2[0];
        reg3[0] = key[i] ^ reg3[0];

        lfsr_1();
        lfsr_2();
        lfsr_3();
    }

    for (i = 0; i < 100; i++) {
        a51();
    }

}

int lfsr_1() {
    int temp = reg1[18] ^reg1[17] ^reg1[16] ^reg1[13];   //1+x14+x17+x18+x19
    int k = 0;
    for (k = REG_1_COUNT - 1; k > 0; k--) reg1[k] = reg1[k - 1];
    reg1[0] = temp;
    return reg1[18];
}

int lfsr_2() {
    int temp = reg2[21] ^reg2[20]; //x22+x21+1
    int k = 0;
    for (k = REG_2_COUNT - 1; k > 0; k--) reg2[k] = reg2[k - 1];
    reg2[0] = temp;
    return reg2[21];
}

int lfsr_3() {
    int temp = reg3[22] ^reg3[21] ^reg3[20] ^reg3[7];   //1+x8+x21+x22+x23
    int k = 0;
    for (k = REG_3_COUNT - 1; k > 0; k--) reg3[k] = reg3[k - 1];
    reg3[0] = temp;
    return reg3[22];
}

int a51() {
    int clock1 = reg1[8];
    int clock2 = reg2[10];
    int clock3 = reg3[10];

    int lf1 = reg1[18]; //Old bit value
    int lf2 = reg2[21]; //Old bit value
    int lf3 = reg3[22]; //Old bit value

    if (clock1 == clock2 || clock1 == clock3) {
        lfsr_1();
    }
    if (clock2 == clock1 || clock2 == clock3) {
        lfsr_2();
    }
    if (clock3 == clock2 || clock3 == clock1) {
        lfsr_3();
    }

    return lf1 ^ lf2 ^ lf3;
}