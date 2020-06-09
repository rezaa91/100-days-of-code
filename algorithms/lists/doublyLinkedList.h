#include <iostream>

struct Node
{
    int data;
    Node* next;
    Node* prev;

    Node(int d)
    {
        data = d;
        next = nullptr;
        prev = nullptr;
    }
};

class DoublyList
{
private:
    Node* head;
public:
    DoublyList(int data)
    {
        head = new Node(data);
    }

    void insert(int data)
    {
        Node* tmp = head;
        Node* newNode = new Node(data);

        while (tmp->next != nullptr) {
            tmp = tmp->next;
        }

        tmp->next = newNode;
    }

    Node* get(int data)
    {
        Node* tmp = head;

        while (tmp != nullptr) {
            if (tmp->data == data) {
                return tmp;
            }
            
            tmp = tmp->next;
        }

        return nullptr;
    }

    void print()
    {
        Node* tmp = head;

        while (tmp != nullptr) {
            std::cout << tmp->data << std::endl;
            tmp = tmp->next;
        }
    }
};
