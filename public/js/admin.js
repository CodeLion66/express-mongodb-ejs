$(function() {
  // 删除电影数据逻辑
  $('.del').off('click').on('click', function(e) {
    var target = $(e.target);
    var id = target.data('id');
    var tr = $(".item-id-" + id);

    $.ajax({
      type: 'DELETE',
      url: '/admin/movie/list?id=' + id
    }).done(function(res) {
      if (res.success === 1) {
        if (tr.length > 0) {
          tr.remove();
        }
      }
    })
  });
})