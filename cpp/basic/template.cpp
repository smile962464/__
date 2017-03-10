//
// Created by hua on 2017/2/27.
//

// c++ 中有 类模板、函数模板
#include <iostream>
#include <vector>
#include <string>

using std::cout;
using std::endl;
using std::vector;
using std::string;

//template <typename T>
template <class T>
T min(T x, T y) {
    return (x < y) ? x : y;
}

int main() {
    int n1 = 2, n2 = 10;
    double d1 = 1.5, d2 = 5.6;
    cout << "较小整数：" << min(n1, n2) << endl;

    vector<int> ivec;
    vector<vector<string> > file; // 该向量的元素是 vector 对象

    return 0;
}
