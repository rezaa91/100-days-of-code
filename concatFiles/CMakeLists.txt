cmake_minimum_required(VERSION 3.10)

project(concatFiles VERSION 1.0 LANGUAGES CXX)

include_directories(includes)

add_executable(concatFiles main.cpp src/Fs.cpp)