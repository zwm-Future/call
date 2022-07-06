/* 
  线上的部署 url 配置
  因区分内外网访问 ， cwc 可
  需要打包两份
  一份 ：
   webSocketUrl ：cwc
   QRC:cwc
   base : 192
   veri:192

 另一份：all cwc
*/

/* 
   cwc-baseurl
*/
export const baseURL = 'https://cwcwx.gdut.edu.cn/reservation/api/'
export const webSocketUrl = 'wss://cwcwx.gdut.edu.cn/reservation/api/queue'
export const QRCodeUrl = 'https://cwcwx.gdut.edu.cn/reservation/QRCode/QRCode.jpg'
export const verifyCodeUrl = 'https://cwcwx.gdut.edu.cn/reservation/api/verify/getCode';


/*
  rdc
*/
// export const baseURL = 'https://www.rdcmy.com/reservation/api/'
// export const QRCodeUrl = 'https://www.rdcmy.com/reservation/QRCode/QRCode.jpg'
// export const webSocketUrl = 'wss://www.rdcmy.com/reservation/websocket/queue'
// export const verifyCodeUrl = 'https://www.rdcmy.com/reservation/api/verify/getCode';


/*
   192
*/
// export const baseURL = 'http://192.168.9.198:8081/reservation/api/'
// export const verifyCodeUrl = 'http://192.168.9.198:8081/reservation/api/verify/getCode';
