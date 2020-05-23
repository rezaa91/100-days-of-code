#pragma once
class Fs
{
private:
    const std::string filename;
    bool exists = true;
public:
    Fs(const std::string filename);
    const bool doesExist() const;
    const int getLine(const std::string search) const;
};
