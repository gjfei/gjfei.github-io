---
title: 分页Demo
date: 2019-02-12 17:43:04
categories: Demo
sitmap: Demo
---
jQ实现分页效果
![](http://plh7kwuq9.bkt.clouddn.com/%E5%88%86%E9%A1%B5.png)
    <!--more-->
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>分页Demo</title>
</head>
<body>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>标题</th>
                <th>标题</th>
                <th>标题</th>
                <th>标题</th>
                <th>标题</th>
                <th>标题</th>
            </tr>
        </thead>
        <tbody id = tbody>
          <!-- 表格内容   -->
        </tbody>
    </table>
    <nav aria-label="Page navigation" class="text-center">
        <ul class="pagination">
            <li id="index">
                <a href="#" aria-label="Previous">
                    <span aria-hidden="true">首页</span>
                </a>
            </li>
            <li id="first" class="active page-number" active="true"><a href="#">1</a></li>
            <!-- <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li> -->
            <li id="next">
            <a href="#" aria-label="Next">
                <span aria-hidden="true">下一页</span>
            </a>
            </li>
        </ul>
    </nav>
     <!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
    <!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"></script>
    <script>
        // arr模拟数据
        var arr = [[1,1,1,1,1,1],[2,2,2,2,2,2],[3,3,3,3,3,3],[4,4,4,4,4,4],[5,5,5,5,5,5],[6,6,6,6,6,6],[7,7,7,7,7,7,],[8,8,8,8,8,8],[9,9,9,9,9,9]];
        // 加载固定长度为5的函数
        function loadList(count){
            $('#tbody tr').remove();
            arr.forEach(function(item,index){
                var tableList = "";
                tableList +=' <tr>';
                if(index + 1 > (count-1) * 5 && index < count * 5){
                    item.forEach(function(data,i){
                        tableList += '<td>' + data + '</td>';
                    })
                }
                tableList += ' </tr>';
                $('#tbody').append(tableList);
            })
        }
        loadList(1);
        // 计算出总共有多少页
        var number = Math.ceil(arr.length/5);
        for(var i = 2;i <= number;i ++){
            $('#next').before('<li class="page-number"><a href="#">' + i + '</a></li>');
        }
        $('#index').click(function(){
            $('.pagination li').removeClass('active');
            $(this).next().addClass('active');
            loadList(1);
        })
        $('.page-number').click(function(){
            $('.pagination li').removeClass('active');
            $(this).addClass('active'); 
            loadList($('.page-number.active').index());
        })
        $('#next').click(function(){
            // 获取到之后存起来方便移除和添加类目的操作
            var active = $('.page-number.active');
            if(active.index() < number){
                active.removeClass('active');
                active.next().addClass('active');
            } 
            loadList($('.page-number.active').index());
        })
    </script>
</body>
</html>
```
