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
    const password = document.getElementById("pass").value;

    if (usuario === user_adm && password === key_adm) {
      console.log("✅ Login aprovado!");
      window.location.href = "telainicial.html";
    } else {
      alert("Usuário ou senha incorretos!");
      console.log("❌ Acesso negado!");
    }
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


// VOLTAR
const btn_back = document.getElementById("back");

if (btn_back) {
  btn_back.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "teladelogin.html";
  });
}
