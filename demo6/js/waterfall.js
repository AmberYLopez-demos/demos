window.onload = function () {
    waterfall();
    var imgSrc = {
        "images": [
            {"src": "image1.jpg"},
            {"src": "image2.jpg"},
            {"src": "image3.jpg"},
            {"src": "image4.jpg"},
            {"src": "image5.jpg"},
            {"src": "image6.jpg"},
            {"src": "image7.jpg"},
            {"src": "image8.jpg"},
            {"src": "image9.jpg"},
            {"src": "image10.jpg"}]
    };
    window.onscroll = function () {
        if (checkScrollSlide) {
            var main = document.getElementById('main');
            for (var i = 0; i < imgSrc.images.length; i++) {
                var oBox = document.createElement('div');
                oBox.className = 'box';
                main.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = "images/" + imgSrc.images[i].src;
                oPic.appendChild(oImg);
            }
            waterfall();
        }
    };
};
function waterfall() {
    var boxs = document.getElementsByClassName('box');//获取所有图片盒子
    var boxWidth = boxs[0].offsetWidth;//一个盒子的宽
    var cols = Math.floor(document.documentElement.clientWidth / boxWidth);//列数
    var heightArr = [];
    for (var i = 0; i < boxs.length; i++) {
        if (i < cols) {
            heightArr.push(boxs[i].offsetHeight);
        } else {
            var minHeight = Math.min.apply(null, heightArr);
            var index = getMinIndex(heightArr, minHeight);//最短的盒子的索引
            boxs[i].style.position = "absolute";
            boxs[i].style.top = minHeight + "px";
            boxs[i].style.left = boxs[index].offsetLeft + "px";
            heightArr[index] += boxs[i].offsetHeight;
        }
    }
}
function getMinIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return i;
        }
    }
}

function checkScrollSlide() {
    var main = document.getElementById('main');
    var boxs = document.getElementsByClassName('box');//获取所有图片盒子
    //最后一个盒子之上的高度＋最后一个盒子的一半高度
    var lastBoxHeight = boxs[boxs.length - 1].offsetTop + Math.floor(boxs[boxs.length - 1].offsetHeight / 2);
    //滚动上去的高度
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //浏览器可视区域的高度
    var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxHeight < clientHeight + scrollTop) ? true : false;
}

