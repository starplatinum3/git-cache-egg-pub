const { Job } = require('egg-bus');

class DemoJob extends Job {
  static get queue() {
    return 'gitGetJob'; // 使用的队列名称
  }

  static get attempts() {
    return 5; // 重试次数
  }

  async run(data, job) {
      console.log("run");
      console.log("data");
      console.log(data);
      console.log("job");
      console.log(job);
    // job 任务运行时调用
    // 第一个参数是发送过来的数据
    // 第二个参数是 Bull 的原始 Job 对象
    // 通过 this.ctx 和 this.app 分别获取 egg 的 Context 和 Application 对象
  }

  failed(data) {
    // 当 job 失败并重试达到限定次数后调用
  }
}

module.exports = DemoJob;