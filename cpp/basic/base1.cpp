//
// Created by hua on 2017/2/27.
//

#include <iostream>

using namespace std;

int main() {

    // 指针
    int  var1;
    char var2[10];
    cout << "var1 变量的地址： " << &var1 << endl;
    cout << "var2 变量的地址： " << &var2 << endl;
    int  var = 20;   // 实际变量的声明
    int  *ip;        // 指针变量的声明
    ip = &var;       // 在指针变量中存储 var 的地址
    cout << "Value of var variable: " << var << endl;
    cout << "Address stored in ip variable: " << ip << endl;
    cout << "Value of *ip variable: " << *ip << endl;

    // void* 指针可以存放任意对象的地址。 ref: c++ primer
    double obj = 3.14, *pd = &obj;
    void *pv = &obj;
    pv = pd;

    int ival = 1024;
    int *pi = &ival; // pi 指向一个 int 型的数
    int **ppi = &pi; // ppi 指向一个 int 型的指针

    int ii = 42;
    int *p; // p 是一个 int 型指针
    int *&rr = p; // r 是一个对指针 p 的引用
    rr = &ii; // r 引用了一个指针，因此给 r 赋值 &i 就是令 p 指向 i
    *rr = 0; // 解引用 r 得到 i，也就是 p 指向的对象，将 i 的值改为 0

    // 引用
    int    i;
    double d;
    int &r = i;
    double &s = d;

    i = 5;
    cout << "Value of i : " << i << endl;
    cout << "Value of i reference : " << r  << endl;

    d = 11.7;
    cout << "Value of d : " << d << endl;
    cout << "Value of d reference : " << s  << endl;
}
