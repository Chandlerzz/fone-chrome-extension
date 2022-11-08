export function findScript(arr,func){
  for(let item of arr)
  {
    if(item.children)
    {
      findScript(item.children,func)
    }else{
      func(item)
    }
  }
}
export function findModel(arr,func){
  for(let item of arr)
  {
    if(item.children)
    {
      findModel(item.children,func)
    }else{
      func(item)
    }
  }
}
export function findDataStream(arr,func){
  for(let item of arr)
  {
    if(item.children)
    {
      findDataStream(item.children,func)
    }else{
      func(item)
    }
  }
}
