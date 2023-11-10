var requestURL =
  "https://raw.githubusercontent.com/artilluminati/geogame/main/coderegions.json";

var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
  window.regions = request.response;
  window.usedRegions = [];

  console.log(regions)


  window.getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
  }
  
  // function getPromiseFromEvent(item, event) {
  //   return new Promise((resolve) => {
  //     const listener = () => {
  //       item.removeEventListener(event, listener);
  //       resolve();
  //     }
  //     item.addEventListener(event, listener);
  //   })
  // }


  // async function timer(timersecs){
  //   for (let i = timersecs; i > 0; i--){
  //     await new Promise(resolve => function(i) {
  //       const timeout = setTimeout(resolve, 1000); // Ждать 10 секунд
  //       $(parentclass).find('#testNext').one('click', function() {
  //           $(parentclass).find('timer').text(i);
  //           clearTimeout(timeout);
  //           resolve();
  //       });
  //     });
  //   }
    
  // }
  async function test(parentclass, data){

    test.data = data;
    test.testResult = 0;




    // Одна итерация (один вопрос) 
    async function TestIteration(curIter){
      randElem = window.getRandomInt(Object.keys(test.data).length);
      // while (window.contains(usedRegions, randElem)){
      //   randElem = window.getRandomInt(Object.keys(data).length);
      // }

      
    
      regionTitle = data[randElem].name;
      regionCodeStr = data[randElem].code;
      if (typeof regionCodeStr == 'string'){
        regionCodeArr = regionCodeStr.split(", ").map(Number); 
      }
      else{
        regionCodeArr = Array(regionCodeStr)
      }

      // текущий счетчик
      $(parentclass).find('.counterCur').text(curIter+1);
      $(parentclass).find('#regionTitle').text(String(regionTitle));
      $(parentclass).find('#answer').text(prevCodeStr);
    
      console.log(regionTitle, regionCodeArr);
      
  
      testVal = $(parentclass).find('#test1Input').val();
  
      if(regionCodeArr[0]==testVal){
        test.testResult++;
        
      }
      console.log(test.testResult);
      prevCodeStr = regionCodeStr;
    };



    // завершение теста
    async function EndTest(){
      resetTimer();
      $(parentclass).find('.timer').text(0);
      $(parentclass).find('.result').text(test.testResult);
      $(parentclass).find('.test-questions').addClass('visually-hidden');
      $(parentclass).find('.end-test').removeClass('visually-hidden');
      
      // ожидание завершения
      $(parentclass).find('#endTestBtn').click(function(){
        $(parentclass).find('.end-test').addClass('visually-hidden');
        $(parentclass).find('.start-test').removeClass('visually-hidden');
      });
    }


    // Таймер
    let timer;

    // Запуск таймера
    function startTimer() {

      // ВРЕМЯ НА 1 ВОПРОС
      let timeLeft = 10; // 10 seconds

      $(parentclass).find('.timer').text(timeLeft);
      timer = setInterval(function() {
          timeLeft--;
          if (timeLeft <=0){
            resetTimer();
          }
          $(parentclass).find('.timer').text(timeLeft);
          
      }, 1000);
      // Update timer every second
    }

    // Сброс таймера
    async function resetTimer() {
      clearInterval(timer);
      $(parentclass).find('.timer').text('');
    }
    


    // Запуск теста
    // async function StartTest(){
      $(parentclass).find('#testNext').text('Далее');
      console.log(parentclass)

      

      numQuestions = $(parentclass).find('.numQuestionsInput').val();
      console.log(numQuestions);
      $(parentclass).find('.start-test').addClass('visually-hidden');
      $(parentclass).find('.test-questions').removeClass('visually-hidden');
      prevCodeStr = 'нет';

      // основной цикл
      TestIteration(0);
      for (let i=0; i<numQuestions; i++){
        startTimer()
        await new Promise(resolve => {
            let timeout = setTimeout(resolve, 10000); // Ждать 10 секунд
            $(parentclass).find('#testNext').one('click', function() {
                clearTimeout(timeout);
                resetTimer();
                resolve();
            });
        });
        TestIteration(i);
      }
      // завершение теста
      EndTest();
        
      // $(parentclass).find('.startTestBtn').click(function(){
      //     StartTest();
      // });
      
    // };


  };


  $('.startTestBtn').click(function(){
    test('.test1', window.regions)
  });




  
};
