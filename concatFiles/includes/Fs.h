#pragma
#include <string>
class Fs
{
public:
    Fs(std::string& outFile);
    const bool doesExist(const std::string& filename) const;
    const void concatFile(const std::string& filename) const;
private:
    const std::string outFile;
};
