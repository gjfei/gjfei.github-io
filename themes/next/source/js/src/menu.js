// 获取当前页面的url
var test = window.location.href;
// console.log(test);
//获取链接的特定部分用以判断
// var index = test.indexOf('0/');
// test = test.substring(index,index+13);
// //将得到的字符串中的数字取出
// var arr = test.match(/[0-9]/g);
// console.log(arr);
// //将得到的数组重新变回字符串
// var strnum = arr.join('');
// strnum = Number(strnum);
// // console.log(strnum);
// 以上为获取部分1.0版，因为下面的代码更简单
var len = test.split("/").length - 1
//获取2.0版
if (len>3) {
    window.onscroll = function () {
        var topScroll = document.documentElement.scrollTop;
        //滚动的距离,距离顶部的距离
        // console.log(topScroll);
        
        var postHeader = document.getElementById("post-header");
        //获取到导航栏id
        // console.log(postHeader);
        
        if (topScroll > 250) { //当滚动距离大于250px时执行下面的东西
            postHeader.className = 'post-header-a';
            // postHeader.style.position = 'fixed';
            // postHeader.style.zIndex = '9999';
            // postHeader.style.width = '100%';
            // postHeader.style.top = 0;
            // postHeader.style.left = 0;
            // postHeader.style.backgroundColor = '#FFFFFF';
            // postHeader.style.boxShadow = '0 1px 10px #E5E5E5';
            // postHeader.style.width = '100%';
            
        } else {//当滚动距离小于250的时候执行下面的内容，也就是让导航栏恢复原状
            postHeader.className = 'post-header';
        }
    }
} else {
    window.onscroll = function () {
        var header = document.getElementById("header");
        // console.log(header);
        var topScroll = document.documentElement.scrollTop;
        //滚动的距离,距离顶部的距离
        // console.log(topScroll);
        
        if (topScroll > 250) {
            header.className = 'post-header-a';
            // console.log(header);
            
        } else {
            header.className = 'header';
        }
    }
}
if (document.getElementById("days")) {
    var today = new Date();
    var birth = new Date("1997/10/09");
    var daysc = Math.floor((today.getTime() - birth.getTime()) / 86400000);
    document.getElementById("days").innerHTML = daysc;
}