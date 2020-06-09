cmake_minimum_required(VERSION 3.10)

set(PROJECT_NAME algorithms)
project(${PROJECT_NAME} VERSION 1.0 LANGUAGES CXX)

include_directories(src)

add_executable(
    ${PROJECT_NAME}
    main.cpp
)
