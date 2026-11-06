// The published pages arrive prerendered (scripts/prerender.ts), and the client's first render replaces
// that markup with the same content. Entrance animations must not start from a faded state then: in
// the build the faded style would be baked into the HTML, and in the browser visible text would blink
// out and fade back in. Later renders, such as switching a category, animate as before.

let showingPrerender = typeof document === 'undefined' || Boolean(document.getElementById('app')?.firstElementChild)

/** True during the build's render and the client render that replaces the prerendered page. Read it in setup. */
export function replacingPrerender(): boolean {
  return showingPrerender
}

/** Called once the app has mounted over the prerendered markup. */
export function prerenderReplaced(): void {
  showingPrerender = false
}
