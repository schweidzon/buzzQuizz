const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
};

const  questionsFormQuestions = document.querySelector('.questionsFormQuestions')
const  questionsFormLevels = document.querySelector('.questionsFormLevels')
const form1 = document.querySelector('.basicInfo')
const form2 = document.getElementById('form2')
const form3 = document.getElementById('form3')
const quizzTitle = document.getElementById('quizzTitle')
const quizzUrl = document.getElementById('quizzUrl')
const questionsQuantity = document.getElementById('questionsQuantity')
const quizzLevel = document.getElementById('quizzLevel')
const container1 = document.querySelector('.container1')
const container2 = document.querySelector('.container2')
const container3 = document.querySelector('.container3')
const container4 = document.querySelector('.container4')
const quizzReady = document.querySelector('.quizzReady')
let quantidade,levelQuantity = 0;
let quizzTitleObj, quizzImageObj;
const tela1 = document.querySelector(".tela1");
const tela3 = document.querySelector(".tela3");
console.log(form3.length)


function closeOrOpenQuestions(element) {
    console.log(element)

    const prevOpen = document.querySelector('.open')
    const prevCheck = document.querySelector('.questionTitle .hidden')

    if ( prevOpen !== null) {
        prevOpen.classList.add('hidden')
        prevOpen.classList.remove('open')
        prevCheck.classList.remove('hidden')
    }

    element.childNodes[3].classList.add('hidden')
    element.nextElementSibling.classList.remove('hidden')
    element.nextElementSibling.classList.add('open')
}




form1.addEventListener('submit', (e) => {
    e.preventDefault();
    const quizzTitleValue = quizzTitle.value.trim();
    const quizzUrlValue = quizzUrl.value.trim();
    const questionsQuantityValue = questionsQuantity.value.trim();
    const quizzLevelValue = quizzLevel.value.trim();
    quantidade = questionsQuantityValue
    levelQuantity = quizzLevelValue
    quizzTitleObj= quizzTitleValue
    quizzImageObj = quizzUrlValue


    if (quizzTitleValue.length < 20 || quizzTitleValue.length > 65) {
        if(quizzTitleValue.length < 20 ) {
            alert('O título deve ter mais de 20 caracteres')
            quizzTitle.value = ""
            return
        }else  {
            alert('O título deve ter menos de 65 caracteres')
            quizzTitle.value = ""

        }
       
    }

    if(isValidUrl(quizzUrlValue)) {
        console.log('correta')
    } else {
        alert('Você não digitou uma URL válida')
        quizzUrl.value = ""
        return
    }

    if (questionsQuantityValue < 3 || isNaN(questionsQuantityValue)) {
        alert('O número de preguntas deve ser um número e no mínimo 3')
        questionsQuantity.value = ""
        return

    }

    if (quizzLevelValue < 2 || isNaN(quizzLevelValue)) {
        alert('O número de níveis deve ser um e no mínimo 2')
         
        quizzLevel.value = ""
        return

    }
    

    if(quizzTitleValue.length > 20 || quizzTitleValue.length < 65 && isValidUrl(quizzUrlValue) && questionsQuantityValue >= 3 &&  quizzLevelValue <2) {
       container1.classList.add('hidden')
       container2.classList.remove('hidden')
       questionsQuantityRender();
       levelQuantityRender(); // mudei aqui
        
    }

    
      
})
questionsQuantityRender();
levelQuantityRender(); //

console.log(quizzTitleObj)




