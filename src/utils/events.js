// Fired by the "Enquire" buttons on class cards; the enquiry form listens and
// pre-selects that class.
export const SELECT_PROGRAM = 'dy:select-program'

export function selectProgram(name) {
  window.dispatchEvent(new CustomEvent(SELECT_PROGRAM, { detail: name }))
  document.getElementById('join')?.scrollIntoView()
}
