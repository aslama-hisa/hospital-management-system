
  function ValidateEmail(input) 
  {
    var pattern=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (!input.value.match(pattern))
    {
      if(!input.dataset.errorShown){
        alert('Invalid email address');
        input.dataset.errorShown=true;
      }
      input.value='';
      input.focus();
      return false;
    }
    else{
      input.dataset.errorShown=false;
      return true
    }
  }  
    function passwordValidate() {
      var password = document.getElementById("pass").value;
      var confirmPassword = document.getElementById("cpass").value;
      if (password != confirmPassword) {
          alert("Please enter same password in both");
          return false;
      }
      return true;
  }
    
    