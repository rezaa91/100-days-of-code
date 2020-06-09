#include <iostream>

struct Node
{
    int data;
    Node* next;

    Node(int d)
    {
        data = d;
        next = nullptr;
    }
};

class List
{
private:
    Node* head;
public:
    List(int headData)
    {
        head = new Node(headData);
    }

    void insert(int data)
    {
        Node* tmp = head;
        
        while (tmp->next != nullptr) {
            tmp = tmp->next;
        }

        tmp->next = new Node(data);
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

    void reverse()
    {
        Node* current = head;
        Node* next = nullptr;
        Node* prev = nullptr;

        while (current != nullptr) {
            next = current->next;
            current->next = prev;
            prev = current;
            current = next;
        }

        head = prev;
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
