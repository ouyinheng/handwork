class MethodList {
  constructor(){
    this.chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
    this.days = ['周日','周一','周二','周三','周四','周五','周六'];
    this.date = new Date();
    this.distance = this.getWidth();
  }
  /**
   * @description [将时间转化为`14:25`格式]
   */
  format_date() {
    // 将日期转化
    const hour = this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours();
    const minute = this.date.getMinutes() <10 ? '0' + this.date.getMinutes() : this.date.getMinutes();
    const time = hour + ':' + minute;
    return time;
  }
  /**
   * @description [将日期转化为`04/19周五`格式]
   */
  format_time() {
    const month = this.date.getMonth() < 10 ? '0' + this.date.getMonth() : this.date.getMonth();
    const sun = this.date.getDate() < 10 ? '0' + this.date.getDate() : this.date.getDate();
    const day = this.days[this.date.getDay()];
    const time = month + '/' + sun +' '+ day
    return time;
  }
  // 数字转中文
  format_number(num) {
    if(num<10) {
      return this.chnNumChar[num];
    } else {
      let arr = num.toString().split('');
      return this.chnNumChar[arr[0]] + '十' + this.chnNumChar[arr[1]];
    }
  }
  /**
   * @description [获取宽度]
   */
  getWidth() {
    const width = document.body.scrollWidth;
    const height = document.body.scrollHeight;
    const distance = width > height ? height : width;
      return distance-10;
  }
  /**
   * @description [渲染秒钟] 
   */
  setSeconds(dom) {
    for(let i=0;i<60;i++) {
      let span = document.createElement('span');
      span.classList.add('seconds-item')
      span.innerText = `${this.format_number(i)}秒`;
      span.style.transform = `rotate(${i*6}deg)`;
      dom.appendChild(span);
    }
  }
  /**
   * @description [渲染分钟]
   * @param {*} dom 
   */
  setMinute(dom) {
    for(let i=0;i<60;i++) {
      let span = document.createElement('span');
      span.classList.add('seconds-item')
      span.innerText = `${this.format_number(i)}分`;
      span.style.transform = `rotate(${i*6}deg)`;
      dom.appendChild(span);
    }
  }
}

window.onload = () => {
  // 加载后
  const methodlist = new MethodList();
  const date = methodlist.format_date(); 
  const time = methodlist.format_time(); 
  const dom_seconds = document.getElementById('seconds');
  const seconds_group = document.getElementById('seconds-group');
  const minute_group = document.getElementById('minute-group');
  const dom_minute = document.getElementById('minute');
  const dom_timer = document.getElementById('timer');
  const dom_date = document.getElementsByClassName('date')[0];
  const dom_week = document.getElementsByClassName('week')[0];
  dom_date.innerText = date;
  dom_week.innerText = time;
  let deg = 0;
  let deg2 = 0;
  // 设置秒钟外层
  dom_seconds.style.width = methodlist.distance+'px';
  dom_seconds.style.height = methodlist.distance+'px';
  // 插入秒钟
  methodlist.setSeconds(seconds_group);
  // 设置分钟外层
  dom_minute.style.width = methodlist.distance/1.5+'px';
  dom_minute.style.height = methodlist.distance/1.5+'px';
  // 插入分钟
  methodlist.setMinute(minute_group);
  
  setInterval(() => {
    const date = methodlist.format_date(); 
    dom_date.innerText = date;
    deg -= 6;
    seconds_group.style.transform = `rotate(${deg}deg)`;
    if(new Date().getSeconds()>=59) {
      deg2 -= 6;
      minute_group.style.transform = `rotate(${deg2}deg)`;
    }
  }, 1000)
}