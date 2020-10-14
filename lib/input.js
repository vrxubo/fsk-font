module.exports =  (msg) => {
  if (msg) {
    process.stdout.write(msg)
  }
  return new Promise((resolve, reject) => {
    try {
      const readable = () => {
        const chunk = process.stdin.read()
        if (chunk) {
          process.stdin.removeListener('readable', readable)
          resolve(chunk.slice(0, -1))
        }
      }
      process.stdin.setEncoding('utf8')
      process.stdin.on('readable', readable)
    } catch (err) {
      reject(err)
    }
  })
}
