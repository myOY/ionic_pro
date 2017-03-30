angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('tabs',{
			url:'/tab',
			templateUrl:'template/tabs.html'
		})
		.state('tabs.home',{
			url:'/home',
			views:{
				'tab-home':{
					templateUrl:'template/home.html',
					controller:'ctrl_home'
				}
			}
		})
		.state('tabs.goodslist',{
			url:'/goodslist/:key',
			views:{
				'tab-home':{
					templateUrl:'template/goodslist.html',
					controller:'ctrl_back'
				}
			}
		})
		
		.state('tabs.search',{
			url:'/search',
			views:{
				'tab-search':{
					templateUrl:'template/search.html',
					controller:"search_ctrl"
				}
			}
		})
		.state('tabs.search.search_list',{
			url:'/search_list/:id',
			views:{
				'search_view':{
					templateUrl:'template/search_list.html',
					controller:"search_list_ctrl"
				}
			}
		})
		.state('tabs.order',{
			url:'/order',
			views:{
				'tab-order':{
					templateUrl:'template/order.html'
				}
			}
		})
		.state('tabs.me',{
			url:'/me',
			views:{
				'tab-me':{
					templateUrl:'template/me.html'
				}
			}
		})
		.state('tabs.login',{
			url:'/login',
			views:{
				'tab-me':{
					templateUrl:'template/login.html',
					controller:'login_ctrl'
				}
			}
		})
		.state('tabs.register',{
			url:'/register',
			views:{
				'tab-me':{
					templateUrl:'template/register.html',
					controller:'register_ctrl'
				}
			}
		})
		$urlRouterProvider.otherwise('/tab/home')
})
.controller('ctrl_home',function($scope,$http){
	$http({
		url:'goods.json'
	}).success(function(data){
		$scope.list = data;
	})
	$http({
		url:'lists.json'
	}).success(function(data){
		$scope.list1 = data.list1;
		$scope.list2 = data.list2;
		$scope.list3 = data.list3;
		$scope.list4 = data.list4;
		//console.log(data.list1)
		//console.log(data.list2)
	})
})
.controller("ctrl_back",function($scope,$http,$stateParams){
	var title=["气质女神","美容护肤","品质鞋包"];//定义表头
	$scope.tit = title[$stateParams.key]
	//console.log($stateParams.key)
	$scope.goback=function(){
		window.history.go(-1);
	};
	$http({
		url:'lists.json'
	}).success(function(data){
		console.log(data)
		switch($stateParams.key){
			case "0":
			$scope.list5 = data.list5;
			break;
			case "1":
			$scope.list5 = data.list6;
			break;
			case "2":
			$scope.list5 = data.list7;
			break
		}
		
	})
})
.controller("search_list_ctrl",function($scope,$http,$stateParams){
	$http({
		url:'lists.json'
	}).success(function(data){
		
		switch($stateParams.id){
			case "1":
			$scope.hs = data.list8;
			break;
			case "2":
			$scope.hs = data.list8;
			break;
			case "3":
			$scope.hs = data.list8;
			break
		}

	})
})
.controller('login_ctrl',function($scope,$state){
	$scope.goback=function(){
		window.history.go(-1)
	};
	$scope.dltap=function(){
		var user = window.localStorage.getItem($scope.user);
		console.log(user)
		if(user==$scope.psd){
			//alert("登录成功")
			window.location.href = "#/tab/home";
		}else{
			alert("账号或密码错误")
			window.location.href = "#/tab/login";
		}
	}
})
.controller('search_ctrl',function($scope){
	$scope.search_tap=function(e){
		e = window.event || e;
		var ar = document.getElementsByClassName("search_active");
		for(var i = 0;i< ar.length;i++){
			ar[i].className = "";
		}
		e.target.className = "search_active"
	}
})
//注册验证
.controller('register_ctrl',function($scope,$log){
	$scope.goback=function(){
		window.history.go(-1)
	};
	var r_show = document.getElementById("r_show");
	var sub_show = document.getElementById("sub_show")
		$scope.tes = function(){
			//console.log($scope.r_phone);
				//$log.info($scope.r_phone)
				if(!(/^1[34578]\d{9}$/.test($scope.r_phone))){
				r_show.textContent="请输入正确的手机号码";
				r_show.style.color="red"
			}else{
				r_show.textContent="账号可用";
				r_show.style.color="green"
			}
		}
	$scope.tes1 = function(){
		//console.log($scope.r_sub)
		
		if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test($scope.r_sub))){
			sub_show.textContent = "密码由6-10位字母和数字组成"
			sub_show.style.color='red'
		}else{
			sub_show.textContent = "密码可用"
			sub_show.style.color='green'
		}
	};
	$scope.zctap = function(){
		window.localStorage.setItem($scope.r_phone, $scope.r_sub);
	}
	
})
