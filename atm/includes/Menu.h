#pragma
enum OPTIONS { VIEW_BALANCE = '1', WITHDRAW = '2', DEPOSIT = '3', EXIT = '4', MENU = '5' };

class Menu
{
private:
    char lastOptionSelected;

public:
    Menu();
    const void displayMenu() const;
    char getLastOptionSelected() const;
    const void setLastOptionSelected(char option);
    const float withdrawMenu() const;
    const float depositMenu() const;
    const void displayBalance(float amount) const;
};
