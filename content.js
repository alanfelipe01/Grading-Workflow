console.log("Grading Workflow carregado!");

// Campos de nota reconhecidos pela extensão
const SELETORES_CAMPOS = [
    'input[aria-label="Editar nota"]',
    'input[aria-label="Nota"]',
    'input[aria-label="Inserir nota"]'
];

// Valores aceitos enquanto a nota é digitada
const VALORES_PERMITIDOS_DURANTE_DIGITACAO = ["", "0", "1", "10", "100"];

function ehCampoDeNota(elemento) {
    return (
        elemento &&
        elemento.tagName === "INPUT" &&
        SELETORES_CAMPOS.some((seletor) => elemento.matches(seletor))
    );
}

// Bloqueia valores que não fazem parte da digitação de 0 ou 100
document.addEventListener("input", function (event) {
    const campo = event.target;

    if (!ehCampoDeNota(campo)) return;

    const valor = campo.value;

    if (!VALORES_PERMITIDOS_DURANTE_DIGITACAO.includes(valor)) {
        campo.value = "";
        console.log("Nota inválida bloqueada:", valor);
    }
});

// Ao sair do campo, aceita apenas 0, 100 ou o campo vazio
document.addEventListener("blur", function (event) {
    const campo = event.target;

    if (!ehCampoDeNota(campo)) return;

    const valor = campo.value;

    if (valor !== "0" && valor !== "100" && valor !== "") {
        alert("Nota inválida!\n\nSomente as notas 0 ou 100 são permitidas.");
        campo.value = "";
    }
}, true);

// Setas para preencher rapidamente as notas
document.addEventListener("keydown", function (event) {
    const campo = event.target;

    // Só funciona nos campos de nota identificados pela extensão
    if (!ehCampoDeNota(campo)) return;

    // Não interfere em combinações com outras teclas
    if (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
        return;
    }

    let nota;

    if (event.key === "ArrowUp") {
        nota = "100";
    } else if (event.key === "ArrowDown") {
        nota = "0";
    } else {
        return;
    }

    // Evita que a seta execute outra ação no campo
    event.preventDefault();

    campo.value = nota;

    // Avisa o Classroom que o valor do campo mudou
    campo.dispatchEvent(new Event("input", { bubbles: true }));
    campo.dispatchEvent(new Event("change", { bubbles: true }));
});

// Setas para navegar entre os estudantes
document.addEventListener("keydown", function (event) {
    // Ignora combinações com outras teclas e teclas mantidas pressionadas
    if (
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.metaKey ||
        event.repeat
    ) {
        return;
    }

    // Não muda de estudante enquanto você edita uma nota ou comentário
    const elemento = event.target;

    if (
        elemento instanceof HTMLElement &&
        (
            elemento.isContentEditable ||
            elemento.closest("input, textarea, [contenteditable='true']")
        )
    ) {
        return;
    }

    let seletor;

    if (event.key === "ArrowLeft") {
        seletor = 'button[aria-label="Estudante anterior"]';
    } else if (event.key === "ArrowRight") {
        seletor = 'button[aria-label="Próximo estudante"]';
    } else {
        return;
    }

    const botao = document.querySelector(seletor);

    // Só executa o atalho se o botão existir e estiver habilitado
    if (
        !botao ||
        botao.disabled ||
        botao.getAttribute("aria-disabled") === "true"
    ) {
        return;
    }

    event.preventDefault();
    botao.click();

    // Durante 3 segundos, verifica se a prévia recebeu o foco
    let verificacoes = 0;

    const verificarFoco = setInterval(function () {
        verificacoes++;

        if (document.activeElement instanceof HTMLIFrameElement) {
            const botaoProximo = document.querySelector(
                'button[aria-label="Próximo estudante"]'
            );

            if (botaoProximo) {
                botaoProximo.focus({ preventScroll: true });
            }
        }

        if (verificacoes >= 15) {
            clearInterval(verificarFoco);
        }
    }, 200);

    // Tenta recuperar o foco ao abrir a tela de correção
    let tentativasIniciais = 0;

    const focoInicial = setInterval(function () {
        tentativasIniciais++;

        if (document.activeElement instanceof HTMLIFrameElement) {
            const botaoProximo = document.querySelector(
                'button[aria-label="Próximo estudante"]'
            );

            if (botaoProximo) {
                botaoProximo.focus({ preventScroll: true });
            }
        }

        if (tentativasIniciais >= 25) {
            clearInterval(focoInicial);
        }
    }, 200);
});
