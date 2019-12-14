/*
* @Author: 20928
* @Date:   2019-12-11 22:02:28
* @Last Modified by:   20928
* @Last Modified time: 2019-12-12 16:00:53
*/
var box=document.getElementById("box");
var slider=document.getElementById("slider");
var slide=document.getElementById("slide");
var left=document.getElementById("left");
var right=document.getElementById("right");
var oNavList=document.getElementById("nav").children;
// var one=document.getElementById("one");
var index=1;
var timer;
var isMoving=false;
var speed=1

function initScroll(container, object) {
if (document.getElementById(container)!=null) {//当函数initScroll的参数container不为空时
    var cont=document.getElementById(container);
    var obj=document.getElementById(object);
    var width;
    var interval;
    cont.style.visibility="visible";//visibility属性规定元素是否可见，visible即元素可见
    cont.speed=speed;
    width=cont.offsetWidth;//offsetWidth 是对象的可见宽度，包滚动条等边线，会随窗口的显示大小改变
    obj.style.left=parseInt(width)+"px";//窗口的可见宽度取整
    interval=setInterval("objScroll('"+container+"','"+object+"',"+width+")",20);
    // cont.onmouseover = function() {//鼠标划入暂停
    //     cont.speed = 0;
    // }
    // cont.onmouseout = function() {//鼠标划出继续
    // cont.speed = speed;
    // }
    }
}
 
function objScroll(container, object, width) {
    var cont = document.getElementById(container);
    var obj = document.getElementById(object);
    var widthObject;
    widthObject = obj.offsetWidth;
    if (parseInt(obj.style.left) > (widthObject * (-1))) {
        obj.style.left = parseInt(obj.style.left) - cont.speed + "px";
    } else {
        obj.style.left = parseInt(width) + "px";
    }
}
	
//轮播下一张的函数（右箭头）
function next(){
	if(isMoving){
		return;
	}		
	isMoving=true;
	index++;
	navChange();
	animate(slider,{left:-1200*index},function(){
		if(index==6){
		    slider.style.left="-1200px";
			index=1;
		}
		isMoving=false;
	});				
}
//左箭头
function prev(){
	if(isMoving){
		return;
	}
	isMoving=true;
	index--;
	navChange();
	animate(slider,{left:-1200*index},function(){
		if(index===0){
			slider.style.left="-6000px";//-1200*5+"px"
			index=5;
		}
		isMoving=false;
	});
}
timer=setInterval(next,2000);
//鼠标划入清定时器
box.onmouseover=function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
//鼠标划出开定时器
box.onmouseout=function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer=setInterval(next,2000);
}
right.onclick=next;
left.onclickc=prev;
//小按钮点击事件
for(var i=0;i<oNavList.length;i++){
	oNavList[i].idx=i;
	oNavList[i].onclick=function(){
		index=this.idx+1;
		navChange();
		animate(slider,{left:-1200*index})
	}
}
//小按钮背景色
function navChange(){
	for(var i=0;i<oNavList.length;i++){
		oNavList[i].className="";
	}
	if(index>5){
		oNavList[0].className="active";
	}else if(index===0){
		oNavList[4].className="active";//图片的个数-1
	}else{
		oNavList[index-1].className="active";
	}	
}