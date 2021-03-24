(function($) {
    $.getUrlParam = function(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null
    }
})(jQuery);
$(document).ready(function() {
    var cat = $.getUrlParam('c') || 'ffvlife';
    $("." + cat).addClass('active');
    $.getScript('images_' + cat + '.js', function() {
        let num = images.length;
        getMore(num, cat);
        $(".more").click(function() {
            showLoading();
            getMore(num, cat)
        })
      $(window).scroll(function(){
         var $this =$(this),
         viewH =$(this).height(),//可见高度
         contentH =$(this).get(0).scrollHeight,//内容高度
         scrollTop =$(this).scrollTop();//滚动高度
        //if(contentH - viewH - scrollTop <= 100) { //到达底部100px时,加载新内容
        if(scrollTop/(contentH -viewH)>=0.99){ //到达底部100px时,加载新内容
        // 这里加载数据..
          showLoading();
            getMore(num, cat)
        }
     });
    });

    function showLoading() {
        $(".loading").show()
    }

    function hideLoading() {
        $(".loading").hide()
    }

    function getMore(num, cat) {
        let result = [];
        let tmp = [];
        while (result.length < 7) {
            let idx = Math.ceil(Math.random() * num);
            let i = tmp.indexOf(idx);
            if (i >= 0) {
                continue
            }
            let img = images[idx];
            tmp.push(idx);
            result.push(img)
        }
        let html = "";
        $.each(result, function(index, s) {
            html += '<div class="row"><div class="col-md-6 col-md-offset-3">';
            html += '<img src="https://res.cloudinary.com/' + cat + '/image/upload/' + s + '" class="img-responsive center-block" >';
            html += '</div></div><div class="row"><div class="col-md-6 col-md-offset-3"><hr class="featurette-divider"></div></div>'
        });
        $(".contents").append(html);
        hideLoading()
    }
});
