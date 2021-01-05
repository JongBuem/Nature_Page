'use strict';       
const toDoForm = document.querySelector('.js-toDoForm');         // 입력장을 답는 form
const toDoInput = toDoForm.querySelector('input');               // 두번째 입력창
const toDoList = document.querySelector('.js-toDoList')          // 입력후 출력될 리스트들의 ul

const TODOS_LS = 'toDos';                                        // localStorage Key의 이름
let toDos = [ ];                                               // 두번째 입력창에 값을 넣을 배열



function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ // cleanToDos와 filter는 filterFn함수가 체크된 아이템들의 배열을 주는것
        return toDo.id !== parseInt(li.id);
    });      
    toDos = cleanToDos; 
    saveToDos();
}

function saveToDos(){                                           // localStorage에 지정하고 값을 문자형으로 변환시킴 , (localStorage는 문자형만 저장하기 때문에 변화해야함)
   const stringifyToDos = JSON.stringify(toDos);                // 입력된 배열의 오브젝트를 문자형으로 변화하여 변수로 정의 (JSON.stringify)
    localStorage.setItem(TODOS_LS,stringifyToDos) ;             // localStorage에 toDos 키에 배열값을 지정 
}

//3
function paintToDo(text){                                       // 입력값을 인자로함
    const li = document.createElement('li');                    // li 생성
    const span = document.createElement('span');                // span 생성
    const delBtn =document.createElement('button');             // button 생성
    const newId = toDos.length +1;                              // toDos배열의 시작을 0이 아닌 1부터 시작 하기위해
    delBtn.innerText = "x";                                    // 버튼값 지정
    delBtn.addEventListener('click', deleteToDo);
    span.innerText = text;                                      // span값 지정
    li.appendChild(span);                                       // li에 span을 추가
    li.appendChild(delBtn);                                     // li에 button을 추가
    li.id = newId;                                              // li에 배열과 같은 id로 정의
    toDoList.appendChild(li);                                   //  HTML에 ul에 li를 포함시킴
    const toDoObj = {                                           // 입력완료 될때마다 toDos 배열에 오브젝트를 추가되도록 하기위해 생성
        text : text,
        id : newId
    };
    toDos.push(toDoObj);                                         // 배열안에 toDoObj 오브젝트를 넣는다
    saveToDos();                                                 // push이후에 하지않으면 비어있는 배열을 저장하기 때문          
}

//2
function hand(event){                                             // 입력창에 입력 완료시 호출
    event.preventDefault();                                       // 이벤트 행동을 막는다 , 양식 제출후 새고침 방지
    const currentValue = toDoInput.value;                         // input에 입력한값을 변수로 갖는다.
    paintToDo(currentValue);                                      // 입력값을 인자로 호출(3)
    toDoInput.value = "";                                         // 입력후 입력창을 빈 값으로 초기화
}

//1
function loadToDos(){                                            // 입력창에 입력 이후 발생
    const loadedToDos= localStorage.getItem(TODOS_LS);           // toDos에 "toDos"를 저장
    if(loadedToDos !== null){                                    // 입력전이라서 localStorage의 값이 없어 입력시 발생
        const parsedToDos = JSON.parse(loadedToDos);             // localStorage의 배열의 문자형의 값을 parse로 오브젝트로 변환
        parsedToDos.forEach((aa) => {                            // 변환된 오브젝트의 배열의 모든 값을 읽어온다
            paintToDo(aa.text);                                  // 읽은값을 인자로 호출
        });
    }
}


function init(){
    loadToDos();                                                  // 함수호출(1)
    toDoForm.addEventListener('submit', hand)                     // 두번째 입력창에서 양식이 제출되면 함수호출(2)
 
}

init();