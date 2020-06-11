#include <iostream>
#include <vector>
#include <stack>

class Graph
{
private:
    int vertices;
    std::vector<int>* adj;
public:
    Graph(int v)
        :vertices(v)
    {
        adj = new std::vector<int>[v];
    }

    void addEdge(int v, int w)
    {
        if (v >= vertices) {
            std::cerr << "out of bounds. value not inserted." << std::endl;

            return;
        }

        adj[v].push_back(w);
    }

    void dfsUtil(int s, bool visited[])
    {
        std::cout << s << " ";
        std::vector<int>::iterator i;

        for (i = adj[s].begin(); i != adj[s].end(); ++i) {
            if (!visited[*i]) {
                visited[*i] = true;
                dfsUtil(*i, visited);
            }
        }
    }

    void dfs(int s)
    {
        bool* visited = new bool[vertices];
        for (int i = 0; i < vertices; i++) {
            visited[i] = false;
        }

        visited[s] = true;

        dfsUtil(s, visited);
    }

    void print()
    {
        for (int i = 0; i < vertices; i++) {
            std::cout << "VERTEX: " << i << std::endl;

            for (int& x : adj[i]) {
                std::cout << " => " << x;
            }

            std::cout << std::endl;
        }
    }
};
