const API_BASE_URL = "http://localhost:5000"; // Backend base URL

// Handle form submission
document.getElementById("addForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;

    try {
        const response = await fetch(`${API_BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        const result = await response.json();
        alert(result.message || "Data added successfully!");
        fetchData(); // Refresh the table
    } catch (error) {
        console.error("Error adding data:", error);
        alert("Failed to add data.");
    }
});

// Fetch and display data
async function fetchData() {
    try {
        const response = await fetch(`${API_BASE_URL}/get`);
        const data = await response.json();

        const dataTable = document.getElementById("dataTable");
        dataTable.innerHTML = ""; // Clear existing rows

        data.forEach((item) => {
            const row = `<tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
            </tr>`;
            dataTable.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Load data on page load
fetchData();
