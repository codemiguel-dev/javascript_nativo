document.addEventListener("DOMContentLoaded", function() {
	let navBtn = this.querySelector(".nav-btn"),
		navCloseBtn = this.querySelector(".nav-close-btn"),
		toggleNav = newState => {
			let attr = "aria-expanded",
				state = navBtn.getAttribute(attr);

			navBtn.setAttribute(attr,newState);
		};
		menuTab = e => {
			let target = this.querySelector(".nav-btn[aria-expanded=true] ~ nav");

			if (target !== null) {
				let navLinks = target.querySelectorAll("a, button"),
					tries = 0,
					last = navLinks.length - 1;
				// try to find focus in open nav
				for (let l of navLinks) {
					if (this.activeElement !== l)
						++tries;
				}
				// put focus on X (first link) if outside or tabbing from last link
				let onLast = this.activeElement === navLinks[last],
					onFirst = this.activeElement === navLinks[0],
					notShifting = !e.shiftKey,
					shifting = e.shiftKey;

				if (tries === navLinks.length || (onLast && notShifting)) {
					e.preventDefault();
					navLinks[0].focus();
				// go to last link if shift-tabbing from X
				} else if (onFirst && shifting) {
					e.preventDefault();
					navLinks[last].focus();
				}
			}
		};

	navBtn.addEventListener("click",() => {
		toggleNav(true);
	});
	navCloseBtn.addEventListener("click",() => {
		toggleNav(false);
	});
	this.addEventListener("keydown",e => {
		// Esc
		if (e.keyCode === 27)
			toggleNav(false);
		// Tab
		else if (e.keyCode === 9)
			menuTab(e);
	});
});