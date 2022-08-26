let counter = 0;
let all_notes_titles = [];
let all_notes_content = [];
let current_number = 0;

// addEventListener("keydown", sumbit);
// function sumbit(event) {
//   let text = document.getElementById("content").value;

//   if (event.key == "Enter") {
//     addElement(text);
//   }
// }
function blankNote() {
    document.getElementById("article-title").value = "";
    document.getElementById("article-content").value = "";
    if(counter != current_number)
    {
      counter++
      current_number = counter
    }
    console.log(`get blank ${counter}`)
}

function addNote() {
  const title = document.getElementById("article-title").value;
  const content = document.getElementById("article-content").value;
  if ( title == "" || content == undefined || content =="") {
    alert("nie lol");
  }else{
   addElement(title, content);
  }  
}

function addElement(title, content) {

  const div = document.createElement("div");

  div.classList.add("note");
  div.setAttribute("onclick", `showMore(${counter})`);
  div.innerHTML = `<div class="note-preview" onclick="showMore(${counter})"><h2 id="h-${counter}" class="special-h">${title}</h2><p id="p-${counter}" class="special-p">${content}</p></div>`;
  document.getElementById("all_notes").appendChild(div);

  all_notes_titles.push(title);
  all_notes_content.push(content);
  counter++;
  current_number = counter
  console.log(`get ${counter}`)

  document.getElementById("article-title").value = ""
  document.getElementById("article-content").value = ""
}

function showMore(number) {

  current_number = number;
  document.getElementById("article-title").value = all_notes_titles[current_number];
  document.getElementById("article-content").value = all_notes_content[current_number];

  document.getElementById("article-title").addEventListener("change", () =>{
    let title = document.getElementById("article-title").value;
    let content = document.getElementById("article-content").value;
  
    console.log(`hej ${current_number}`)
    if(title !== undefined && content !== undefined && title !== null && content !== null && title !== "" && content !=="")
    {
      all_notes_titles[current_number] = document.getElementById("article-title").value;
      try{
        document.getElementById(`h-${current_number}`).innerHTML = document.getElementById("article-title").value  
      }catch{
        console.log(`cicho`)
      }
    }else  console.log("zostaw")
  });

  document.getElementById("article-content").addEventListener("change", ()=>{
    let title = document.getElementById("article-title").value;
    let content = document.getElementById("article-content").value;
    if(title !== undefined && title !== null && content !== undefined && content !== null && title !== "" && content !=="" )
    {
      all_notes_content[current_number] = document.getElementById("article-content").value;
      try{
        document.getElementById(`p-${current_number}`).innerHTML = document.getElementById("article-content").value  
      }catch{
        console.log(`cicho`)
      }
    }else console.log("zostaw")

  })


  // document.getElementById("article-title").removeEventListener("change",updateTitle())
  // document.getElementById("article-content").removeEventListener("change",updateContent())
}

function wipeData() {
  if (confirm("Czy napewno chcesz usunąć wszytskie notatki?") == true) {
    all_notes_titles = [];
    all_notes_content = [];
    window.location.reload(true);
  }
}

window.addEventListener("beforeunload", function () {
  window.localStorage.setItem("counter", counter);
  window.localStorage.setItem("titles", all_notes_titles);
  window.localStorage.setItem("content", all_notes_content);
  window.localStorage.setItem("length", all_notes_titles.length);
});

function loadNotes() {
  const arrLength = window.localStorage.getItem("length");
  if (arrLength > 0) {
    let saved_titles = window.localStorage.getItem("titles").split(",");
    let saved_content = window.localStorage.getItem("content").split(",");

    for (let i = 0; i < arrLength; i++) {
      addElement(saved_titles[i], saved_content[i]);
    }
  }
}

/* <button type="submit" id="${counter}" onclick="enable(${counter})"><img src="pencil.png" alt="img"></button>`; */

// function enable(number)
// {
//     const textareas = document.getElementsByTagName("textarea")
//     textareas[number].disabled = false

//     document.getElementById(number).innerHTML = `<img src="cancel.png" alt="img">`
//     document.getElementById(number).setAttribute("onclick",`disable(${number})`)
// }

// function disable(number){
//     const textareas = document.getElementsByTagName("textarea")
//     textareas[number].disabled = true

//     document.getElementById(number).innerHTML = `<img src="pencil.png" alt="img">`
//     document.getElementById(number).setAttribute(`onclick`,`enable(${number})`)
// }
