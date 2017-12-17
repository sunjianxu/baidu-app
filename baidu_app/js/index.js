/**
 * Created by sunjianxu on 2017/12/2.
 */
var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    // initialSlide: 5,
    on: {
        slideChangeTransitionEnd: function (Swiper) {
            // console.log(this.activeIndex);//当前滑块的索引值
            var index = this.activeIndex;
            $('.swiper-slide').eq(index).addClass('animate').siblings('.swiper-slide').removeClass('animate');
            // 判断如果当前页是第三页时禁止滑动
            if (this.activeIndex === 2) {
                // console.log('別滑');
                // 禁止滑动
                $('.swiper-slide').eq(2).addClass('swiper-no-swiping');
                // 恢复样式
                $('.sloganWrapper').removeClass('sloganSkill');
                $('.bearSkillWrapper').removeClass('bearSkill');
                $('.swiper-slide').eq(2).find('.sloganWrapper').find('.slogan1,.slogan2,.slogan3').css('display','block');                                               
                $('.swiper-slide').eq(2).find('.sloganWrapper').find('.license1,.license2,.license3').css('opacity','0');                                               
                $('.swiper-slide').eq(2).find('.bearSkillWrapper').find('.bear').css({animation:'top2bottom 1s .5s forwards',display:'block'}).siblings().fadeOut(10);                                                                                                                                            
                $('.sloganWrapper').children().removeClass('addanimate');
                $('.sloganWrapper').children().css('animation','');
                // 點擊后運行don动画
                $('.swiper-slide').eq(2).on('tap',function () {
                    $('.swiper-slide').eq(2).find('.sloganWrapper').addClass('sloganSkill');
                    $('.swiper-slide').eq(2).find('.bearSkillWrapper').addClass('bearSkill');
                    var timer = null;
                    var timerIndex = 0; 
                    timer = window.setInterval(function () {
                        timerIndex++;
                        $('.swiper-slide').eq(2).find('.sloganWrapper.sloganSkill').find('.slogan'+ timerIndex).css('display','none');                                               
                        $('.swiper-slide').eq(2).find('.sloganWrapper.sloganSkill').find('.license'+ timerIndex).css('opacity','1');                                               
                        $('.swiper-slide').eq(2).find('.bearSkillWrapper.bearSkill').find('.bear'+ timerIndex).fadeIn(20).siblings().fadeOut(50);                                                                                                                                            
                        if (timerIndex === 3) {
                            window.clearInterval(timer);
                            setTimeout(function () {
                                $('.sloganWrapper.sloganSkill').children().addClass('addanimate');
                                $('.sloganWrapper.sloganSkill').children('.addanimate').css('animation','orgin2bottom 3s forwards');
                            },500);
                            $('.swiper-slide').eq(2).removeClass('swiper-no-swiping');

                        }       
                    },1000);
                   
                                        
                })
            }
        }
    },

});


// 骑手和进度条动画完成后执行隐藏
$(function () {
    // 原生js监测动画完成后的回调函数
    // document.querySelector('.rider').addEventListener('animationend',function () {
    //     console.log('动画完成了');
    // })

    setTimeout(function () {
        // 添加触发动画的类
        $('.loading').addClass('animate');
        // jq/zepto监测动画完成的回调函数
        $('.loading').find('.rider').on('animationend', function () {
            $('.loading').fadeOut(500, function () {
                $('.welcome').addClass('animate');
            });
        });
    }, 1000);

    // 为welcome页面的按钮添加长按效果
    $('.welcome').find('.btnWrapper').on('longTap', function () {
        $('.welcome .bearWrapper').addClass('rider2bottom');
        $('.welcome .bearWrapper').animate({
            transform: 'translateY(80%) scale(1.5)',
            webkitTransform: 'translateY(80%) scale(1.5)',
            opacity: 0
        },1000, function () {
            $('.welcome').fadeOut(300, function () {
                console.log('ok');
                $('.swiper-wrapper').find('.swiper-slide').eq(0).addClass('animate');
            })
        });

    });

    // 音乐播放
        
    var adiuo = document.querySelector('audio');
    document.querySelector('.btnMusic').onclick = function () {
        // 判断是否是播放状态，dom.pauseed,默认是true,暂停状态
        if (adiuo.paused) {
            adiuo.play();
            document.querySelector('.btnMusic').style.background = 'url(img/pause.png) no-repeat center /100% 100%';
        }else {
            adiuo.pause();
            document.querySelector('.btnMusic').style.background = 'url(img/play.png) no-repeat center /100% 100%';
        }
    }

});