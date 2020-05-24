#include <iostream>
#include "Menu.h"

Menu::Menu() {}

const void Menu::displayMenu() const
{
    std::cout << "1. VIEW BALANCE" << std::endl;
    std::cout << "----------------------------" << std::endl;

    std::cout << "2. WITHDRAw" << std::endl;
    std::cout << "----------------------------" << std::endl;

    std::cout << "3. DEPOSIT" << std::endl;
    std::cout << "----------------------------" << std::endl;

    std::cout << "4. EXIT" << std::endl;
    std::cout << "----------------------------" << std::endl;
}

char Menu::getLastOptionSelected() const
{
    return lastOptionSelected;
}

const void Menu::setLastOptionSelected(char option)
{
    lastOptionSelected = option;
}

const void Menu::displayBalance(float amount) const
{
    std::cout << "YOUR BALANCE: £" << amount << std::endl;
}

const float Menu::withdrawMenu() const
{
    std::cout << "How much would you like to withdraw?" << std::endl;

    float amount;
    std::cin >> amount;

    return amount;
}

const float Menu::depositMenu() const
{
    std::cout << "How much would you like to deposit?" << std::endl;

    float amount;
    std::cin >> amount;

    return amount;
}
