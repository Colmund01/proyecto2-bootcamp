
let baseurl="https://good-tan-jay.cyclic.app/"


let navtrainer=document.getElementById("navTrainer")
let navuser=document.getElementById("navUser")
let navbooking=document.getElementById("navBooking")

let trainerPage=document.getElementById("trainer")
let userPage=document.getElementById("user")
let bookingPage=document.getElementById("bookings")

navtrainer.addEventListener("click",()=>{
    trainerPage.style.display="block"
    userPage.style.display="none"
    bookingPage.style.display="none"
})
navuser.addEventListener("click",()=>{
    trainerPage.style.display="none"
    userPage.style.display="block"
    bookingPage.style.display="none"
    getUserData()
})

navbooking.addEventListener("click",()=>{
    trainerPage.style.display="none"
    userPage.style.display="none"
    bookingPage.style.display="block"
    getAllBookigData()
})


async function getTrainerData(){
  try {
    let res= await fetch(`${baseurl}/trainer`)
    let data =await res.json()
    displayTrainerData(data)
    
  } catch (error) {
      console.log(error)
  }
}
getTrainerData()

function  displayTrainerData(data){
    trainerPage.innerHTML=""
    trainerPage.innerHTML=`
    <button id="add-trainer">Ingresar datos</button>
    ${ data.map((elem)=>{
      return `
        <div class="child">
        <div>
         <img class="image" src="${elem.image}" alt="trainer 1">
        </div>
        <div class="desc">
          <h2>${elem.name}</h2>
          <h3>Edad: ${elem.age}</h3>
          <h3>Género: ${elem.gender}</h3>
          <h4>País origen: ${elem.specialization}</h4>
        </div>
        <div id="delete">
         <button id="delete-trainer" data-id="${elem._id}">Delete</button>
        </div>
     </div>
        `
    }).join("")}
    <div id="add"> 
    <button id="cross">&#215;</button>
      <h2>Rellene las casillas con los datos correspondientes</h2>
      <form action="" id="trainer-added">
        <input type="text" id="name" placeholder="Nombre y apellido" required>
        <br>
        <input type="text" id="age" placeholder="Edad" required>
        <br>
        <input type="text" id="gender" placeholder="Género" required>
        <br>
        <input type="url" name="" id="image" placeholder="Url imágen" required>
        <br>
        <input type="number" id="price" placeholder="Dni" required>
        <br>
        <input type="text" id="specialisation" placeholder="País origen" required>
        <br>
        <input type="submit" value="Registrar">
      </form>         
    </div>
    `
    let deleteTrainerBtns=document.querySelectorAll("#delete-trainer")
    for(let deleteTrainerBtn of deleteTrainerBtns){
      deleteTrainerBtn.addEventListener("click",(e)=>{
        let id=e.target.dataset.id
        let promptInput=prompt("Escribe `Delete` para borrar")
        if(promptInput==="Delete"){
          deleteTrainerData(id)
        }else{
           alert("Escribe 'Delete' ..")
        }
         
      })
    }

    document.getElementById("cross").addEventListener("click",()=>{
      document.getElementById("add").style.display="none"
    })

    let addTrainerBtn=document.getElementById("add-trainer")

    addTrainerBtn.addEventListener("click",()=>{
         document.getElementById("add").style.display="block"
    })

    let addTrainerForm=document.getElementById("trainer-added")
    addTrainerForm.addEventListener("submit",(event)=>{
        event.preventDefault()
        let name=document.getElementById("name").value
        let age=document.getElementById("age").value
        let gender=document.getElementById("gender").value
        let image=document.getElementById("image").value
        let price=document.getElementById("price").value
        let specialization=document.getElementById("specialisation").value
       let arr=specialization.split(",")
        let obj={
          name,age,gender,image,price,specialization:arr
        }
        addTraainerData(obj)
        document.getElementById("add").style.display="none"
    })
}

async function addTraainerData(obj){
    try {
      let res= await fetch(`${baseurl}/trainer/add`,{
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(obj)
      })

      let res2=await res.json()
      alert("Datos agregados correctamente.")
      getTrainerData()
      
    } catch (error) {
       console.log(error)
    }
}

async function  deleteTrainerData(id){
 try {
  let res= await fetch(`${baseurl}/trainer/delete/${id}`,{
      method:"DELETE"
  })

  alert("Datos borrados correctamente")
  getTrainerData()
  
 } catch (error) {
  console.log("Erros al borrar datos")
 }
}

async function getUserData(){
  try {
    let res= await fetch(`${baseurl}/user/alluser`)
    let data=await res.json()
    displayUserData(data)
    
  } catch (error) {
     console.log("Error fetching data")
     console.log(error)
  }
}


function displayUserData(data){
     userPage.innerHTML=""
     userPage.innerHTML=`
     <h1>Todos los usuarios</h1>
     <table>
         <thead>
             <tr>
                 <th>Nombre</th>
                 <th>Email</th>
                 <th>Contraseña</th>
             </tr>
         </thead>
         <tbody>
         ${data.map((elem)=>{
          return `
              <tr>
                  <td>${elem.name}</td>
                  <td>${elem.email}</td>
                  <td>*******</td>
              </tr>
          `
         }).join("")}
             
         </tbody>
     </table>
     `
}

async function getAllBookigData(){
  try {
    let res= await fetch(`${baseurl}/booking`)
    let data=await res.json()
    displayBookingData(data.bookingData)

  } catch (error) {
     console.log("Error while fetching user data")
     console.log(error)
  }
}


function displayBookingData(data){
   bookingPage.innerHTML=""
   bookingPage.innerHTML=`
   <h1 style="text-align: center;">Todos los Bookings</h1>
   <table>
       <thead>
           <tr>
               <th>Email</th>
               <th>Fecha</th>
               <th>Hora de salida</th>
           </tr>
       </thead>
       <tbody>
       ${data.map((elem)=>{
        return `
            <tr>
                <td>${elem.userEmail}</td>
                <td>${elem.bookingDate}</td>
                <td>${elem.bookingSlot}</td>
            </tr>
        `
       }).join("")}
           
       </tbody>
   </table>
   `
}
