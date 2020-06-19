// localStorage.clear()
var counter
//change color by user
var picker = document.getElementById('colorPicker')
var box = document.getElementById('header')
picker.addEventListener('change', function(){
  box.style.backgroundColor = this.value;
  window.localStorage.setItem('color', JSON.stringify(this.value));
})
//remember color from last session
if(localStorage.getItem('color')){
  var box = document.getElementById('header');
  var color = localStorage.getItem('color')
  box.style.backgroundColor = color.slice(1,-1)
}

//update counters from last session
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

//add new todo item
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
    //add buttons to array
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

//remove todo item
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
      window.localStorage.setItem('unchecked-count', JSON.stringify(uncheckedCount))
    }
  }
  let id = clicked_id.replace( /^\D+/g, '')
  document.getElementById(id).remove()
  localStorage["list"] = ul.innerHTML
  localStorage.removeItem(thenum)

}

//when box is checked
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
      window.localStorage.setItem('unchecked-count', JSON.stringify(uncheckedCount))
    }
    localStorage[clicked_id] = 'false'
  } 
  else {
    li.setAttribute("class", "todo-checkbox")
    let uncheckedCount = parseInt(document.getElementById('unchecked-count').innerHTML)+1
    document.getElementById('unchecked-count').innerHTML = uncheckedCount
    window.localStorage.setItem('unchecked-count', JSON.stringify(uncheckedCount))
    localStorage[clicked_id] = 'true'
  }
  localStorage["list"] = ul.innerHTML
}

if (localStorage["list"]) {
  ul.innerHTML = localStorage["list"];
}

//keep checkboxes checked after refresh
$(function() {
  $('[type="checkbox"]').each(function() {
    var $this = $(this),
      name = $this.attr('id');
    $this.prop('checked', localStorage[name] === 'true');
  });
});

$('[type="checkbox"]').on('change', function() {
  var $this = $(this),
    name = $this.attr('id');
  localStorage[name] = $this.is(':checked');
});
