
document.addEventListener('DOMContentLoaded',function(){


    const fields=document.querySelectorAll(".grid div");//---------------here we get an array of all div in the big main div
    

    let startPositions=[0,1,2,3,4,5,6,7,8,9,10,11,12,13];//------------here we give the positions where the droping emojy will appear  
   
    let emojyArray=[1,2,3,4,5];//------------------------------------this array i will use to have the value of each random emojy

//#region here i make the body of the game in center of the window
    let gameBody=document.querySelector(".grid");
    gameBody.style.left=((window.innerWidth)/4)
    gameBody.style.top=((window.innerHeight)/20)
    //#endregion

//#region emojy counters
    const love=document.querySelector('#love');
    let loveNumber=0;
    const haha=document.querySelector('#haha');
    let hahNumber=0;
    const cool=document.querySelector('#cool');
    let coolNumber=0;
    const crazy=document.querySelector('#crazy');
    let crazyNumber=0;
    const fear=document.querySelector('#fear');
    let fearNumber=0;
    //#endregion



//creat start button*********************************************
    let startButton=document.querySelector('input');
//***************************************************************

    startButton.onclick=function(){//this the main function where i call all others function when the user click the button start

        document.querySelector('form').innerHTML='<input type="button" value="game starts" style="width: 200px; height: 100px ; background-color:green; opacity:30%;"></input>'

   //#region here i give a random position to a random emojy
    let startPosition=startPositions[Math.floor(Math.random()*startPositions.length)];////here i take a random position to drop the emojy from it

    fields[startPosition].innerHTML=`<img src="images/${emojyArray[Math.floor(Math.random()*emojyArray.length)]}.jpg">`////here i get a random emojy image from 
    fields[startPosition].classList.add("taken");//here i set this class 'taken'...to give a flag to other dropping emojy that this place is reserved before 

    //#endregion


    //this event we created to controll moving of droping emojy horizontally
    //#region cotroll arrow
    window.addEventListener('keyup',function(e){

                
        switch(e.key){

            
                    case'ArrowLeft':
                    if (fields[startPosition-1].classList.contains('taken')) {}
                    else{
                    startPosition--;
                    if ((startPosition==13||startPosition==27||startPosition==41||startPosition==55||startPosition==69||startPosition==83|startPosition==97||startPosition==111||startPosition==125||startPosition==139||startPosition==153)) {
                        startPosition++;
                    }
                    else{
                    fields[startPosition].innerHTML=fields[startPosition+1].innerHTML;
                    fields[startPosition].classList.add('taken');
                    fields[startPosition+1].innerHTML=''
                    fields[startPosition+1].classList.remove('taken');}
                }
                    
                    break;
                    case'ArrowRight':
                    if (fields[startPosition+1].classList.contains('taken')) {}

                    else
                    {
                    startPosition++;
                    if((startPosition==14||startPosition==28||startPosition==42||startPosition==56||startPosition==70||startPosition==84|startPosition==98||startPosition==112||startPosition==126||startPosition==140||startPosition==154||startPosition==168)){
                        startPosition--;
                    }
                    else{
                    fields[startPosition].innerHTML=fields[startPosition-1].innerHTML;
                    fields[startPosition].classList.add('taken');
                    fields[startPosition-1].innerHTML=''
                    fields[startPosition-1].classList.remove('taken');}
                    }
                    break;
        

        }
    
    
    })
    //#endregion
    

    //we creat an interval to drop the emojy from the top of the box
    //#region the dropping interval
   
    let emojy=setInterval(function(){
        checkBord(startPosition)
        
        startPosition+=14;
if(startPosition<169){

        
        if (!(fields[startPosition].classList[0]=='taken')) {
            fields[startPosition].innerHTML=fields[startPosition-14].innerHTML
        fields[startPosition].classList.add("taken")
        
        fields[startPosition-14].innerHTML=''
        fields[startPosition-14].classList.remove('taken');


            
        }
        
        for (let index = 0; index < 14; index++) {
            if(fields[index].innerHTML!=''){

                clearInterval(emojy)
                document.querySelector('.grid').innerHTML='<h1>game over</h1>';
            }
            
        }
       
    }
    

    else{startPosition=startPositions[Math.floor(Math.random()*startPositions.length)];
        fields[startPosition].innerHTML=`<img src="images/${emojyArray[Math.floor(Math.random()*emojyArray.length)]}.jpg">`
    fields[startPosition].classList.add("taken");
    }
   
    // checkBord(startPosition)
    
    
},200)

//#endregion


//here the code of the counter
//#region counter code

let timeSecond = 120;
const timeH = document.querySelector("h2");

displayTime(timeSecond);

const countDown = setInterval(() => {
  timeSecond--;
  displayTime(timeSecond);
  if (timeSecond == 0 || timeSecond < 1) {
    endCount();
    clearInterval(countDown);
  }
}, 1000);
//this function to modify the form of the time display

//#region time display function
function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerText = `    ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function endCount() {
    document.querySelector('.grid').innerHTML='<h1>game over</h1>';
      clearInterval(emojy);

}
//#endregion 
//#endregion





    
    

    
    






    


}

    //#region functions


    //this function affect about the emojy counter when function ****checkBord()**** do its job the emojy count will increase
    //#region score-function

function counters(x){
    if (fields[x].innerHTML=='<img src="images/1.jpg">') {
        loveNumber++;
        love.innerHTML=loveNumber;
  
    }
    if (fields[x].innerHTML=='<img src="images/2.jpg">') {
  
        hahNumber++;
    
        haha.innerHTML=hahNumber;
  
    }
    if (fields[x].innerHTML=='<img src="images/3.jpg">') {
  
        coolNumber++;
    
        cool.innerHTML=coolNumber;
  
    }
    if (fields[x].innerHTML=='<img src="images/4.jpg">') {
  
        crazyNumber++;
    
        crazy.innerHTML=crazyNumber;
  
    }
    if (fields[x].innerHTML=='<img src="images/5.jpg">') {
  
        fearNumber++;
    
        fear.innerHTML=fearNumber;
  
    }


}
//#endregion



//this function affect on the other emojys that are above the matched emojy..... when matched and call the function **counters()** we drag and drop all above emojy one line
//#region  drop-above-emojys-function
function swap(x){
    let flag=true
            while (flag) {
                


                if(((x)>13)&&fields[x-14].classList.contains('taken'))

                {x=x-14;
                    fields[x+14].innerHTML=fields[x].innerHTML;
                    fields[x+14].classList.add("taken");
                    fields[x].classList.remove('taken');
                    fields[x].innerHTML='';



                }
                else {
                    flag=false;
                }
                
            }
}

//#endregion

//this the most important function ... this function check every time a new emojy drop ,, if this emojy match others emojy near by him ... if are the same emojy we will use othe functions**(**counters()*&&*swap()*) to do their behaviors on the matched emojys

//#region check-if-emojy-matched-function
function checkBord(x){
    if (fields[x+14].classList.contains('taken')) {
    
    
    
    if(fields[x].innerHTML==fields[x+14].innerHTML&&fields[x+14].innerHTML==fields[x+28].innerHTML){
        counters(x);
        fields[x+28].classList.remove('taken');
       
        fields[x+28].innerHTML='';
  
        fields[x].classList.remove('taken');
        fields[x].innerHTML='';
        
        fields[x+14].classList.remove('taken');
        fields[x+14].innerHTML='';
        

       
       

        

    }



   
    if(fields[x].innerHTML==fields[x-1].innerHTML&&fields[x-1].innerHTML==fields[x-2].innerHTML){

        if(!(x==0&&x==14&&x==28&&x==42&&x==56&&x==70&&x==84&&x==98&&x==112&&x==126&&x==140&&x==154&&x==168))

        {
        counters(x);
  
        fields[x].classList.remove('taken');
        fields[x].innerHTML='';
        swap(x);

        fields[x-1].classList.remove('taken');
        fields[x-1].innerHTML='';
        swap(x-1)

        fields[x-2].classList.remove('taken');
        fields[x-2].innerHTML='';
        swap(x-2);
        }
        

    }




    else if(fields[x].innerHTML==fields[x+1].innerHTML&&fields[x-1].innerHTML==fields[x].innerHTML){
        counters(x);
  
       
        fields[x].classList.remove('taken');
        fields[x].innerHTML='';
        swap(x);

        fields[x-1].classList.remove('taken');
        fields[x-1].innerHTML='';
        swap(x-1);

        fields[x+1].classList.remove('taken');
        fields[x+1].innerHTML='';
        swap(x+1);
        

    }


    


    else if(fields[x].innerHTML==fields[x+1].innerHTML&&fields[x+1].innerHTML==fields[x+2].innerHTML){
        if (!(x==13&&x==27&&x==41&&x==55&&x==69&&x==83&&x==97&&x==111&&x==125&&x==139&&x==153)) 
       {
       counters(x);
        fields[x].classList.remove('taken');
        fields[x].innerHTML='';
        swap(x);

        fields[x+1].classList.remove('taken');
        fields[x+1].innerHTML='';
        swap(x+1);

        fields[x+2].classList.remove('taken');
        fields[x+2].innerHTML='';
        swap(x+2);
        }

    }
}

}
//#endregion

   
//#endregion
}


    


       

    


)