function questionsQuantityRender() {    
    questionsFormQuestions.innerHTML = ""
    for( let i = 1; i <= quantidade; i++) {
        questionsFormQuestions.innerHTML  += ` 
        <div class="questions" >
            <div class="questionTitle" onclick="closeOrOpenQuestions(this)">
                <div class="label"><label> Pergunta ${i}</label></div>
                <img src="./images/editIcon.png" alt="">
            </div>
            <div class="questionWrapper hidden">
                <input type="text" name="" id="questionText" placeholder="Text da pergunta">
                <input type="text" name="" id="questionBackgroundColor" placeholder="Cor de fundo da pergunta">
                <div class="label"><label> Resposta correta</label></div>
                <input type="text" name="" id="rightAnswer" placeholder="Resposta correta">
                <input type="text" name="" id="url" placeholder="URL da imagem">
                <div class="label"><label>Resposta incorreta</label></div>
                <input type="text" name="" id="incorrectAnswer" placeholder="Resposta incorreta 1">
                <input type="text" name="" id="incorrectUrl" placeholder="URL da imagem 1">
                <br>
                <input type="text" name="" id="incorrectAnswer" placeholder="Resposta incorreta 2">
                <input type="text" name="" id="incorrectUrl" placeholder="URL da imagem 2">
                <br>
                <input type="text" name="" id="incorrectAnswer" placeholder="Resposta incorreta 3">
                <input type="text" name="" id="incorrectUrl" placeholder="URL da imagem 3">
        </div>`
    }

}



function levelQuantityRender() {
    
    questionsFormLevels.innerHTML = ""
    for( let i = 1; i <= levelQuantity; i++) {
        questionsFormLevels.innerHTML  += `
         <div class="questions">
            <div class="questionTitle"  onclick="closeOrOpenQuestions(this)">
                <div class="label"><label>Nível ${i}</label></div>
                <img src="./images/editIcon.png" alt="">
            </div>
            <div class="questionWrapper hidden">
                <input type="text" name="" id="levelTitle" placeholder="Título do nível">
                <input type="text" name="" id="min" placeholder="% de acerto mínima">
                <input type="text" name="" id="levelUrl" placeholder="URL da imagem do nível">
                <textarea name="" id="levelDescription" cols="30" rows="10" placeholder="Descrição do nível"></textarea>
            </div>
        </div>
    `
    }
    

}

let question1 =[]
let question2 = []    
let question3 = []
let question4=[]
let answer1 = []
let answer2 =[]
let answer3 =[]
let answer4 = []
let questions = []



