const levels = 15

const generateKey = () => Math.round(Math.random() * (90 - 65) + 65)

const generateKeys = levels => new Array(levels).fill(0).map(generateKey)

const keys = generateKeys(levels)

const getElementByKeyCode = keyCode => document.querySelector(`[data-key="${keyCode}"]`)

const deactivate = (el) => {
  el.classList.remove('active')
  el.classList.remove('success')
  el.classList.remove('fail')
}

const activate = (keyCode, opts = {}) => {
  const el = getElementByKeyCode(keyCode)
  el.classList.add('active')
  if (opts.success) {
    el.classList.add('success')
  } else if (opts.fail) {
    el.classList.add('fail')
  }
  setTimeout(() => { deactivate(el) }, 500)
}

const nextRound = (level) => {
  if (level === levels) {
    return alert('You won!!!')
  }
  alert(`Level: ${level + 1}`)

  for (let i = 0; i <= level; i += 1) {
    setTimeout(() => activate(keys[i]), 1000 * (i + 1))
  }

  let i = 0
  let key = keys[i]
  const onkeydown = (ev) => {
    if (ev.keyCode === key) {
      activate(key, { success: true })
      i += 1
      if (i > level) {
        window.removeEventListener('keydown', onkeydown)
        setTimeout(() => nextRound(i), 1500)
      }
      key = keys[i]
    } else {
      activate(ev.keyCode, { fail: true })
      window.removeEventListener('keydown', onkeydown)
      alert('You lost! :(')
    }
  }

  window.addEventListener('keydown', onkeydown)
}

nextRound(0)
