function helloClick() {
    document.getElementById('helloText').innerText = "Hello from button!";
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('helloButton').addEventListener('click', helloClick);
});