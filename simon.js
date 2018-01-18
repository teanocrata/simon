const levels = 3

const generateKey = () => Math.round(Math.random() * (90 - 65) + 65)

const generateKeys = levels => new Array(levels).fill(0).map(generateKey)

let keys = generateKeys(levels)

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
    return swal({ title: 'You won!!!', icon: 'success' })
  }
  swal({
    title: `Level: ${level + 1}`, timer: 1000, buttons: false, icon: 'info'
  })

  for (let i = 0; i <= level; i += 1) {
    setTimeout(() => activate(keys[i]), 1000 * (i + 1) + 1000)
  }

  let i = 0
  let key = keys[i]
  const onkeydown = (ev) => {
    ev.preventDefault()
    const keyCode = ev.keyCode || parseInt(ev.target.getAttribute('data-key'), 10)
    if (keyCode === key) {
      activate(key, { success: true })
      i += 1
      if (i > level) {
        window.removeEventListener('keydown', onkeydown)
        removeOnTouchEventListenersToKeyboard(onkeydown)
        setTimeout(() => nextRound(i), 1500)
      }
      key = keys[i]
    } else {
      activate(keyCode, { fail: true })
      window.removeEventListener('keydown', onkeydown)
      removeOnTouchEventListenersToKeyboard(onkeydown)
      swal({
        title: 'You lost! :(',
        text: 'Do you want to play again?',
        icon: 'error',
        buttons: {
          cancel: {
            text: 'Cancel',
            value: null,
            visible: true,
            className: '',
            closeModal: true
          },
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: '',
            closeModal: true
          }
        }
      }).then((ok) => {
        if (ok) {
          keys = generateKeys(levels)
          nextRound(0)
        }
      })
    }
  }

  window.addEventListener('keydown', onkeydown)
  addOnTouchEventListenersToKeyboard(onkeydown)
}

const addOnTouchEventListenersToKeyboard = callback => Array.prototype.forEach.call(document.getElementsByClassName('key'), key => key.addEventListener('touchstart', callback))
const removeOnTouchEventListenersToKeyboard = callback => Array.prototype.forEach.call(document.getElementsByClassName('key'), key => key.removeEventListener('touchstart', callback))

nextRound(0)