form2.addEventListener('submit', (e) => {
    e.preventDefault();
    const questionText = document.querySelectorAll('#questionText')
    let text,background, answer, rightUrl, incorrectAnswer1, incorrectUrl1 = false
   
   
    for(let i = 0; i < questionText.length; i++) {
        console.log(questionText[i].value.length)
        if (questionText[i].value.length < 20) {
            alert(`Texto da pergunta ${i+1} deve contar no mínimo 20 caracteres`)
            return
            
        } else {
            text = true
        }
    }
   const backgroundColor = document.querySelectorAll('#questionBackgroundColor')
   console.log(backgroundColor)
    for(let i = 0; i < backgroundColor.length; i++) {
        backgroundColor[i].value[0]
        console.log(backgroundColor[i].value[i])
        if (backgroundColor[i].value[0] !== '#' || backgroundColor[i].value.length !== 7) {
            alert(`Cor de fundo da pergunta ${i+1} é inválido`)
            backgroundColor[i].value = ""
            return
            
        } else {
            background = true
        }
    }
   const rightAnswer = document.querySelectorAll('#rightAnswer')
   for(let i = 0; i < rightAnswer.length; i++) {
         console.log(rightAnswer)
         if (rightAnswer[i].value === '') {
            alert(`O texto da resposta correta da pergunta ${i+1} está vazio! Adicione o texto.`)
            return
         } else {
            answer = true
         }
   }

   const url = document.querySelectorAll('#url')

   for(let i = 0; i < url.length; i++) {
        console.log(url)
        if(!isValidUrl(url[i].value)) {
            alert(`A URL da resposta correta da pergunta ${i+1} é inválido`)
            url[i].value = ""
            return
        } else {
            rightUrl = true
        }
   
   }

   const incorrectAnswer = document.querySelectorAll('#incorrectAnswer')
   console.log(incorrectAnswer)
   for (let i = 0; i < incorrectAnswer.length; i++) {
        if(incorrectAnswer[i].value === '' && i === 0 || incorrectAnswer[i].value === '' && i === 3 ||incorrectAnswer[i].value === '' && i === 6) {

            if ( i > 2) {
                alert(`O texto da resposta incorreta ${i-2} da pergunta 2 está vazio! Adicione o texto.`)
                incorrectUrl[i].value = ""
                return
            } else if ( i > 5) {
                alert(`O texto da resposta incorreta ${i-2} da pergunta 3 está vazio! Adicione o texto.`)
                incorrectUrl[i].value = ""
                return
            } else if ( i > 8) {
                alert(`O texto da resposta incorreta ${i-2} da pergunta 4 está vazio! Adicione o texto.`)
                incorrectUrl[i].value = ""
                return
            }

            alert(`O texto da resposta incorreta ${i+1} da pergunta 1 está vazio! Adicione o texto.`)
            return
        } else  {
            incorrectAnswer1 = true
        }
   }

   const incorrectUrl = document.querySelectorAll('#incorrectUrl')
   
   
   for (let i = 0; i < incorrectUrl.length; i++) {
        if(!isValidUrl(incorrectUrl[i].value) && i === 0 || !isValidUrl(incorrectUrl[i].value) && i === 3 || !isValidUrl(incorrectUrl[i].value) && i === 6) {
            if ( i > 2) {
                alert(`A url da resposta incorreta ${i-2} da pergunta 2 é inválida`)
                incorrectUrl[i].value = ""
                return
            } else if ( i > 5) {
                alert(`A url da resposta incorreta ${i-2} da pergunta 3 é inválida`)
                incorrectUrl[i].value = ""
                return
            } else if ( i > 8) {
                alert(`A url da resposta incorreta ${i-2} da pergunta 4 é inválida`)
                incorrectUrl[i].value = ""
                return
            }
            
            alert(`A url da resposta incorreta ${i+1} da pergunta 1 é inválida`)
            incorrectUrl[i].value = ""
            return
        } else if(isValidUrl(incorrectUrl[i].value) && i === 0) {
            incorrectUrl1 = true
        }
        else if (!isValidUrl(incorrectUrl[i].value) && i === 1 || !isValidUrl(incorrectUrl[i].value) && i === 2) {
            
            incorrectUrl1 = true
        }
    }

    if(text === true  && background === true && answer ===true && rightUrl=== true && incorrectAnswer1 === true && incorrectUrl1 === true) {
        console.log(text)
        container2.classList.add('hidden')
        container3.classList.remove('hidden')
    }


    

    

    for (let i = 0; i < quantidade; i++) {
        if( i=== 0) {
            
            resp1 = {
                    text: rightAnswer[i].value,
                    image: url[i].value,
                    isCorrectAnswer: true
                } 
                answer1.push(resp1)

                for (let j = 0; j < 3; j++) {
                    if(j === 0) {
                            resp1 = 
                              {
                                  text: incorrectAnswer[j].value,
                                  image: incorrectUrl[j].value,
                                  isCorrectAnswer: false
                                  
                              }
                        answer1.push(resp1)
                        
                    } else if ( j=== 1 || j === 2) {
                        if(incorrectAnswer[j].value !== '' && incorrectUrl[j].value !== '') {
                            resp1 = 
                              {
                                  text: incorrectAnswer[j].value,
                                  image: incorrectUrl[j].value,
                                  isCorrectAnswer: false
                                  
                              }
                              answer1.push(resp1)

                        } 
                    }
                    

                 }

        }
        if( i=== 1) {
            
            resp2 = {
                text: rightAnswer[i].value,
                image: url[i].value,
                isCorrectAnswer: true
            } 
            answer2.push(resp2)

            for (let j = 3; j < 6; j++) {
                if(j === 3) {
                    resp2 = 
                      {
                          text: incorrectAnswer[j].value,
                          image: incorrectUrl[j].value,
                          isCorrectAnswer: false
                          
                      }
                      answer2.push(resp2)
                
                 } else if ( j=== 4 || j === 5) {
                    if(incorrectAnswer[j].value !== '' && incorrectUrl[j].value !== '') {
                        resp2 = 
                        {
                            text: incorrectAnswer[j].value,
                            image: incorrectUrl[j].value,
                            isCorrectAnswer: false
                            
                        }
                        answer2.push(resp2)
                    } 
                 }




                

             }

        }
        if( i === 2 ) {
            resp3 = {
                text: rightAnswer[i].value,
                image: url[i].value,
                isCorrectAnswer: true
            } 
            answer3.push(resp3)

            for (let j = 6; j < 9; j++) {
                if (j === 6) {
                    resp3 = 
                    {
                        text: incorrectAnswer[j].value,
                        image: incorrectUrl[j].value,
                        isCorrectAnswer: false

                    }
                answer3.push(resp3)
                } else if (j === 7 || j === 8 ){
                    if(incorrectAnswer[j].value !== '' && incorrectUrl[j].value !== '') {
                        resp3 = 
                        {
                            text: incorrectAnswer[j].value,
                            image: incorrectUrl[j].value,
                            isCorrectAnswer: false
                            
                        }
                        answer3.push(resp3)
                    } 

                }
                

             }
        }
        if( i === 3 ) {
            resp4 = {
                text: rightAnswer[i].value,
                image: url[i].value,
                isCorrectAnswer: true
            } 
            answer4.push(resp4)

            for (let j = 9; j < 12; j++) {
                if( j === 9 ) {
                    resp4 = 
                    {
                        text: incorrectAnswer[j].value,
                        image: incorrectUrl[j].value,
                        isCorrectAnswer: false
                        
                    }
                    answer4.push(resp4)

                } else if (j === 10 || j === 11) {
                    if(incorrectAnswer[j].value !== '' && incorrectUrl[j].value !== '') {
                        resp4 = 
                        {
                            text: incorrectAnswer[j].value,
                            image: incorrectUrl[j].value,
                            isCorrectAnswer: false
                            
                        }
                        answer4.push(resp4)
                    } 
                    
                }
               

             }
        }
        
        //respostasIncorretas.push(answers)

    }   
    console.log(answer1)
    console.log(answer2)
    console.log(answer3)

    


    

                    // aqui colocar a quantidade de perguntas que a pessoa escolher (variavel)
    for (let i = 0 ; i < quantidade ; i++ ) {  // loop pelas perguntas (Ex: pergunta 1, pergunta 2)

        if ( i === 0) {
            question1 = {
                title : questionText[i].value,
                color: backgroundColor[i].value,
                answers: answer1
            }
            questions.push(question1)
        } 
        if ( i === 1) {
            question2 = {
                title : questionText[i].value,
                color: backgroundColor[i].value,
                answers: answer2
            }
            questions.push(question2)
        } 
         if (i === 2 ) {
            question3 = {
                title : questionText[i].value,
                color: backgroundColor[i].value,
                answers: answer3
            }
            questions.push(question3)
        }
        if ( i === 3) {
            question4 = {
                title : questionText[i].value,
                color: backgroundColor[i].value,
                answers: answer4
            }
            questions.push(question4)
        }
       
        console.log(questions)
    } 

   
   // for (let j = 0; i < 2*10; j++) {
   //     answers = [{
   //         title: rightAnswer[i].value,
   //         image: url[i].value,
   //         isCorrectAnswer: true
   //     }]
   // }
    
})

