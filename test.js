try {
  Promise.resolve(Promise.reject("reject")).catch(err => console.log('err',err))
} catch (e) {
  console.log('error',e)
}
console.log('done')
