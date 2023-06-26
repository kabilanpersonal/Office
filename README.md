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

            }
            else{
                this.style.backgroundColor = 'transparent';
            }
          });
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
              console.log(project_ids);
            }
        
            // Delete the projects from the database
            fetch('http://localhost:3001/deletebyids/', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ project_ids: project_ids }),
            });

          };
          searchResults.appendChild(deleteButton);
        });

        

        
        </script>
