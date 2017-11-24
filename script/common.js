var serverUrl = 'http://121.41.107.30/guoshu/app';//服务器地址
var serverUrl_img = 'http://121.41.107.30';//读取图片地址时用
var SUPPLIER_ID="147";

// 二维码
    var openScanner = function(){
        api.execScript({
            name: 'slide',
            script: 'indexOpenScanner()'
        });
    };

    function kefushow(type) {
        if(!type){
            type="usercenter";
        }

        //alert(type);

        var userid_gs = $api.getStorage('userid_gs');
        if (userid_gs) {
            //get_user_info(usr.user_id);
            var user_id=userid_gs;
            if (user_id == undefined || user_id < 1) {
                showusercenter(type);
                return false;
            }
            api.showProgress({
                title: '正在加载用户信息……',
                modal: true
            });

            api.ajax({
                url: serverUrl+'/user.php?act=user_info',
                method: 'post',
                timeout: 30,
                dataType: 'json',
                returnAll: false,
                data: {
                    values: {user_id: user_id, supplier_id:SUPPLIER_ID}
                }
            }, function (ret, err) {
                if (ret) {
                    if(ret.code==53){
                        //此处的还是需要修改，支付密码不能查询出来（虽然已经加密）
                        //api.alert({msg:JSON.stringify(ret)});
                        //var birthday=ret.data.birth?trim(ret.data.birth):'';
                        if(ret.data.sex && ret.data.sex>0){
                            if(ret.data.sex==1){
                                sex="男";
                            }else{
                                sex="女";
                            }
                        }else{
                            sex='未知';
                        }
                        var name=ret.data.realname!=''?ret.data.realname:ret.data.user_name;
                        // var job=ret.data.job?ret.data.job:'';
                        // var appUserName=ret.user_name?trim(ret.user_name):'';
                        // var tel=ret.mobile?ret.mobile:'';
                        // var email=ret.email?ret.email:'';
                        // var realName=ret.realname?ret.realname:'';


                        var mq = api.require('meiQia');
                        //设置title以及按钮颜色
                        var titleColor = {
                            color:"#FFFFFF"
                        };
                        mq.setTitleColor(titleColor);

                        //设置标题栏背景颜色
                        var titleBarColor = {
                            color:"#FFD781"
                        };
                        mq.setTitleBarColor(titleBarColor);


                        //设置用户信息
                        var infoParam = {
                            avatar:serverUrl+'/'+ret.data.avator,
                            gender:sex,
                            email:ret.data.email,
                            tel:ret.data.mobile,
                            source:"果好恰app",
                            name:name,
                            address:"大冶",
                            qq:ret.data.qq
                        };
                        mq.setClientInfo(infoParam);
                        mq.show();




/*
                        var systemType = api.systemType;
                        var obj = api.require('meChat');
                        // if(systemType=='android'){
                        //     obj.initMeChat({
                        //         appkey: '563d71234eae35a12a000010'
                        //     });
                        // }else{
                        //     obj.initMeChat({
                        //         appkey: '56779ee44eae35171c000003'
                        //     });
                        // }

                        var obj = api.require('meChat');
                        obj.initMeChat({
                            appkey:'cb547974ea63cfc3b2d7a347eb135e14'
                        });
                        var obj = api.require('meChat');
                        obj.specifyAlloc({
                            groupId: '******',
                            agentId:'*******'
                        });
                        obj.addUserInfo({
                            realName: realName,
                            job: job,
                            tel: tel,
                            appUserName: appUserName,
                            appNickName: appUserName,
                            birthday:birthday,
                            sex:sex,
                            avatar:'',
                            appUserId:user_id,
                            email:email
                        });
                        obj.show();*/
                    }else{
                        api.toast({
                            msg: ret.msg,
                            duration: 2000,
                            location: 'bottom'
                        });
                    }
                } else {
/*                    api.alert({
                        msg: ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
                    });*/
                    api.alert({
                        msg: ('网络故障！')
                    });
                };
            });
            api.hideProgress();

            return false;
        } else {
            api.toast({
                msg: '请先注册或登陆',
                duration: 2000,
                location: 'bottom'
            });
            // api.openWin({
            //     name: 'login',
            //     url: 'login.html',
            //     reload: true,
            //     bounces: false,
            //     delay: 200
            // });
            showusercenter(type);
            return false;
        }


    }

    function otherinfo() {
        var obj = api.require('meChat');
        obj.addOtherInfo({
            foo: 'bar',
            hello: 'world',
            你好: '世界'
        });
    }


