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
let quantidade,levelQuantity = 0;
console.log(form3)


function closeOrOpenQuestions(element) {
    element.childNodes[3].classList.toggle('hidden')
    element.nextElementSibling.classList.toggle('hidden')
}


form1.addEventListener('submit', (e) => {
    e.preventDefault();
    const quizzTitleValue = quizzTitle.value.trim();
    const quizzUrlValue = quizzUrl.value.trim();
    const questionsQuantityValue = questionsQuantity.value.trim();
    const quizzLevelValue = quizzLevel.value.trim();
    quantidade = questionsQuantityValue
    levelQuantity = quizzLevelValue

    if (quizzTitleValue.length < 20 || quizzTitleValue.length > 65) {
        if(quizzTitleValue.length < 20 ) {
            alert('O título deve ter mais de 20 caracteres')
            quizzTitle.value = ""
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
    }

    if (questionsQuantityValue < 3 ) {
        alert('O número de preguntas deve ser no mínimo 3')
        questionsQuantity.value = ""

    }

    if (quizzLevelValue < 2 ) {
        alert('O número de níveis deve ser no mínimo 2')
        quizzLevel.value = ""

    }
    

    if(quizzTitleValue.length > 20 || quizzTitleValue.length < 65 && isValidUrl(quizzUrlValue) && questionsQuantityValue >= 3 &&  quizzLevelValue <2) {
       container1.classList.add('hidden')
       container2.classList.remove('hidden')
       questionsQuantityRender();
        
    }
      
})
questionsQuantityRender();
levelQuantityRender();




function questionsQuantityRender() {    
    for( let i = 1; i <= 2; i++) {
        questionsFormQuestions.innerHTML  += ` <div class="questions" >
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
    

    for( let i = 1; i <= 1; i++) {
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

form2.addEventListener('submit', (e) => {
    e.preventDefault();
    const questionText = document.querySelectorAll('#questionText')
    let text,background, answer, rightUrl, incorrectAnswer1, incorrectUrl1 = false
   
   
    for(let i = 0; i < questionText.length; i++) {
        console.log(questionText[i].value.length)
        if (questionText[i].value.length < 20) {
            alert(`Texto da pergunta ${i+1} deve contar no mínimo 20 caracteres`)
            
        } else {
            text = true
        }
    }
   const backgroundColor = document.querySelectorAll('#questionBackgroundColor')
    for(let i = 0; i < backgroundColor.length; i++) {
        console.log(backgroundColor[i].value[i])
        if (backgroundColor[i].value[0] !== '#' && backgroundColor[i].value.length !== 7) {
            alert(`Cor de fundo da pergunta ${i+1} é inválido`)
            
        } else {
            background = true
        }
    }
   const rightAnswer = document.querySelectorAll('#rightAnswer')
   for(let i = 0; i < rightAnswer.length; i++) {
         console.log(rightAnswer)
         if (rightAnswer[i].value === '') {
            alert(`O texto da resposta ${i+1} está vazio! Adicione o texto.`)
         } else {
            answer = true
         }
   }

   const url = document.querySelectorAll('#url')

   for(let i = 0; i < url.length; i++) {
        console.log(url)
        if(!isValidUrl(url[i].value)) {
            alert(`A URL da resposta correta da pergunta ${i+1} é inválido`)
        } else {
            rightUrl = true
        }
   
   }

   const incorrectAnswer = document.querySelectorAll('#incorrectAnswer')
   console.log(incorrectAnswer)
   for (let i = 0; i < incorrectAnswer.length; i++) {
        if(incorrectAnswer[i].value === '') {
            alert(`O texto da resposta incorreta ${i+1} está vazio! Adicione o texto.`)
        } else {
            incorrectAnswer1 = true
        }
   }

   const incorrectUrl = document.querySelectorAll('#incorrectUrl')
   let count = 1;
   
   for (let i = 0; i < incorrectUrl.length; i++) {
        if(!isValidUrl(incorrectUrl[i].value)) {
            if (i <= 2) {     
                if (count > 3) {
                    count = 1
                }       
                alert(`a URL da resposta incorreta ${count} da pergunta 1 é inválido`)
                count++
                
            } else if ( i > 2 && i <= 5) {
                if (count > 3) {
                    count = 1
                }
                
                alert(`a URL da resposta incorreta ${count} da pergunta 2 é inválido`)
                count++
            } else if (i > 5 && i <= 8 ) {
                if (count > 3) {
                    count = 1
                }
                
                alert(`a URL da resposta incorreta ${count} da pergunta 3 é inválido`)
                count++
            } else if (i > 8 && i <= 11) {
                if (count > 3) {
                    count = 1
                }
                alert(`a URL da resposta incorreta ${count} da pergunta 4 é inválido`)
                count++
            } else if (i > 11 && i <= 14) {
                if (count > 3) {
                    count = 1
                }
                alert(`a URL da resposta incorreta ${count} da pergunta 5 é inválido`)
                count++

            } 
        }else {
            incorrectUrl1 = true
        }
    }

    if(text === true  && background === true && answer ===true && rightUrl=== true && incorrectAnswer1 === true && incorrectUrl1 === true) {
        console.log(text)
        container2.classList.add('hidden')
        container3.classList.remove('hidden')
    }
    
})

form3.addEventListener('submit', (e) => {
    e.preventDefault();
    let textLevel, minHit, imgUrl, leveldescp = false;

    const levelTitle = document.querySelectorAll('#levelTitle')
    for (let i = 0; i < levelTitle.length; i ++) {
        if(levelTitle[i].value.length < 10) {
            alert(`O título do nível ${i+1} está com menos de 10 caracteres.`)
        } else {
            textLevel = true
        }
    }
    const min = document.querySelectorAll('#min')
    for (let i = 0; i < min.length; i ++) {
        if (min[i].value < 0 || min[i].value > 100) {
            alert(`A % de acerto do nível deve estar 0 e 100`)
        } else {
            minHit = true
        }
    }
    const levelUrl = document.querySelectorAll('#levelUrl')
    for (let i = 0; i < levelUrl.length; i ++) {
        if(!isValidUrl(levelUrl[i].value)) {
            alert(`A url do nível ${i+1} está inválida`)
        } else {
            imgUrl = true
        }
    }
    const levelDescription = document.querySelectorAll('#levelDescription')
    for (let i = 0; i < levelDescription.length; i ++) {
        if (levelDescription[i].value.length < 30) {
            alert(`A descrição do nível ${i+1} está com menos de 30 caracteres`)
        } else {
            leveldescp = true
        }
        
    }

    if(textLevel === true && minHit === true && imgUrl === true && leveldescp=== true ) {
        container3.classList.add('hidden')
        container4.classList.remove('hidden')
    }
    
})

/*  
//get all quizzes
const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
promessa.then(processarResposta);

function processarResposta(resposta) {
  for (let i = 0; i < resposta.data.length; i++){
    let title = resposta.data[i].title;
    let image = resposta.data[i].image;
    renderQuizz(title, image);
  }
}

function renderQuizz(arg1, arg2){
  let title = arg1
  let image = arg2
  const ul_list = document.querySelectorAll(".quizz-container");
  const ul = ul_list[ul_list.length-1];
  ul.innerHTML += `
  <li class="quizz-box">
  <div class="gradient"> </div>
  <img src="${image}" alt="" class="quizz-image">
  <div class="quizz-title">${title}</div>
  </li>
  `;
}
*/
