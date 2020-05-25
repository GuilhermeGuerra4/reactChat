import React, {Component} from "react";
import axios from "axios";

let api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});


export default api;