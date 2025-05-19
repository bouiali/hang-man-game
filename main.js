//variables

let draw_divs = document.querySelectorAll(".draw > div");
let keyboard = document.querySelector(".keyboard");
let inputs = document.querySelector(".inputs");
let span = document.querySelector("span");
let result = document.querySelector(".result");
let restart = document.querySelector(".restart");
let words = [ 
    ["soccer","box","juijetsu"],
    ["kabsa","dwara","burger"],
    ["car","bus","jet"],
    ["carrots","salad","tomato"]
];
let categories = [
    "sport",
    "food",
    "vichel",
    "vegetabel"
];
let cat = Math.floor(Math.random()*categories.length);
span.innerHTML = categories[cat];
let word = words[cat][Math.floor(Math.random()*words[cat].length)];
let draw_index = 0;
let word_length = 0;

//hide hang man draw

for(let i=0;i<draw_divs.length;++i){
    draw_divs[i].style.setProperty("display","none");
}

//create the keyboard and add its own events

for(let i=0;i<26;++i){
    let key = document.createElement("button");
    key.innerHTML = String.fromCharCode(65+i);
    key.classList.add("key");
    key.addEventListener("click",()=>{
        key.disabled = true;
        key.style.backgroundColor = "#eee";
        key.style.color = "grey";

        //if the letter is correct

        if(word.includes(key.innerHTML.toLowerCase())){
            let input = document.querySelectorAll(".inputs input");
            for(let i=0;i<word.length;++i){
                if(word[i] === key.innerHTML.toLowerCase()){
                    input[i].value= word[i];
                    ++word_length;
                    if(word_length === word.length){
                        result.style.color = "green";
                        result.innerHTML = "You win , the word is :"+word;
                        end();
                    }
                }
            }
        }

        //if the letter is wrong

        else{
            draw_divs[draw_index].style.setProperty("display","inline");
            if(draw_index < draw_divs.length-1)
                draw_index++;
            else{
                result.style.color = "red";
                result.innerHTML = "You lose , the word is :"+word;
                end();
            }
        }
    });
    keyboard.appendChild(key);
}

//create inputs field by word length

for(let i=0;i<word.length;++i){
    let input = document.createElement("input");
    input.setAttribute("readonly","readonly");
    inputs.appendChild(input);
}

//end and restart the game

function end(){
    let buttons = document.querySelectorAll(".keyboard button");
    for(let i=0;i<buttons.length;++i){
        buttons[i].disabled = true;
    }
    let button = document.createElement("button");
    button.innerHTML = "Restart";
    button.addEventListener("click",()=>{
        window.location.reload();
    });
    restart.appendChild(button);
}