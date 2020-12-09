const action_buttons = document.querySelectorAll(".action");
action_buttons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.add("clicked");
        setTimeout(() => {
            button.classList.remove("clicked");
        }, 150);
    });
});
