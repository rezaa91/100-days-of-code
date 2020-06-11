#include <iostream>
#include <vector>
#include <queue>

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
            std::cout << "Attempting to write to out of bounds memory" << std::endl;

            return;
        }

        adj[v].push_back(w);
    }

    void bfs(int s)
    {
        bool* visited = new bool[vertices];
        for (int i = 0; i < vertices; i++) {
            visited[i] = false;
        }

        visited[s] = true;
        std::queue<int> queue;
        std::vector<int>::iterator i;
        queue.push(s);

        while (queue.empty() == false) {
            s = queue.front();
            std::cout << s << " ";
            queue.pop();

            for(i = adj[s].begin(); i != adj[s].end(); ++i) {
                if (!visited[*i]) {
                    visited[*i] = true;
                    queue.push(*i);
                }
            }
        }
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
