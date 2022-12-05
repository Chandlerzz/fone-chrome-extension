import jQuery from 'jquery'
window.jQuery = window.$ = jQuery

export function getJson(url, func, isasync = true) {
  $.ajax({
    type: 'Get',
    url: url,
    dataType: 'json',
    async: isasync,
    success: function (data) {
      func(data)
    },
    error: function (e) {
      alert('json not found')
    },
  })
}

export function getJson1(url, type, body, headerFunc, func, isasync = true) {
  $.ajax({
    type: type,
    url: url,
    async: isasync,
    beforeSend: function (request) {
      headerFunc(request)
    },
    data: JSON.stringify(body),
    success: function (data) {
      const d = JSON.parse(data)
      if (d.status === 1031) {
        document.location.href = '#login'
      }
      func(data)
    },
    error: function () {
      alert('json not found')
    },
  })
}

export function setHeaders(request, headers) {
  for (let key in headers) {
    request.setRequestHeader(key, headers[`${key}`])
  }
}

export function getJson2(url, type, body, headerFunc, func, isasync = true) {
  $.ajax({
    type: type,
    url: url,
    async: isasync,
    beforeSend: function (request) {
      headerFunc(request)
    },
    data: JSON.stringify(body),
    success: function (data) {
      func(data)
    },
    error: function () {
      alert('json not found')
    },
  })
}
