const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

const toggleButton = () => (button.disabled = !button.disabled);

function tellMeAJoke(joke) {
  VoiceRSS.speech({
    key: '45c600b1321a43698b8966c493269a86',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// get jokes from joke api
const fetchJoke = async () => {
  let joke = '';
  try {
    const url = `https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup}...${data.delivery}`;
    } else {
      joke = data.joke;
    }
    toggleButton();
    tellMeAJoke(joke);
  } catch (e) {
    console.error('Something Went Wrong', e.message);
  }
};

button.addEventListener('click', fetchJoke);

audioElement.addEventListener('ended', toggleButton);