let levels = []
let objtest = {}
let nivelObj = {}
let quizzObj = {}

let leveltext = []

form3.addEventListener('submit', (e) => {
    e.preventDefault();
    let textLevel, minHit, imgUrl, leveldescp = false;

    const levelTitle = document.querySelectorAll('#levelTitle')
    for (let i = 0; i < levelTitle.length; i ++) {
        if(levelTitle[i].value.length < 10) {
            alert(`O título do nível ${i+1} está com menos de 10 caracteres.`)
            return
        } else {
            leveltext.push(levelTitle[i].value)
          
            textLevel = true
        }


    }
    const min = document.querySelectorAll('#min')
    for (let i = 0; i < min.length; i ++) {
        if (min[i].value < 0 || min[i].value > 100 || isNaN(min[i].value)) {
            alert(`A % de acerto do nível ${i+1} deve ser um número e estar 0 e 100`)           
            return
        } else {
            minHit = true
        }
    }
    const levelUrl = document.querySelectorAll('#levelUrl')
    for (let i = 0; i < levelUrl.length; i ++) {
        if(!isValidUrl(levelUrl[i].value)) {
            alert(`A url do nível ${i+1} está inválida`)            
            return
        } else {
            imgUrl = true
        }
    }
    const levelDescription = document.querySelectorAll('#levelDescription')
    for (let i = 0; i < levelDescription.length; i ++) {
        if (levelDescription[i].value.length < 30) {
            alert(`A descrição do nível ${i+1} está com menos de 30 caracteres`)            
            return
            
        } else {
            leveldescp = true
        }
        
    }

    
    

    for(let i = 0; i < levelTitle.length; i++) {
        console.log(levelTitle[i].value)
        if ( i=== 0) {
            nivelObj = {
                title: levelTitle[i].value,
                 image: levelUrl[i].value,
                  text: levelDescription[i].value,
                   minValue: min[i].value 
            }
            levels.push(nivelObj)
        }  
        if (i === 1) {
            nivelObj = {
                title: levelTitle[i].value,
                 image: levelUrl[i].value,
                  text: levelDescription[i].value,
                   minValue: min[i].value 
            }
            levels.push(nivelObj)

        }
        if ( i === 2) {
            nivelObj = {
                title: levelTitle[i].value,
                 image: levelUrl[i].value,
                  text: levelDescription[i].value,
                   minValue: min[i].value 
            }
            levels.push(nivelObj)

        }
        if ( i === 3)  {
            nivelObj = {
                title: levelTitle[i].value,
                 image: levelUrl[i].value,
                  text: levelDescription[i].value,
                   minValue: min[i].value 
            }
            levels.push(nivelObj)

        }

    }
    

    if(textLevel === true && minHit === true && imgUrl === true && leveldescp=== true ) {
       
        quizzObj = {
            title:quizzTitleObj,
            image: quizzImageObj,
            questions: questions,
            levels : levels
        }
        sendQuizz();        
        console.log(levels)
        console.log(quizzObj)
    }
    
})



