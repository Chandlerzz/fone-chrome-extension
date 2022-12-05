export function findModel(arr, func) {
  for (let item of arr) {
    if (item.children) {
      findModel(item.children, func)
    } else {
      if (item.type === 'dimensionModel') {
        func(item)
      }
    }
  }
}

export function findDataStream(arr, func) {
  for (let item of arr) {
    if (item.children) {
      findDataStream(item.children, func)
    } else {
      if (item.type === 'dataStream') {
        func(item)
      }
    }
  }
}

export function findScript(arr, func) {
  for (let item of arr) {
    if (item.children) {
      findScript(item.children, func)
    } else {
      if (item.type === 'script') {
        func(item)
      }
    }
  }
}

export function findReport(arr, func) {
  for (let item of arr) {
    if (item.children) {
      findReport(item.children, func)
    } else {
      if (item.type === 'report') {
        func(item)
      }
    }
  }
}
