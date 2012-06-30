//Yusef Hassan
//MIU 0512
//Project 3

var parseAccountInfo = function(data){
		console.log(data);
};

$(document).bind('pageinit',function(){

	var aiform = $("#addAccount");
	
	aiform.validate();
	});
	
	{
	var	invalidHandler = function (form, validator){},
		submitHandler = function(){
			var data = aiform.serializeArray();
			parseAccountInfo(data);
		}
	}
;

//wait till DOM is ready

	//get element by ID function
	function e(x){
		var elemental = document.getElementById(x);
		return elemental;
	}
	
	//create select field element, populate with options
	function wheelHouse(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = e("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "groups");
		//comeback to type of media
	//	selectLi.appendChild(makeSelect);
	}
	
	//find value of radio button
	function getSelectedRadio(){
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}
	}
	
	function getCheckBoxValue(){
		if(e("reliable").checked){
			reliableValue = e("reliable").value;
		}else{
			reliableValue = "No"
		}

		if(e("job").checked){
			jobValue = e("job").value;
		}else{
			jobValue = "No"
		}
		
		if(e("replace").checked){
			replaceValue = e("replace").value;
		}else{
			replaceValue = "No"
		}

		if(e("trust").checked){
			trustValue = e("trust").value;
		}else{
			trustValue = "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				e("foot").style.display = "none";
				e("allInfo").style.display = "inline";
				e("accountInfo").style.display = "none";
				e("remove").style.display = "inline";
				e("allAccounts").style.display = "none";
				e("addAccount").style.display = "inline";
				break;
			case "off":
				e("accountInfo").style.display = "block";
				e("remove").style.display = "inline";
				e("allAccounts").style.display = "inline";
				e("addAccount").style.display = "none";
				e("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function saveData(key){
		if(!key){
			var id = Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getSelectedRadio();
		getCheckBoxValue();		
		var item = {};
			item.fname =["First Name:", e("fname").value];
			item.lname =["Last Name:", e("lname").value];
			item.sex =["Sex:", sexValue];
			item.age =["Age:", e("ageRange").value];
			item.reliable =["Is the borrower reliable?", reliableValue];
			item.job =["Do they have a job?", jobValue];
			item.replace =["If broken, could they replace it?", replaceValue];
			item.trust =["Do you fully trust them?", trustValue];
			item.media =["Media:", e("media").value];
			item.dname =["Disc Name:", e("dname").value];
			item.value =["Value:", e("value").value];
			item.ldate =["Date Lent:", e("ldate").value];
			item.rdate =["Expected Return Date:", e("rdate").value];
			item.comments =["Anymore Information?", e("comments").value];

		localStorage.setItem(id, JSON.stringify(item));
		alert("Information Logged");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("No saved accounts, default data added.");
			autoFillData();
		}
		var makeDiv = $("#allInfo");
		makeDiv.attr("datarole", "content");
		makeDiv.append("<ul id=" + "makelist")
		var makeList = $("#allInfo");
		makeList.attr({
            dataRole:"listview",
            dataInset:"true",
            dataFilter:"true"
        });

		//document.body.appendChild(makeDiv);
		e("items").style.display = "block";
		for(var i = 0, len = localStorage.length; i<len; i++){
			var makeli = document.createElement("li");
			var linksLi = document.createElement("li");
			
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
	//		getImage(obj.group[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	function getImage(catName, makeSubList){
		var imageLi = $("<li></li>");
		makeSubList.append(imageLi);
		var newImg = $("<img />");
		newImg.attr("src", "images/"+ catName + ".png");
		imageLi.append(newImg);
	}
	//make Item links function, creates edit and delete links
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Info";
		$(editLink).bind("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Info";
		$(deleteLink).bind("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		toggleControls("off");
		
		$("#fname").value = item.fname[1];
		$("#lname").value = item.lname[1];
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Male" && item.sex[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Female" && item.sex[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
	/*	e("ageRange").value = item.age[1];		
		
		if(item.reliable[1] == "Yes"){
			e("reliable").setAttribute("checked", "checked");
		}
		if(item.job[1] == "Yes"){
			e("job").setAttribute("checked", "checked");
		}
		if(item.replace[1] == "Yes"){
			e("replace").setAttribute("checked", "checked");
		}
		if(item.trust[1] == "Yes"){
			e("trust").setAttribute("checked", "checked");
		}*/
		$("#dname").value = item.dname[1];
		$("#value").value = item.value[1];
		$("#ldate").value = item.ldate[1];
		$("#rdate").value = item.rdate[1];
		$("#comments").value = item.comments[1];
		
		$(save).unbind("click", saveData);
		$("#submit").value = "Edit Contact";
		var editSubmit = $("#submit");
		$(editSubmit).bind("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Delete contact?")
		if (ask){
			localStorage.removeItem(this.key);
			window.location.reload();
		}else{
			alert("Contact not removed")
		}
	}
	
	function deleteData(){
		if(localStorage.legnth === 0){
			alert("Nothing to delete!")
		}else{
			localStorage.clear();
			alert("All accounts deleted.");
			window.location.reload();
			return false;
		}
	}
	
	function validate(d){
		var getDname = e("dname");
		var getFname = e("fname");
		var getLname = e("lname");
		
			getDname.style.border = "1px solid black";
			getFname.style.border = "1px solid black";
			getLname.style.border = "1px solid black";

		var message = [];

		
		if(getFname.value === ""){
			var fnameError = "Please Type in First Name.";
				$("#fname").css({
					borderColor: "#ff0000",
					hight: "1px",
				});
			message.push(fnameError);
		}
		if(getLname.value === ""){
			var lnameError = "Please Type in Last Name.";
				$("#lname").css({
					borderColor: "#ff0000",
					hight: "1px",
				});
			message.push(lnameError);
		}
		if(getDname.value === ""){
			var dnameError = "Please Type in Disc Name.";
				$("#dname").css({
					borderColor: "#ff0000",
					hight: "1px",
				});
			message.push(dnameError);
		}
		if (message.length >= 1){
			for(var i=0, j=message.length; i < j; i++){
				var text = $("li");
				text.html = message[i];
			}
			alert(message);
			return false;
		}else{
			saveData(this.key);
		}
	} 
	// variable defaults
	var sexValue,
		reliableValue = "No",
		jobValue = "No",
		replaceValue = "No",
		trustValue = "No",
		errMsg = e("errors")
	;
	wheelHouse();
	
	//links and submit button
	$("#remove").bind("click", deleteData);
	$("#allAccounts").bind("click", getData);
	$("#submit").bind("click", validate);

