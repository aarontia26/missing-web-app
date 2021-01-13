/*----------NAVIGATION BAR-----------------------*/
const navbar = document.querySelector('.navbar');

document.addEventListener('scroll',()=>{
	var scroll_position = window.scrollY;
    //console.log(scroll_position)
	if (scroll_position > 400) {
		navbar.style.backgroundColor = "rgb(153, 102, 51)";
	}else{
		navbar.style.backgroundColor = "transparent";
	}
});

/*-----------STICKY PART BAR-----------------------*/
const sticky1 = document.getElementById('sticky1');
const sticky2 = document.getElementById('sticky2');
const sticky3 = document.getElementById('sticky3');
const stick1 = sticky1.offsetTop
const stick2 = sticky2.offsetTop
const stick3 = sticky3.offsetTop
//we declare stick1 here to get the position of sticky1 before scrolling
document.addEventListener('scroll',()=>{
    const sticky1Scroll = sticky1.offsetTop + sticky1.offsetHeight;
    //sticky1 scroll bottom position
    
    const sticky2Scroll = sticky2.offsetTop + sticky2.offsetHeight;
    //sticky2 sroll position position
    
    const sticky3Scroll = sticky3.offsetTop + sticky3.offsetHeight;
    //sticky2 sroll position position
    
    const part1Bottom = document.getElementById('part1Last').offsetTop + document.getElementById('part1Last').offsetHeight;
    //part1 bottom position
    
    const part2Bottom = document.getElementById('part2Last').offsetTop + document.getElementById('part2Last').offsetHeight;
    //part 2bottom position

    const part3Bottom = document.getElementById('part3Last').offsetTop + document.getElementById('part3Last').offsetHeight;
    //part 2bottom position
    var scroll_position = window.scrollY;
    if(sticky1Scroll>part1Bottom){
        sticky1.style.opacity = "0";
        if(sticky2Scroll>part2Bottom){
            sticky2.style.opacity = "0";
            console.log(stick3, scroll_position, "3")
            if(scroll_position>stick3){
                sticky3.style.transition = ".5s"
                sticky3.style.margin= "0 30px"
                
                if(sticky3Scroll>part3Bottom){
                    sticky3.style.opacity = "0";
                }else{
                    sticky3.style.opacity = "1";
                    sticky3.style.position = "sticky";
                }     
            }
                        
        }else{
            sticky2.style.opacity = "1";
            sticky2.style.position = "sticky";
            sticky3.style.margin = "0" 
            sticky3.style.position = "sticky";
             
            if(scroll_position>stick2){
                sticky2.style.transition = ".5s"
                sticky2.style.margin= "0 30px"
                
            }
            
            
        }
    }else{
        sticky1.style.opacity = "1";
        sticky1.style.position = "sticky";
        sticky2.style.margin = "0"  
        
        console.log(stick1, scroll_position)
        console.log(stick2, scroll_position, "s2")
        if(scroll_position>stick1){
            sticky1.style.transition = ".5s"
            sticky1.style.margin= "0 30px"
        }else{
            sticky1.style.margin = "initial"
            
        }
    }
    /*
    var scroll_position = window.scrollY;
    if(scroll_position > 2400) {
        //sticky1.style.opacity = "0";
        if(scroll_position > 4900){
            sticky2.style.opacity = "0";
        } else {
            sticky2.style.opacity = "1";
            sticky2.style.position = "sticky";
        }
            
    } 
    
    else {
        sticky1.style.opacity = "1";
        sticky1.style.position = "sticky";
    }
    */
});

$(".carousel").owlCarousel({
        margin: 20,
        loop: true,
        autoplay: false,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
          0:{
            items:1,
            nav: false
          },
          600:{
            items:2,
            nav: false
          },
          1000:{
            items:3,
            nav: false
          }
        }
      });

/*------------BACK TO TOP--------------------------*/
const topBtn = document.querySelector('.topBtn');

window.addEventListener('scroll',()=>{
    if (window.pageYOffset > 200) {
        topBtn.classList.add("active");
    } else {
        topBtn.classList.remove("active");
    }
});


