document.querySelectorAll(".landscape").forEach((item) => {
	item.addEventListener("mouseenter", () => {
		item.querySelector(".tooltiptext").style.visibility = "visible";
		item.querySelector(".tooltiptext").style.opacity = "1";
	});

	item.addEventListener("mouseleave", () => {
		item.querySelector(".tooltiptext").style.visibility = "hidden";
		item.querySelector(".tooltiptext").style.opacity = "0";
	});
});