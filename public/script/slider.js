import { getDataAdmin,getDataUsers } from "./authFirebase.js";

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const indicatorsContainer = document.querySelector(".slider-indicators");
    const totalSlides = slider.children.length;
    let counter = 1;
  
    setInterval(() => {
      slider.style.transition = "transform 0.5s ease-in-out";
      slider.style.transform = `translateX(${-counter * 100}%)`;
  
      updateIndicators(counter);
  
      counter++;
  
      if (counter > totalSlides) {
        setTimeout(() => {
          slider.style.transition = "none";
          slider.style.transform = "translateX(0)";
          counter = 1;
        }, 500);
      }
    }, 3000);
  
    function updateIndicators(currentIndex) {
      const indicators = indicatorsContainer.children;
  
      for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove("active");
      }
  
      indicators[currentIndex - 1].classList.add("active"); 
    }
  
    // Generate indicators based on the number of slides
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("div");
      indicator.classList.add("indicator");
      indicatorsContainer.appendChild(indicator);
  
      indicator.addEventListener("click", () => {
        counter = i + 1;
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = `translateX(${-counter * 100}%)`;
  
        updateIndicators(counter);
      });
    }
  });

  function logout() {
    window.location.href = "../login";
  }
  let logout2 = document.getElementById("logout");

  logout2.addEventListener("click", function(){
    try{
      logout();
    }catch(error){
      console.log(error);
    }
  });