function sendQuizz() {
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', quizzObj)
    promise.then(sendQuizzSuccess)
    promise.catch(sendQuizzError)
}

let ids = []


function sendQuizzSuccess(response) {
    createQuizzCover();
    container3.classList.add('hidden')
    container4.classList.remove('hidden')
    console.log('Quizz criado com sucesso')
      
     if(localStorage.getItem('id') !== null) {
         ids = JSON.parse(localStorage.getItem('id'))
     }  

     let novoId = response.data.id
     console.log(novoId)
     ids.push(novoId)
     localStorage.setItem('id', JSON.stringify(ids))  
    
}

function sendQuizzError() {
    console.log('Quizz não foi criado')
}


function createQuizzCover() {
    quizzReady.innerHTML = `
        
            <div class="title">Seu quizz está pronto!</div>
            <div class="quizzImg">
                <div class="gradient"  onclick = "openCreatedQuizz()"> </div>
                <img src="${quizzImageObj}" alt="">
                <p>${quizzTitleObj}</p>
            </div>
        
    `
}

function openCreatedQuizz() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    console.log(promessa)
    promessa.then(OpenQuizz);
}

function OpenQuizz(response) {
    const localStorageIds = JSON.parse(localStorage.getItem('id'));
 
    
    for( let i = 0; i < response.data.length; i++) {
      
        let id = response.data[i].id
        if (localStorageIds[localStorageIds.length -1] === id) {
            globalID = id;
            let cont4=document.querySelector(".container4");
            cont4.classList.add("hidden");
            redoQuizz();
        }
    }

}


//js tela1 inicio
showTela1();

function backToTela1(){
    showTela1();
}

function showTela1(){
    tela1.scrollIntoView();
    userQuizz();
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(processarResposta);
}


//get all quizzes

const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
promessa.then(processarResposta);


function processarResposta(resposta) {

  let ul_list = document.querySelectorAll(".quizz-container");
  let ul = ul_list[ul_list.length-1];
  ul.innerHTML ="";
  for (let i = 0; i < resposta.data.length; i++){
    let title = resposta.data[i].title;
    let image = resposta.data[i].image;
    let id = resposta.data[i].id;
    renderQuizz(title, image, id);
  }
}

function renderQuizz(arg1, arg2, arg3){
  let title = arg1;
  let image = arg2;
  let id = arg3;
  let ul_list = document.querySelectorAll(".quizz-container");
  let ul = ul_list[ul_list.length-1];
  ul.innerHTML += `
  <li id=${id} class="quizz-box" onclick="getID(this)">
  <div class="gradient"> </div>
  <img src="${image}" alt="" class="quizz-image">
  <div class="quizz-title">${title}</div>
  </li>
  `;
}

