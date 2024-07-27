class Beep {
  /**
   * 
   * @param {AudioContext} audioContext 
   */
  constructor(audioContext = null) {
    this.audioContext = audioContext;
    if (audioContext === null) {
      this.audioContext = new(AudioContext || webkitAudioContext || window.webkitAudioContext);
    }
  }

  playNote(frequency, duration) {
    const oscillator = this.audioContext.createOscillator();
    const volume = this.audioContext.createGain();
    const compressor = this.audioContext.createDynamicsCompressor();

    oscillator.frequency.value = frequency;
    //oscillator.type = "sine";
    volume.gain.value = 0.1;

    oscillator.connect(volume).connect(compressor).connect(this.audioContext.destination);

    // Ramp up
    volume.gain.exponentialRampToValueAtTime(volume.gain.value, this.audioContext.currentTime+duration);
    // Ramp down
    volume.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime+duration+0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime+0.1+duration);

    /*
    oscillator.frequency.value = frequency;
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime+duration);
    gainNode.gain.value = 0.05;
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime+duration);

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    */
  }
}