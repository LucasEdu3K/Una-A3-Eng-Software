// Esse arquivo é usado por TODAS as páginas.
// Por isso cada bloco só roda se o elemento existir na página atual.

// ===== BARRAS DE PROGRESSO (lê o data-progresso do HTML) =====
document.querySelectorAll(".barra-cheia").forEach(function (barra) {
  barra.style.width = barra.dataset.progresso + "%";
});

// ===== LOGIN (RF01) - usuário fake, só pra testar o fluxo =====
const USUARIO_TESTE = {
  email: "aluno@email.com",
  senha: "1234"
};

const formLogin = document.getElementById("form-login");

if (formLogin) {
  formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-senha").value;
    const usuarioCadastrado = JSON.parse(
      localStorage.getItem("usuarioCadastrado") || "null"
    );

    const credenciaisValidas =
      (usuarioCadastrado &&
        email === usuarioCadastrado.email &&
        senha === usuarioCadastrado.senha) ||
      (email === USUARIO_TESTE.email && senha === USUARIO_TESTE.senha);

    if (credenciaisValidas) {
      window.location.href = "menu.html";
    } else {
      window.location.href = "erro.html";
    }
  });
}

// ===== CADASTRO (RF01) =====
const formCadastro = document.getElementById("form-cadastro");

if (formCadastro) {
  formCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const email = document.getElementById("cadastro-email").value.trim();
    const senha = document.getElementById("cadastro-senha").value;

    localStorage.setItem(
      "usuarioCadastrado",
      JSON.stringify({ email: email, senha: senha })
    );
    alert("Cadastro salvo!");
    window.location.href = "index.html";
  });
}

// ===== NOVA ATIVIDADE (RF03 e RF07) =====
const formAtividade = document.getElementById("form-atividade");

if (formAtividade) {
  formAtividade.addEventListener("submit", function (evento) {
    evento.preventDefault();
    // TODO: salvar a atividade de verdade
    window.location.href = "tarefas.html";
  });
}

// ===== TAREFAS: concluir (RF04) e filtrar (RF09) =====
const itensTarefa = document.querySelectorAll(".lista-tarefas li");

// clicar na tarefa alterna entre pendente e feito
itensTarefa.forEach(function (item) {
  item.addEventListener("click", function () {
    const selo = item.querySelector(".selo");

    if (item.dataset.status === "pendente") {
      item.dataset.status = "feito";
      selo.textContent = "Feito";
      selo.className = "selo feito";
    } else {
      item.dataset.status = "pendente";
      selo.textContent = item.dataset.prazo;
      selo.className = "selo " + item.dataset.classe;
    }
  });
});

const botaoFiltro = document.getElementById("btn-filtro");
const filtros = ["todas", "pendentes", "feitas"];
let filtroAtual = 0;

if (botaoFiltro) {
  botaoFiltro.addEventListener("click", function () {
    filtroAtual = (filtroAtual + 1) % filtros.length;
    const filtro = filtros[filtroAtual];

    itensTarefa.forEach(function (item) {
      const status = item.dataset.status;
      const mostrar =
        filtro === "todas" ||
        (filtro === "pendentes" && status === "pendente") ||
        (filtro === "feitas" && status === "feito");

      item.style.display = mostrar ? "flex" : "none";
    });

    botaoFiltro.textContent = "Filtrar por status: " + filtro;
  });
}

// ===== EXPORTAR RESUMO =====
const botaoExportar = document.getElementById("btn-exportar");

if (botaoExportar) {
  botaoExportar.addEventListener("click", function () {
    window.print(); // por enquanto só abre a impressão/PDF do navegador
  });
}
