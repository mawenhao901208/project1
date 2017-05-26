$(function() {
	/*************top**********************/
	/*登录注册按钮*/
	$('.top-nav1 li a').hover(function() {
		$(this).css('color', 'red');
	}, function() {
		$(this).css('color', '#fff');
	})
	/*其他按钮*/
	$('.top-nav2 li').hover(function() {
		$(this).eq(0).children('a').css('color', 'red')
		$(this).has('ul').css({
			'background': '#fff',
			'color': '#333',
		});
		$(this).has('ul').children('a').css('color', '#333');
		$(this).has('ul').children('span').html('&#xe603;')
		$(this).has('ul').children('ul').css('display', 'block')
	}, function() {
		$(this).eq(0).children('a').css('color', '#fff')
		$(this).has('ul').css({
			'background': '#333',
			'color': '#fff',
		});
		$(this).has('ul').children('a').css('color', '#fff');
		$(this).has('ul').children('span').html('&#xe635;')
		$(this).has('ul').children('ul').css('display', 'none')
	});
	/****************************************header******************************/
	/***************************导航栏部分******************************/
	var oTimer = null;
	$('.header-nav li').hover(function() {
		var index = $(this).index();
		$(this).children('a').css('color', 'red');

		$('#header-layer').stop().slideDown(300, function() {
			$(this).hover(function() {
				clearInterval(oTimer);
				$('.header-nav li').children('a').css('color', '#333');
				$('.header-nav li').eq(index).children('a').css('color', 'red');
			}, function() {
				$('.header-nav li').eq(index).children('a').css('color', '#333');
			});
		});
		$('.layer').eq(index).addClass('layer1').siblings().removeClass('layer1');
		clearInterval(oTimer);
	}, function() {

		$(this).children('a').css('color', '#333');

		oTimer = setInterval(function() {
			$('#header-layer').stop().slideUp(300);
		}, 300)
	});
	$(".layer").on("mouseleave", function() {
		$('#header-layer').stop().delay(300).slideUp(300);
	})
	$('.layer p').hover(function() {
		$(this).css('color', 'red');
	}, function() {
		$(this).css('color', '#333');
	});
	/*****************************搜索框*******************/
	$('.header-searchbox input').focus(function() {
		$(this).val('');
		$('.header-searchbox .search-list').css('display', 'block');
		/*跨域获取数据*/
		$('.header-searchbox input').bind('input propertychange', function() {
			$.getJSON('https://supmall-go.lemall.com/common/prouduct/getSuggest.jsonp?text=' + $(this).val() + '&size=10&callback=?&_1495711421923=',
				function(data) {
					/*console.log($('.header-searchbox input').val());*/
					if($('.header-searchbox input').val() == '') {
						$('.header-searchbox .search-list').html(`<li><a href="">超4 X40M</a></li>
															<li><a href="">乐pro3</a></li>
															<li><a href="">运动蓝牙耳机</a></li>
															<li><a href="">乐视盒子U4</a></li>
															<li><a href="">变形金刚</a></li>`);
					} else {
						$('.header-searchbox .search-list').empty();
					};
					console.log(data.result.suggests);
					data.result.suggests.forEach(function(v) {
						/*console.log(v.text);*/
						$('.header-searchbox .search-list').append('<li><a href="http://www.lemall.com/product/search.html?level=1&keyword=' + v.text + '&event_action=31&event_category=83&suggestWord=&moduleName=suggest_list&clickArea=text&action_code=0">'+ v.text +'</a></li>')
					})
					$('.header-searchbox .search-list li').hover(function() {
						$(this).css('background', 'red');
					}, function() {
						$(this).css('background', '#fff');
					})
				})
		});
	});
	/*文本框失去焦点*/
	$('.header-searchbox input').blur(function() {
		$(this).val('超4 XX55M');
		setTimeout(function() {
			$('.header-searchbox .search-list').css('display', 'none');
		}, 500)
	});

	/*搜索列表鼠标事件*/
	$('.header-searchbox .search-list li').hover(function() {
		$(this).css('background', 'red');
	}, function() {
		$(this).css('background', '#fff');
	})
})