const Pilha = () =>{
    
    let top = -1

    const DEC2 = () =>{
        if(top < 0){
            console.log('Pilha vazia!!')
            return false
        }else{
        array[top] -= 2
        console.log(array)
        }
    }

    const ADD3 = () =>{
        if(top < 0){
            console.log('Pilha vazia!!')
            return false
        }else{
        array[top] += 3
        console.log(array)
        }
    }

    const Soma = () =>{
        if(top < 0){
            console.log('Pilha vazia!!')
            return false
        }else{
        var topN = array[top]
        pop()
        array[top] += topN
        console.log(array)
        }
    }

    const SUB = () =>{
        if(top < 0){
            console.log('Pilha vazia!!')
            return false
        }else{
        var topN = array[top]
        pop()
        array[top] -= topN
        console.log(array)
        }
    }

    const MYP = () =>{
        if(top < 0){
            console.log('Pilha vazia!!')
            return false
        }else{
        var topN = array[top]
        pop()
        array[top] *= topN
        console.log(array)
        }
    }

    const DIV = () =>{
        if(top < 0){
            console.log('Pilha vazia!!')
            return false
        }else{
        var topN = array[top]
        pop()
        array[top] /= topN
        console.log(array)
        }
    }

    const push = (value, size) => {
        if(array.length > size){
            console.log("Não e possivel inserir valor Pilha Cheia!!")
            return false
        }else{
            top++
            array[top] = parseInt(value)
            console.log(array)
        }
    };
    const pop = () =>{
        if(top < 0){
            console.log('Não é possivel remover Pilha vazia!!')
            return false
        }else{
            const itemToReturn = array[top]
            array.splice(top, 1)
            top--
            console.log(array)
            return itemToReturn
        }
    }
    const print = () =>{
        console.log('\n Item no Topo: ' + array[top])
    }

    return{
        push,pop,print,DEC2,ADD3,Soma,SUB,MYP,DIV
    }
}

var readline = require('readline-sync');

var size = readline.question('Qual será o tamanho da PILHA: ')
    size = parseInt(size)
const array = []

const pilha = Pilha()
var condition = true
while (condition == true) {
    
    var choice = readline.question(`
        Oque gostaria de fazer com essa humilde Pilha:
    1 --> Adicionar um valor.
    2 --> Remover um valor.
    3 --> Visualizar o Topo da PILHA.
    4 --> Operacoes unarios.
    5 --> Operacoes binarias.
    6 --> Sair.
`)

    if (choice == '1'){
        var value = readline.question("Qual valor deseja inserir: ")
        pilha.push(value, size-1)
    }
    else if (choice == '2') {
        pilha.pop()
    }
    else if (choice == '3'){
        pilha.print()
    }
    else if(choice == '4'){
        let choice = readline.question(
            `  Selecione uma operacao Unaria:
               1 --> DEC2 
               2 --> ADD3 
               3 --> Voltar
            `)
            if ( choice == '1') {
                pilha.DEC2()
            }
            if ( choice == '2') {
               pilha.ADD3()
           }
           if ( choice == '3') {
               conditionUna = false
        }
    }
    else if(choice == '5'){
        let choice = readline.question(
            `  Selecione uma operacao Binaria (Y é o elemento no topo da pilha e X o elemento abaixo de Y):
               1 --> Adicao --> X+Y
               2 --> Subtracao --> X-Y
               3 --> Multiplicacao --> X*Y
               4 --> Divisao --> X/Y
               5 --> Voltar
            `)
            if ( choice == '1') {
                pilha.Soma()
            }
            if ( choice == '2') {
               pilha.SUB()
           }
           if ( choice == '3') {
               pilha.MYP()
           }
           if ( choice == '4') {
               pilha.DIV()
           }
           if ( choice == '5') {
               conditionBin = false
           }        
    }
    else if (choice == '6'){
        condition = false
    }
}