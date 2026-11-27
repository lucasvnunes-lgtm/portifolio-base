const portfolio = {
    "tema": {
      "corPrimaria": "#10b981",
      "corFundo": "#090d16",
      "corCard": "#111827",
      "corTexto": "#f9fafb"
    },
    "perfil": {
        "nome": "Lucas Vinícius",
        "cargo": "Estudante de Tecnologia | Desenvolvedor(a)",
        "resumo": "Apaixonado por resolver problemas com código, aprender novas tecnologias e construir projetos práticos.",
        "foto": "./assets/avatar-placeholder.png",
        "links": [
            {
                "rotulo": "GitHub",
                "url": "https://github.com"
            },
            {
                "rotulo": "LinkedIn",
                "url": "https://linkedin.com"
            }
        ]
    },
    "secoes": [
        {
            "id": "sobre",
            "titulo": "Sobre mim",
            "tipo": "texto",
            "conteudo": "Sou estudante de Desenvolvimento de Sistemas e apaixonado por tecnologia e resolução de problemas. Iniciei minha trajetória prática na área através da formação no programa Jovem Tech, onde construí uma base sólida em programação e desenvolvi projetos reais aplicando boas práticas de código e trabalho em equipe. Tenho grande interesse em desenvolvimento de software e criação de soluções eficientes que facilitem o dia a dia das pessoas. Atualmente, busco minha primeira oportunidade como estágio ou desenvolvedor júnior em um ambiente colaborativo, onde eu possa colocar meus conhecimentos em prática, aprender com profissionais experientes e evoluir constantemente na área."
        },
        {
            "id": "habilidades",
            "titulo": "Habilidades",
            "tipo": "lista",
            "itens": [
                "HTML & CSS",
                "JavaScript",
                "Git & GitHub",
                "Lógica de Programação"
            ]
        },
        {
            "id": "projetos",
            "titulo": "Projetos",
            "tipo": "cards",
            "itens": [
                {
                    "titulo": "Dashboard",
                    "descricao": "Desenvolvi um dashboard interativo em Python voltado para a organização, análise e visualização clara de dados, transformando informações brutas em gráficos intuitivos para apoiar a tomada de decisão",
                    "tags": [
                        "HTML",
                        "CSS"
                    ],
                    "link": "https://github.com"
                },
                {
                    "titulo": "Sistema de reservas",
                    "descricao": "Além disso, construí um sistema de reservas completo utilizando HTML, CSS e JavaScript, com foco em uma interface responsiva, boa experiência do usuário e interatividade no agendamento e gerenciamento de horários.",
                    "tags": [
                        "JavaScript",
                        "API"
                    ],
                    "link": "#"
                }
            ]
        }
    ]
}

async function carregarPortfolio() {
  const heroEl = document.getElementById("topo");
  const navEl = document.getElementById("navegacao");
  const mainEl = document.getElementById("conteudo");

  aplicarTema(portfolio.tema);
  renderizarPerfil(portfolio.perfil, heroEl);
  renderizarSecoes(portfolio.secoes || [], navEl, mainEl);
}

function aplicarTema(tema = {}) {
  const root = document.documentElement;
  if (tema.corPrimaria) root.style.setProperty("--cor-primaria", tema.corPrimaria);
  if (tema.corFundo) root.style.setProperty("--cor-fundo", tema.corFundo);
  if (tema.corCard) root.style.setProperty("--cor-card", tema.corCard);
  if (tema.corTexto) root.style.setProperty("--cor-texto", tema.corTexto);
}

function renderizarPerfil(perfil = {}, container) {
  document.title = perfil.nome ? `${perfil.nome} | Portfólio` : "Portfólio";

  const linksHtml = (perfil.links || [])
    .map(
      (link) =>
        `<a class="btn" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.rotulo}</a>`
    )
    .join("");

  container.innerHTML = `
    ${perfil.foto ? `<img class="avatar" src="${perfil.foto}" alt="Foto de ${perfil.nome || "perfil"}" />` : ""}
    <div class="hero-info">
      <h1>${perfil.nome || "Seu Nome"}</h1>
      <p class="cargo">${perfil.cargo || ""}</p>
      <p>${perfil.resumo || ""}</p>
      <div class="links">${linksHtml}</div>
    </div>
  `;
}

function renderizarSecoes(secoes, navEl, mainEl) {
  navEl.innerHTML = secoes
    .map((secao) => `<a href="#${secao.id}">${secao.titulo}</a>`)
    .join("");

  mainEl.innerHTML = secoes
    .map((secao) => {
      let corpoHtml = "";

      if (secao.tipo === "texto") {
        corpoHtml = `<div class="card-box"><p>${secao.conteudo || ""}</p></div>`;
      } else if (secao.tipo === "lista") {
        const itens = (secao.itens || [])
          .map((item) => `<li class="tag">${item}</li>`)
          .join("");
        corpoHtml = `<ul class="lista-tags">${itens}</ul>`;
      } else if (secao.tipo === "cards") {
        const cards = (secao.itens || [])
          .map((item) => {
            const tags = (item.tags || [])
              .map((tag) => `<span class="tag">${tag}</span>`)
              .join("");
            return `
              <article class="projeto-card">
                <h3>${item.titulo || "Sem título"}</h3>
                <p>${item.descricao || ""}</p>
                <div class="lista-tags">${tags}</div>
                ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">Ver mais →</a>` : ""}
              </article>
            `;
          })
          .join("");
        corpoHtml = `<div class="grid-cards">${cards}</div>`;
      } else {
        corpoHtml = `<div class="card-box"><p>Tipo de seção "${secao.tipo}" ainda não suportado.</p></div>`;
      }

      return `
        <section id="${secao.id}" class="secao">
          <h2>${secao.titulo}</h2>
          ${corpoHtml}
        </section>
      `;
    })
    .join("");
}

carregarPortfolio();