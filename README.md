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
        
        <h1>Search Project</h1>
        <br>
        <form id="searchForm" class="searchfrm">
          <input type="text" id="searchTerm" placeholder="Search term">
          <button type="submit">Search</button>
          </form>
          <br>
          <br>
          <div id="searchResults" class="note"></div>       
  </div>

    
    <script src="script.js"></script>

    <script>

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
            const checkboxStyle = document.createElement("style");
            checkboxStyle.innerHTML = `
             .project_id {
               width : 20px;
               height : 20px;
               border : 1px solid black;
             }
             .project_id : checked{
                background-color : green;
             }
            `;
            document.head.appendChild(checkboxStyle);
            dataRow.appendChild(checkbox);
        
            table.appendChild(dataRow);
          }
         
          checkbox.addEventListener('change',function(){
if(this.checked){
this.style.backgroundColor = 'green';
} else{
this.style.backgroundColor = 'transparent';
}
});
          // Append the table to the searchResults element
          searchResults.appendChild(table);
        
          // Add a delete button at the bottom of the table
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = function() {
const project_ids = document.querySelectorAll("input[type='checkbox']:checked");
if (project_ids.length === 0) {
alert("Please select one or more projects to delete.");
return;
}
// Delete the projects from the database
fetch('http://localhost:3001/deletebyids/', {
method: 'DELETE',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ project_ids: project_ids.map(checkbox => checkbox.value) }),
});
};
          searchResults.appendChild(deleteButton);
        });

        

        
        </script>
        
        
        
        
</body>
</html>
