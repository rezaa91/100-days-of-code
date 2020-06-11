#include <iostream>
#include <vector>
#include <stack>
#include <list>

class Graph
{
private:
    int vertices;
    std::vector<int>* adj;
public:
    Graph(int v)
        : vertices(v)
    {
        adj = new std::vector<int>[v];
    }

    void addEdge(int v, int w)
    {
        if (v >= vertices) {
            std::cerr << "out of bounds. value not inserted. returning..." << std::endl;

            return;
        }

        adj[v].push_back(w);
    }

    void topologicalSortUtil(int s, bool visited[], std::stack<int>& stack)
    {
        visited[s] = true;

        std::vector<int>::iterator i;

        for(i = adj[s].begin(); i != adj[s].end(); ++i) {
            if (!visited[*i]) {
                topologicalSortUtil(*i, visited, stack);
            }
        }

        stack.push(s);
    }

    void topologicalSort()
    {
        bool* visited = new bool[vertices];
        for (int i = 0; i < vertices; i++) {
            visited[i] = false;
        }

        std::stack<int> stack;

        for (int i = 0; i < vertices; i++) {
            if (!visited[i]) {
                topologicalSortUtil(i, visited, stack);
            }
        }

        while (stack.empty() == false) {
            std::cout << stack.top() << " ";
            stack.pop();
        }
    }

    void print()
    {
        for (int i = 0; i < vertices; i++) {
            std::cout << "VERTEX: " << i << std::endl;

            for(int& x : adj[i]) {
                std::cout << " => " << x;
            }

            std::cout << std::endl;
        }
    }
};
