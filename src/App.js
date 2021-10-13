import React from 'react'
import './style.css';

class Menu extends React.Component{
  render(){
    return(
      <div className='menu'>
        <div className='div'>
          <i class="fas fa-align-justify" id='menu' onClick={this.props.menu}></i>
          <main>
            <ul>
              <li id='create' onClick={this.props.menu}>Create</li>
              <li id='homework' onClick={this.props.menu}>Homework</li>
              <li id='deadline' onClick={this.props.menu}>
                Deadline 
                <i class="fas fa-exclamation"></i>
              </li>
              <li id='recent' onClick={this.props.menu}>Recent</li>
            </ul>
          </main>
        </div>
      </div>
    )
  }
}

class Create extends React.Component {
  render() {
      return (
          <div className='create'>
              <h1>Create Reminder</h1>
              <main>
                <label for='name'>Nama Tugas :</label>
                <input type="text" name="text" id="nameLabel" placeholder="Nama Tugas" required/>
                <label for='date'>Batas Akhir :</label>
                <input type="date" name="date" id="timeLabel" required/>
                <label for='deskripsi'>Deskripsi :</label>
                <textarea name="deskripsi" id="deskripsiLabel" cols="30" rows="10" placeholder="Deskripsi Tugas" required></textarea>
                <button className='buat' type="submit" onClick={this.props.createBTN}>Buat</button>
              </main>
          </div>
      )
  }
}

class CreateClass extends React.Component {
  render() {
      return (
        <div className={this.props.judulClass}>
          <h1>{this.props.judul}</h1>
          <main>
            <ul></ul>
          </main>
        </div>
      )
  }
}


const create = []
const homework = []
const deadline = [] 
const recent = []


function createElement(a, input){
  const element = document.createElement(a)
  element.innerText = input
  return element;
}

function createBTN (input, cls, clickBTN){
  const btn = document.createElement('BUTTON')
  btn.type = 'submit'
  btn.innerText = input
  btn.classList.add(cls)
  btn.onClick = clickBTN
  return btn;
}


function returnArr(name, des, time){
  return{
    name,
    des,
    time
  }
}

const display=(cls1,  cls3, cls4, cls5)=>{
  document.querySelector('.' + cls1).style.display = 'block';
  document.querySelector('.' + cls3).style.display = 'none';
  document.querySelector('.' + cls4).style.display = 'none';
  document.querySelector('.' + cls5).style.display = 'none';
}


var x = setInterval(()=>{
  let day = ['Sunday', 'Monday', 'Thursday', 'Wednesday', 'Tuesday', 'Friday', 'Saturday']
  var getDay = new Date().getDay()
  var getMonth = new Date().getMonth()
  var getYear = new Date().getFullYear()
  var getDate = new Date().getDate()
  var getHour = new Date().getHours()
  var getMinutes = new Date().getMinutes()
  var getSeconds = new Date().getSeconds()
  
  findDue(getYear, getMonth, getDate)

  document.getElementById("demo").innerHTML = day[getDay] + "&emsp;" + controlZero(getYear) + "-" + controlZero((getMonth + 1)) + "-" + controlZero(getDate) + "&emsp;" + controlZero(getHour) + ':' + controlZero(getMinutes) + ":" + controlZero(getSeconds)
}, 1000)

const findDue = (year, month, date) => {

  let findTimeObj = create.map((obj)=>{
    const dateObj = obj.time
    return dateObj;
  })
  
  const dateTime = controlZero(year) + "-" + controlZero((month + 1)) + "-" + controlZero(date)
  const findDateTime = findTimeObj.indexOf(dateTime)

  if( findTimeObj[findDateTime] == dateTime ){
      notification(findDateTime)
      create.splice(findDateTime, 1)
      homework.splice(findDateTime, 1)
      alert('you have a deadline')
    }
  }
  
  function notification(index){
  const k = homework[index]
  deadline.push(k)
  
  deadline.map((obj)=>{
    obj.lastChild.remove()
    obj.append(createBTN('Hapus','deleteDeadline'))
    
    const ul = document.querySelector('.deadline ul')
    
    ul.append(obj)
    return ul;
  })
  const i = document.querySelector('.menu #deadline i')
  if(!deadline.length == 0) {
    i.style.display = 'inline'
  }
}

function controlZero(zero){
  return (zero < 10) ? "0" + zero : zero
}

function LI(e){
  const target = e.target.parentElement
  recent.push(target)
  target.remove()

  recent.map((obj)=>{
    obj.lastChild.remove()
    obj.append(createBTN('Hapus','deleteRecent'))

    const ul = document.querySelector('.recent ul')
  
    ul.append(obj)
    return ul;
  })
}


document.addEventListener('click',function(e) {  
  if(e.target.className == 'buat'){
    // inputUL()
  } else if(e.target.className == 'clear') {
    LI(e)
  } else if(e.target.className == 'deleteRecent'){
    const d = recent.indexOf(e.target.parentElement)
    recent.splice(d,1)
    e.target.parentElement.remove()
  } else if(e.target.className == 'deleteDeadline'){
    const s = deadline.indexOf(e.target.parentElement)
    deadline.splice(s,1)
    e.target.parentElement.remove()

    const i = document.querySelector('.menu div #deadline i')
    if(deadline.length == 0) {
      i.style.display = 'none'
    }
  }
})






class App extends React.Component {

  menuClick(e){
    const main = document.querySelector('.menu main')
    const menu = document.querySelector('.container')
    const target = e.target

    // console.log(menu)

    if(target.id == 'menu'){
      menu.firstChild.classList.toggle('menuDisplay')
      main.classList.toggle('toggleDisplay')
    } else if(target.id == 'create'){
      display('create', 'homework', 'recent', 'deadline')
    } else if(target.id == 'homework'){
      display('homework', 'create', 'recent', 'deadline')
    } else if(target.id == 'recent'){
      display('recent', 'create', 'homework', 'deadline')
    }else if(target.id == 'deadline'){
      display('deadline','recent', 'create', 'homework')
    }
  }



  inputUL(){
    const nameLabel = document.getElementById('nameLabel').value
    const timeLabel = document.getElementById('timeLabel').value
    const deskripsiLabel = document.getElementById('deskripsiLabel').value

    create.push(returnArr(nameLabel, deskripsiLabel, timeLabel))

    
    const b = create.map((obj)=>{
      const li = document.createElement('li')
      const valueName = obj.name
      const valueDes = obj.des
      const valueTime = obj.time
  
      li.append(createElement('h2', valueName), createElement('p', valueDes), createElement('h4', valueTime),createBTN('Selesai','clear'))
      
      return li
    })
  
    const z = b[b.length - 1]
    homework.push(z)
    const ul = document.querySelector('.homework ul')
    ul.append(z)
    return ul;
  }

  render() {
    return (
      <div className='container'>
        <Menu 
          menu={this.menuClick}
        />
        <div className='main'>
          <div className='header'>
            <h1>Homework Reminder &ensp; <i class="far fa-bell"></i></h1>
            <p id='demo'></p>
          </div>
          <Create 
            createBTN ={this.inputUL}
          /> 
          <CreateClass
            judulClass='homework'
            judul='Homework'
          />
          <CreateClass
            judulClass='recent'
            judul='Recent'
          />
          <CreateClass
            judulClass='deadline'
            judul='Deadline'
          />
        </div>
      </div>
    )
  }
}

export default App;