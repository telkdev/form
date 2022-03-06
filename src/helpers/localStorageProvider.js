export const checkIsInitialized = function () {
  return localStorage.getItem('isInitialized')
}

export const setIsInitialized = function () {
  return localStorage.setItem('isInitialized', true)
}

