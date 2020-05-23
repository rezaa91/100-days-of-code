#include <iostream>
#include <string>
#include "Fs.h"

int main(int argc, char** argv)
{
    if (argc != 3)
    {
        std::cout << "filename or search term not specified.. Exiting program" << std::endl;

        return 1;
    }

    const std::string filename = argv[1];
    const std::string searchTerm = argv[2];

    try {
        const Fs* const fs = new Fs(filename);

        if (!fs->doesExist()) {
            std::cout << "File with name: " << filename << " does not exist!" << std::endl;

            return 1;
        }

        std::cout << filename << " found - searching file now..." << std::endl;
        const int lineNumber = fs->getLine(searchTerm);

        if (lineNumber == -1) {
            std::cout << "search term: " << searchTerm << " not found!" << std::endl;

            delete fs;
            return 1;
        }

        std::cout << "found on line: " << lineNumber << std::endl;

        delete fs;
    }
    catch (std::bad_alloc& ba) {
        std::cout << ba.what() << std::endl;
    }

    return 0;
}
