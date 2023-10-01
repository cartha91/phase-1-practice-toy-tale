let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

window.addEventListener('DOMContentLoaded', (event) => {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
      let toyCollection = document.getElementById('toy-collection');
      toys.forEach(toy => {
          let card = document.createElement('div');
          card.className = 'card';

          let name = document.createElement('h2');
          name.innerText = toy.name;
          card.appendChild(name);

          let img = document.createElement('img');
          img.src = toy.image;
          img.className = 'toy-avatar';
          card.appendChild(img);

          let likes = document.createElement('p');
          likes.innerText = `${toy.likes} likes`;
          card.appendChild(likes);

          let button = document.createElement('button');
          button.className = 'like-btn';
          button.id = toy.id;
          card.appendChild(button);

          toyCollection.appendChild(card);
      });
  });
});

document.querySelector('.add-toy-form').addEventListener('submit', function(event) {
  event.preventDefault();

  let nameInput = document.querySelector('input[name="name"]');
  let imageInput = document.querySelector('input[name="image"]');

  let formData = {
      name: nameInput.value,
      image: imageInput.value,
      likes: 0
  };

  let configObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
  };

  fetch('http://localhost:3000/toys', configObj)
  .then(response => response.json())
  .then(toy => {
      let toyCollection = document.getElementById('toy-collection');

      let card = document.createElement('div');
      card.className = 'card';

      let name = document.createElement('h2');
      name.innerText = toy.name;
      card.appendChild(name);

      let img = document.createElement('img');
      img.src = toy.image;
      img.className = 'toy-avatar';
      card.appendChild(img);

      let likes = document.createElement('p');
      likes.innerText = `${toy.likes} likes`;
      card.appendChild(likes);

      let button = document.createElement('button');
      button.className = 'like-btn';
      button.id = toy.id;
      card.appendChild(button);

      toyCollection.appendChild(card);
  })
  .catch(error => console.error(error));
});

document.addEventListener('click', function(event) {
  if (event.target.className === 'like-btn') {
      let id = event.target.id;
      let likesElement = event.target.previousSibling;
      let likes = parseInt(likesElement.innerText.split(' ')[0]) + 1;

      let formData = {
          likes: likes
      };

      let configObj = {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
      };

      fetch(`http://localhost:3000/toys/${id}`, configObj)
      .then(response => response.json())
      .then(toy => {
          likesElement.innerText = `${toy.likes} likes`;
      })
      .catch(error => console.error(error));
  }
});