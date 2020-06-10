#include <iostream>

struct Node
{
    int data;
    Node* left;
    Node* right;

    Node(int d)
    {
        data = d;
        left = nullptr;
        right = nullptr;
    }
};

class BST
{
private:
    Node* root;
public:
    BST(int d)
    {
        root = new Node(d);
    }

    void insert(int d)
    {
        Node* tmp = root;
        Node* prev = nullptr;

        while (tmp != nullptr) {
            prev = tmp;

            if (d < tmp->data) {
                tmp = tmp->left;
            } else if (d > tmp->data) {
                tmp = tmp->right;
            } else {
                std::cerr << "duplicate passed: " << d << std::endl;

                return;
            }
        }

        if (d < prev->data) {
            prev->left = new Node(d);
        } else {
            prev->right = new Node(d);
        }
    }

    int max()
    {
        Node* tmp = root;
        Node* prev = nullptr;

        while (tmp != nullptr) {
            prev = tmp;
            tmp = tmp->right;
        }

        return prev->data;
    }

    int min()
    {
        Node* tmp = root;
        Node* prev;

        while (tmp != nullptr) {
            prev = tmp;
            tmp = tmp->left;
        }

        return prev->data;
    }

    Node* search(int d)
    {
        Node* tmp = root;

        while (tmp != nullptr) {
            if (tmp->data == d) {
                return tmp;
            }

            if (d < tmp->data) {
                tmp = tmp->left;
            } else {
                tmp = tmp->right;
            }
        }

        return nullptr;
    }

    ~BST()
    {
        delete root;
    }
};
