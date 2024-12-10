export class SingleMode {
  // static不能被继承，只能被class调用, 挂载类上
  static instance = null;
  static getInstance(options) {
    if (!SingleMode.instance) {
      SingleMode.instance = new SingleMode(options);
    }
    return SingleMode.instance;
  }

  constructor(options) {
    this.options = options;
  }

  getOptions() {
    console.log("xxxx", this.options);
  }
}

// Singleton.js 导出去是同一个实例的引用, 也可以当做单例使用
class Singleton {
  constructor() {
    this.someMethod = () => {
      console.log("Doing something...");
    };
  }
}
const instance = new Singleton();
export default instance;
