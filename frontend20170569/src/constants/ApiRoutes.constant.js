// const scheme = process.env.NODE_ENV === 'development' ? 'http' : 'https';
const scheme = 'http'

export default class ApiRoutes{
  static CONSULTAS = `https://cors-everywhere.herokuapp.com/${scheme}://ec2-50-16-212-46.compute-1.amazonaws.com/chat-service/`
  static INF = `${scheme}://ec2-50-16-212-46.compute-1.amazonaws.com/inf-service`
  static INF_NOAUTH = `${scheme}://ec2-50-16-212-46.compute-1.amazonaws.com/inf-service-noauth`
  static AUTH = `${scheme}://ec2-50-16-212-46.compute-1.amazonaws.com/auth-service`
}