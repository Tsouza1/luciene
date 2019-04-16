const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const CorVermelho  = "\x1b[31m";
const CorVerde     = "\x1b[32m";
const CorAmarelo   = "\x1b[33m";
const CorResetar   = "\x1b[0m";
const randomMin    = -100;
const randomMax    =  100;

var size = 0;
var inicio = -1, fim = inicio;
var vetor = [];


function main() {
    rl.question("Qual será o tamanho do vetor?\n> ", resposta => {

        size = parseInt(resposta);

        if (isNaN(size)|| size <= 0) {
            console.clear();
            printError("O valor precisa ser um inteiro e maior que 0.");
            main();
            return;
        }
        
        //Função para entrar em loop e mostrar o vetor
        exibirVetor();
    });
}

function exibirVetor(respostaAnterior) {
    console.clear();

    print("I: ");
    printNaPosicaoDoVetor(inicio, inicio >= 0 ? "  v\n" : "Ø\n", "   ", vetor);

    print("V: [ " + CorAmarelo + emptyOrValue(vetor[0]));
    
    var i;
    for (i = 1; i < size; i++) {
        print(CorResetar + " | " + CorAmarelo);
        print(emptyOrValue(vetor[i]));
    }

    print(CorResetar + " ]\n");

    print("F: ");
    printNaPosicaoDoVetor(fim, fim >= 0 ? "  ^\n" : "Ø\n", "   ", vetor);
    
    if (respostaAnterior != null) {
        //Printar uma mensagem caso o comando anterior
        //Retornou alguma mensagem de sucesso/erro
        println(respostaAnterior);
    }
    rl.question(`Ação:
  ${CorVermelho}+${CorResetar} - Adiciona um novo valor ${CorAmarelo}aleatório${CorResetar} (push).
  ${CorVermelho}+ <número>${CorResetar} - Adiciona um novo valor (push).
  ${CorVermelho}-${CorResetar} - Remove o próximo valor (pop).
> `, reposta => {
        processarComando(reposta.trim());
    });
}

function processarComando(comando) {
    console.log("Comando: " + comando);
    if (comando == "-") {
        //Remover e exibir mensagem de sucesso/falha
        exibirVetor(pop());
    } else if (comando.startsWith("+")) {
        comando = comando.substring(1).trim();
        //Caso o restante seja vazio
        //Entao é pra gerar um número aleatório.
        if (comando == "") {
            comando = Math.floor(Math.random() * (+randomMax - +randomMin)) + +randomMin; 
        //Caso contrario, dar parse no argumento
        //comon número.
        } else {
            comando = parseInt(comando);
        }

        exibirVetor(!isNaN(comando) ? push(comando) :
            `${CorVermelho}O valor precisa ser um número.`);
    } else {
        exibirVetor(comando != "" ? `${CorVermelho}Comando inexistente!` : null);
    }
}

function next(index) {
    return (index + 1) % size;
}

function push(valor) {
    if (next(fim) == inicio) {
        return `${CorVermelho}A fila está cheia!`;
    }
    fim = next(fim);
    vetor[fim] = valor;
    
    if (inicio < 0) {
        inicio = 0;
    }
    return `${CorVerde}O número ${valor} foi adicionado!`
}
function pop() {
    if (inicio == fim && inicio < 0) {
        return `${CorVermelho}A fila está vazia!`;
    }
    var temp = vetor[inicio];
    vetor[inicio] = null;
    if (inicio == fim) {
        inicio = -1;
        fim = inicio;
    } else {        
        inicio = next(inicio);
    }
    return `${CorVerde}O número ${temp} foi removido!`;
}

function emptyOrValue(v) {
    return v == null ? " " : v.toString();
}


function printNaPosicaoDoVetor(posicao, char, separador, vetor) {
    var i, j;
    for (i = 0; i <= posicao; i++) {
        for (j = 1; j < emptyOrValue(vetor[i]).length; j++) {
            print(" ");
        }
        if (i < posicao) {
            print(" " + separador);
        }
    }
    print(char);
}

function println(msg) {
    console.log(msg + CorResetar);
}

function print(msg) {
    rl.output.write(msg.toString());
}

function printError(msg) {
    println(CorVermelho + msg);
}

//Limpar o console quando sair do programa.
process.on("exit", () => console.clear());

console.clear();
main();