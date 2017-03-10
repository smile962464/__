//
// Created by hua on 2017/2/27.
//

#include <iostream>
#include <string>
using namespace std;  // 不建议这么写 http://stackoverflow.com/questions/1452721/why-is-using-namespace-std-considered-bad-practice
//using std::cout;  // 建议做法

#define NEWLINE '\n'
#define LENGTH 10  // 使用 #define 预处理器定义常量
const int WIDTH = 5; // 使用 const 前缀声明指定类型的常量
int g; // 全局变量声明. 在所有函数外部定义的变量，称为全局变量
int func(); // 函数声明

int main() {
    // 局部变量声明 并定义 并初始化
    int d = 3, f = 5;
    char x;
    // 变量初始化
    x = 'A';

    cout << "基本的内置类型：bool / char / int / float / double / void / wchar_t" << endl;
    cout << "类型修饰符：signed / unsigned / short / long" << endl;

    cout << "bool / char / int / float / double 占据空间大小："
         << sizeof(bool) << sizeof(char) << sizeof(int) << sizeof(float) << sizeof(double) << endl;

    cout << "long int / unsigned int / signed short int 占据空间大小："
         << sizeof(long int) << sizeof(unsigned int) << sizeof(signed short int) << endl;

    short int i;           // 有符号短整数
    short unsigned int j;  // 无符号短整数
    j = 50000;
    i = j;
    cout << i << " " << j << endl;

    // 数组
    double balance[5] = {1000.0, 2.0, 3.4, 17.0, 50.0};

    // 字符串实际上是使用 null 字符 '\0' 终止的一维字符数组
    char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
    // char greeting[] = "Hello";
    cout << "Greeting message: " << greeting << endl;

    char str1[10] = "Hello";
    char str2[10] = "World";
    // 连接 str1 和 str2
    strcat( str1, str2);
    cout << "strcat( str1, str2): " << str1 << endl;

    //  String 类
    string str11 = "Hello";
    string str22 = "World";
    string str3;
    str3 = str11 + str22;
    cout << "str11 + str22 : " << str3 << str3.size() << endl;

    // 枚举类型
    enum color { red, green, blue } c;
    cout << c << endl;

    // 函数调用
    int fn = func();

    return 0;
}

// 函数定义
int func() {
    return 0;
}
