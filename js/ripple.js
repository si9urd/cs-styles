// Ripple effect

function createCircle (diameter, leftPosition, topPosition) {
  const circle = document.createElement('span')
  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${leftPosition}px`
  circle.style.top = `${topPosition}px`
  circle.classList.add('ripple')
  return circle
}

function calculateCirclePosition (event, button, radius) {
  return {
    left: event.clientX - button.offsetLeft - radius,
    top: event.clientY - button.offsetTop - radius
  }
}

function createRipple (event) {
  const button = event.currentTarget
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  const { left, top } = calculateCirclePosition(event, button, radius)

  const circle = createCircle(diameter, left, top)

  const ripple = button.getElementsByClassName('ripple')[0]
  if (ripple) {
    ripple.remove()
  }

  button.appendChild(circle)
}

document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('button, [type="submit"], [type="reset"], [type="button"], [role="button"]')

  for (const button of buttons) {
    button.addEventListener('click', createRipple)
  }
})
