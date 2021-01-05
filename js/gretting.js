'use strict'; 
const form= document.querySelector('.js-form');             // 입력창을 담는 form
const input= form.querySelector('input');                   // 이름 입력창
const greeting = document.querySelector('.js-greetings');   // h4 입력값이 표시될 텍스트

const USER_LS = "currentUser";                      // localStorage Key의 이름
const SHOWING = "showing";                          // 추가 삭제하기위한 클래스명

//5
function saveName(text){                            // 입력된 값을 인자로 받아온다
    localStorage.setItem(USER_LS,text);             // 컴퓨터의 Key를 "currentUser"로 저장, value에 입력값 저장
}

//4
function paintGreeting(text){                       // 입력창의 입력값을 인자로 받음
    form.classList.remove(SHOWING);                 // form의 클래스를 삭제 (화면에서 입력창 가림)
    greeting.classList.add(SHOWING);                // h4에 클래스를 추가 (화면에 text 보이게함)
    greeting.innerText = `Hello ${text}`;           // h4에 입력한 텍스트로 표시
}
 
//3
function handleSubmit(event){
    event.preventDefault();                         // 이벤트 행동을 막는다 , 양식 제출후 새고침 방지
    const currentValue = input.value;               // 입력창의 값을 변수로 지정
    paintGreeting(currentValue);                    // 입력값을 인자로 하여 함수호출(4)
    saveName(currentValue);                         // 입력값을 인자로 하여 함수호출(5)
}

//2
function userName (){                               // 처음 입력시
 form.classList.add(SHOWING);                       //  form의 클래스를 추가 (블록 타입으로 보이게함)
 form.addEventListener('submit', handleSubmit);     //  form의 입력창에서 양식이 제출되면 함수호출(3)
}

//1
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);  // currentUser는 currentUser 호출을 가짐
    if(currentUser === null){                           // 입력전에 정보가 없기때문에 널값이다
        userName();                                     // 호출(2)
    } else {                                            // 입력한 이후 null값이 아니다
        paintGreeting(currentUser);                     // 호출
    }
}

function init(){
    loadName();
}
init();
