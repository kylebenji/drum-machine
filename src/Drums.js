import React from "react";
import soundsObj from "./sounds.json";
import { isNull } from "mathjs";
class Drums extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: "-" };
    this.playSound = this.playSound.bind(this);
    this.playSoundClick = this.playSoundClick.bind(this);
    this.playSoundKey = this.playSoundKey.bind(this);
    window.addEventListener("keydown", this.playSoundKey);
    this.soundsSrc = Object.entries(soundsObj);
  }

  playSoundClick(event) {
    const audio = event.target.querySelector("audio");
    this.playSound(audio);
  }

  playSoundKey(event) {
    const audio = document.getElementById(event.key.toUpperCase());
    if (!isNull(audio)) this.playSound(audio);
  }

  playSound(element) {
    element.play();
    this.setState({ display: element.dataset.sound });
  }

  render() {
    return (
      <div id="app-area" className="m-auto col-5">
        <h1 className="text-center">Drum Pad</h1>
        <div id="drum-machine">
          <p id="display" className="text-center">
            {this.state.display}
          </p>
          <div className="pad-wrap">
            {this.soundsSrc.map((sound) => {
              return (
                <button
                  onClick={this.playSoundClick}
                  id={sound[0]}
                  key={sound[0]}
                  className="drum-pad"
                >
                  {sound[1].key}
                  <audio
                    className="clip"
                    id={sound[1].key}
                    data-sound={sound[0]}
                    src={sound[1].src}
                  ></audio>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Drums;
