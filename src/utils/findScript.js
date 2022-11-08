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
