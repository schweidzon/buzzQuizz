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
