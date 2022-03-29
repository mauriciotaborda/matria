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
    const state = { audio, seekSlider, playButton, playIconImg, audioPlayerContainer, playState, raf };
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
            cancelAnimationFrame(x.raf);
            if (x === state) {
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

function play(message, onEnd) {
    if (message.playState) {
        message.raf = requestAnimationFrame(() => whilePlaying(message, onEnd));
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


function whilePlaying({ seekSlider, audio, audioPlayerContainer, playIconImg, raf }, onEnd) {
    console.log("playing")
    seekSlider.value = Math.floor((audio.currentTime / audio.duration) * 100);
    audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
    if (audio.currentTime >= audio.duration) {
        playIconImg.setAttribute("src", "assets/img/play-audio-icon.svg");
        onEnd();
        return;
    }
    raf = requestAnimationFrame(() => whilePlaying({ seekSlider, audio, audioPlayerContainer, playIconImg, raf: raf + 1 }, onEnd));
}