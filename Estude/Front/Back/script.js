console.log("✅ JavaScript carregado");

// Admin padrão
const user_adm = "Rafael";
const key_adm = "12345";

// LOGIN
const btn_entrar = document.getElementById("btn_entrar");

if (btn_entrar) {
  btn_entrar.addEventListener("click", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("user").value;
    const senha = document.getElementById("pass").value;

    if (usuario.trim() === "" || senha.trim() === "") {
      alert("Preencha todos os campos!");
      return;
    } 

    fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({usuario, senha})
    })
    .then(res => res.json())
    .then(data => {
      if(data.ok) {
        localStorage.setItem("usuario_id", data.usuario.id);
        alert("Login aprovado!");
        window.location.href = "materia.html";
      } else{
        alert("Usuário ou senha incorretos!");
      }
    });
  });
}

// REGISTRO

const btn_registrar = document.getElementById("register");

if (btn_registrar) {
  btn_registrar.addEventListener("click", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("new_user").value;
    const senha = document.getElementById("new_pass").value;
    const confirm = document.getElementById("confirm_pass").value;

    if (senha !== confirm || usuario.trim() === "") {
      alert("Verifique os dados!");
      return;
    }

    fetch('/api/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha })
    })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      window.location.href = "teladelogin.html";
    })
    .catch(err => {
      alert("Erro ao registrar.");
      console.error(err);
    });
  });
}

// REGISTRAR TAREFA
const btn_save = document.getElementById("btn_save");

if(btn_save) {
  btn_save.addEventListener("click", function (event) {
    event.preventDefault();
    registrarTarefa();
  });
}

function registrarTarefa(){
  const titulo = document.getElementById("tittle").value;
  const descricao = document.getElementById("descript").value;
  const data_entrega = document.getElementById("date").value;

  const id_user = localStorage.getItem("usuario_id");

  if(!titulo || !descricao || !data_entrega) {
    alert("Preencha todos os campos!");
    return;
  } else{
    fetch('/api/tarefas', {
      method: 'POST',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify({titulo, descricao, data_entrega, id_user})
    })
    .then(res => {
      if (!res.ok) throw new Error("Erro na resposta do servidor.");
      return res.text();
    })
    .then(msg => {
      alert(msg);

      document.getElementById("tittle").value = "";
      document.getElementById("descript").value = "";
      document.getElementById("date").value = "";
    })
    .catch(err => {
      console.error("Erro ao salvar: ", err);
      alert("Erro ao salvar tarefa. Tente novamente.");
    });
  }
}


// VOLTAR
const btn_back = document.getElementById("back");

if (btn_back) {
  btn_back.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "teladelogin.html";
  });
}

// FUNÇÃO CARD ADD

const btn_add = document.getElementById("add-btn");
const card_add = document.getElementById("card_add");

if(btn_add){
  btn_add.addEventListener("click", function(event){
    event.preventDefault();
    card_add.style.display = "flex";
  });
}

// CANCELAR TAREFA
const btn_cancel = document.getElementById("btn_cancel");

if(btn_cancel) {
  btn_cancel.addEventListener("click", function(event) {
    event.preventDefault();
    card_add.style.display = "none";
  });
}