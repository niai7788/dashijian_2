$(function() {
    var form = layui.form

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res)

                // 为表单指定 `lay-filter` 属性
                // <form class="layui-form" lay-filter="formUserInfo"></form>
                // 调用 `form.val()` 方法为表单赋值
                // form.val('formUserInfo', res.data)

                // 使用form.val方法快速为表单赋值
                form.val('formUserInfo', res.data)

                // $('input[name="id"]').val(res.data.id)
                // $('input[name="username"]').val(res.data.username)
                // $('input[name="nickname"]').val(res.data.nickname)
                // $('input[name="email"]').val(res.data.email)
            }
        })
    }

    // 重置表单数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // var id = $('input[name="id"]').val()
            // var nickname = $('input[name="nickname"]').val()
            // var email = $('input[name="email"]').val()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // data: {
            //     id,
            //     nickname,
            //     email
            // },
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')

                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                // window.parent.getUserInfo()
            }
        })
    })
})