#pragma
class Atm
{
private:
    float balance = 0;
public:
    Atm();
    Atm(float startingBalance);
    const float getBalance() const;
    const void withdraw(float amount);
    const void deposit(float amount);
};
