cmake_minimum_required(VERSION 3.6)
project(basic)

set(CMAKE_CXX_STANDARD 11)

set(SOURCE_FILES
        c_base.c base.cpp base1.cpp)

#add_executable(basic ${SOURCE_FILES})
add_executable(c_base c_base.c)
add_executable(base base.cpp)
add_executable(base1 base1.cpp)

add_executable(template template.cpp cls/Sales.cpp cls/Sales.h cls/Base.cpp cls/Base.h)