function opengoods(id){
    //alert(id);
    api.openWin ({
        name: "goods",
        url: './goods.html',
        pageParam: {goods_id:id},
        rect:{
            x:0,
            y:0,
            w:'auto',
            h:'auto'
        },
        bounces: false,
        reload:true,
        delay:200
    });
}


//保留两位小数toFixed必须传数字
      function round2(Num1,Num2){
           if(isNaN(Num1)||isNaN(Num2)){
                 return(0);
           }else{
                return(Num1.toFixed(Num2));
          }
      }

/*
    //打开首页frame切换
    function openframegroup_index(id) {
        //alert(id);
        api.openSlidLayout({
            type: 'left',
            leftEdge: 60,
            fixedPane: {
                name: 'fixed',
                url: 'fixed.html',
                bounces: false,
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },
            slidPane: {
                name: 'slide',
                url: 'slide.html',
                pageParam: { sy_index: id },
                bounces: false,
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            }
        }, function (ret) {

        });
    }
*/

//关注店铺
/*function guanzhu(id,type){
    //判断用户是否登陆
    var usr = $api.getStorage('usr');
    var logined = $api.getStorage('logined');
    if (usr && logined) {
        user_id=usr.user_id;
    } else {
        if(type && type=='sy'){
            types='../';
        }else{
            types='';
        }
        api.openWin({
            name: 'login',
            url: types+'login.html',
            reload: true,
            bounces: false,
            delay: 200
        });
        return false;
    }
    //alert(id+'aaa'+user_id);
    api.showProgress({
        title: '加载中...',
        modal: false
    });
    api.ajax({
        url:serverUrl+'/app/supplier.php',
        method:'post',
        cache:false,
        timeout:30,
        dataType:'json',
        returnAll:false,
        data:{
            values: {act:'store_guanzhu',suppId:id,user_id:user_id}
        }
    },function(ret,err){

        //api.alert({msg:JSON.stringify(ret)});
        if(ret!=''){
            if(ret.error==1){
                api.alert({
                    msg:('关注成功！')
                });
            }else{
                api.alert({
                    msg:('已经关注，不必重复关注！')
                });
            }
        }else{
            api.alert({
                msg:('网络较慢，请重新关注！')
              });
        }
        api.hideProgress();
   })
}
*/
//在首页位置打开窗口
function openMyWin(type){
    api.openWin ({
        name: type,
        url: 'html/'+type+'.html',
        rect:{
            x:0,
            y:0,
            w:'auto',
            h:'auto'
        },
        bounces: false,
        reload:true,
        delay:200
    });
}


//在html目录打开窗口
function openHtmlWin(type){
    api.openWin ({
        name: type,
        url: type+'.html',
        rect:{
            x:0,
            y:0,
            w:'auto',
            h:'auto'
        },
        bounces: false,
        reload:true,
        delay:200
    });
}

//去除前后的空格
function trim(str) {
    if (str & typeof str === "string") {
        return str.replace(/(^s*)|(s*)$/g,""); //去除前后空白符
    }
}


// 去除一个数组里面重复的元素
function array_unique_chen(arr1){
    //var  arr1=[1,2,2,2,3,3,3,4,5,6],
    var arr2 = [];
    for(var i = 0,len = arr1.length; i< len; i++){
        if(arr2.indexOf(arr1[i]) < 0){
            arr2.push(arr1[i]);
        }
    }
    return arr2;// 1,2,3,4,5,6
}

