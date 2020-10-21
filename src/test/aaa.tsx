class Plugin{
  aaa:string
  constructor(aaa:string = ''){
    this.aaa = aaa
  }
}

interface PluginProps {
  aaa:string
}

type T =  Array<Plugin | PluginProps | (()=> PluginProps) >

let arr:T = [
  new Plugin(),
  new Plugin(),
  new Plugin(),
  ()=>{
    return {
      aaa:'asda'
    }
  },
  {
    aaa:'asdad'
  }
]
console.log(arr[1])

export {}