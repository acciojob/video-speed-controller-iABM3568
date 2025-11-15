// ===== VIDEO PLAYER CODE =====

const video = document.querySelector('.flex');
const wrapper = document.querySelector('.wrapper');

// Setup video
video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
video.removeAttribute('controls');
video.classList.add('player__video');

// Create controls container
const playerControls = document.createElement('div');
playerControls.className = 'player__controls';

// Create progress bar
const progress = document.createElement('div');
progress.className = 'progress';
const progressBar = document.createElement('div');
progressBar.className = 'progress__filled';
progress.appendChild(progressBar);

// Create play/pause button
const toggle = document.createElement('button');
toggle.className = 'player__button toggle';
toggle.textContent = '►';
toggle.title = 'Toggle Play';

// Create volume slider
const volumeSlider = document.createElement('input');
volumeSlider.type = 'range';
volumeSlider.name = 'volume';
volumeSlider.className = 'player__slider volume';
volumeSlider.min = '0';
volumeSlider.max = '1';
volumeSlider.step = '0.05';
volumeSlider.value = '1';

// Create speed slider
const speedSlider = document.createElement('input');
speedSlider.type = 'range';
speedSlider.name = 'playbackRate';
speedSlider.className = 'player__slider playbackSpeed';
speedSlider.min = '0.5';
speedSlider.max = '2';
speedSlider.step = '0.1';
speedSlider.value = '1';

// Create rewind button
const rewindButton = document.createElement('button');
rewindButton.className = 'player__button rewind';
rewindButton.setAttribute('data-skip', '-10');
rewindButton.textContent = '« 10s';

// Create skip button
const skipButton = document.createElement('button');
skipButton.className = 'player__button';
skipButton.setAttribute('data-skip', '25');
skipButton.textContent = '25s »';

// Assemble controls
playerControls.appendChild(progress);
playerControls.appendChild(toggle);
playerControls.appendChild(volumeSlider);
playerControls.appendChild(speedSlider);
playerControls.appendChild(rewindButton);
playerControls.appendChild(skipButton);

wrapper.appendChild(playerControls);

// Add styles
const style = document.createElement('style');
style.textContent = `
  .wrapper {
    position: relative;
    display: inline-block;
    background: #000;
  }
  
  .player__controls {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    flex-wrap: wrap;
    background: rgba(0, 0, 0, 0.7);
    align-items: center;
  }
  
  .player__button {
    background: none;
    border: 0;
    color: white;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
  }
  
  .player__button:hover {
    color: #ffc600;
  }
  
  .progress {
    flex-basis: 100%;
    height: 5px;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    display: flex;
  }
  
  .progress__filled {
    background: #ffc600;
    flex-basis: 0%;
  }
  
  input[type="range"] {
    flex: 1;
    margin: 0 5px;
  }
`;
document.head.appendChild(style);

// ===== FUNCTIONALITY =====

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

const skipButtons = document.querySelectorAll('[data-skip]');
skipButtons.forEach(button => button.addEventListener('click', skip));

const ranges = document.querySelectorAll('.player__slider');
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// ===== OPTIONAL: GIVEN CODE (won't affect anything) =====
// This is from a different exercise - it looks for .controls which doesn't exist
// Safe to include if required, but won't do anything
const inputs = document.querySelectorAll('.controls input');
function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));



const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
