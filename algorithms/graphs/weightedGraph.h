#include <iostream>
#include <vector>

class WeightedGraph
{
private:
    std::vector<std::pair<int, int>>* adj;
    int vertices;
public:
    WeightedGraph(int v)
        :vertices(v)
    {
        adj = new std::vector<std::pair<int, int>>[v];
    }
    
    void addEdge(int u, int v, int w)
    {
        adj[u].push_back(std::make_pair(v, w));
    }

    void print()
    {
        for (int i = 0; i < vertices; i++) {
            std::cout << "\nVERTEX: " << i << std::endl;

            for (std::pair<int, int>& x : adj[i]) {
                std::cout << " =" << x.second << "(w)=> " << x.first << std::endl;
            }

            std::cout << std::endl;
        }
    }
};
