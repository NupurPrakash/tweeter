console.log("hello from composer-char-counter");
//to ensure DOM has loaded
$(document).ready(function() {
  console.log("hello from DOM");
  $("#tweet-text").keyup(function(events)  {
    console.log(this.value);
    $("output.counter").text(140 - this.value.length);
    const log = this.value.length;
    if (log > 140) {
      $("output.counter").addClass("error");
    } else {
      $("output.counter").removeClass("error");
    }
  });
});
