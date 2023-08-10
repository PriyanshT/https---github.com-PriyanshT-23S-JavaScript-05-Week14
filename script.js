const searchTextBox = document.querySelector("#searchTextBox");
const submitBtn = document.querySelector("#submitBtn");
const tableBody = document.querySelector("#tableBody");

const baseURL = "https://www.omdbapi.com/";
var uri = "";
const apiKey = "8127fd11";

submitBtn.addEventListener("click", getApiData);

function getApiData() {
    if (searchTextBox.value !== "") {
        uri = `${baseURL}?apikey=${apiKey}&s=${searchTextBox.value}`;
        console.log(uri);

        fetch(uri).then(response => response.json()).then(json => populatePage(json));
    }
}

function populatePage(json) {
    if (json.Response === "False") {
        window.alert("Movies not found!");
    } else {
        var movies = json.Search;
        console.log(movies);
        for (let i = 0; i < movies.length; i++) {
            var tableRow = document.createElement("tr"); // <tr></tr>
            var idTableData = document.createElement("td"); // <td></td>
            var titleTableData = document.createElement("td");
            var yearTableData = document.createElement("td");
            var typeTableData = document.createElement("td");
            var imageTableData = document.createElement("td");
            var imageImg = document.createElement("img"); // <img></img>

            idTableData.textContent = movies[i].imdbID; // <td>tt123</td>
            titleTableData.textContent = movies[i].Title;
            yearTableData.textContent = movies[i].Year;
            typeTableData.textContent = movies[i].Type;
            imageImg.setAttribute("src", movies[i].Poster); // <img src="http..."></img>
            imageImg.setAttribute("alt", "No Image");
            imageImg.className = "img-thumbnail";

            imageTableData.appendChild(imageImg);
            tableRow.appendChild(idTableData); // <tr> <td>tt123</td> </tr>
            tableRow.appendChild(titleTableData);
            tableRow.appendChild(yearTableData);
            tableRow.appendChild(typeTableData);
            tableRow.appendChild(imageTableData);

            tableBody.appendChild(tableRow); // <tbody> <tr> <td>tt123</td> </tr> </tbody>
        }
    }
}