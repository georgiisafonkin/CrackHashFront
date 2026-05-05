const taskID = document.getElementById("taskIDInput");
const checkStatusBtn = document.getElementById("statusBtn");

const statusResult = document.getElementById("statusResult");

const statusUrl = "http://localhost:8000/api/hash/status";


checkStatusBtn.addEventListener("click", () => {

    const requestUrl =
        `${statusUrl}?requestId=${taskID.value}`;

    fetch(requestUrl, {
        method: "GET"
    })
    .then(response => {

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return response.json();
    })
    .then(data => {

        console.log(data);

        statusResult.innerHTML = `
            <h3>Task Status</h3>

            <p>
                <strong>Status:</strong>
                ${data.status}
            </p>

            <p>
                <strong>Data:</strong>
                ${data.data.join(", ")}
            </p>
        `;
    })
    .catch(error => {

        console.error("Error:", error);

        statusResult.innerHTML = `
            <p style="color:red;">
                Failed to load task status
            </p>
        `;
    });
});