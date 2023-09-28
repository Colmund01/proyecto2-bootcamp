let baseUrl=`https://good-tan-jay.cyclic.app/`


let loginForm = document.querySelector('.login-wrap');
let signupForm = document.querySelector('.signup-wrap');
let title = document.querySelector('title');

let signupToggleBtn = document.querySelector('#toggle-signup');
let loginToggleBtn = document.querySelector('#toggle-login');
let signupBtn=document.querySelector(".signup-btn");
let loginBtn=document.querySelector(".login-btn");

signupToggleBtn.onclick = () => {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
    title.textContent = 'Signup form';
}

loginToggleBtn.onclick = () => {
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
    title.textContent = 'Login form';
}

signupBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let name=document.querySelector(".signup-wrap form #name").value;
    let email=document.querySelector(".signup-wrap form #email").value;
    let password=document.querySelector(".signup-wrap form #password").value;
    if(name==undefined||email==undefined||password==undefined){
        return alert("Por favor llena todos tus datos")
    }
    let obj={
        name,
        email,
        password
    }
    //console.log(obj);
    registerNewUser(obj);
})

async function registerNewUser(obj){
    //console.log(obj);
    try {
       let res=await fetch(`${baseUrl}/user/signup`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(obj)
       })
       let out=await res.json();
       //console.log(out);
       if(out.msg=="You are already registerd!"){
        alert("Ya estas registrado")
       }else if(out.msg=="Signup Successfully"){
        alert("Registro exitoso")
       }else{
        alert("Algo salió mal!!")
       }
    } catch (error) {
        console.log("err",error)
        alert("Algo salió mal!!!!")
    }
}

loginBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let email=document.querySelector(".login-wrap form #email").value;
    let password=document.querySelector(".login-wrap form #password").value;
    if(email==""||password==""){
        return alert("Por favor llena todos los datos")
    }else if(email=="admin@gmail.com"&&password=="admin"){
        window.location.href="./adminpage.html";
    }else{
        let obj={
            email,
            password
        }
        //console.log(obj);
        loginUser(obj);
    }
    
})

async function loginUser(obj){
    try {
       let res=await fetch(`${baseUrl}/user/login`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(obj)
       })
       let out=await res.json();
       //console.log(out);
       if(out.msg=="Wrong Credentials"){
        alert("Datos incorrectos")
       }else if(out.msg=="login Successfull"){
        sessionStorage.setItem("token", out.token);
        sessionStorage.setItem("name", out.name);
        alert("Login exitoso")
        window.location.href="./index.html"
       }else{
        alert("Algo salió mal!!")
       }
    } catch (error) {
        console.log("err",error)
        alert("Algo salió mal!!!!")
    }
}
