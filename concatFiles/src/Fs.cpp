#include <iostream>
#include <fstream>
#include "Fs.h"

Fs::Fs(std::string& outFile) 
    : outFile(outFile)
{}

const bool Fs::doesExist(const std::string& filename) const
{
    std::ifstream file(filename);

    if (file.fail()) {
        return false;
    }

    return true;
}

const void Fs::concatFile(const std::string& filename) const
{
    std::ifstream file(filename);
    std::ofstream out;
    out.open(this->outFile, std::ios_base::app);

    char c;
    while((c = file.get()) != EOF) {
        out << c;
    }

    out << std::endl;
}
