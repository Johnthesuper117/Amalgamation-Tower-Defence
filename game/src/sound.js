export let audioCtx;
export const Sound = {
init: () => { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); },
play: (type) => {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    if (type === 'shoot_tech') {
        osc.type = 'square'; osc.frequency.setValueAtTime(400, now); osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'shoot_magic') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(800, now); osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
        gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
    } else if (type === 'explosion') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, now); osc.frequency.exponentialRampToValueAtTime(10, now + 0.3);
        gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'laser') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, now);
        gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now); osc.stop(now + 0.5);
    } else if (type === 'freeze') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(1000, now); osc.frequency.linearRampToValueAtTime(100, now + 1.0);
        gain.gain.setValueAtTime(0.1, now); gain.gain.linearRampToValueAtTime(0.001, now + 1.0);
        osc.start(now); osc.stop(now + 1.0);
    } else if (type === 'prism') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
    }
}
};