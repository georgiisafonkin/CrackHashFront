const hashButton = document.getElementById("StartBtn");
const hashInput = document.getElementById("hashInput");
const maxLenInput = document.getElementById("maxLengthInput");

const requestsHistoryList = document.getElementById("historyList");

const crackUrl = "http://localhost:8000/api/hash/crack";
const historyUrl = "http://localhost:8000/api/hash/requests";


// Отрисовка одной задачи
function renderRequest(request) {

    const li = document.createElement("li");

    li.innerHTML = `
        <strong>ID:</strong> ${request.requestId}<br>
        <strong>Hash:</strong> ${request.hash}<br>
        <strong>Status:</strong> ${request.status}<br>
        <strong>Max Length:</strong> ${request.maxLength}<br>
        <strong>Created:</strong> ${new Date(request.createdAt).toLocaleString()}
        <hr>
    `;

    requestsHistoryList.appendChild(li);
}


// Загрузка истории задач
function loadRequestsHistory() {

    fetch(historyUrl)
        .then(response => {

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            return response.json();
        })
        .then(data => {

            console.log("History:", data);

            // Очистить список
            requestsHistoryList.innerHTML = "";

            // Отрисовать все задачи
            data.forEach(request => {
                renderRequest(request);
            });
        })
        .catch(error => {
            console.error("History loading error:", error);
        });
}


// Создание новой задачи
hashButton.addEventListener("click", () => {

    fetch(crackUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hash: hashInput.value,
            maxLength: Number(maxLenInput.value)
        })
    })
    .then(response => {

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return response.json();
    })
    .then(data => {

        console.log("Task created:", data);

        // Обновить историю
        loadRequestsHistory();
    })
    .catch(error => {
        console.error("Error:", error);
    });
});


// Загрузить историю при открытии страницы
loadRequestsHistory();