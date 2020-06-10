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
        :vertices(v)
    {
        adj = new std::vector<int>[v];
    }

    void addEdge(int v, int w)
    {
        adj[v].push_back(w);
    }

    void bfs(int s)
    {
        bool* visited = new bool[vertices];
        for (int i = 0; i < vertices; i++) {
            visited[i] = false;
        }

        std::queue<int> queue;
        visited[s] = true;
        queue.push(s);

        std::vector<int>::iterator i;

        while (queue.empty() == false) {
            s = queue.front();
            std::cout << s << " ";
            queue.pop();

            for (i = adj[s].begin(); i != adj[s].end(); ++i) {
                if (!visited[*i]) {
                    visited[*i] = true;
                    queue.push(*i);
                }
            }
        }

        std::cout << std::endl;
    }

    void print()
    {
        for (int i = 0; i < vertices; i++) {
            std::cout << "\nVERTEX: " << i << std::endl;

            for (int& x : adj[i]) {
                std::cout << " => " << x;
            }

            std::cout << std::endl;
        }
    }
};
