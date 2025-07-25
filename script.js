document.addEventListener('DOMContentLoaded', function () {
    // --- Network Data and Visualization Setup (Same as before) ---
    const nodes = new vis.DataSet([
        { id: 'R1', label: 'R1', group: 'router' }, { id: 'R2', label: 'R2', group: 'router' },
        { id: 'R3', label: 'R3', group: 'router' }, { id: 'R4', label: 'R4', group: 'router' },
        { id: 'R5', label: 'R5', group: 'router' }, { id: 'PC1', label: 'PC1', group: 'pc' },
        { id: 'PC5', label: 'PC5', group: 'pc' }
    ]);
    const edges = new vis.DataSet([
        { from: 'R1', to: 'PC1' }, { from: 'R5', to: 'PC5' }, { from: 'R1', to: 'R2' },
        { from: 'R1', to: 'R3' }, { from: 'R2', to: 'R4' }, { from: 'R3', to: 'R4' },
        { from: 'R3', to: 'R5' }, { from: 'R4', to: 'R5' }
    ]);
    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    const options = {
        groups: {
            router: { color: { background: '#f44336', border: '#d32f2f' }, shape: 'database' },
            pc: { color: { background: '#2196F3', border: '#1976D2' }, shape: 'box' }
        }
        // ... other options
    };
    const network = new vis.Network(container, data, options);

    // --- NEW: Function to highlight the path ---
    function highlightPath(path) {
        // Step 1: Reset all nodes and edges to default style
        nodes.getIds().forEach(nodeId => {
            nodes.update({ id: nodeId, color: null, font: {size: 14} });
        });
        edges.getIds().forEach(edgeId => {
            edges.update({ id: edgeId, color: { color: '#848484', highlight: '#848484' }, width: 1 });
        });

        if (!path || path.length === 0) return;

        // Step 2: Highlight the nodes in the path
        const pathNodes = path.map(nodeId => ({
            id: nodeId,
            color: { background: '#4CAF50', border: '#45a049' }, // Green for path
            font: {size: 18}
        }));
        nodes.update(pathNodes);

        // Step 3: Highlight the edges in the path
        const pathEdges = [];
        for (let i = 0; i < path.length - 1; i++) {
            const edge = edges.get({
                filter: function (item) {
                    return (item.from === path[i] && item.to === path[i + 1]) || (item.from === path[i + 1] && item.to === path[i]);
                }
            });
            if (edge.length > 0) {
                pathEdges.push({
                    id: edge[0].id,
                    color: { color: '#4CAF50', highlight: '#4CAF50' }, // Green for path
                    width: 3
                });
            }
        }
        edges.update(pathEdges);
    }

    // --- UPDATED: Button Click Event Listener ---
    document.getElementById('find-path-btn').addEventListener('click', () => {
        // The URL is now a relative path since the backend serves the page
        fetch('/find_path')
            .then(response => response.json())
            .then(data => {
                if (data.path) {
                    console.log('Path received:', data.path);
                    highlightPath(data.path); // Call the new function
                } else {
                    console.error('Error finding path:', data.error);
                    alert('Could not find a path.');
                    highlightPath([]); // Reset highlights if path not found
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert('Failed to fetch path from the server.');
            });
    });
});