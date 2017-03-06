#include <stdio.h>
#include <stdlib.h>

int main() {
    unsigned int *p = (int*)malloc(100 * sizeof(int));
    printf("堆中数据地址：0x%08x\n", p);
    free(p);

    return 0;
}
