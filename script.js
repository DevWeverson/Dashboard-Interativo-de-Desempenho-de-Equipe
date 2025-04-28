window.addEventListener('DOMContentLoaded', () => {
  // Dados simulados
  const equipe = [
    { nome: "Weverson", eficiencia: 85, concluidas: 42 },
    { nome: "Deise", eficiencia: 90, concluidas: 50 },
    { nome: "Manu", eficiencia: 78, concluidas: 38 },
    { nome: "Marlus", eficiencia: 82, concluidas: 45 }
  ];

  // Renderizar cards
  function renderizarCards() {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    equipe.forEach(membro => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h2>${membro.nome}</h2>
        <p>Eficiência: <span class="contador" data-valor="${membro.eficiencia}">0</span>%</p>
        <p>Tarefas concluídas: <span class="contador" data-valor="${membro.concluidas}">0</span></p>
      `;
      container.appendChild(card);
    });

    animarContadores();
  }

  function animarContadores() {
    const contadores = document.querySelectorAll(".contador");

    contadores.forEach(contador => {
      const valorFinal = +contador.getAttribute("data-valor");
      let valorAtual = 0;
      const incremento = valorFinal / 60;

      const atualizar = () => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
          contador.textContent = valorFinal;
        } else {
          contador.textContent = Math.floor(valorAtual);
          requestAnimationFrame(atualizar);
        }
      };

      atualizar();
    });
  }

  // Gráficos
  let graficoEficiencia;
  let graficoTarefasConcluidas;
  let graficoEvolucao;
  let tipoGrafico = "semanal";

  function criarGraficoEficiencia() {
    const ctx = document.getElementById("graficoEficiencia").getContext("2d");
    const nomes = equipe.map(membro => membro.nome);
    const eficiencias = equipe.map(membro => membro.eficiencia);

    if (graficoEficiencia) graficoEficiencia.destroy();

    graficoEficiencia = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: nomes,
        datasets: [{
          label: 'Eficiência (%)',
          data: eficiencias,
          backgroundColor: '#60a5fa'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  function criarGraficoTarefasConcluidas() {
    const ctx = document.getElementById("graficoTarefasConcluidas").getContext("2d");
    const nomes = equipe.map(membro => membro.nome);
    const concluidas = equipe.map(membro => membro.concluidas);

    if (graficoTarefasConcluidas) graficoTarefasConcluidas.destroy();

    graficoTarefasConcluidas = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: nomes,
        datasets: [{
          label: 'Tarefas Concluídas',
          data: concluidas,
          backgroundColor: ['#60a5fa', '#3b82f6', '#2563eb', '#1e40af']
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  function criarGraficoEvolucao() {
    const ctx = document.getElementById("graficoEvolucao").getContext("2d");

    let labels = [];
    let dados = [];

    if (tipoGrafico === "semanal") {
      labels = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
      dados = [75, 82, 88, 90];
    } else if (tipoGrafico === "mensal") {
      labels = ["Janeiro", "Fevereiro", "Março", "Abril"];
      dados = [78, 84, 86, 89];
    } else if (tipoGrafico === "anual") {
      labels = ["2022", "2023", "2024"];
      dados = [80, 85, 88];
    }

    if (graficoEvolucao) graficoEvolucao.destroy();

    graficoEvolucao = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Eficiência Média (%)',
          data: dados,
          borderColor: '#3b82f6',
          backgroundColor: '#bfdbfe',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
  }

  // Botões
  document.getElementById("botao-semanal").addEventListener("click", () => {
    tipoGrafico = "semanal";
    criarGraficoEvolucao();
    atualizarBotaoAtivo();
  });

  document.getElementById("botao-mensal").addEventListener("click", () => {
    tipoGrafico = "mensal";
    criarGraficoEvolucao();
    atualizarBotaoAtivo();
  });

  document.getElementById("botao-anual").addEventListener("click", () => {
    tipoGrafico = "anual";
    criarGraficoEvolucao();
    atualizarBotaoAtivo();
  });

  function atualizarBotaoAtivo() {
    document.getElementById("botao-semanal").classList.remove("ativo");
    document.getElementById("botao-mensal").classList.remove("ativo");
    document.getElementById("botao-anual").classList.remove("ativo");

    if (tipoGrafico === "semanal") {
      document.getElementById("botao-semanal").classList.add("ativo");
    } else if (tipoGrafico === "mensal") {
      document.getElementById("botao-mensal").classList.add("ativo");
    } else if (tipoGrafico === "anual") {
      document.getElementById("botao-anual").classList.add("ativo");
    }
  }

  // Menu mobile toggle
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Inicializar
  renderizarCards();
  criarGraficoEficiencia();
  criarGraficoTarefasConcluidas();
  criarGraficoEvolucao();
});