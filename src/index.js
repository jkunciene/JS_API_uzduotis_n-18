// https://api-proxy.pixylt.com/https://evilinsult.com/generate_insult.php?lang=en&type=json
// https://official-joke-api.appspot.com/jokes/programming/random
// https://sv443.net/jokeapi/v2/
// https://docs.thecatapi.com/
// Inner
// <div>{ }</div>
// Outer
// {<div></div>}
// appendChild
// <div>{}</div>
// append
// <div></div>{}

// HTML elementai
const insultText = document.getElementById('insult-text');
const insultBtn = document.getElementById('insult-btn');
const jokeText = document.getElementById('joke-text');
const jokeBtn = document.getElementById('joke-btn');
const image = document.getElementById('image');
const imageBtn = document.getElementById('image-btn');

// Fetch funkcijos
function fetch_roast() {
    fetch(
        'https://api-proxy.pixylt.com/https://evilinsult.com/generate_insult.php?lang=en&type=json'
    )
        .then((response) => response.json())
        .then((data) => (insultText.textContent = data.insult));
}

async function joke() {
    let fetchJoke = await fetch(
        'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    );
    fetchJoke = await fetchJoke.json();
    //console.log(fetchJoke);
    const revealBtn = document.createElement('button');
    revealBtn.classList.add('btn');
    revealBtn.classList.add('btn-primary');
    revealBtn.textContent = 'Punchline';

    if (fetchJoke.type === 'twopart') {
        jokeText.innerHTML = `${fetchJoke.setup}<br><br>`;
        revealBtn.addEventListener('click', function () {
            revealBtn.outerHTML = fetchJoke.delivery;
        });
        jokeText.appendChild(revealBtn);
    } else {
        jokeText.innerHTML = fetchJoke.joke;
    }
}
async function fetchImage() {
    let fetchedImage = await fetch(
        'https://api.thecatapi.com/v1/images/search'
    );
    fetchedImage = await fetchedImage.json();
    fetchedImage = fetchedImage[0];
    const revealImg = document.createElement('img');
    revealImg.src = fetchedImage.url;
    revealImg.style.width = '100%';
    image.innerHTML = '';
    image.appendChild(revealImg);
}
/*

let cats = {
  {
    breeds: Array(n),
    id: "",
    url: "",
    width: 123,
    height: 123
  },
  {
    breeds: Array(n),
    id: "",
    url: "",
    width: 123,
    height: 123
  }
}
cats = cats[0];
cats.breed

*/

// Klausytojai
insultBtn.addEventListener('click', fetch_roast);
jokeBtn.addEventListener('click', joke);
imageBtn.addEventListener('click', fetchImage);

// Iškviečiamos funkcijos kai užsikrauna puslapis
fetch_roast();
joke();
fetchImage();