//商品页的切换
function openHtmlWins(type){
    var goods_id=$api.getStorage("goods_id");
    if(!goods_id){
        api.toast({
            msg: '请重新选择商品',
            duration: 2000,
            location: 'bottom'
        });
        return false;
    }
    api.openWin ({
        name: type,
        url: type+'.html',
        pageParam: { goods_id: goods_id},
        rect:{
            x:0,
            y:0,
            w:'auto',
            h:'auto'
        },
        bounces: false,
        reload:true,
        delay:200
    });
}




    //修改购物车商品数量
    function cart_number(){
        var userid_gs=$api.getStorage('userid_gs');
        if(!userid_gs){

            if(document.getElementById("countnum")){
                document.getElementById("countnum").innerHTML='0';
            }

            if(document.getElementById("countnums")){
                document.getElementById("countnums").innerHTML='0';
            }

            return false;
        }
        //alert(userid_gs);
        api.ajax({
            url: serverUrl+'/cart.php?act=get_cart_number',
            method: 'post',
            timeout: 30,
            dataType: 'json',
            returnAll:false,
            data:{
                values: {user_id:userid_gs,supplier_id:SUPPLIER_ID}
            }
        },function(ret,err){
            if (ret) {
                //api.alert({msg:JSON.stringify(ret.countnum)});
                if(document.getElementById("countnum")){
                    document.getElementById("countnum").innerHTML=ret.countnum;
                }
                if(document.getElementById("countnums")){
                    document.getElementById("countnums").innerHTML=ret.countnum;
                }

                return true;
            }else {
                // api.alert({
                //     msg:('错误码：'+err.code+'；错误信息：'+err.msg+'网络状态码：'+err.statusCode)
                // });
            };
        });

    }


    //跳转到用户中心的用户登陆页面
    function showusercenter(back_act,goods_id){
        if(!goods_id){
            goods_id=0;
        }
        var longinrun = 'setgroupindex(4)';
        api.execScript({
            name: 'root',
            script: longinrun
        });

        api.sendEvent({
            name: 'is_login',
            extra: {
                back_act: back_act,
                goods_id: goods_id
            }
        });


        api.openWin({
            name: 'root',
            url: '../index.html',
            //reload:true,
            bounces: false,
            pageParam: {"aaa" : 4}
        });
        return false;
    }


//时间戳转换日期
function getDate(tm){

// var tt=new Date(parseInt(tm) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")

// return tt;

//alert(tm);
var date = new Date(1000*(tm));//php获取的时间戳要乘以1000
Y = date.getFullYear() + '-';
M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
D = date.getDate() + ' ';
h = date.getHours() + ':';
m = date.getMinutes() + ':';
s = date.getSeconds();
return (Y+M+D+h+m+s);



}

//时间戳转换日期
function getDates(tm,heng){
    if(!heng){
        heng="-";
    }

var date = new Date(1000*(tm));//php获取的时间戳要乘以1000
Y = date.getFullYear() + heng;
M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + heng;
D = date.getDate() + ' ';
return (Y+M+D);



}






