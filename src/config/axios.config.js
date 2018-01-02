import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://fcctop100.herokuapp.com/api/fccusers/top'
})

export default instance