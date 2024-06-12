let countspan=document.querySelector(".quiz-info .count span");
let bullets=document.querySelector(".bullets");
let bulletsspancontener=document.querySelector(".bullets .spans");
let quiz_area=document.querySelector(".quiz-area");
let answers_area=document.querySelector(".answers-area");
let submit_button=document.querySelector(".submit-button");
let results=document.querySelector(".results");
let countdown=document.querySelector(".countdown");
let count=0;
let rightanswer=0;
function get_JSON(){
    let myrqust=new XMLHttpRequest();
    myrqust.onreadystatechange=function(){
        if(this.readyState===4 &&this.status===200){
            let js=JSON.parse(this.responseText)
            craeteBullets(js.length);
            f(js[count],js.length,js[count].right_answer);
            countdown_F(7,js.length);
            submit_button.onclick=()=>{
                
                chicka(js[count].right_answer,js.length);
                count++;
                

                quiz_area.innerHTML=``;
                answers_area.innerHTML=``;
                if(count<9){ f(js[count],js.length,js[count].right_answer);}
               
                handel_span();
                shoorisolt(js.length)
                clearInterval(countdown_interver);
                countdown_F(7,js.length);
                

            }

        }
    };
    myrqust.open("GET","html_requist.json",true);
    myrqust.send();
}
get_JSON();
function craeteBullets(n){
    countspan.innerHTML=n;
    for(let i=0;i<n;i++){
      let span=document.createElement("span"); 
      if(i==0){span.classList.add("on")}
      bulletsspancontener.appendChild(span) ;

    }
}
function f(obj,m,r){
    if(count<m){
        console.log(r)
    

   let titel=document.createElement("h2");
   let titelText=document.createTextNode(obj["title"]);
   titel.appendChild(titelText)
   quiz_area.appendChild(titel)
   for(let i=1;i<=4;i++){
    let div=document.createElement("div");
    div.className="answer";
    let radioinput=document.createElement("input");
    radioinput.name="question";
    radioinput.type="radio";
    radioinput.id=`answer_${i}`
    radioinput.dataset.answer=obj[`answer_${i}`];
    if(i===1){
        radioinput.checked=true;
    }
    let label=document.createElement("label");
    label.htmlFor=`answer_${i}`;
    let labelText=document.createTextNode(obj[`answer_${i}`]);
    label.appendChild(labelText);
    div.appendChild(radioinput);
    div.appendChild(label);
    answers_area.appendChild(div)
 }
}
}
function chicka(n,m){
    let answers=document.getElementsByName("question");
    let answershoose;
    for(let i=0;i<answers.length;i++){
        if(answers[i].checked){
            answershoose=answers[i].dataset.answer;
        }
        
    }
    if(answershoose===n){
        rightanswer++;
        
    }
}
function handel_span(){
    
let spans= document.querySelectorAll(".bullets .spans span")
let array=Array.from(spans)

array.forEach((s,i)=>{
    if(i===count){
        s.className="on";
    }
})
}
function shoorisolt(c){
    let theresultes;
    if(c===count){
    quiz_area.remove();
    answers_area.remove();
    bullets.remove();
    submit_button.remove();
    if(rightanswer>(c/2)&&rightanswer<c){
        theresultes=`<span class="good">Good</span> , ${rightanswer} from ${c}`
    }else if(rightanswer===c){
        theresultes=`<span class="perfect">Perfect</span> , All Answer is right `
    }
    else{
    theresultes=`<span class="bad">Bad</span> , ${rightanswer} from ${c}`

    }
    results.innerHTML=theresultes
    }
    

}
function countdown_F(duration,c){
    let minit,secand;
    if(count<c){
        countdown_interver=setInterval(()=>{
             minit=parseInt(duration/60)
        secand=parseInt(duration%60);
        minit=minit<10?`0${minit}`:minit;
        secand=secand<10?`0${secand}`:secand;
       countdown.innerHTML=`${minit}:${secand}`;
       if(--duration<0){
        clearInterval(countdown_interver);
        submit_button.click();

       }},1000)

       

    }
}
