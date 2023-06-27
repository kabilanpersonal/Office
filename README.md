<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Retrieve</title>
    <link rel="stylesheet" href="style.css">
   
    <!----===== Boxicons CSS ===== -->
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>

    <style>
        
        </style>


</head>
<body>
    <nav class="sidebar close">
        <header>
            <div class="image-text">
                <span class="image">
                    <img src="logo.jpg" alt="">
                </span>

                <div class="text logo-text">
                    <span class="name">Mphasis</span>
                    <span class="profession">Projects</span>
                </div>
            </div>

            <i class='bx bx-chevron-right toggle'></i>
        </header>

        <div class="menu-bar">
            <div class="menu">

              

                <ul class="menu-links">
                    <li class="nav-link">
                        <a href="add.html">
                            <i class='bx bx-user-plus' style="font-size: 28px; display: flex; margin-left: 20px; color:lightskyblue; "> &nbsp;</i>
                           <span class="text nav-text">Add Project</span>
                        </a>
                    </li>
                    
                    <li class="nav-link">
                        <a href="retrieve.html">
                            <i class='bx bx-search-alt-2' style="font-size: 28px; display: flex; margin-left: 20px; color: lightskyblue;" > &nbsp;</i>
                            <span class="text nav-text">Search Project</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="delete.html">
                            <i class='bx bx-user-x' style="font-size: 28px; display: flex; margin-left: 20px; color: lightskyblue;"> &nbsp;</i>
                            <span class="text nav-text">Delete Project</span>
                        </a>
                    </li>

                    
                </ul>
            </div>

            <div class="bottom-content">
                <li class="">
                    <a href="index.html">
                        <i class='bx bx-log-out icon' style="color: lightskyblue; font-size: 28px"></i>
                        <span class="text nav-text">Logout</span>
                        
                    </a>
                </li>

                <li class="mode"style="color" >
                    <div class="sun-moon">
                        <i class='bx bx-moon icon moon'style="color: lightskyblue; font-size: 28px"></i>
                        <i class='bx bx-sun icon sun'style="color: lightskyblue; font-size: 28px"></i>
                    </div>
                    <span class="mode-text text">Dark mode</span>

                    <div class="toggle-switch">
                        <span class="switch"></span>
                    </div>
                </li>
                
            </div>
        </div>

    </nav>

    <div class="content" id="tabcontent">
        
        <h1>Delete Project</h1>
        <br>
        <form id="searchForm" class="searchfrm">
          <input type="text" id="searchTerm" placeholder="Search term">
          <button type="submit">Search</button>
          </form>
          <br>
          <br>
          <div id="searchResults"></div>       
  </div>

    
    <script src="script.js"></script>

    <script>
window.confirm = function(message) {
  var result = window.prompt(message, "No");
  return (result == "Yes");
};

const form = document.querySelector("#searchForm");
const searchTermInput = document.querySelector("#searchTerm");
const searchResults = document.querySelector("#searchResults");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchTerm = searchTermInput.value;
  if (!searchTerm) return;

  const response = await fetch(`http://localhost:3001/search1?searchTerm=${searchTerm}`);
  const data = await response.text();
  searchResults.innerHTML = "";

  // Create a new HTML table element
  const table = document.createElement("table");

  // Add the table header row
  const headerRow = document.createElement("tr");
  for (const header of ["Project Name", "Project ID", "Total Team Members", "Start Date", "End Date","Delete"]) {
    const headerCell = document.createElement("th");
    headerCell.textContent = header;
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  // Add the table data rows
  for (const project of JSON.parse(data)) {
    const dataRow = document.createElement("tr");
    for (const dataCell of [project.project_name, project.project_id, project.total_team_members, project.start_date, project.end_date]) {
      const dataCellElement = document.createElement("td");
      dataCellElement.textContent = dataCell;
      dataRow.appendChild(dataCellElement);
    }

    // Add a checkbox to the end of the row
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "project_id";
    checkbox.value = project.project_id;
    checkbox.style.height = "20px";
    checkbox.style.width = "20px";
    checkbox.style.marginTop = "10px";

    dataRow.appendChild(checkbox);

    table.appendChild(dataRow);
  }

  // Append the table to the searchResults element
  searchResults.appendChild(table);

  // Add a delete button at the bottom of the table
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function() {
    // Get the list of project IDs from the checked checkboxes
    const project_ids = [];
    for (const checkbox of document.querySelectorAll("input[type='checkbox']:checked")) {
      project_ids.push(checkbox.value);
    }

    // Confirm with the user before deleting the projects
    const confirmDelete = window.confirm("Are you sure you want to delete ?");
    if (confirmDelete) {
      // Show an alert before deleting the projects
      alert("Mission Accomplished :) ");

      // Delete the projects from the database
      fetch('http://localhost:3001/deletebyids/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_ids: project_ids }),
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data == true) {
          window.location.href = "deletes.html";
        } 
      });
    }
  };
  searchResults.appendChild(deleteButton);
});


        </script>
</body>
</html>
