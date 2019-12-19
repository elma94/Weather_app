$(document).ready(function(){
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });

    var cities = [];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday', 'Saturday'];
    var date_time = new Date();
    var weekday = days[date_time.getDay()];
    var time = date_time.toLocaleTimeString([], {hour12: false, hour: '2-digit', minute: '2-digit'});
    var today = date_time.getDay();
    var next = [];
    var icon = [];
    var desc = [];
    var max = [];
    var min = [];
    var pres = [];
    var hum = [];
    var wind = [];
    
    $("#welcome-screen").show();
    $("#container-block, #header").hide();
    $(".box").hide();

    $("#submit").click(function(e){
        e.preventDefault();
        var city = $("#city-query-input").val();
        if(city !== ""){
            $("#welcome-screen").hide();
            $(".box").show();
            $(".wagon").hide();
            $.ajax({
                type: "GET",
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=de424d915fcdbb530e8b89af84660cf9&units=metric",
                dataType: "jsonp",
                success: function(data){
                    $("#container-block").show();
                    $("#header").show();
                    cities.push(city);
                    $("#city-name").append(data.name);
                    $("#date-time").empty().html(weekday + ", " + time);
                    $("#temperature").empty().html(Math.round(data.main.temp) + "°");
                    $("#feels-temperature").empty().html("feels " + Math.round(data.main.feels_like) + " °");
                    $('#icon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
                    $("#pressure-value").append(data.main.pressure + " hPa");
                    $("#humidity-value").append(data.main.humidity + " %");
                    $("#wind-value").append(data.wind.speed + " m/s");
                    $("#weather-description").text(data.weather[0].description);
                    var weather_condition = data.weather[0].main;
                    var weather_cond = weather_condition.toLowerCase();
                    $(weather_cond).css({"color": "white"});
                    console.log(weather_cond);
                    if(weather_cond === "thunderstorm"){
                        $("body").css("background-image", "url(https://i.ibb.co/BckvSsq/thunderstorm.jpg)");
                    }if(weather_cond === "clear"){
                        $("body").css("background-image", "url(https://i.ibb.co/sH7kvGW/clear-sky.jpg)");
                    }if(weather_cond === "rain" || data.weather[0].main === "drizzle"){
                        $("body").css("background-image", "url(https://i.ibb.co/vHMMm9n/rain.jpg)");
                    }if(weather_cond === "snow"){
                        $("body").css("background-image", "url(https://i.ibb.co/wsTdLMJ/snow.jpg)");
                    }if(weather_cond === "mist"){
                        $("body").css("background-image", "url(https://i.ibb.co/p4Ts99h/Ss2c5-MVASd-Gk-VHOw-G6n9-Imogene-Pass.jpg)");
                    }if(weather_cond === "haze"){
                        $("body").css("background-image", "url(https://i.ibb.co/34TVDjp/haze.jpg)");
                    }if(weather_cond == "fog"){
                        $("body").css("background-image", "url(https://i.ibb.co/k3gKCdQ/fog.jpg)");
                    }if(weather_cond === "dust"){
                        $("body").css("background-image", "url(https://i.ibb.co/4jKLVKb/dust.jpg)");
                    }if(weather_cond === "smoke"){
                        $("body").css("background-image", "url(https://i.ibb.co/xmH6bdQ/smoke.png)");
                    }if(weather_cond === "sand"){
                        $("body").css("background-image", "url(https://i.ibb.co/Q8Szczx/sandstorm.jpg)");
                    }if(weather_cond === "clouds"){
                        $("body").css("background-image", "url(https://i.ibb.co/CPp7YFr/very-cloudy.jpg)");
                    }if(weather_cond === "squall"){
                        $("body").css("background-image", "url(https://i.ibb.co/QMtLKp0/squall.jpg)");
                    }if(weather_cond === "tornado"){
                        $("body").css("background-image", "url(https://i.ibb.co/0nZDGRk/tornado.jpg)");
                    }if(weather_cond === "ash"){
                        $("body").css("background-image", "url(https://i.ibb.co/zb8px5K/ash.jpg)");
                    }if(data.weather[0].id === "500"){
                        $("body").css("background-image", "url(https://i.ibb.co/bbdmDWz/few-clouds.jpg)");
                    }
                        
                    // RENDERING DAYS OF WEEK

                    $(".day").each(function(i){
                        $(this).attr("id", "day-" + (i+1)).append(days[(today+i+1)%7]);
                    })
                }

            }).done(function(){

                var city2 = cities.slice(-1)[0];
                
                $.ajax({
                    type: "GET",
                    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city2 + "&appid=de424d915fcdbb530e8b89af84660cf9&units=metric",
                    dataType: "jsonp",
                    success: function(data){
                        
                        for (var i = 0; i < data.list.length; i++){
                            icon.push(src='http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png');
                            desc.push(data.list[i].weather[0].description);
                            max.push(Math.round(data.list[i].main.temp_max));
                            min.push(Math.round(data.list[i].main.temp_min));
                            pres.push(data.list[i].main.pressure);
                            hum.push(data.list[i].main.humidity);
                            wind.push(Math.round(data.list[i].wind.speed));
                        }

                        $(".train-image").each(function(i){
                            $(this).attr("id", "train-image-" + (i+1)).attr("src", (icon[i+1]), "width", "70px", "height", "70px");
                            console.log(icon[i+1]);
                        })
                        $(".desc").each(function(i){
                            $(this).attr("id", "desc-" + (i+1)).append(desc[i+1]);
                        })
                        $(".max").each(function(i){
                            $(this).attr("id", "max-" + (i+1)).append(max[i+1] + "°");
                        })
                        $(".min").each(function(i){
                            $(this).attr("id", "min-" + (i+1)).append(min[i+1] + "°");
                        })
                        $(".pres").each(function(i){
                            $(this).attr("id", "pres-" + (i+1)).append(pres[i+1] + " hPa");
                        })
                        $(".hum").each(function(i){
                            $(this).attr("id", "hum-" + (i+1)).append(hum[i+1] + " %");
                        })
                        $(".wind").each(function(i){
                            $(this).attr("id", "wind-" + (i+1)).append(wind[i+1] + "m/s");
                        })
                            
                            //toggle boxes
                            
                            $("#box-1").hover( function(){
                                $("#wagon-1").slideToggle();
                                $("#arrow-up, #head-1").hide();
                                $("#container-block, #blur-square, #square").hide();
                            }, function(){
                                $("#wagon-1").hide();
                                $("#arrow-up, #head-1").show();
                                $("#container-block, #blur-square, #square").show();
                            })

                            $("#box-2").hover(function(){
                                $("#wagon-2").slideToggle();
                                $("#arrow-up, #head-2").hide();
                                $("#container-block, #blur-square, #square").hide();
                            }, function(){
                                $("#wagon-2").hide();
                                $("#arrow-up, #head-2").show();
                                $("#container-block, #blur-square, #square").show();
                            })   

                            $("#box-3").hover(function(){
                                $("#wagon-3").slideToggle();
                                $("#arrow-up, #head-3").hide();
                                $("#container-block, #blur-square, #square").hide();
                            }, function(){
                                $("#wagon-3").hide();
                                $("#arrow-up, #head-3").show();
                                $("#container-block, #blur-square, #square").show();
                            })   

                            $("#box-4").hover(function(){
                                $("#wagon-4").slideToggle();
                                $("#arrow-up, #head-4").hide();
                                $("#container-block, #blur-square, #square").hide();
                            }, function(){
                                $("#wagon-4").hide();
                                $("#arrow-up, #head-4").show();
                                $("#container-block, #blur-square, #square").show();
                            })   

                            $("#box-5").hover(function(){
                                $("#wagon-5").slideToggle();
                                $("#arrow-up, #head-5").hide();
                                $("#container-block, #blur-square, #square").hide();
                            }, function(){
                                $("#wagon-5").hide();
                                $("#arrow-up, #head-5").show();
                                $("#container-block, #blur-square, #square").show();
                            })   
                    }
                })
            })
        } else {
            $("#error").html("Wrong input");
        }
    })
});