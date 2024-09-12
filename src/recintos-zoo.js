/* Classe Recinto - se refere aos recintos, como Savana, Rio, etc... 
Essa classe possui o número, bioma, tamanho total do recinto, e a lista de animais existentes */
class Recinto{
    constructor(numero,bioma,tamanhoTotal,animaisExistentes){
        this.numero = numero;
        this.bioma = bioma; 
        this.tamanhoTotal = tamanhoTotal; 
        this.animaisExistentes = animaisExistentes;
    }

    /* verifica o espaço que o animal está ocupando. */
    occupiedSpace(animal,quantidade,recinto){
        let espacoOcupado = 0; 

        switch(animal){
            case "LEAO":
                espacoOcupado = 3 * quantidade;
                return espacoOcupado;
                

            case "LEOPARDO":
                espacoOcupado = 2 * quantidade;
                return espacoOcupado;
                

            case "CROCODILO":
                
                espacoOcupado = 3 * quantidade;
                return espacoOcupado;
                

            case "MACACO":
                let soma = 0; 
                if(recinto.animaisExistentes.length > 0){
                    
                    for(let i = 0; i<=recinto.animaisExistentes.length-1; i++){
                        if(recinto.animaisExistentes[i].especie !== "MACACO" && recinto.animaisExistentes[i].alimentacao !== "carnivoro"){
                            soma+=1;
                        }
                        soma+=recinto.animaisExistentes[i].tamanho;  
                         
                    }
                }
                espacoOcupado = (1 * quantidade) + soma;
                return espacoOcupado; 
                 
            
            case "GAZELA":
                espacoOcupado = 2 * quantidade; 
                return espacoOcupado; 
                 

            case "HIPOPOTAMO":
                espacoOcupado = 4 * quantidade; 
                return espacoOcupado; 
                break; 
        }  
    }
}

/* Classe Animal */
class Animal{
    constructor(especie,tamanho,bioma,alimentacao){
        this.especie = especie;
        this.tamanho = tamanho;
        this.bioma = bioma;
        this.alimentacao = alimentacao;

    }
}

/* lista de instâncias da classe animal com cada animal */
const animais = [
    new Animal("LEAO",3,["savana"], "carnivoro"),
    new Animal("LEOPARDO",2,["savana"], "carnivoro"),
    new Animal("CROCODILO", 3, ["rio"], "carnivoro"),
    new Animal("MACACO", 1, ["savana", "floresta", "savana e rio"]), "onivoro",
    new Animal("GAZELA", 2, ["savana", "savana e rio"], "herbivoro"),
new Animal("HIPOPOTAMO", 4, ["savana e rio"], "onivoro")
];

/* lista de instâncias da classe Recinto, com cada recinto contendo informações como bioma e a lista de animais existentes. */
var recintos= [
    new Recinto(1,"savana",10,[
        new Animal("MACACO", 1, ["savana", "floresta", "savana e rio"], "onivoro"),
        new Animal("MACACO", 1, ["savana", "floresta", "savana e rio"], "onivoro"),
        new Animal("MACACO", 1, ["savana", "floresta", "savana e rio"], "onivoro"),
    ]),
    new Recinto(2,"floresta",5,[

    ]),
    new Recinto(3,"savana e rio",7,[
        new Animal("GAZELA", 2, ["savana", "savana e rio"], "herbivoro"), 
    ]),
    new Recinto(4,"rio",8,[

    ]),
    new Recinto(5,"savana",9,[
        new Animal("LEAO",3,["savana"], "carnivoro"),
    ])
]



class RecintosZoo {

    analisaRecintos(animal, quantidade) {

        let recintosExistentes = recintos;
        let animaisValidos = animais;
        let animalEscolhido = null;

        /* verificação animal inválido */
        for(let i = 0; i<= animaisValidos.length-1; i++){
            if(animaisValidos[i].especie == animal){
                animalEscolhido = animaisValidos[i];
                if(quantidade <= 0){
                    return{
                        "erro": "Quantidade inválida"
                    }
                }

                /* verificação de recintos */
                var recintosViaveis= [];
                
                for(let i = 0; i<=recintosExistentes.length-1;i++){

                    if(quantidade > recintosExistentes[i].tamanhoTotal){
                        return{
                            "erro": "Não há recinto viável"
                        }
                    }
                    else if(quantidade < recintosExistentes[i].tamanhoTotal){
                        let espacoOcupado = 0;

                        if(espacoOcupado < recintosExistentes[i].tamanhoTotal){


                            if(animal == "CROCODILO"){
                                espacoOcupado = recintosExistentes[i].occupiedSpace("CROCODILO",quantidade,recintosExistentes[i])
                                let crocodilo = new Animal("CROCODILO", 3, ["rio"], "carnivoro");

                                if(crocodilo.bioma == recintosExistentes[i].bioma){
                                    let espacoLivre = recintosExistentes[i].tamanhoTotal - espacoOcupado; 
                                    recintosViaveis.push(`Recinto ${recintosExistentes[i].numero} (espaço livre: ${espacoLivre} total: ${recintosExistentes[i].tamanhoTotal})`)
                                    
                                }
                            }
                            else if(animal == "MACACO"){
                                let isRecintoViavel = true; 
                                if(espacoOcupado === null){
                                    continue; 
                                }
                                espacoOcupado = recintosExistentes[i].occupiedSpace("MACACO",quantidade,recintosExistentes[i]);
                                let macaco = new Animal("MACACO",1,["savana","floresta", "savana e rio"], "onivoro");

                                if(macaco.bioma.includes(recintosExistentes[i].bioma  )){
                                    for(let j =0; j<=recintosExistentes[i].animaisExistentes.length -1; j++){
                                        if(recintosExistentes[i].animaisExistentes[j].alimentacao === "carnivoro"){
                                            isRecintoViavel = false; 
                                            break; 
                                        }
                                    }
                                    if(isRecintoViavel){
                                        let espacoLivre = recintosExistentes[i].tamanhoTotal - espacoOcupado; 
                                    let recintoFormatado = `Recinto ${recintosExistentes[i].numero} (espaço livre: ${espacoLivre} total: ${recintosExistentes[i].tamanhoTotal})`

                                    recintosViaveis.push(recintoFormatado);

                                    }

                                         
                                }
                                
                                
                            }
                            
                        }
                        
                    }
                    
                }
            }
        }
        
        if(!animalEscolhido){
            return{
                "erro": "Animal inválido"
            }
        }
        return{
            recintosViaveis
        }
        
    }

}

export { RecintosZoo as RecintosZoo };
