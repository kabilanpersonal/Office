<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Project</title>
</head>

<link rel="stylesheet" href="style.css">
    
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" charset="utf-8"></script>

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


<script src="script.js"></script>



  <!-- Add Project -->
  <form>
    <div class="content">
        
        <div class="form" >
          <div class="title">Welcome</div>
        <div class="subtitle">Let's Add your Project Details !</div>
  
        <div class="input-container ic1">
         
          <input type="text" class="input" id="project_id" name="project-id" placeholder=" " required>  
          <div class="cut"></div>
          <label for="Projectid" class="placeholder">Project ID</label>
  
        </div>
  
        <div class="input-container ic1">
         
          <input type="text" class="input" id="project_name" name="project-name" placeholder=" " required>  
          <div class="cut"></div>
          <label for="Projectname" class="placeholder">Project name</label>
  
        </div>
  
        <div class="input-container ic1">
         
          <input type="text" class="input" id="total_team_members"  placeholder=" " required>  
          <div class="cut"></div>
          <label for="Totalmembers" class="placeholder">Totalmembers</label>
  
        </div>
  
        <div class="input-container ic1">
         
          <input type="text" class="input" id="start_date"  placeholder=" " required>  
          <div class="cut"></div>
          <label for="Startdate" class="placeholder">StartDate</label>
  
        </div>
  
        <div class="input-container ic1">
         
          <input type="text" class="input" id="end_date"  placeholder=" " required>  
          <div class="cut"></div>
          <label for="Enddate" class="placeholder">EndDate</label>
  
        </div>
   
        <div class="box">
  
          
            <button class="button" onclick="validate()">Submit</button>
            <button type="reset" class="button" style="margin-left: 90px;">Reset</button>
          
  
        </div>
         
        <div class="input-container ic1">

          <h3 id="error1" ></h3>
        </div>
  
      </div>
  
</div> </form>

      <script type="text/javascript">
        $(document).ready(function(){ 
            // toggle button 
          $('.nav_btn').click(function(){
            $('.mobile_nav_items').toggleClass('active');
          });
        });  
    
        function validate() {
  const project_id = document.getElementById("project_id").value;
  const project_name = document.getElementById("project_name").value;
  const total_team_members = document.getElementById("total_team_members").value;
  const start_date = document.getElementById("start_date").value;
  const end_date = document.getElementById("end_date").value;

  if (project_id < 1 || project_name.length < 1 || total_team_members < 1 || start_date == "" || end_date == "") {
    document.getElementById("error1").innerHTML = "Please enter all the fields!!!";
  } else {
    const url = "http://localhost:3001/add1";
    const data = {
      project_id: project_id,
      project_name: project_name,
      total_team_members: total_team_members,
      start_date: start_date,
      end_date: end_date
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data == true) {
          window.location.href = "success.html";
        } else {
          document.getElementById("error1").innerHTML = "Project ID already exists!";

        }
      });
  }
}

    
    
        </script>

</body>
</html>



app.post('/add1', async (req, res) => {
                const data = new monmodel1({
                    project_id:req.body.project_id,
                    project_name: req.body.project_name,
                    total_team_members: req.body.total_team_members,
                    start_date:req.body.start_date,
                    end_date:req.body.end_date
                })
                try {
                    const dataToSave = await data.save();
                    if (dataToSave) {
                        res.status(200).json(true);
                    } else {
                        res.status(400).json({message: 'Project ID already exists!'});
                    }
                }
                catch (error) {
                    res.status(400).json({message: error.message});
                }
            })
