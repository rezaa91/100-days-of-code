#include <iostream>
#include <string>
#include <fstream>
#include "Fs.h"

Fs::Fs(const std::string filename)
    : filename(filename)
{
    std::ifstream file(filename);

    if (file.fail()) {
        this->exists = false;
    }
}

const bool Fs::doesExist() const
{
    return this->exists;
}

const int Fs::getLine(const std::string search) const
{
    int currentLine = 0;
    std::ifstream file(filename);
    std::string line;

    while(getline(file, line)) {
        currentLine++;

        if (line.find(search, 0) != std::string::npos) {
            return currentLine;
        }
    }

    return -1;
}
