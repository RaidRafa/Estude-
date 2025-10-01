const user_adm = "Rafael";
const key_adm = "12345";

const btn_entrar = document.getElementById("btn_entrar");


btn_entrar.addEventListener("click", function(event){
    event.preventDefault();

    let usuario = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    if(usuario === user_adm && password === key_adm) {
        console.log("Login aprovado!");
        window.location.href = "telainicial.html";
    } else{
        alert("Usuário ou senha incorretos!");
        console.log("Acesso negado!!");
    }
});

const btn_registrar = document.getElementById("register");

btn_registrar.addEventListener("click", function(event){
    event.preventDefault();

    let new_user = document.getElementById("new_user").value;
    let new_password = document.getElementById("new_pass").value;
    let confirm_pass = document.getElementById("confirm_pass").value;

    if(new_password === confirm_pass && new_user.trim() !== ""){
        alert("Usuario registrado com sucesso!!");
        window.location.href = "teladelogin.html";
    } else if(new_password !== confirm_pass){
        alert("As senhas não coincidem");
    }
});

const btn_back = document.getElementById("back");

btn_back.addEventListener("click", function(event){
    event.preventDefault();

    window.location.href = "teladelogin.html";
});