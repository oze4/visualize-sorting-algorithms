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
    duration = Math.max(duration, 0.03);
    /*
    const compressor = this.audioContext.createDynamicsCompressor();

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    volume.gain.value = 0.1;

    oscillator.connect(volume).connect(compressor).connect(this.audioContext.destination);

    // Ramp up
    volume.gain.exponentialRampToValueAtTime(volume.gain.value, this.audioContext.currentTime+duration);
    // Ramp down
    volume.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime+decay);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime+decay+duration);
    */
    oscillator.frequency.value = frequency;
    volume.gain.value = 0.01;
    volume.gain.exponentialRampToValueAtTime(volume.gain.value, this.audioContext.currentTime+duration);
    volume.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime+0.3);
    oscillator.connect(volume).connect(this.audioContext.destination);
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime+duration+0.01);
  }
}