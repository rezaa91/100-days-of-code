#include <iostream>
#include <list>

class Map
{
private:
    std::list<int>* ht;
    int buckets;
public:
    Map(int b)
        :buckets(b)
    {
        ht = new std::list<int>[b];
    }

    void insert(int d)
    {
        int bucket = hash(d);

        if (exists(d)) {
            std::cerr << "duplicate found: " << d << std::endl;
            
            return;
        }

        ht[bucket].push_back(d);
    }

    bool exists(int d)
    {
        int bucket = hash(d);

        for (int& x : ht[bucket]) {
            if (d == x) {
                return true;
            }
        }

        return false;
    }

    int hash(int d)
    {
        return d % buckets;
    }

    void print()
    {
        for (int i = 0; i < buckets; i++) {
            std::cout << "BUCKET: " << i << std::endl;
            
            for (int& x : ht[i]) {
                std::cout << " -> " << x;
            }

            std::cout << std::endl;
        }
    }
};
