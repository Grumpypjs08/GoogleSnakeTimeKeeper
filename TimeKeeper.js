window.snake.timeKeeper = function(){
	const scripts = document.getElementsByTagName("script");
	let url;
	if(/.*google.*fbx\?fbx=snake_arcade/.test(window.location.href)) {/*If on fbx website*/
		url = scripts[scripts.length - 1].src; /*Source code belongs to the bottom script tag*/
	}
	else if(/.*google.*/.test(window.location.href)) {/*If on google search*/
	    url = scripts[scripts.length - 3].src;/* Source code belongs to fourth from bottom script tag*/
	} 
	else{
		alert("Wrong Website!");
	}

	// xhr to get source code
	const req = new XMLHttpRequest();
	req.open("GET", url);
	req.onload = function() {
		processSnakeCode(this.responseText);
	};
	req.send();

	function processSnakeCode(code){
		let mode = code.match(/case "trophy":a.[a-zA-Z0-9]{1,4}=/)[0];
		mode = mode.substring(mode.indexOf("a.")+2,mode.indexOf("="));
		let count = code.match(/case "count":a.[a-zA-Z0-9]{1,4}=/)[0];
		count = count.substring(count.indexOf("a.")+2,count.indexOf("="));
		let speed = code.match(/case "speed":a.[a-zA-Z0-9]{1,4}=/)[0];
		speed = speed.substring(speed.indexOf("a.")+2,speed.indexOf("="));
		let size = code.match(/case "size":a.[a-zA-Z0-9]{1,4}=/)[0];
		size = size.substring(size.indexOf("a.")+2,size.indexOf("="));

		//function to save pbs to localStorage
		saveTime = function(time,score,mode,count,speed,size){
			time = Math.floor(time);
			let pbs = localStorage.getItem("snake_pbs");
			if(pbs == null){
				pbs = {};
			}
			else{
				pbs = JSON.parse(pbs);
			}
			let name = score.toString()+"-"+mode+"-"+count+"-"+speed+"-"+size;
			if(typeof(pbs[name]) == "undefined" || time < pbs[name].time){
				console.log("NEW PB:");
				pbs[name] = {"time":time,"date":new Date()};
			}
			localStorage.setItem("snake_pbs",JSON.stringify(pbs));
			console.log(time,score,mode,count,speed,size);
		}


		//change function to save times
		let func = code.match(/[a-zA-Z0-9_]{1,6}=function\(a\)[^\\]{0,4000}\(a.[a-zA-Z0-9]{1,4}\*a.[a-zA-Z0-9]{1,4}\)\)[^\\]*?function/g)[0];
		func = func.substring(0,func.lastIndexOf(","));
		let r = func.match(/\(a.[a-zA-Z0-9]{1,4}\*a.[a-zA-Z0-9]{1,4}\)/g)[0];
		let score = func.match(/25!==[^\\]*?&/)[0].replace("25!==","").replace("&","");
		func = func.replace(r+")", "temporary");
		func = func.replace(r+")", r+")"+",saveTime("+r+",\"ALL\",a."+mode+",a."+count+",a."+speed+",a."+size+")")
		func = func.replace("temporary",r+")"+",saveTime("+r+","+score+",a."+mode+",a."+count+",a."+speed+",a."+size+")");
		eval(func);

		//add eventhandler to click on time
		let id = func.match(/[^"]*?"[^"]*?\(a.[a-zA-Z0-9]{1,4}\*a.[a-zA-Z0-9]{1,4}\)/g)[0];
		id = id.substring(0, id.indexOf("\""));
		document.querySelector("div[jsname^=\""+id+"\"]").parentElement.parentElement.addEventListener("click",(e)=>{
			let getSelectedIndex = function(name){
				let elementList = document.getElementById(name);
				let number = 0;
				let classNames = [];
				let notUnique = "";
				for(element of elementList.children){
					if(classNames.indexOf(element.className) == -1){
						classNames.push(element.className);		
					}
					else{
						notUnique = element.className;
						break;
					}
				}
				for(element of elementList.children){
					if(element.className != notUnique){
						return number;
					}
					number++;
				}
				return 0;
			}
			let mode = getSelectedIndex("trophy");
			let count = getSelectedIndex("count");
			let speed = getSelectedIndex("speed");
			let size = getSelectedIndex("size");

			let pbs = localStorage.getItem("snake_pbs");
			if(pbs == null){
				pbs = {};
			}
			else{
				pbs = JSON.parse(pbs);
			}
			let message = "Your pbs are:\n"
			for(let score of ["25","50","100","ALL"]){
				let name = score+"-"+mode+"-"+count+"-"+speed+"-"+size;
				if(typeof(pbs[name]) != "undefined"){
					minutes = Math.floor(pbs[name].time/60000);
					seconds = Math.floor((pbs[name].time-minutes*60000)/1000);
					mseconds = pbs[name].time-minutes*60000-seconds*1000;
					if(minutes.toString().length < 2){minutes = "0"+minutes.toString()}
					if(seconds.toString().length < 2){seconds = "0"+seconds.toString()}
					while(mseconds.toString().length < 3){mseconds = "0"+mseconds.toString()}
					message+=score+": "+minutes+":"+seconds+":"+mseconds+" "+new Date(pbs[name].date).toString()+"\n";
				}
			}
			alert(message);
			console.log(message);
			e.preventDefault();
		});
	}
}
window.snake.timeKeeper();
window.snake.speedrun();