function renderUserQuizz(arg1, arg2,arg3){
    let title = arg1;
    let image = arg2;
    let id = arg3;
    let ul_list = document.querySelectorAll(".quizz-container");
    let ul = ul_list[0];
    ul.innerHTML += `
    <li id=${id} class="quizz-box" onclick="getID(this)">
    <div class="gradient"> </div>
    <img src="${image}" alt="" class="quizz-image">
    <div class="quizz-title">${title}</div>
    </li>
    `;
  }

function addButton(){
    tela1.classList.add("hidden");
    tela3.classList.remove("hidden");
    container1.classList.remove("hidden");
}

function userQuizz(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(displayUserQuizz);
}


function displayUserQuizz(resposta){
  let tela1 = document.querySelector(".tela1");
  let tela2 = document.querySelector(".tela2");
  let tela3 = document.querySelector(".tela3");
  tela1.classList.remove("hidden");
  tela2.classList.add("hidden");
  tela3.classList.add("hidden");
    let IDarr = localStorage.getItem("id");
    console.log(IDarr);
    if (IDarr == null) {
        let noQuizz =  document.querySelector(".no-quizz");
        let withQuizz =  document.querySelector(".with-quizz");
        noQuizz.classList.remove("hidden");
        withQuizz.classList.add("hidden");
    } else {
        let ul_list = document.querySelectorAll(".quizz-container");
        let ul = ul_list[0];
        ul.innerHTML = "";
        let cleanLocalStorage = true;
        IDarr = JSON.parse(IDarr);
        for (let i = 0; i < IDarr.length; i++){
            for (let j = 0; j < resposta.data.length; j++){
                let id = resposta.data[j].id;
                if (id==IDarr[i]){
                    cleanLocalStorage = false;
                    let title = resposta.data[j].title;
                    let image = resposta.data[j].image;
                    let id = resposta.data[j].id;
                    renderUserQuizz(title, image,id);
                }
            }
        }
        if (cleanLocalStorage){
            localStorage.removeItem("id");
            let noQuizz =  document.querySelector(".no-quizz");
            let withQuizz =  document.querySelector(".with-quizz");
            noQuizz.classList.remove("hidden");
            withQuizz.classList.add("hidden");
        } else {
            let noQuizz =  document.querySelector(".no-quizz");
            let withQuizz =  document.querySelector(".with-quizz");
            noQuizz.classList.add("hidden");
            withQuizz.classList.remove("hidden");
        }
    }
    console.log(localStorage.getItem("id"));
}

let selectedQuizzID = '';

function getID(elemento){
    globalID = elemento.id;
    console.log(elemento.id);
    const selectedQuizzID = elemento.id;
    let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${selectedQuizzID}`);
    promise.then(loadQuizzPage2)
   
}
//js tela1 fim


//js tela2 início
function embaralhar() { 
	return Math.random() - 0.5; 
}

let acabou = false

let resp =''

function loadQuizzPage2(resposta){
    resp = resposta
    console.log(resposta)
    let tela1 = document.querySelector(".tela1");
    let tela2 = document.querySelector(".tela2");
    let tela3 = document.querySelector(".tela3");
    tela1.classList.add("hidden");
    tela2.classList.remove("hidden");
    tela3.classList.remove("hidden");

    let content = resposta.data;
    let quizzQuestions = content.questions;

    let headerImage = document.querySelector('.quiz-header');
    let headerTitle = document.querySelector('.quiz-title');
    headerTitle.scrollIntoView();
    let quesContainer = document.querySelector('.tela2-container');
    quesContainer.innerHTML="";
    headerImage.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${content.image})`;
    headerTitle.innerHTML = `${content.title}`

    for (let i = 0; i < quizzQuestions.length; i++){
        let textQuesContainer="";
        let textHTML="";
        let answerArr = quizzQuestions[i].answers;
        answerArr =answerArr.sort(embaralhar);
        textQuesContainer+=
            `<div class="ques-container" >
            <div class="ques-header" style="background-color:${quizzQuestions[i].color}">
                <div class="ques-title">${quizzQuestions[i].title}</div>
            </div>
            <div class="options-container">`
        for (let j = 0; j < answerArr.length; j++){
            textHTML+=
            `<div class="option-box ${answerArr[j].isCorrectAnswer}" onclick = "chooseAwnser(this)" >
                <img src="${answerArr[j].image}" alt="" class="option-img">
                <div class="option-text">${answerArr[j].text}</div>
            </div>
            `
        }
        textQuesContainer+=textHTML+`</div></div>`;
        quesContainer.innerHTML += textQuesContainer;
    }

    
}

