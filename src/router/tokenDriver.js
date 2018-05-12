module.exports = {
  request: function (request, token) {
    this.options.http._setHeaders.call(this, request, {Authorization: 'Bearer ' + token})
  },
  response: function (response) {
    return (response.data.data || {}).access_token
  }
}
