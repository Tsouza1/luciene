const readline = require('readline');
var term = require( 'terminal-kit' ).terminal

const {
  performance
} = require('perf_hooks');


const items = [
	'1. Exibir o vetor' ,
	'2. Realizar a busca linear por um elemento' ,
  '3. Ordenar os elementos (Bubble Sort)',
  '4. Realizar a busca binária por um elemento',
  '5. Excluir um elemento',
  '6. Encerrar'
] ;

var options = {
	x: 1 ,	
	style: term.inverse ,
	selectedStyle: term.dim.blue.bgGreen
} ;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question1 = () => {
  return new Promise((resolve, reject) => {
    term.bold.underline.cyan( 'Digite o tamanho do array: ' ) ;

    term.inputField(
      {echo:false,default:' '},
      function( error , input ) {
    
        resolve(input)
    
      }
    ) ;
  });
};

const question2 = () => {
  return new Promise((resolve, reject) => {
    term.bold.underline.green( '\nO inicio da escala: ' ) ;

    term.inputField(
      {echo:false,default:' '},
      function( error , input ) {
    
        resolve(input)
    
      }
    ) ;
  });
};

const question3 = () => {
  return new Promise((resolve, reject) => {
    term.bold.underline.red( '\nO fim da escala:'  ) ;

    term.inputField(
      {echo:false,default:' '},
      function( error , input ) {
    
        resolve(input)
    
      }
    ) ;
  });
};

var array = []

const main = async () => {
  var size = Number(await question1());
  var inicio = Number(await question2());
  var fim = Number(await question3());


  if (inicio > fim) {
    console.log('\ninicio da escala não pode ser maior que o final');
    rl.question(
      'deseja tentar novamente ? \n \n 1 - sim / 2 - não \n',
      answer => {
        if (answer === '1') {
          continua = true;
          main();
        } else if (answer === '2') {
          console.log('\nmuito obrigado');
          return;
        }
      }
    );
  } else if (fim >= inicio) {
    for (var i = 1; i < size; i++) {
      var number = (Math.floor(getRandomInt(inicio, fim)));
      parseInt(number,10)
      array.push(number)
    }

    term.singleColumnMenu( items , function( error , response ) {
     menu(response.selectedIndex)
 
    } ) ;
    
}}
;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function menu (answer){
    console.log(answer)
                switch (answer) {
                  case 0:
                    exibirArray()
                    break;
                  case 1:
                    buscaLinear()
                    break;
                  case 2:
                     bubbleSort()
                    break;
                  case 3:
                    buscaBinaria()
                    break;
                  case 4:
                    removerItem()
                    break;
                  case 5:
                  console.log('obrigado')
                  
                
                    break;
                }

}



function bubbleSort(){

    var len = array.length
    for (i=0; i < len; i++){
        for (j=0, stop=len-i; j < stop; j++){
            if (array[j] > array[j+1]){
                let temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp
            }
        }
    }

    rl.question(
      'Deseja visualizar o array \n \n 1 - sim / 2 - não \n',
      answer => {
        if (answer === '1') {
          exibirArray() ;
        } else if (answer === '2') {
          console.log('\nmuito obrigado');
          return;
        }
      }
    );

    rl.question(
      'deseja retornar ao menu? \n \n 1 - sim / 2 - não \n',
      answer => {
        if (answer === '1') {
          term.singleColumnMenu( items , function( error , response ) {
            menu(response.selectedIndex)
        
           } ) ;
        } else if (answer === '2') {
          console.log('\nmuito obrigado');
          return;
        }
      }
    );

}

function removerItem(){
    
    rl.question(' Insira o elemento que deseja remover\n\n', answer => {
       var resposta = parseInt(answer,10)
       var inclui = array.includes(resposta);
        
        if(!inclui){
          console.log(`o elemento ${answer} não existe no array`)
        return
        }else{
            
        var filtered = array.filter(function(element) {
            return element !== resposta;
        });

        rl.question(' Deseja visualizar o novo array\n\n 1 - Sim  2- Não', answer => {
            if(answer === '1'){

                filtered.sort((a, b) => a - b)

                for (var i = 1; i <= filtered.length; i++) {
                    console.log(filtered[i - 1]);
                  }
            }
            
          });
     }
 });   

}

function buscaBinaria(){

  array.sort((a, b) => a - b)

  rl.question('\n Digite o elemento que deseja buscar (busca binária) \n\n', answer => {

  let inicio = 0
  let fimArray = array.length - 1
  let meioArray = Math.floor((inicio + fimArray) / 2)
  array.sort((a,b) => a-b)
  let resposta =  parseInt(answer,10)

  var t0 = performance.now(); 
  while (array[meioArray] !== answer && inicio < fimArray) {
    if (resposta < array[meioArray]) {
      fimArray = meioArray - 1
    } else {
      inicio = meioArray + 1
    }


    meioArray = Math.floor((inicio + fimArray) / 2)


  }
  var t1 = performance.now();
  if (array[meioArray] === resposta){
    console.log(`${answer} encontrado`)
    console.log("Tempo de execução da busca binária em milisegundos " + (t1 - t0).toFixed(2));
    
  }

    if (array[meioArray] !== resposta){
        console.log(`${answer} não encontrado`)
        console.log("Tempo de execução da busca binária em milisegundos " + (t1 - t0).toFixed(2));        
        }
      
  
        rl.question(
          '\n\ndeseja retornar ao menu? \n \n 1 - sim / 2 - não \n',
          answer => {
            if (answer === '1') {
              term.singleColumnMenu( items , function( error , response ) {
                menu(response.selectedIndex)
            
               } ) ;
            } else if (answer === '2') {
              console.log('\nmuito obrigado');
              return;
            }
          }
        );
    
  })

}


function exibirArray(){
  for (var i = 1; i <= array.length; i++) {
    console.log(array[i - 1]);
  }

  rl.question(
    '\n\ndeseja retornar ao menu? \n \n 1 - sim / 2 - não \n',
    answer => {
      if (answer === '1') {
        term.singleColumnMenu( items , function( error , response ) {
          menu(response.selectedIndex)
      
         } ) ;
      } else if (answer === '2') {
        console.log('\nmuito obrigado');
        return;
      }
    }
  );
  
}

function buscaLinear(){

  var encontrado = false
  rl.question('\n Digite o elemento que deseja buscar (Buscar Linear) \n\n', answer => {
    var t0 = performance.now(); 
    var resposta = Number(answer)
    for (var i=0; i <= array.length; i++) {
      if (resposta === array[i]) {
        encontrado = true
      }
    }
    var t1 = performance.now();
    if(encontrado){
        console.log(`${answer} encontrado`)
    }else{
        console.log(`${answer} não encontrado`)
    }
    console.log("Tempo de execução da busca linear em milisegundos " + (t1 - t0).toFixed(2));

    rl.question(
      '\n\ndeseja retornar ao menu? \n \n 1 - sim / 2 - não \n',
      answer => {
        if (answer === '1') {
          term.singleColumnMenu( items , function( error , response ) {
            menu(response.selectedIndex)
        
           } ) ;
        } else if (answer === '2') {
          console.log('\nmuito obrigado');
          return;
        }
      }
    );
})
}


main();