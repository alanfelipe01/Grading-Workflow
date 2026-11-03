(() => {
    const grupos = {
        "Recusada": [
            ["Não corresponde à PS", "A atividade enviada não corresponde à PS disponibilizada pelo professor no Classroom."],
            ["Imagem ilegível", "A PS não pôde ser corrigida porque a imagem enviada está ilegível."],
            ["Não escrita à mão", "A PS foi recusada porque não foi escrita à mão, conforme solicitado."],
            ["Entregue com atraso", "A PS foi recusada porque foi entregue fora do prazo."]
        ],
        "Incompleta": [
            ["Questões ou cálculos faltando", "A PS está incompleta, pois há questões, cálculos ou outras exigências sem resposta."],
            ["PS incompleta", "PS incompleta, Faltou a pág 00, Questão 00."],
            ["Mínimo de linhas", "A PS não atingiu o mínimo de linhas exigido."]
        ],
        "Imagem embaçada": [
            ["Baixa qualidade", "A imagem corresponde à PS, mas não pôde ser corrigida devido à baixa qualidade."]
        ]
    };

    // O campo é escolhido pelo usuário, evitando inserir texto em outro lugar.
    let campoSelecionado = null;
    const painel = document.createElement("div");
    painel.id = "gw-comentarios";
    painel.innerHTML = `<button type="button" class="gw-abrir" aria-expanded="false">Comentários rápidos</button>
        <section class="gw-painel" hidden>
            <div class="gw-topo"><strong>Comentários rápidos</strong><button type="button" class="gw-fechar" aria-label="Fechar">×</button></div>
            <p>Clique primeiro no campo de comentário particular e escolha uma mensagem.</p>
            <div class="gw-lista"></div><p class="gw-status" role="status" aria-live="polite"></p>
        </section>`;
    document.body.appendChild(painel);
    const abrir = painel.querySelector(".gw-abrir");
    const secao = painel.querySelector(".gw-painel");
    const status = painel.querySelector(".gw-status");
    const lista = painel.querySelector(".gw-lista");
    abrir.addEventListener("click", () => {
        secao.hidden = !secao.hidden;
        abrir.setAttribute("aria-expanded", String(!secao.hidden));
    });
    painel.querySelector(".gw-fechar").addEventListener("click", () => {
        secao.hidden = true;
        abrir.setAttribute("aria-expanded", "false");
        abrir.focus();
    });
    document.addEventListener("focusin", (evento) => {
        const alvo = evento.target;
        if (!(alvo instanceof HTMLElement) || painel.contains(alvo)) return;
        if (alvo instanceof HTMLTextAreaElement || alvo.isContentEditable ||
            (alvo instanceof HTMLInputElement && ["text", ""].includes(alvo.type))) {
            campoSelecionado = alvo;
        }
    });
    function inserir(campo, texto) {
        campo.focus();
        if (campo instanceof HTMLInputElement || campo instanceof HTMLTextAreaElement) {
            const inicio = campo.selectionStart ?? campo.value.length;
            const fim = campo.selectionEnd ?? inicio;
            const valor = campo.value.slice(0, inicio) + texto + campo.value.slice(fim);
            const proto = campo instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
            Object.getOwnPropertyDescriptor(proto, "value").set.call(campo, valor);
            campo.setSelectionRange(inicio + texto.length, inicio + texto.length);
            campo.dispatchEvent(new Event("input", { bubbles: true }));
            campo.dispatchEvent(new Event("change", { bubbles: true }));
        } else {
            // insertText preserva a integração com editores gerenciados pelo Classroom.
            if (!document.execCommand("insertText", false, texto)) return false;
        }
        return true;
    }
    for (const [grupo, comentarios] of Object.entries(grupos)) {
        const titulo = document.createElement("h3");
        titulo.textContent = grupo;
        lista.appendChild(titulo);
        for (const [rotulo, texto] of comentarios) {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.textContent = rotulo;
            botao.title = texto;
            botao.addEventListener("click", () => {
                if (!campoSelecionado || !campoSelecionado.isConnected || campoSelecionado.disabled || campoSelecionado.readOnly) {
                    status.textContent = "Clique no campo de comentário particular antes de escolher uma mensagem.";
                    return;
                }
                if (inserir(campoSelecionado, texto)) {
                    status.textContent = "Comentário inserido. Revise antes de enviar.";
                    campoSelecionado = null;
                } else {
                    status.textContent = "Não foi possível inserir. Clique novamente no campo e tente outra vez.";
                }
            });
            lista.appendChild(botao);
        }
    }
})();
