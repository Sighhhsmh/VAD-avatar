document.addEventListener("DOMContentLoaded", function () {
	var isFocused;

	var mousediv = document.getElementById("pad");
	var headdiv = document.getElementById("draggableDiv");
	var headsizeinit = localStorage.getItem("FaceScale");
	var mouthsizeinit = localStorage.getItem("MouthScale");
	var headsize = document.getElementById("facesize");
	var mouthsize = document.getElementById("resizer");
	var imgpicker = document.getElementById("imggrab");
	var resetimg = document.getElementById("resetimg");
	var LookAtMouse = document.getElementById("enableRotation");
	var hidemouse = document.getElementById("hidemouse");
	var movemouse = document.getElementById("dragCheckbox");
	var rotatemouse = document.getElementById("rotateCheckbox");
	var flipmouse = document.getElementById("padflip");

	//  create DOM

	const contextMenu = document.createElement("div"); //  Base Context Menu Div
	contextMenu.classList.add("contextMenu");

	//--Initial Options--------------------------------------------------------<<  //----------For Face Options----------------------------------------------------------------------------

	const elam = document.createElement("span"); //  Mouse Look Function.
	elam.classList.add("option", "hover", "fio");
	elam.innerText = '>> Toggle "Look At Mouse';
	elam.addEventListener("click", function () {
		if (!LookAtMouse.checked) {
			LookAtMouse.checked = true;
		} else {
			LookAtMouse.checked = false;
		}
		LookAtMouse.dispatchEvent(new Event("change"));
		hideContextMenu();
	});

	const fmopt = document.createElement("span"); //  edit face option.
	fmopt.classList.add("option", "hover", "fio");
	fmopt.innerText = ">> Edit Face";
	fmopt.addEventListener("click", faceedit);

	const pmopt = document.createElement("span"); //  edit props option
	pmopt.classList.add("option", "hover", "fio");
	pmopt.innerText = ">> Edit props";
	pmopt.addEventListener("click", propedit);

	const dopt = document.createElement("span");
	dopt.classList.add("option", "hover", "fio");
	dopt.innerText = "<< Save Edit";
	dopt.addEventListener("click", stopedit);
	//--------------------------------------------------------------------   []
	//--Option 1 Sub-Options---------------------------------------------------<<

	const cfi = document.createElement("span"); //  Sub Option 1 Image Change
	cfi.classList.add("option", "hover", "fso");
	cfi.innerText = ">>  Change Image";
	cfi.style.marginBottom = "0.5rem";
	cfi.addEventListener("click", function () {
		imgpicker.dispatchEvent(new MouseEvent("click", { bubbles: true }));
		indicateChange("face");
	});

	const rfi = document.createElement("span"); //  Sub Option 1 Remove Image
	rfi.classList.add("option", "hover", "fso");
	rfi.innerText = ">>  Remove Image";
	rfi.style.marginBottom = "0.5rem";
	rfi.addEventListener("click", function () {
		resetimg.dispatchEvent(new MouseEvent("click"));
		indicateChange("face");
	});
	//  ----------------------------------------  //

	const fss = document.createElement("input"); //  Sub Option 1 Face Sizing
	fss.setAttribute("type", "range");
	fss.setAttribute("max", "200");
	fss.setAttribute("step", "5");
	fss.classList.add("option-range", "fso");
	fss.id = "fss";
	fss.value = headsize.value;
	fss.addEventListener("input", function () {
		headsize.value = fss.value;
		headsize.dispatchEvent(new Event("input"));
		fssl.innerText = "Head Size: " + headsize.value;
		indicateChange("face");
	});

	const fssl = document.createElement("label");
	fssl.classList.add("option", "fso");
	fssl.setAttribute("for", "fss");
	fssl.innerText = "Head Size: " + headsizeinit;
	//  ----------------------------------------  //

	const mss = document.createElement("input"); //  Sup Option 1 Mouth Sizing
	mss.setAttribute("type", "range");
	mss.setAttribute("max", "200");
	mss.setAttribute("step", "5");
	mss.classList.add("option-range", "fso");
	mss.id = "mss";
	mss.value = mouthsize.value;
	mss.addEventListener("input", function () {
		mouthsize.value = mss.value;
		mouthsize.dispatchEvent(new Event("input"));
		mssl.innerText = "Mouth Size: " + mouthsize.value;
		indicateChange("face");
	});

	const mssl = document.createElement("label");
	mssl.classList.add("option", "fso");
	mssl.setAttribute("for", "mss");
	mssl.innerText = "Mouth Size: " + mouthsizeinit;
	//  ----------------------------------------  //

	const feb = document.createElement("span"); //  Sub Option 1 Back Button.
	feb.classList.add("option", "hover", "fso");
	feb.innerText = " << Back & Save";
	feb.addEventListener("click", bto1);
	//--------------------------------------------------------------------   []  //------------------------------------------------------------------------------------------------

	const hideMouse = document.createElement("span");
	hideMouse.classList.add("option", "hover", "mio");
	hideMouse.innerText = ">> Hide Mouse";
	hideMouse.addEventListener("click", function () {
		if (hidemouse.checked) {
			hidemouse.checked = false;
		} else {
			hidemouse.checked = true;
		}
		hidemouse.dispatchEvent(new Event("change"));
		isFocused = true;
		indicateChange("mouse");
	});

	const moveMouse = document.createElement("span");
	moveMouse.classList.add("option", "hover", "mio");
	moveMouse.innerText = ">> Edit VirtualMouse Position";
	moveMouse.addEventListener("click", function () {
		movemouse.dispatchEvent(new MouseEvent("click"));
		if (movemouse.checked) {
			mousediv.style.boxShadow = "0 0 20px 0 black";
		} else {
			mousediv.style.boxShadow = "none";
		}
		isFocused = true;
		indicateChange("mouse");
	});

	const rotateMouse = document.createElement("span");
	rotateMouse.classList.add("option", "hover", "mio");
	rotateMouse.innerText = ">> Edit VirtualMouse Rotation";
	rotateMouse.addEventListener("click", function () {
		rotatemouse.dispatchEvent(new MouseEvent("click"));
		if (rotatemouse.checked) {
			mousediv.style.boxShadow = "0 0 20px 0 black";
		} else {
			mousediv.style.boxShadow = "none";
		}
		isFocused = true;
		indicateChange("mouse");
	});

	const flipMouse = document.createElement("span");
	flipMouse.classList.add("option", "hover", "mio");
	flipMouse.innerText = ">> Flip VirtualMouse [Horizontally]";
	flipMouse.addEventListener("click", function () {
		if (flipmouse.checked) {
			flipmouse.checked = false;
		} else {
			flipmouse.checked = true;
		}
		flipmouse.dispatchEvent(new Event("input"));
		isFocused = false;
	});

	const mcmexit = document.createElement("span");
	mcmexit.classList.add("option", "hover", "mio");
	mcmexit.innerText = "<< Save Edit";
	mcmexit.addEventListener("click", stopedit2);
	//--------------------------------------------------------------------   []
	//--Prop Edit Options---------------------------------------------------<<

	var currentTarget;

	const pScaleL = document.createElement("span");
	pScaleL.classList.add("option", "pio");
	pScaleL.setAttribute("for", "pScale");

	const pScale = document.createElement("input"); //  Prop Sizing Slider
	pScale.setAttribute("type", "range");
	pScale.setAttribute("min", "0.1")
	pScale.setAttribute("max", "2");
	pScale.setAttribute("step", "0.1");
	pScale.setAttribute("value", "1");
	pScale.classList.add("option-range", "pio");
	pScale.id = "pScale";
	pScale.addEventListener('input', function () {

		currentTarget.style.transform = `scale(${pScale.value})`;

		switch (currentTarget.className) {
			case "prp1 draggableDiv":
				pScaleL.innerText = "Prop Scale: " + pScale.value;
				localStorage.setItem("ps1", pScale.value);
				break;
			case "prp2 draggableDiv":
				pScaleL.innerText = "Prop Scale: " + pScale.value;
				localStorage.setItem("ps2", pScale.value);
				break;
			case "prp3 draggableDiv":
				pScaleL.innerText = "Prop Scale: " + pScale.value;
				localStorage.setItem("ps3", pScale.value);
				break;
			case "prp4 draggableDiv":
				pScaleL.innerText = "Prop Scale: " + pScale.value;
				localStorage.setItem("ps4", pScale.value);
				break;
			case "prp5 draggableDiv":
				pScaleL.innerText = "Prop Scale: " + pScale.value;
				localStorage.setItem("ps5", pScale.value);
				break;
			default:
				break;
		}
	})
	//--------------------------------------------------------------------   []

	function faceedit() {
		let checkbox = document.getElementById("headmove");
		checkbox.checked = true;
		checkbox.dispatchEvent(new Event("change"));
		headdiv.style.boxShadow = "0 0 20px 0 black";

		indicateChange("main");

		var fio = document.querySelectorAll(".fio");
		fio.forEach(function (all) {
			all.classList.add("hide");
		});

		contextMenu.appendChild(cfi);
		contextMenu.appendChild(rfi);
		contextMenu.appendChild(fssl);
		contextMenu.appendChild(fss);
		contextMenu.appendChild(mssl);
		contextMenu.appendChild(mss);
		contextMenu.appendChild(feb);

		var fso = document.querySelectorAll(".fso");
		fso.forEach(function (all) {
			all.classList.remove("hide");
		});

		isFocused = true;
		// hideContextMenu();
	}
	function propedit() {
		//------------------------------------------------------------Props Editing function------------------------------------------------------------------
		let checkbox = document.getElementById("propmove");
		checkbox.checked = true;
		checkbox.dispatchEvent(new Event("change"));

		const draggableDivs = document.querySelectorAll(".draggableDiv");
		draggableDivs.forEach(function (div) {
			div.style.boxShadow = "0rem 0rem 5rem 0rem yellow";
		});

		indicateChange("main");

		hideContextMenu();
	}

	function stopedit() {
		let checkbox1 = document.getElementById("headmove");
		let checkbox2 = document.getElementById("propmove");
		switch (true) {
			case checkbox1.checked:
				checkbox1.checked = false;
				checkbox1.dispatchEvent(new Event("change"));
				break;
			case checkbox2.checked:
				checkbox2.checked = false;
				checkbox2.dispatchEvent(new Event("change"));
				break;
			default:
				console.log("neither true");
		}

		const draggableDivs = document.querySelectorAll(".draggableDiv");
		draggableDivs.forEach(function (div) {
			div.style.boxShadow = "none";
		});

		if (dopt.classList.contains("change")) {
			dopt.classList.remove("change");
		}

		hideContextMenu();
		// if (!isFocused) {
		// 	hideContextMenu();
		// }
	}
	function bto1() {
		var fso = document.querySelectorAll(".fso");
		fso.forEach(function (div) {
			div.classList.add("hide");
		});

		var fio = document.querySelectorAll(".fio");
		fio.forEach(function (all) {
			all.classList.remove("hide");
		});

		headdiv.style.boxShadow = "none";

		if (feb.classList.contains("change")) {
			feb.classList.remove("change");
		}
		stopedit();
		isFocused = false;
	}
	function stopedit2() {
		let checkbox1 = movemouse;
		let checkbox2 = rotatemouse;
		switch (true) {
			case checkbox1.checked:
				// checkbox1.checked = false;
				checkbox1.dispatchEvent(new MouseEvent("click"));
				break;
			case checkbox2.checked:
				// checkbox2.checked = false;
				checkbox2.dispatchEvent(new MouseEvent("click"));
				break;
			default:
				console.log("neither true");
		}
		mousediv.style.boxShadow = "none";
		isFocused = false;
		if (mcmexit.classList.contains("change")) {
			mcmexit.classList.remove("change");
		}
		hideContextMenu();
	}

	function showContextMenu(x, y) {
		document.body.appendChild(contextMenu);
		contextMenu.style.display = "flex";
		contextMenu.style.left = x + "px";
		contextMenu.style.top = y + "px";
	}

	// Event listener for right-click-----------------------------------------Face Context Menu
	headdiv.addEventListener("contextmenu", function (event) {
		event.preventDefault(); // Prevent default context menu
		showContextMenu(event.pageX, event.pageY); // Show custom context menu

		cls();

		contextMenu.appendChild(elam);
		contextMenu.appendChild(fmopt);
		contextMenu.appendChild(pmopt);
		contextMenu.appendChild(dopt);

		var fio = document.querySelectorAll(".fio");
		fio.forEach(function (all) {
			all.classList.remove("hide");
		});
	});

	// Event listener for right-click-----------------------------------------Virtual Mouse Context Menu
	mousediv.addEventListener("contextmenu", function (event) {
		event.preventDefault();
		showContextMenu(event.pageX, event.pageY);

		cls();
		isFocused = false;

		var mios = document.querySelectorAll(".mio");
		// mios.forEach(function(mio){contextMenu.appendChild(mio);})
		contextMenu.appendChild(hideMouse);
		contextMenu.appendChild(moveMouse);
		contextMenu.appendChild(rotateMouse);
		contextMenu.appendChild(flipMouse);
		contextMenu.appendChild(mcmexit);

		mios.forEach(function (all) {
			all.classList.remove("hide");
		});
	});

	//  Event listener for right-click-----------------------------------------Individual Prop Context Menu
	const draggableDivs = Array.from(document.querySelectorAll(".draggableDiv"));
	draggableDivs.forEach((div) => {
		div.addEventListener("contextmenu", function (event) {
			event.preventDefault();
			currentTarget = this;
			showContextMenu(event.pageX, event.pageY);

			cls();

			var ps1 = parseFloat(localStorage.getItem("ps1"));
			var ps2 = parseFloat(localStorage.getItem("ps2"));
			var ps3 = parseFloat(localStorage.getItem("ps3"));
			var ps4 = parseFloat(localStorage.getItem("ps4"));
			var ps5 = parseFloat(localStorage.getItem("ps5"));
			
			switch (this.className) {
				case "prp1 draggableDiv":
					pScaleL.innerText = "Prop Scale: " + ps1;
					pScale.value = parseFloat(ps1);
					break;
				case "prp2 draggableDiv":
					pScaleL.innerText = "Prop Scale: " + ps2;
					pScale.value = parseFloat(ps2);
					break;
				case "prp3 draggableDiv":
					pScaleL.innerText = "Prop Scale: " + ps3;
					pScale.value = parseFloat(ps3);
					break;
				case "prp4 draggableDiv":
					pScaleL.innerText = "Prop Scale: " + ps4;
					pScale.value = parseFloat(ps4);
					break;
				case "prp5 draggableDiv":
					pScaleL.innerText = "Prop Scale: " + ps5;
					pScale.value = parseFloat(ps5);
					break;
				default:
					break;
			}

			var pios = document.querySelectorAll(".pio");

			contextMenu.appendChild(pScaleL);
			contextMenu.appendChild(pScale);
			contextMenu.appendChild(pmopt);
			contextMenu.appendChild(dopt);

			pios.forEach(function (pio) {
				pio.classList.remove("hide");
			});
			pmopt.classList.remove('hide');
			dopt.classList.remove('hide');
		});
	});

	function hideContextMenu() {
		const contextMenu = document.querySelector(".contextMenu");
		if (contextMenu) {
			Array.from(contextMenu.children).forEach(function (child) {
				child.classList.add("hide");
			});

			contextMenu.style.display = "none";
		}
	}

	// Event listener to hide menu when clicking outside
	window.addEventListener("click", function (event) {
		const contextMenu = document.querySelector(".contextMenu");
		if (contextMenu && !contextMenu.contains(event.target) && !isFocused) {
			// stopedit();
			hideContextMenu();
			// isFocused = false;
		}
	});

	function cls() {
		Array.from(contextMenu.children).forEach(function (child) {
			child.classList.add("hide");
		});
	}

	function indicateChange(what) {
		const indicator = what;

		switch (indicator) {
			case "mouse":
				if (!mcmexit.classList.contains("change")) {
					mcmexit.classList.add("change");
				}
				break;
			case "main":
				if (!dopt.classList.contains("change")) {
					dopt.classList.add("change");
				}
				break;
			case "face":
				if (!feb.classList.contains("change")) {
					feb.classList.add("change");
				}
				break;

			default:
				break;
		}
	}
});
