cmake_minimum_required(VERSION 3.10)

project(atm VERSION 1.0 LANGUAGES CXX)

include_directories(includes)

add_executable(atm main.cpp src/Atm.cpp src/Menu.cpp)
