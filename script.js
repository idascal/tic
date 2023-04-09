document.addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return

    let currentDropdown
    if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('active')
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove('active')
    })
})

const toggle = document.querySelector(".toggle-item"),
      body=document.querySelector('body'),
      content=document.getElementById('context');


      toggle.addEventListener("click", function(){
        this.classList.toggle("active");
        body.classList.toggle("active");

        // function to change content from light -- dark

        if(toggle.classList.contains("active")){
            content.innerHTML="Dark Mode";
        }else{
            content.innerHTML="Light Mode";
        }
      });