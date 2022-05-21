// **Instructions** **main.js**
// ------------
// In this document you will find instructions on how to adjust different parameters of the paradigm. You can apply the desired changes to the document main.js on your computer or server, using a source code editor.
// The following parameters are necessary to adjust: number of avatar images, and the redirect link at the end of the study. All other parameters have a default option and adjustments are optional.


$(function() {

  // **Parameters**
  var now_inform = 0;
  var now_lsas = 0;
  var now_intro = 0;
  var now_name = 0; 
  var now_text = 0; 
  var now_avatar = 0;

  window.interval_lsas = 0;
  window.interval_name = 0;
  window.interval_avatar = 0;
  window.interval_text = 0;
  window.click = [];

  // ------------
  
  function set_settings() {
    window.settings = [];
	
	// **Number** **of** **Avatar** **Images**   
	// Number of avatars the user can choose from. Can be changed to any number, depending on how many avatars you would like to display. Default: 82
	// The avatar images used in the online preview of the paradigm were created using by pickaface.net and due to their terms not available for redistribution. You should therefore create your own images. All images should be 250x250 pixels in size and carry the names "avatar_NUMBER.png" (e.g. avatar_1.png; "png" should be lower case; the numbers in the names should be consequtive, starting from 1). The number of avatars dependeds on the corresponding parameter. The images should be placed in folder "avatars," located in the main study folder extracted on your computer or server.

    settings.numberofavatars = 35;

	
    // **Redirection**    
	// After the introduction task is over participants should be redirected to a survey with manipulation checks and dependent measures, to subsequent tasks, or to further instructions. 
	// If the study is called with a parameter for redirection, as explained in the documentation, this value is overwritten. 
	// To the redirect link, the following information will be appended: (1) participant number, (2) condition, (3) username, (4) description submitted by participant. These variables can be extracted from the link, saved as data, and used for linking the Social Media Ostracism paradigm to subsequent tasks and measures. See documentation for more details.

    settings.defaultredirect = 'https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_0dhmSZoKGY7BHpA';

	
	// **Tasklength**     
    // Length of the group introduction task in milliseconds. Can be changed to any number (in ms). Default: 180000 (3min) 
    settings.tasklength = 180000; 

	
	// **Number** **of** **"likes"**    
    // Each received "like" is indicated by the timepoint (in ms) at which the "like" will appear. To change the number of "likes" in each condition, add or remove timepoints. Make sure that every timepoint (except the first) is preceded by a single comma. 
	// In cases with only 1 "like," a second "like" is added with time point 9999999. This "like" is added for programming purposes and is never executed, as it is outside the task time

    // In condition 1, the participant will receive 1 like at the following timepoint (in ms). Default: [12000, 9999999]
    settings.condition_1_likes = [12000, 9999999]; 

    // In condition 2, user will receive 6 likes at the following timepoints (in ms). Default: [10000, 15000,35000,80000,1320000,150000]
    settings.condition_2_likes = [10000, 15000,35000,80000,1320000,150000];  
    

	// **Others' likes**     
	// To keep the total distribution of "likes" constant across conditions, The "likes" received by one group member can be adjusted according to the participant's. By default, the other group member receives 9 "likes" in the participant-ostracism condition, 5 in the participant-inclusion condtion.
	settings.condition_1_adjusted_likes = [12000, 14000,15000,35000,80000,100000,110000,150000,20000]; // 9
	settings.condition_2_adjusted_likes = [12000, 14000,15000,35000,80000]; // 5
	
    // Usernames by which the participant will receive "likes"
	// If group member names are changed, these should be changed accordingly.
    settings.likes_by = ['昕妍','承翰','潔翎666','志a0豪','QQ冠榮','婷','舒涵','p207介碩','1怡雯']; 
  }
  
  // -------------------
  // Above were the basic parameters you can adjust using the instructions. The remaining code is also annotated, but we do not recommend changing it, unless you are comfortable with web programming.
  // -------------------
  
  
  // **Slide:** **Intro**     
  // With instructions regarding the task. The intro container is shown, the continue calls the next slide when clicked.
  function init_inform() {
    $('#inform').show();

    $('#submit_inform').unbind("click").on('click',function() {

      if ( $('#inform1').is(":checked") && $('#inform2').is(":checked") && $('#inform3').is(":checked") ) {
        if ($('input[name="inform4"]:checked').val() != null) {
          if ($('input[name="inform5"]:checked').val() != null) {
            if ($('#exp_name').attr("value") != "" && $('#exp_tel').attr("value") != "" && $('#exp_date').attr("value") != "") {

              $('#inform').hide();
              init_lsas();  

              window.exp_name = $('#exp_name').attr("value")
              console.log("exp name: ", window.exp_name);
              window.exp_tel = $('#exp_tel').attr("value")
              console.log("exp tel: ", window.exp_tel);
              window.exp_email = $('#exp_email').attr("value")
              console.log("exp email: ", window.exp_email);
              window.exp_date = $('#exp_date').attr("value")
              console.log("exp date: ", window.exp_date);
              window.exp_quit = $('input[name="inform4"]:checked').val()
              console.log("exp quit: ", window.exp_quit)
              window.exp_usage = $('input[name="inform5"]:checked').val()
              console.log("exp usage: ", window.exp_usage)

              now_inform = new Date().getTime();
              console.log("submit inform time:", now_inform)

            } else {
              alert("請將研究參與者簽名處填寫完整")
            }
          } else {
            alert("請選擇「您參加實驗所蒐集到的資料未來以下列哪種方式使用？」")
          }
        } else {
          alert("請選擇「若您退出實驗，有關您參加實驗所蒐集到的資料如何處理？」")
        }
      } else {
        alert("請勾選同意事項")
      }
  	});	
  }
  
  function init_lsas() {
    $('#lsas').show();

    // // 測試用按鈕
    // $('#fill_lsas').unbind("click").on('click',function() {
    //   $('input:radio').each(function() {
    //     $(this).value("2").prop('checked', true);
    //   })
    // })

    // 繼續
    $('#submit_lsas').unbind("click").on('click',function() {

      var checked = 0;

      $("#lsas input[type=radio]:checked").each(function() {
        checked = checked + 1;
      });

      if (checked < 24) {
        alert ("請將問卷填寫完整")
      } else {

        $('#lsas').hide();
          init_intro();  	
        
        now_lsas = new Date().getTime();
        console.log("submit lsas time:", now_lsas);
        interval_lsas = (now_lsas - now_inform)/1000;
        console.log("lsas interval:", interval_lsas);
      }
  	});	
  }

  function init_intro() {
  	$('#intro').show();
  	$('#submit_intro').unbind("click").on('click',function() {
			$('#intro').hide();
  			init_name();  			
      
        now_intro = new Date().getTime();
        console.log("submit intro time:", now_intro)
  	});	
  }
  

  // **Slide:** **Username**       
  // Note: Only alphanumeric usernames without spaces are accepted
  
  function init_name() {

  	$('#name').show();

  	$('#submit_username').unbind("click").on('click',function() {

  		var error = 0;
  		var uname = $('#username').val();

  		if(uname == "") {
  			error = 1;
  			errormsg = '請輸入文字';
  			uname = "undefined";
  		}
  		if(not_alphanumeric(uname)) {
  			error = 1;
  			errormsg = '僅限輸入文字（且請勿輸入空格）';
  		}  		

  		if(error == 0) {
			$('#name').hide();
			window.username = $('#username').val();
  			init_avatar();  			
  		} else {
  			alertify.log(errormsg,"錯誤");
  		}
      
      now_name = new Date().getTime();
      console.log("submit name time:", now_name)
      interval_name = (now_name - now_intro)/1000;
      console.log("name interval:", interval_name)
  	});
  }

  // **Slide:** **Avatar**       
  // Avatar slide in which the participant is asked to select an avatar
   
  function init_avatar() {
  	$('#avatar').show();

    var avatars = window.settings.numberofavatars;    
  	for(var i=1; i<avatars; i++) 
  	{ 
  		$('.avatars').append('<img id="avatar_' + i+ '" src="avatars/avatar_' + i + '.png" class="avatar" />');
  	} 

  	$('.avatar').unbind("click").on('click', function() {
  		$('.avatar').removeClass('selected');
  		$(this).addClass('selected');
  	});

    	$('#submit_avatar').unbind("click").on('click',function() {
    		if($('.selected').length == 1) {
  			$('#avatar').hide();
  			window.avatar = $('.selected').attr('id');
  			window.avatarexport = /avatar_([^\s]+)/.exec(window.avatar)[1];
    			init_text();  			
    		} else {
    			alertify.log("請選擇一個人像","error");
    		}

        now_avatar = new Date().getTime();
        console.log("submit avatar time:", now_avatar)
        interval_avatar = (now_avatar - now_name)/1000;
        console.log("avatar interval:", interval_avatar)
    	});

  }


  // **Slide:** **Description**   
  function init_text() {
  	$('#text').show();

  	$("#description").keyup(function(){
  	  $("#count").text("Characters left: " + (200 - $(this).val().length));
  	});

  	$('#submit_text').unbind("click").on('click',function() {

  		var error = 0;
  		if($('#description').val() == "") {
  			error = 1;
  			errormsg = '請輸入文字';
  		}
  		if($('#description').val() !== "" && $('#description').val().length < 100) {
		
  			error = 1;
  			errormsg = '請寫多一點！';
			}
  		if($('#description').val().length > 201) {
  		
  			error = 1;
  			errormsg = '請刪減一些字數！';
  		}  		
  		if(error == 0) {
  			$('#text').hide();
  			window.description = $('#description').val();
    			init_fb_intro();  
          now_text = new Date().getTime();
          console.log("submit text time:", now_text)	
          interval_text = (now_text - now_avatar)/1000;
          console.log("text interval:", interval_text)		
    		} else {
    			alertify.log(errormsg,"錯誤");
    		}
  	});  	
  }


  // **Slide:** **Instructions**   
  function init_fb_intro() {
  	$('#fb_intro').show();
	
  	$('#submit_fb_intro').unbind("click").on('click',function() {

			$('#fb_intro').hide();
 			init_fb_login();  			

  	});	
  }


  // **Slide:** **Login** **Screen**   
  // Participant can continue after 8000ms = 8s      
  function init_fb_login() {
  	$('#fb_login').show();
	

  	setTimeout(function() {
  		$('#msg_all_done').show();
  		$("#loader").hide();
  	}, 8000);
	
  	$('#submit_fb_login').unbind("click").on('click',function() {
			$('#fb_login').hide();
  			init_task();  			
  	});	
  }
  
  // **Slide:** **Task**   
  function init_task() {

    $('#task').show();

	shortcut.add("Backspace",function() {});      

  	jQuery("#countdown").countDown({
  		startNumber: window.settings.tasklength/1000, // in seconds
  		callBack: function(me) {
  			console.log('over');
        $('#timer').text('00:00');
  		}
  	});
	   
		users = {
		  "posts" : [
			{
			  "avatar": 'avatars/' + window.avatar + '.png',
			  "username": window.username,
			  "text": window.description,
			  "likes": window.settings.condition_likes,
			  "usernames": window.settings.likes_by
			}
		  ]
		};
		
    // Add user box to slide     
	  var tpl = $('#usertmp').html(),html = Mustache.to_html(tpl, users);
	  $("#task").append(html);
	  
    // Add other boxes to slide    
	  var tpl = $('#otherstmp').html(),html = Mustache.to_html(tpl, others);
	  $("#task").append(html);
 
    // Randomize order of other players boxes
    function reorder() {
       var grp = $("#others").children();
       var cnt = grp.length;

       var temp,x;
       for (var i = 0; i < cnt; i++) {
           temp = grp[i];
         x = Math.floor(Math.random() * cnt);
         grp[i] = grp[x];
         grp[x] = temp;
     }
     $(grp).remove();
     $("#others").append($(grp));
    }
    reorder();    

    // When user receives likes
	  $('.userslikes').each(function() {
  		var that = $(this);
  		var usernames = $(this).data('usernames').split(",");
  		var times = $(this).data('likes').split(",");

  		for(var i=0; i<times.length; i++) 
  		{ 
  			times[i] = +times[i]; 
  			
  			themsg = usernames[i] + " liked your post";

  			setTimeout(function(themsg) {
  				that.text(parseInt(that.text()) + 1);
  				alertify.success(themsg)

  			}, times[i], themsg);
  		} 		
	  });
	  
    // When others receive likes
	  $('.otherslikes').each(function() {
  		var that = $(this);
  		var times = $(this).data('likes').split(",");
  		
  		for(var i=0; i<times.length; i++) 
  		{ 
  			times[i] = +times[i]; 
  			
  			setTimeout(function () {
  				that.text(parseInt(that.text()) + 1);
  			}, times[i]);
  			
  		} 
	  });
	 

    // Initialize like buttons
	  $('.btn-like').unbind("click").on('click', function() {
      window.click.push($(this).parent().parent().find('h3').text())
      console.log(window.click)
		  $(this).prev().text(parseInt($(this).prev().text()) + 1);
      // Like buttons can only be clicked once
		  $(this).attr("disabled", true);
	  });

    // Initalize Masonry plugin
    // For display of user and other players boxes in columns without gaps
		$('#task').masonry({
		  itemSelector : '.entry',
		  columnWidth : 10
		});


    // Redirect, default after 180000ms = 180s = 3min
    setTimeout(function() {
    
    $(window).unbind('beforeunload');
    
    $('#final-continue').show();

    $('#timer').text('00:00');
    
    $('#final-continue').unbind("click").on('click', function() {

      // Redirect link
      location.href = window.redirect+

        //inform consent
        '&name='+window.exp_name+
        '&tel='+window.exp_tel+
        '&email='+window.exp_email+
        '&date='+window.exp_date+
        '&quit='+window.exp_quit+
        '&usage='+window.exp_usage+

        //lsas questionnaire
        '&ltime='+window.interval_lsas+
        '&1f='+$('input[name="lsas1f"]:checked').val()+
        '&1a='+$('input[name="lsas1a"]:checked').val()+
        '&2f='+$('input[name="lsas2f"]:checked').val()+
        '&2a='+$('input[name="lsas2a"]:checked').val()+
        '&3f='+$('input[name="lsas3f"]:checked').val()+
        '&3a='+$('input[name="lsas3a"]:checked').val()+
        '&4f='+$('input[name="lsas4f"]:checked').val()+
        '&4a='+$('input[name="lsas4a"]:checked').val()+
        '&5f='+$('input[name="lsas5f"]:checked').val()+
        '&5a='+$('input[name="lsas5a"]:checked').val()+
        '&6f='+$('input[name="lsas6f"]:checked').val()+
        '&6a='+$('input[name="lsas6a"]:checked').val()+
        '&7f='+$('input[name="lsas7f"]:checked').val()+
        '&7a='+$('input[name="lsas7a"]:checked').val()+
        '&8f='+$('input[name="lsas8f"]:checked').val()+
        '&8a='+$('input[name="lsas8a"]:checked').val()+
        '&9f='+$('input[name="lsas9f"]:checked').val()+
        '&9a='+$('input[name="lsas9a"]:checked').val()+
        '&10f='+$('input[name="lsas10f"]:checked').val()+
        '&10a='+$('input[name="lsas10a"]:checked').val()+
        '&11f='+$('input[name="lsas11f"]:checked').val()+
        '&11a='+$('input[name="lsas11a"]:checked').val()+
        '&12f='+$('input[name="lsas12f"]:checked').val()+
        '&12a='+$('input[name="lsas12a"]:checked').val()+
        '&13f='+$('input[name="lsas13f"]:checked').val()+
        '&13a='+$('input[name="lsas13a"]:checked').val()+
        '&14f='+$('input[name="lsas14f"]:checked').val()+
        '&14a='+$('input[name="lsas14a"]:checked').val()+
        '&15f='+$('input[name="lsas15f"]:checked').val()+
        '&15a='+$('input[name="lsas15a"]:checked').val()+
        '&16f='+$('input[name="lsas16f"]:checked').val()+
        '&16a='+$('input[name="lsas16a"]:checked').val()+
        '&17f='+$('input[name="lsas17f"]:checked').val()+
        '&17a='+$('input[name="lsas17a"]:checked').val()+
        '&18f='+$('input[name="lsas18f"]:checked').val()+
        '&18a='+$('input[name="lsas18a"]:checked').val()+
        '&19f='+$('input[name="lsas19f"]:checked').val()+
        '&19a='+$('input[name="lsas19a"]:checked').val()+
        '&20f='+$('input[name="lsas20f"]:checked').val()+
        '&20a='+$('input[name="lsas20a"]:checked').val()+
        '&21f='+$('input[name="lsas21f"]:checked').val()+
        '&21a='+$('input[name="lsas21a"]:checked').val()+
        '&22f='+$('input[name="lsas22f"]:checked').val()+
        '&22a='+$('input[name="lsas22a"]:checked').val()+
        '&23f='+$('input[name="lsas23f"]:checked').val()+
        '&23a='+$('input[name="lsas23a"]:checked').val()+
        '&24f='+$('input[name="lsas24f"]:checked').val()+
        '&24a='+$('input[name="lsas24a"]:checked').val()+

        //social otracism paradigm
        '&p='+window.participant+
        '&c='+window.condition+
        '&u='+encodeURI(window.username)+
        '&utime='+window.interval_name+
        '&av='+window.avatarexport+
        '&avtime='+window.interval_avatar+
        '&d='+encodeURI(window.description)+
        '&dtime='+window.interval_text+
        '&clnum='+window.click.length+
        '&cl='+encodeURI(window.click);
    });
    
    },window.settings.tasklength); // timing for task

  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
	
  // Get URL parameters to set condition number and participant number
  function get_params() {
    // condition number must be 1 or 2
    // if(window.QueryString.c !== undefined && !isNaN(parseInt(window.QueryString.c)) && parseInt(window.QueryString.c) > 0 && parseInt(window.QueryString.c) < 4) {
    //   window.condition = parseInt(window.QueryString.c);
    // } else {
    //   window.condition = 1; // condition defaults to 1
    // }

    window.condition = getRandomInt(1,2);

    // participant number must be numeric
    if(window.QueryString.p !== undefined && !isNaN(parseInt(window.QueryString.p))) {
      window.participant = parseInt(window.QueryString.p);
    } else {
      window.participant = 0; // participant defaults to 0
    }    
    // redirect
    if(window.QueryString.redirect !== undefined && window.QueryString.redirect !== "") {
      window.redirect = decode(window.QueryString.redirect);
    } else {
	  window.redirect = window.settings.defaultredirect;
	}
	
	var urlHasQuestionMark = (window.redirect.indexOf("?") > -1);
	if(!urlHasQuestionMark) {
		window.redirect = window.redirect+"?redir=1";
	}
	//alert(window.redirect);

  }
  
  
  // adjustments according to current condition
  function adjust_to_condition() {

    // the number of likes a person receives depends on the condition
	// in addition, the number of likes another person receives is adjusted, so that there is the same number of likes overall
	switch(condition) {
		case 1:
			window.settings.condition_likes = settings.condition_1_likes;
			window.others.posts[1].likes = settings.condition_1_adjusted_likes;
			break;
		case 2:
			window.settings.condition_likes = settings.condition_2_likes;
			window.others.posts[1].likes = settings.condition_2_adjusted_likes;
			break;
	}	
	  
  }
  

  // The variable QueryString contains the url parameters, i.e. condition no. and participant no.
  // via http://stackoverflow.com/a/979995
  window.QueryString = function () {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
        // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = pair[1];
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]], pair[1] ];
        query_string[pair[0]] = arr;
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(pair[1]);
      }
    } 
      return query_string;
  } ();


  // Function to check letters and numbers
  // via http://www.w3resource.com/javascript/form/letters-numbers-field.php
  function not_alphanumeric(inputtxt) {
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if(inputtxt.match(letterNumber)) {
        return false;
      } else { 
        return true; 
      }
  }


  // Function to add extra zeros infront of numbers (used for the countdown)
  // via http://stackoverflow.com/a/6466243
  function pad (str, max) {
    return str.length < max ? pad("0" + str, max) : str;
  }

  // Function for encoding and decoding URLs
  // via http://meyerweb.com/eric/tools/dencoder/
  function encode(unencoded) {
	return encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22");	
  }
  function decode(encoded) {
	return decodeURIComponent(encoded.replace(/\+/g,  " "));
  }

  
  // Simple Countdown
  // via http://davidwalsh.name/jquery-countdown-plugin
  jQuery.fn.countDown = function(settings,to) {
    settings = jQuery.extend({
      startFontSize: "12px",
      endFontSize: "12px",
      duration: 1000,
      startNumber: 10,
      endNumber: 0,
      callBack: function() { }
    }, settings);
    return this.each(function() {
      if(!to && to != settings.endNumber) { to = settings.startNumber; }  
      jQuery(this).children('.secs').text(to);
      jQuery(this).animate({
        fontSize: settings.endFontSize
      }, settings.duration, "", function() {
        if(to > settings.endNumber + 1) {
          jQuery(this).children('.secs').text(to - 1);
          jQuery(this).countDown(settings, to - 1);
          var minutes = Math.floor(to / 60);
          var seconds = to - minutes * 60;
          jQuery(this).children('.cntr').text(pad(minutes.toString(),2) + ':' + pad(seconds.toString(),2));
        }
        else {
          settings.callBack(this);
        }
      });
    });
  };

  // Prevent that participants accidentally exit the experiment by disabling F5 and backspace keys
  shortcut.add("f5",function() {});  
  $(window).bind('beforeunload', function(){
    return 'Are you sure you want to quit the experiment completely?';
  });   

  // Set Settings, get Participant No. and Condition No.
  set_settings();
  get_params();
  console.log(window.condition)
  adjust_to_condition();

  // Start with the intro slide
  init_inform();

});
