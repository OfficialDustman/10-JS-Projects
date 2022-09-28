const addBtn = document.getElementById('add'),
      notesWrap = document.querySelector('.swiper-wrapper');
      
const value = undefined;


addBtn.addEventListener('click', () => {
  addNewNote();
})

function addNewNote(){
  const note = document.createElement('div');
  note.classList.add('swiper-slide')
  note.classList.add('notes')

  note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fa-solid fa-square-check"></i></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main hidden"></div>
    <textarea name="" id=""></textarea>
  `
  notesWrap.appendChild(note)

  const notesEl = document.querySelector('.notes'),
      // editBtn = document.querySelector('.edit'),
      editBtnAll = document.querySelectorAll('.edit'),
      // editIcon = document.querySelector('.fa-square-check'),
      editIconAll = document.querySelectorAll('.fa-square-check'),
      deleteBtn = document.querySelector('.delete');


      // txtArea = notesEl.querySelector('textarea'),
      txtAreaAll = notesWrap.querySelectorAll('textarea'),
      // mainArea = notesEl.querySelector('.main');
      mainAreaAll = notesWrap.querySelectorAll('.main');
      console.log(txtAreaAll);
      console.log(mainAreaAll);

  // editBtn.addEventListener('click', () => {
  //   editIcon.classList.toggle('fa-pen-to-square')
  //   editIcon.classList.toggle('fa-square-check')

  //   mainArea.classList.toggle('hidden')
  //   txtArea.classList.toggle('hidden')
  // })

  editBtnAll.forEach((editBtn) => {
    editBtn.addEventListener('click', () => {
      
      editIconAll.forEach((editIcon) => {
        editIcon.classList.toggle('fa-pen-to-square')
        editIcon.classList.toggle('fa-square-check')
      })

      // mainAreaAll.forEach((mainArea) => {
      //   mainArea.classList.toggle('hidden')
      //   mainArea.innerHTML = marked.parse(value);

      // })

      txtAreaAll.forEach((txtArea) => {
        txtArea.classList.toggle('hidden')

        txtArea.addEventListener('input', (e) => {
          const {value} = e.target;
    
          console.log(value);
    
          // mainAreaAll.forEach((mainArea) => {
          //   mainArea.innerHTML = marked.parse(value);
          // })
    
        })
      })

      mainAreaAll.forEach((mainArea) => {
        mainArea.classList.toggle('hidden')
        mainArea.innerHTML = marked.parse(value);

      })
      
    })
  })

  
  // txtAreaAll.forEach((txtArea) => {
  //   txtArea.addEventListener('input', (e) => {
  //     const {value} = e.target;

  //     console.log(value);

  //     mainAreaAll.forEach((mainArea) => {
  //       mainArea.innerHTML = marked.parse(value);
  //     })

  //   })

  // })


  
  const swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 40,
      stretch: 0,
      depth: 100,
      modifier: 1,
      // slideShadows: true,
    },
    // loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
  });
}

// const notesEl = document.querySelector('.notes'),
//       notesWrap = document.querySelector('.swiper-wrapper'),
//       editBtn = document.querySelector('.edit'),
//       editIcon = document.querySelector('.fa-square-check'),
//       deleteBtn = document.querySelector('.delete');


//       txtArea = notesEl.querySelector('textarea'),
//       mainArea = notesEl.querySelector('.main');


// editBtn.addEventListener('click', () => {
//   editIcon.classList.toggle('fa-pen-to-square')
//   editIcon.classList.toggle('fa-square-check')

//   mainArea.classList.toggle('hidden')
//   txtArea.classList.toggle('hidden')
// })


// txtArea.addEventListener('input', (e) => {
//     const {value} = e.target;

//     mainArea.innerHTML = marked.parse(value);

// })



