#include <iostream>
#include <string>
#include "Fs.h"

int main(int argc, char** argv)
{
    if (argc < 2) {
        std::cout << "No files to process. Exiting program..." << std::endl;
        exit(1);
    }

    std::cout << "Select an output file:" << std::endl;

    std::string outFile;
    std::cin >> outFile;
    Fs fs(outFile);

    for (int i = 1; i < argc; i++) {
        if (!fs.doesExist(argv[i])) {
            std::cout << argv[i] << " does not exist.. skipping...";
            continue;
        }

        fs.concatFile(argv[i]);
        std::cout << argv[i] << " processed";
    }

    std::cout << "Finished processing." << std::endl;

    return 0;
}