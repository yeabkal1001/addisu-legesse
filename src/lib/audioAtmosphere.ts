"use client";

class AudioAtmosphere {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.09, this.ctx.currentTime + 2.5);

      // Low pass filter for warm studio vintage character
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(480, this.ctx.currentTime);

      this.gainNode.connect(filter);
      filter.connect(this.ctx.destination);

      // Warm Ethiopian Tizita/Ambassel ambient chord frequencies (D3, A3, D4, F4, G4)
      const freqs = [146.83, 220.0, 293.66, 349.23, 392.0];

      this.oscillators = freqs.map((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, this.ctx!.currentTime);

        // Subtle slow vibrato LFO
        const lfo = this.ctx!.createOscillator();
        const lfoGain = this.ctx!.createGain();
        lfo.frequency.setValueAtTime(0.15 + idx * 0.04, this.ctx!.currentTime);
        lfoGain.gain.setValueAtTime(1.2, this.ctx!.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(this.gainNode!);
        osc.start();
        return osc;
      });

      this.isRunning = true;
    } catch {
      // Audio not permitted or supported
      this.isRunning = false;
    }
  }

  public stop() {
    if (this.ctx && this.gainNode && this.isRunning) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          this.oscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          this.oscillators = [];
          this.isRunning = false;
        }, 1200);
      } catch {
        this.isRunning = false;
      }
    } else {
      this.isRunning = false;
    }
  }

  public getStatus() {
    return this.isRunning;
  }
}

export const audioAtmosphere = typeof window !== "undefined" ? new AudioAtmosphere() : null;
