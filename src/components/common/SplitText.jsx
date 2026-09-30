// Splits text into letters so CSS can animate them one by one (.split-char).
// Letters are grouped per word so lines only break between words.
// Screen readers get the plain text instead of single letters.
function SplitText({ text, delay = 0, className = '' }) {
  let index = 0
  const words = text.split(' ').map((word) => [...word].map((char) => ({ char, i: index++ })))

  return (
    <span className={className}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((letters, w) => (
          <span key={w}>
            {w > 0 && ' '}
            <span className="split-word">
              {letters.map(({ char, i }) => (
                <span key={i} className="split-char" style={{ '--i': i, '--d': `${delay}ms` }}>
                  {char}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </span>
  )
}

export default SplitText
