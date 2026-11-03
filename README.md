# Grading Workflow

O Grading Workflow é uma extensão para navegador que criei para agilizar a
correção de atividades no Google Classroom.

Durante meu estágio em um colégio, uma das minhas atividades é corrigir
trabalhos dos alunos pela plataforma. Como parte desse processo envolve
ações repetitivas, desenvolvi a extensão para facilitar a navegação entre
os estudantes, agilizar o preenchimento das notas e evitar valores incorretos.

O projeto surgiu como uma solução para o meu próprio fluxo de trabalho e
também como uma oportunidade de praticar JavaScript e o desenvolvimento
de extensões para navegador.

## Funcionalidades

- **Validação de notas:** permite apenas as notas `0` e `100` nos campos identificados pela extensão.
- **Preenchimento rápido:** usa as setas para cima e para baixo para preencher as notas.
- **Navegação entre estudantes:** usa as setas para a esquerda e para a direita para alternar entre os trabalhos.
- **Recuperação de foco:** tenta devolver o foco à página quando a prévia de um trabalho o recebe, facilitando a navegação pelo teclado.

## Atalhos

| Tecla | Ação |
| --- | --- |
| `↑` | Preenche a nota com `100` |
| `↓` | Preenche a nota com `0` |
| `←` | Abre o estudante anterior |
| `→` | Abre o próximo estudante |

As setas para preencher notas funcionam quando um campo de nota está selecionado. Já a navegação entre estudantes funciona fora dos campos de edição.

Ao abrir a tela de correção, pode ser necessário clicar uma vez na página antes de usar os atalhos de navegação.

## Tecnologias utilizadas

- JavaScript
- JSON
- Chrome Extensions — Manifest V3

## Como instalar

A extensão pode ser carregada manualmente em um navegador compatível com extensões do Chrome:

1. Baixe ou clone este repositório:

   ```bash
   git clone https://github.com/alanfelipe01/grading-workflow.git
   ```

2. Abra `chrome://extensions` no navegador.
3. Ative o **Modo do desenvolvedor**.
4. Clique em **Carregar sem compactação**.
5. Selecione a pasta do projeto, que contém o arquivo `manifest.json`.
6. Abra ou atualize o Google Classroom para usar a extensão.

## Estrutura do projeto

```text
grading-workflow/
├── content.js
├── manifest.json
└── README.md
```

- **`content.js`:** contém a lógica de validação, os atalhos e a navegação.
- **`manifest.json`:** reúne as configurações da extensão e define onde o script será executado.

## Observações

A validação de notas foi criada para o meu fluxo de correção, no qual utilizo apenas `0` e `100`. Os atalhos dependem dos campos e botões identificados no Google Classroom, então mudanças na interface ou no idioma da página podem afetar seu funcionamento.

Este é um projeto independente e não possui vínculo oficial com o Google ou com o Google Classroom.

## Autor

Criado por [Alan Felipe](https://github.com/alanfelipe01).