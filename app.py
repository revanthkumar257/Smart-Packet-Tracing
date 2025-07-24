# Import render_template to serve the HTML file
from flask import Flask, jsonify, render_template
from flask_cors import CORS
import networkx as nx

app = Flask(__name__)
CORS(app)

# NEW: Route to serve the main HTML page
@app.route('/')
def home():
    # Flask will look for 'index.html' in the 'templates' folder
    return render_template('index.html')

def create_network_graph():
    G = nx.Graph()
    nodes = ["R1", "R2", "R3", "R4", "R5", "PC1", "PC5"]
    G.add_nodes_from(nodes)
    edges = [
        ("R1", "PC1", 1), ("R5", "PC5", 1), ("R1", "R2", 1),
        ("R1", "R3", 1), ("R2", "R4", 1), ("R3", "R4", 1),
        ("R3", "R5", 1), ("R4", "R5", 1)
    ]
    G.add_weighted_edges_from(edges)
    return G

@app.route('/find_path', methods=['GET'])
def find_path():
    network_graph = create_network_graph()
    source = 'PC1'
    destination = 'PC5'
    try:
        path = nx.dijkstra_path(network_graph, source=source, target=destination, weight='weight')
        return jsonify({"path": path})
    except nx.NetworkXNoPath:
        return jsonify({"error": "No path found"}), 404

if __name__ == '__main__':
    app.run(debug=True)