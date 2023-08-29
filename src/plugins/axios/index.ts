import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

const defaultOptions: CreateAxiosDefaults<any> = {};

class Http {
  private httpInstance: AxiosInstance;
  constructor(options: CreateAxiosDefaults<any>) {
    // const ;
    this.httpInstance = axios.create();
  }

  get() {
    // this.httpInstance;
  }
}

// options
// interceptor
// customOptions
const http = new Http({
  baseURL: "http://localhost:3000/api",
  url: "/user",
  timeout: 20 * 1000,
});
