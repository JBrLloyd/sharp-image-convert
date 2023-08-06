import { app } from './app'

;(async () => {
  console.time('Main: Start')
  await app()
})()
  .catch(console.error)
  .finally(() => console.time('Main: End'))
