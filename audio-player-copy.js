

const audioMessage = document.querySelectorAll('.audio-file');
const states = []

audioMessage.forEach(element => {
    const audio = element.querySelector('audio');
    const seekSlider = element.querySelector('input');
    const playButton = element.querySelector('button');
    const playIconImg = element.querySelector('img');
    const audioPlayerContainer = element;
    let playState = true;
    let raf = null;
    const state = {audio,seekSlider,playButton,playIconImg,audioPlayerContainer,playState,raf};
    states.push(state);

    seekSlider.addEventListener('input', () => {
        if (!state.audio.paused) {
            cancelAnimationFrame(state.raf);
        }
    });

    seekSlider.addEventListener('change', () => {
        console.log("change")
        audio.currentTime = (audio.duration / 100) * seekSlider.value;
        audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
    });

    playButton.addEventListener('click', () => {
        states.forEach(x => {
            // cancelAnimationFrame(message.raf);
            if(x === state) {
                x.playState = x.audio.paused;
                return;
            };
            
            x.playState = false;
            x.audio.pause();
            x.seekSlider.value = 0;
            x.playIconImg.setAttribute("src", "assets/img/play-audio-icon.svg")
            x.audioPlayerContainer.style.setProperty('--seek-before-width', `0%`);
        })
        play(
            state,
            () => {
                state.playState = false;
                state.playIconImg.setAttribute("src", "assets/img/play-audio-icon.svg");
            }
        )
    })
});

// const playIconContainer = document.getElementById('play-icon');
// const playIconImg = document.getElementById('play-icon-img');
// const audioPlayerContainer = document.getElementById('audio-player-container');
// const seekSlider = document.getElementById('seek-slider');
// const audio = document.getElementById('audio01')
// let playState = 'play';

function play(message,onEnd) {
    if (message.playState) {
        message.raf = requestAnimationFrame(() => whilePlaying(message,onEnd));
        message.audio.play();
        message.playIconImg.setAttribute("src", "assets/img/pause-audio-icon.svg")
    } else {
        cancelAnimationFrame(message.raf);
        message.audio.pause();
        message.playIconImg.setAttribute("src", "assets/img/play-audio-icon.svg")
    }
    message.playState = !message.playState;
    //return { playState: !message.playState, raf: message.raf }
}

// function showRangeProgresss(message) {
//     if (message.seekSlider === message01.seekSlider) {
//         audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
//     } else {
//         message01.audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
//     }
// }

// const showRangeProgress = (rangeInput) => {
//     if (rangeInput === message01.seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
//     else message01.audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
// }

// message01.seekSlider.addEventListener('input', (e) => {
//     showRangeProgress(e.target);
// });

/** Implementation of the functionality of the audio player */

// const audio = document.querySelector('audio');
// const durationContainer = document.getElementById('duration');
// const currentTimeContainer = document.getElementById('current-time');
// let raf = null;

// const calculateTime = (secs) => {
//     const minutes = Math.floor(secs / 60);
//     const seconds = Math.floor(secs % 60);
//     const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
//     return `${minutes}:${returnedSeconds}`;
// }

// const setSliderMax = () => {
//     seekSlider.max = Math.floor(audio.duration);
// }

// const displayBufferedAmount = () => {
//     const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
//     audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / audio.duration) * 100}%`);
// }

function whilePlaying({ seekSlider, audio, audioPlayerContainer, playIconImg, raf },onEnd) {
    console.log("playing")
    seekSlider.value = Math.floor((audio.currentTime / audio.duration) * 100);
    audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
    if (audio.currentTime >= audio.duration) {
        playIconImg.setAttribute("src", "assets/img/play-audio-icon.svg");
        onEnd();
        return;
    }
    raf = requestAnimationFrame(() => whilePlaying({ seekSlider, audio, audioPlayerContainer, playIconImg, raf },onEnd));
}

// if (audio.readyState > 0) {

//     // setSliderMax();
//     // displayBufferedAmount();
// } else {
//     audio.addEventListener('loadedmetadata', () => {

//         // setSliderMax();
//         // displayBufferedAmount();
//     });
// }

// audio.addEventListener('progress', displayBufferedAmount);

// seekSlider.addEventListener('input', () => {
//     console.log('input')
//     // currentTimeContainer.textContent = calculateTime(seekSlider.value);
//     if (!audio.paused) {
//         cancelAnimationFrame(raf);
//     }
// });

// seekSlider.addEventListener('change', () => {
//     console.log('change')
//     audio.currentTime = (audio.duration / 100) * seekSlider.value;
//     audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
//     // if (!audio.paused) {
//     //     requestAnimationFrame(whilePlaying);
//     // }
// });