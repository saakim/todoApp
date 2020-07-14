// localStorage.clear()
var counter
var calClicked = false
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
    localStorage[clicked_id] = 'true'
  } 
  else {
    li.setAttribute("class", "todo-checkbox")
    let uncheckedCount = parseInt(document.getElementById('unchecked-count').innerHTML)+1
    document.getElementById('unchecked-count').innerHTML = uncheckedCount
    window.localStorage.setItem('unchecked-count', JSON.stringify(uncheckedCount))
    localStorage[clicked_id] = 'false'
  }
  localStorage["list"] = ul.innerHTML
}
var src = ""
if(localStorage.getItem('src')){
  src = localStorage.getItem('src')
}
function addCal(){
  let input = document.getElementById("calText").value
  src = input
  localStorage["src"] = input
  document.getElementById("calText").value = "";
  modal.style.display = "none";
}

function googleCal(){
  var elem = document.getElementById('calendar')
  if(!calClicked){
    if(src){
      calClicked = true
    // src = "https://calendar.google.com/calendar/b/0/embed?height=600&amp;wkst=1&amp;bgcolor=%237986CB&amp;ctz=Asia%2FSeoul&amp;src=c2Fha2ltQHVtaWNoLmVkdQ&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23039BE5&amp;color=%2333B679&amp;color=%230B8043"
    var iframe = '<iframe id="cal" class="cal" src='+src+ 'style="border:solid 1px #777" width="500" height="400" frameborder="0" scrolling="no"></iframe>'
    elem.innerHTML += iframe
    }
  }else{
    var cal = document.getElementById('cal')
    cal.remove()
    calClicked = false
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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
