// localStorage.clear()
var counter

if(localStorage.getItem('counter')){
  counter = localStorage.getItem('counter')
  document.getElementById('item-count').innerHTML = parseInt(localStorage.getItem('item-count'))
  document.getElementById('unchecked-count').innerHTML = parseInt(localStorage.getItem('unchecked-count'))
}else{
  counter = 0
}
var ul = document.getElementById("todo-list");
//enable pressing enter to submit todo list item
document.getElementById("myInput").addEventListener( "keydown", function( e ) {
    var keyCode = e.keyCode || e.which;
    if ( keyCode === 13 ) {
       // enter pressed
       newTodo()
    }
}, false);

function newTodo() {
  var input = document.getElementById("myInput").value;
  if(input !== ""){
    document.getElementById("myInput").value = "";
    //create list item
    let li = document.createElement("li")
    li.appendChild(document.createTextNode(input))

    //create checkbox
    let button = document.createElement("INPUT")
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("x");
    button.setAttribute("type", "checkbox")
    button.id = "b"+counter
    button.setAttribute("onClick", "done(this.id)");
    span.className = "close";
    span.id = "x"+counter
    span.setAttribute("onClick", "remove(this.id)");
    span.appendChild(txt);
    li.appendChild(button)
    li.appendChild(span)
    li.setAttribute("class","todo-checkbox")
    li.id = counter++
    ul.appendChild(li)
    //update localStorage
    localStorage["list"] = ul.innerHTML
    //increase item and unchecked count
    let itemCount = parseInt(document.getElementById('item-count').innerHTML)+1
    let uncheckedCount = parseInt(document.getElementById('unchecked-count').innerHTML)+1
    document.getElementById('item-count').innerHTML = itemCount
    document.getElementById('unchecked-count').innerHTML = uncheckedCount
    //update counter in localStorage
    window.localStorage.setItem('counter', JSON.stringify(counter));
    window.localStorage.setItem('item-count', JSON.stringify(itemCount));
    window.localStorage.setItem('unchecked-count', JSON.stringify(uncheckedCount));
  }
}

function remove(clicked_id){
  //update item-count
  let itemCount = parseInt(document.getElementById('item-count').innerHTML)-1
  document.getElementById('item-count').innerHTML = itemCount
  window.localStorage.setItem('item-count', JSON.stringify(itemCount));
  let value = document.getElementById('unchecked-count').innerHTML
  //get the button id
  let thenum = clicked_id.replace("x", "b")
  let button = document.getElementById(thenum)
  //decrease unchecked count and strikethrough text
  if (button.checked === false){
    if(value > 0){
      let uncheckedCount = parseInt(document.getElementById('unchecked-count').innerHTML)-1
      document.getElementById('unchecked-count').innerHTML = uncheckedCount
      window.localStorage.setItem('unchecked-count', JSON.stringify(uncheckedCount));
    }
  }
  let id = clicked_id.replace( /^\D+/g, '')
  console.log(id)
  document.getElementById(id).remove()
  localStorage["list"] = ul.innerHTML
}

function done(clicked_id){
  let value = document.getElementById('unchecked-count').innerHTML
  let button = document.getElementById(clicked_id)
  
  //get the number id
  let thenum = clicked_id.replace( /^\D+/g, '')
  let li = document.getElementById(thenum)

  //decrease unchecked count and strikethrough text
  if (button.checked === true){
    li.setAttribute("class", "checked")
    if(value > 0){
      let uncheckedCount = parseInt(document.getElementById('unchecked-count').innerHTML)-1
      document.getElementById('unchecked-count').innerHTML = uncheckedCount
      window.localStorage.setItem('unchecked-count', JSON.stringify(uncheckedCount));
    }
  } else {
      li.setAttribute("class", "todo-checkbox")
      let uncheckedCount = parseInt(document.getElementById('unchecked-count').innerHTML)+1
      document.getElementById('unchecked-count').innerHTML = uncheckedCount
      window.localStorage.setItem('unchecked-count', JSON.stringify(uncheckedCount));
  }
  localStorage["list"] = ul.innerHTML
}

if (localStorage["list"]) {
  ul.innerHTML = localStorage["list"];
}