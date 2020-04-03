const socket = io();

// Elements
const $messageForm = document.getElementById("message-form");
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.getElementById("send-location")

socket.on("message", message => {
  console.log(message);
});

// Message Input
$messageForm.addEventListener("submit", e => {
  e.preventDefault();

  $messageFormButton.setAttribute('disabled', 'disabled')

  // Disabel

  const message = e.target.elements.message.value;
  socket.emit("sendMessagge", message, error => {
    // Enable
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
    if (error) {
      return console.log(error);
    }
    console.log("Message Delivered");
  });
});

$sendLocationButton.addEventListener("click", () => {

  if (!navigator.geolocation) {
    return alert("Geolaocation is not supperted by your browser");
  }

  $sendLocationButton.setAttribute('disabled', 'disabled')

  navigator.geolocation.getCurrentPosition(position => {
    // console.log(position)
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      () => {
        $locationButton.removeAttribute('disabled')
        console.log("Location shared!");
      }
    );
  });
});
