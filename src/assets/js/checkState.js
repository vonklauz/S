if (document.querySelector('.index-main')) {
  // Если пользователь на главной и в хранилище есть сохраненное состояние главной страницы - запрашиваем его и вставляем в main
  const content = sessionStorage.getItem('state')
  if (content) {
    document.querySelector('main').innerHTML = JSON.parse(sessionStorage.getItem('state'))
  }
}