/*

//添加长按方法
function addPress(obj, index) {
    // 获取目前长按的对象
    var hammertime = new Hammer(obj[0]);
    // 绑定长按对象
    hammertime.on("press", function(e) {
            api.confirm({
                    title : '温馨提示',
                    msg : '您确定要删除该项内容么吗？',
                    buttons : ['确定', '取消']
            }, function(ret, err) {
                    if (ret.buttonIndex == 1) {
                            // 移除自己
                            $(obj).remove();
                            api.toast({
                                    msg : '删除成功！'
                            });
                    }
            });
    });
}*/

    function fixStatusBar(header) {
        var systemType = api.systemType;
        var systemVersion = parseFloat(api.systemVersion);
        if (systemType == "ios" || (systemType == "android" && systemVersion >= 4.4)) {
            if (systemType == "android") {
                header.style.paddingTop = '25px';
            }
            $api.fixStatusBar(header);

        } else {
            $api.fixIos7Bar(header);
        }

        api.setStatusBarStyle({
            style: 'dark',
            color: '#008000'
        });
    }




        function opentuanguo(act_id,goods_id){
            //alert(act_id);
            api.openWin({
                name: 'tuangouinfo',
                url: 'tuangouinfo.html',
                bounces: false,
                pageParam: {act_id :act_id,goods_id:goods_id}
            });
        }




        //检测缓存，进行更新和缓存操作
        function get_cache_update(){

            var db = api.require('db');

            db.openDatabase({
                name: 'cache_update'
            }, function(rets, errs){
                if( rets.status ){
                    db.selectSql({
                        name: 'cache_update',
                        sql: 'SELECT addtime FROM cache'
                    }, function(ret, errsss){
                        var addtimes=0;
                        //alert( JSON.stringify( ret ) );
                        if( ret.status ){
                            addtimes=ret.data[0].addtime;
                            get_cache_update_make(addtimes)
                        }else{
                            get_cache_update_make(addtimes);
                        }
                    });
                }

            });

        }


        function get_cache_update_make(addtimes){

            if(!addtimes || addtimes==undefined){
                addtimes=0;
            }


            api.ajax({
                url: serverUrl+'/index.php?act=get_cache_update',
                method: 'post',
                timeout: 30,
                dataType: 'json',
                returnAll: false,
                data: {
                    values: {supplier_id:SUPPLIER_ID,cache_time:addtimes}
                }
            },function(ret,err){
                //api.alert({msg:JSON.stringify(ret)});
                if (ret) {
                    if(ret.code==4000){
                        var db = api.require('db');
                        db.openDatabase({
                            name: 'cache_update'
                        }, function(rets, errs){
                            if( rets.status ){
                                //alert( JSON.stringify( ret ) );

                                //var db = api.require('db');
                                db.executeSql({
                                    name: 'cache_update',
                                    sql: 'create table IF NOT EXISTS  cache ( addtime int (11) not null default 0)',
                                }, function(retss, err){

                                    db.selectSql({
                                        name: 'cache_update',
                                        sql: 'SELECT addtime FROM cache'
                                    }, function(retsss, errsss){
                                        var sql='';
                                        if( retsss.status ){
                                            //alert( JSON.stringify( retsss ) );
                                            if(retsss.data!=''){
                                                if(retsss.data[0]['addtime']<ret.cache_time){
                                                    sqls='update cache set addtime='+ret.cache_time;
                                                }else{
                                                    //read_cache_show();
                                                }

                                            }else{
                                                sqls='insert into cache (addtime) values ('+ret.cache_time+')';
                                            }
                                        }else{
                                            alert( JSON.stringify( errsss ) );

                                        }

                                        db.executeSql({
                                            name: 'cache_update',
                                            sql: sqls,
                                        }, function(retssss, errssss){
                                            clear_cache();

                                            updata_cache_now();

                                        });
                                    });

                                });

                            }else{
                               // alert( JSON.stringify( errs ) );

                            }
                        });

                    }else{//执行读取所有缓存数据的操作
                        read_cache_show();
                    }
                } else {
                    // api.alert({
                    //     msg:('错误码：'+err.code+'；错误信息：'+err.msg+'网络状态码：'+err.statusCode)
                    // });
                };
            });

        }



        //重新获取数据生成缓存
        function updata_cache_now(type){
            if(!type || type==undefined){
                //alert("cccc");

                var jsfun_banner = 'getBanner();';
                api.execScript({
                    name: 'root',
                    frameName: 'main',
                    script: jsfun
                });








                var systemType = api.systemType;
                if (systemType == "ios") {
                    var jsfun = 'getcat_listss();';
                    api.execScript({
                        name: 'root',
                        frameName: 'cat_list',
                        script: jsfun
                    });
                }else{
                    var jsfun = 'getcat_lists();';
                    api.execScript({
                        name: 'root',
                        frameName: 'cat_list',
                        script: jsfun
                    });
                }


                //getcat_lists();//更新栏目缓存
                //getBanner();//获取轮播图

                getDztj();//店长推荐
                getCnxh(page);//猜你喜欢

            }else if(type=="banner"){
                getBanner();//获取轮播图
                getDztj();//店长推荐
                getCnxh(page);//猜你喜欢
            }






            //read_cache_show();
        }


        //读取缓存渲染页面,没有读取到缓存去网络获取数据（默认执行此函数）
        function read_cache_show(type){
            if(!type || type==undefined){
                read_banner_cache();
                read_catlist_cache();
            }else if(type=="banner"){
                read_banner_cache();
            }else if(type=="catlist"){
                read_catlist_cache();
            }





        }





