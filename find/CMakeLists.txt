cmake_minimum_required(VERSION 3.1...3.16)

project(Find VERSION 1.0 LANGUAGES CXX)

include_directories(headers)

add_executable(find main.cpp src/Fs.cpp headers/Fs.h)