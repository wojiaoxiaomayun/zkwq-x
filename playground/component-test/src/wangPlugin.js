function wangPlugin(){
  return {
    install(editor){
      console.log('this is Plugin')
      console.log(editor)
    }
  }
}
export default wangPlugin;