//依次传入数据库，表名，字段名称，数据，字段长度
//database和type保持一致

    function make_cache_done(database,tablename,strname,datas,strlen){
        //api.alert({msg:JSON.stringify(datas)});

        if(!strlen){
            strlen=100;
        }
        var db = api.require('db');

        db.openDatabase({
            name: database
        }, function(ret, err){


            //先清除表，再写入数据(此处是否需要待定)
            db.executeSql({
                name: database,
                sql: 'drop  table '+tablename,
            }, function(retss, err){


                db.executeSql({
                    name: database,
                    sql: 'create table IF NOT EXISTS  '+tablename+' ( '+strname+' varchar ('+strlen+') not null default "")',
                }, function(retss, err){

                    db.selectSql({
                        name: database,
                        sql: 'SELECT '+strname+' FROM '+tablename
                    }, function(retsss, errsss){
                        var sqls='';
                        if( retsss.status ){
                            //alert( JSON.stringify( retsss ) );
                            //alert( JSON.stringify( typeof($api.jsonToStr(datas)) ) );
                            if(retsss.data!=''){
                                sqls="update "+tablename+" set "+strname+"='"+$api.jsonToStr(datas)+"'";
                            }else{
                                sqls="insert into "+tablename+"('"+strname+"') values ('"+$api.jsonToStr(datas)+"')";
                                //alert(sqls);
                            }
                        }else{
                            //alert( JSON.stringify( errsss ) );

                        }

                        db.executeSql({
                            name: database,
                            sql: sqls,
                        }, function(retssss, errssss){

                            //updata_cache_now("banner");
                            read_cache_show(database);

                        });
                    });

                });



            });




        });

    }




//清除缓存，后面有缓存统一写到这里统一清除
    function clear_cache(){

        var db = api.require('db');
        db.openDatabase({
            name: 'banner'
        }, function(ret, err){
            db.selectSql({
                name: 'banner',
                sql: 'drop table bannertable'
            }, function(ret, err){

            });
        });

        db.openDatabase({
            name: 'catlist'
        }, function(ret, err){
            db.selectSql({
                name: 'banner',
                sql: 'drop table catlisttable'
            }, function(ret, err){

            });
        });

        //api.clearCache();
    }



        function goods_next(framename){
    		var index=0;
	    	 api.addEventListener({
	            name: 'scrolltobottom'
	        }, function() {
	        	alert(idnex+1);
	        });

    	}






    //商品页下拉
    function goods_nexts(framename){
    	var index=0;

		api.setCustomRefreshHeaderInfo({
		    bgColor: '#ffffff',
		    image: {
		        icon: 'widget://image/refresh/miao.png',
		        borderColor: '#f00'
		    }
		}, function() {


		        if(framename=='goods_canshu'){
		        	index=2;
		        }else if(framename=='goodsinfo'){
		        	index=0;
		        }else if(framename=='goodscomment'){
		        	index=1;
		        }

		        api.setFrameGroupIndex({
		            name: 'group_goods',
		            index: index
		        });

		        api.refreshHeaderLoadDone();

		});

/*
    	 api.addEventListener({
            name: 'scrolltobottom'
        }, function() {
		        if(framename=='goods_canshu'){
		        	index=1;
		        }else if(framename=='goodsinfo'){
		        	index=2;
		        }else if(framename=='goodscomment'){
		        	index=0;
		        }

		        api.setFrameGroupIndex({
		            name: 'group_goods',
		            index: index
		        });

        });
 */


/*
        api.addEventListener({
            name: 'scrolltobottom'
        }, function() {




//      var selectspan=document.getElementById("selectspan").getElementsByTagName("span");
//      for(var i=0,len=selectspan.length;i<len;i++){
//          $api.removeCls(selectspan[i], 'on');
//      }
//
//      $api.addCls(obj, 'on');



			api.addEventListener({name:'swipeup'},function(ret,err){

		        if(framename=='goods_canshu'){
		        	index=1;
		        }else if(framename=='goodsinfo'){
		        	index=2;
		        }else if(framename=='goodscomment'){
		        	index=0;
		        }


		        api.setFrameGroupIndex({
		            name: 'group_goods',
		            index: index
		        });

			});

			api.addEventListener({name:'swipedown'},function(ret,err){

		        if(framename=='goods_canshu'){
		        	index=2;
		        }else if(framename=='goodsinfo'){
		        	index=0;
		        }else if(framename=='goodscomment'){
		        	index=1;
		        }


		        api.setFrameGroupIndex({
		            name: 'group_goods',
		            index: index
		        });

			});


			//alert(framename);
            api.refreshHeaderLoadDone();
        });

    */

    }




	function toObject(a){
	    return (new Function('return ' + a))();
	}
	function openGYhearder(winname,headerh1,bodycolor,yangshi,yangshiname,canshuArray)
	{
	    api.openWin({
	    name: 'GYheader',
	    url: 'GYheader.html',
	    bounces: false,
	    pageParam: {winname : winname,headerh1 : headerh1,bodycolor : bodycolor,yangshi : yangshi,yangshiname : yangshiname,canshuArray : canshuArray}
		 });
	}