let porcentagemAcerto;
function chooseAwnser(answer) {
    
    
    answer.classList.add('clicado')

    let pai = answer.parentNode;   
    let children = pai.children;
    for (let i = 0; i < children.length; i++) {
        children[i].onclick = null

    }
    console.log(children)
    console.log(children.length)

    for ( let i = 0; i < children.length; i++) {
        if(children[i].classList.contains('true')) {
            children[i].classList.add('correct-answer')
        } else {
            children[i].classList.add('incorrect-answer')
        }
        if(children[i].classList.contains('clicado')) {

        } else {
            children[i].classList.add('opacity')
        }
    }
   

    let acertos = 0
    const options = Array.from(document.querySelectorAll('.option-box'))
    const perguntas = document.querySelectorAll('.ques-container')

 acabou =  (options.every((item) => item.classList.contains('clicado') || item.classList.contains('opacity'))) 
  console.log(acabou)
  if(acabou) {
    for(let i = 0; i < options.length; i++) {
        if ( options[i].classList.contains('clicado') && options[i].classList.contains('true')) {
            acertos++
        } 
    }
  }

  porcentagemAcerto = Number(Math.ceil((acertos/perguntas.length)*100))
  console.log(porcentagemAcerto)

  if(pai.parentNode.nextElementSibling) {
      setTimeout(() => {
          pai.parentNode.nextElementSibling.scrollIntoView({ block: 'center',  behavior: 'smooth' })
      }, 2000)
          
  }
  
  if( acabou === true) {
    finalResult();
  }
  
}

function answerCorrection(element) {
    selectedAnswer = element;

    if (element === true) {
        element.classList.add('user-correct');
    } else {
        element.classList.add('correct');
    }
}

function randomizer() {  //responsável por deixar a ordem das cartas aleatória
	return Math.random() - 0.5; 
}


function finalResult() {
    let divfinal = document.querySelector(".final-quizz");
    divfinal.classList.remove("hidden");
    const resultContainer = document.querySelector('.result-container')
    console.log(resp.data.levels)
    const levelsArr= resp.data.levels
    console.log(levelsArr[0].minValue)
        
    for( let i = 0 ; i < levelsArr.length; i++) {   
        console.log(levelsArr[i].minValue)
        if(porcentagemAcerto > levelsArr[i].minValue) {
            resultContainer.innerHTML = 
            `
                <div class="result-header">
                    <div class="result">${porcentagemAcerto}% de acerto: ${levelsArr[i].title}</div>
                    </div>
            
                    <div class="result-flair">
                        <img class="img-result" src="${levelsArr[i].image}">
                        <div class="result-text">
                        ${levelsArr[i].text}
                        </div>
                </div>
            `
        } 
       
    }
    
}

let globalID;
function redoQuizz(){
    let divfinal = document.querySelector(".final-quizz");
    divfinal.classList.add("hidden");
    let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${globalID}`);
    promise.then(loadQuizzPage2)
}


function returnHome31(){
    let tela1 = document.querySelector(".tela1");
    tela1.scrollIntoView();
    let tela3 = document.querySelector(".tela3");
    tela3.classList.add("hidden");
    tela1.classList.remove("hidden");
    showTela1();
}

function returnHome() {
    let tela1 = document.querySelector(".tela1");
    tela1.scrollIntoView();
    let tela2 = document.querySelector(".tela2");
    let divfinal = document.querySelector(".final-quizz");
    divfinal.classList.add("hidden");
    tela2.classList.add("hidden");
    tela1.classList.remove("hidden");
    showTela1();
}