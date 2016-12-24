$(document).ready(function () {

    $(function () {
        $("input").blur(function (e) {

            var stuid = $('#stuid').val();
            var stuname = $('#stuname').val();
            var phonenum = $('#phonenum').val();
            var email = $('#email').val();
            var desc = $('#desc').val();

            //判断表单
            if (this.name == 'stuid') {
                let pattern = /\d{8}/;
                if (stuid.match(pattern) && stuid !== '') {
                    document.getElementById('stuid-error').innerHTML = '';
                }
                else {
                    document.getElementById('stuid-error').innerHTML = '请输入8位的学号';
                }
            }

            if (this.name == 'stuname') {
                let pattern = /\*{0,255}/;
                if (stuname.match(pattern) && stuname !== '') {
                    document.getElementById('stuname-error').innerHTML = '';
                }
                else {
                    document.getElementById('stuname-error').innerHTML = '请输入正确格式';
                }
            }

            if (this.name == 'phonenum') {
                let pattern = /\d{11}/;
                if (phonenum.match(pattern) && phonenum !== '') {
                    document.getElementById('phonenum-error').innerHTML = '';
                }
                else {
                    document.getElementById('phonenum-error').innerHTML = '请输入11位手机号';
                }
            }

            if (this.name == 'email') {
                let pattern = /^(\w)+(\.\w+)*@(\w)+(git\.com)$/;
                if (email.match(pattern) && email !== '') {
                    document.getElementById('email-error').innerHTML = '';
                }
                else {
                    document.getElementById('email-error').innerHTML = '请输入正确邮箱';
                }
            }

            if (this.name == 'desc') {
                let pattern = /\*{0,255}/;
                if (phonenum.match(pattern)) {
                    document.getElementById('desc-error').innerHTML = '';
                }
                else {
                    document.getElementById('desc-error').innerHTML = '请输入正确格式';
                }
            }
        });

        //高级信息
        $("#arrows").click(function () {
            var hide = $("#brief");
            var status = hide.css('overflow');
            if (status == 'visible') {//隐藏
                hide.css("overflow", "hidden");
                hide.animate({
                    height: 42
                }, 400);
                $("#advanced-form").animate({
                    top: 19
                }, 800);
                $('#arrows').removeClass('open');

            } else {
                hide.animate({//显示
                    height: 145
                }, 500, function () {
                    $(this).css("overflow", "visible")
                });
                $("#advanced-form").animate({
                    top: 40
                }, 1100);
                $('#arrows').addClass('open');

            }
        });
    });

});

