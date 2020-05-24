#include <iostream>
#include "Menu.h"
#include "Atm.h"

int main(int argc, char** argv)
{
    system("cls");

    Menu menu;
    menu.displayMenu();

    Atm myAccount(1000);

    while(menu.getLastOptionSelected() != EXIT) {
        char option = std::getchar();
        menu.setLastOptionSelected(option);
        system("cls");

        switch (option) {
            case VIEW_BALANCE:
                menu.displayBalance(myAccount.getBalance());
                break;
            case WITHDRAW:
            {
                float amount = menu.withdrawMenu();
                myAccount.withdraw(amount);
                break;
            }
            case DEPOSIT:
            {
                float amount = menu.depositMenu();
                myAccount.deposit(amount);
                break;
            }
        }

        std::cout << "\n\n\n\n";
        menu.displayMenu();
        std::cin.ignore();
    }

    return 0;
}