// What the home page lists. Each claim follows Suhina's ROADMAP.md or README; docs/product-homepage.md
// says which, and when it was last checked.

export const repository = 'https://github.com/suhina-daw/suhina-daw'

export const features = [
  { name: 'Several projects at once', detail: 'Open projects in tabs and move between them with Ctrl+Tab. The active one plays.' },
  { name: 'Take lanes and comping', detail: 'Record takes into the Arrangement, then cut and move the best parts together.' },
  { name: 'Piano roll', detail: 'Edit MIDI notes with the mouse or the keyboard, and quantise them.' },
  { name: 'Automation lanes', detail: 'Show a track\'s automation in lanes under it in the Arrangement.' },
  { name: 'Time-stretching as it plays', detail: 'Warped clips follow their warp markers and the song\'s tempo in real time.' },
  { name: 'Follow actions', detail: 'A launched clip can run an action when its time is up.' },
  { name: 'Updates from inside the app', detail: 'Suhina says when a newer nightly is out. Nothing is installed until you ask.' },
  { name: 'A command line', detail: 'suhina-cli plays and renders a project without opening the window.' },
]

export const devices = [
  { name: 'FM Synth', detail: 'Six operators, 43 algorithms. Reads DX7 voices.' },
  { name: 'Sampler', detail: 'Sample, slice and grain playback.' },
  { name: 'EQ', detail: 'Eight bands. Stereo, left/right or mid/side.' },
  { name: 'Compressor', detail: 'Soft knee, side-chain high-pass, dry/wet.' },
  { name: 'Multiband', detail: 'Three bands of upward and downward dynamics.' },
  { name: 'Limiter', detail: 'Brickwall, with lookahead.' },
  { name: 'Delay', detail: 'Synced or free. Ping-pong and freeze.' },
  { name: 'Reverb', detail: 'Algorithmic, with freeze.' },
  { name: 'Saturator', detail: 'Eight curves and a waveshaper.' },
  { name: 'Overdrive', detail: 'Oversampled drive.' },
  { name: 'Vinyl Distortion', detail: 'Oversampled distortion.' },
  { name: 'DJ EQ', detail: 'Three bands with kills.' },
  { name: 'Auto Pan', detail: 'Moves a sound across the stereo field.' },
  { name: 'Utility', detail: 'Gain and the basics.' },
  { name: 'NAM Amp Modeler', detail: 'Plays .nam amp captures.' },
  { name: 'NAM Cab Loader', detail: 'Cabinet impulse responses from .wav files.' },
  { name: 'Pitch', detail: 'A MIDI effect. Transposes by semitones or scale degrees.' },
]

export const downloads = [
  { name: 'Windows', detail: 'x64, ZIP', file: 'suhina-nightly-windows-x86_64.zip' },
  { name: 'macOS', detail: 'Universal, TAR.GZ', file: 'suhina-nightly-macos-universal.tar.gz' },
  { name: 'Linux', detail: 'x86_64, TAR.GZ', file: 'suhina-nightly-linux-x86_64.tar.gz' },
]
