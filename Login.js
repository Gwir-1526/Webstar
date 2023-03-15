var jwt = localStorage.getItem('login.json');
if (jwt != null) {
  window.location.href = 'Charachterselect.html'
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://developer.webstar.hu/rest/frontend-felveteli/v2/authentication/");
  xhttp.setRequestHeader("Content-Type", "application/json;");
  xhttp.setRequestHeader("Applicant-Id", "mjmM7G3e" );
  xhttp.send(JSON.stringify({
    "username": username,
    "password": password
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      if (objects['status'] == 'ok') {
        localStorage.setItem('login.json', objects['accessToken']);
        Swal.fire({
          text: 'A bejelentkezés sikeres!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = 'Charachterselect.html';
          }
        });
      } else {
        Swal.fire({
          text: 'A bejelentkezés sikertelen!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  return false;
}