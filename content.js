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