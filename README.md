<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Retrieve</title>
  <link rel="stylesheet" href="style.css">

  <!----===== Boxicons CSS ===== -->
  <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>

  <style>
    /* Add your CSS styles here */
  </style>

</head>
<body>
  <nav class="sidebar close">
    <!-- Sidebar content -->
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

  <script>
    window.confirmDelete = function(callback) {
      const confirmBox = document.createElement('div');
      confirmBox.className = 'confirm-box';
      confirmBox.innerHTML = `
        <div class="message">Are you sure you want to delete?</div>
        <div class="buttons">
          <button class="btn-confirm">Yes</button>
          <button class="btn-cancel">No</button>
        </div>
      `;

      document.body.appendChild(confirmBox);

      const confirmButton = confirmBox.querySelector('.btn-confirm');
      const cancelButton = confirmBox.querySelector('.btn-cancel');

      confirmButton.addEventListener('click', () => {
        document.body.removeChild(confirmBox);
        callback(true);
      });

      cancelButton.addEventListener('click', () => {
        document.body.removeChild(confirmBox);
        callback(false);
      });
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

       
