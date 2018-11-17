import Store from './store';
import mp3 from '../assets/definite.mp3';

// Init Local Storage
const store = new Store;

class Audio {
  constructor() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.buffer = null;
    this.gainNode = this.context.createGain();
  }

  loadSound(url) {
    fetch(url)
    .then(res => res.arrayBuffer())
    .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => this.buffer = audioBuffer);
  }

  setVolume(volume) {
    this.gainNode.gain.value = volume;
  }

  play() {
    this.gainNode.connect(this.context.destination);

    const source = this.context.createBufferSource();
    source.buffer = this.buffer;
    source.connect(this.gainNode);
    source.start();
  }
}

const audio = new Audio;
audio.loadSound(mp3);
audio.setVolume(store.getConfig().notificationSettings.volume);

export { audio };