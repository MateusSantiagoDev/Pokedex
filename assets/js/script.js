let page = 0;


const modalImg = document.querySelector("#img_modal");
const modalName = document.querySelector("#nome");
const modalTipo1 = document.querySelector("#tipo1");
const modalTipo2 = document.querySelector("#tipo2");
const modalHabilidades1 = document.querySelector("#habilidades1");
const modalHabilidades2 = document.querySelector("#habilidades2");
const modalAtaque = document.querySelector("#ataque1");
const modalDefesa = document.querySelector("#defesa");
const modalNumero = document.querySelector("#numero1");
const descricao = document.querySelector("#p_descricao");


    async function getPokemons(){
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${page}`)

    const data = await resposta.json();      
    


    data.results.forEach( async function(pokemon){
        const resposta = await fetch(pokemon.url)

        const data = await resposta.json();      
        
  

        
         
        document.querySelector("#card-list").insertAdjacentHTML(`beforeend`, 
            `
        <div class="cards">           
           <img class="card" src= ${data.sprites.other["official-artwork"].front_default} alt="image pokemon">  
           <span class="card_id">${data.id}</span>            
        </div>
           
            `)          
        
    });



    const cardModal = document.querySelectorAll("#card-list")
    const modal = document.querySelector("#modal")
    cardModal.forEach(function(item){
        item.addEventListener("click", async function(event){
            const element = event.path.filter(element => element.className == "cards")
            const idCard = element[0].children[1].innerHTML  
            

            console.log(idCard)

           const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idCard}`)

           const data = await resposta.json();
   
           
           modal.style.display = "flex";

           modalImg.setAttribute("src", data.sprites.other.dream_world.front_default);
           modalName.innerText = data.name;
           modalTipo1.innerText = data.types[0].type.name;
           modalTipo2.innerText = data.types[1].type.name;                    
           modalHabilidades1.innerText = data.abilities[0].ability.name;
           modalHabilidades2.innerText = data.abilities[1].ability.name;
           modalAtaque.innerText = data.stats[1].base_stat;
           modalDefesa.innerText = data.stats[2].base_stat;
           modalNumero.innerText = data.order; 

           const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idCard}`)
        
           const data2 = await resp.json(); 
           
           
          let result = "";

          for(let i = 0; i <2000; i++){
     
           if(data2.flavor_text_entries[i].language.name == "en"){
               result = data2.flavor_text_entries[i].flavor_text

           }
         

           descricao.innerText = result;
          }   

           })   

        })
          
    }


     const click = document.querySelector("#close");
     click.addEventListener("click", function(){
        modal.style.display = "none";

     }) 

     const verMais = document.querySelector("#button")

     verMais.addEventListener("click", function(){           
         
        
            page = page + 100;           
         
        
        getPokemons();
        
       
     })
     
    getPokemons();  
 
