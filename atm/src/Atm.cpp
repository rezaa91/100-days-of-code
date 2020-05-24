#include <iostream>
#include "Atm.h"

Atm::Atm() {}

Atm::Atm(float balance)
    : balance(balance)
{}

const float Atm::getBalance() const
{
    return balance;
}

const void Atm::withdraw(float amount)
{
    if (balance - amount >= 0) {
        balance -= amount;

        return;
    }

    std::cout << "insufficient funds. Please try again" << std::endl;
}

const void Atm::deposit(float amount)
{
    balance += amount;
}
