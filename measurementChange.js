/*	measurementChange.js
	Avenging Coders: Alicia Wood, Emily Johnson, Mercedes Gutierrez, Catherine Jones
	DiamondHacksNCSU2016 4/17/2016
*/

console.log("Hello");
var myData = new Firebase("https://boiling-torch-5330.firebaseio.com/");
  
//This function shows the elements previously hidden and populates the table on supersuit_profile.html with
//measurements on a database.
function showData()
{
	document.body.removeAttribute("hidden");

	/*var userID = myData.getAuth()["uid"];
	
	var userData = new Firebase("https://boiling-torch-5330.firebaseio.com/"+userID);	//get data from this user's profile
	myData.on("value", function(snapshot)
		{
			
		},
		function(errorObject)			//error message function
		{
			console.log("The read failed: " + errorObject.code);
		}
	);*/
}
  
function updateData()

{
	console.log("what");
	var userID = myData.getAuth()["uid"];
	
	var measurements = {};				//get this user's measurements from database
	
	//set values in the database from the changeMeasurements form
	measurements["neck"] = document.getElementByName("neck").innerText;
	measurements["bust"] = document.getElementByName("bust").innerText;
	measurements["waist"] = document.getElementByName("waist").innerText;
	measurements["hips"] = document.getElementByName("hips").innerText;
	measurements["inseam"] = document.getElementByName("inseam").innerText;
	measurements["outseam"] = document.getElementByName("outseam").innerText;
	console.log(measurements);								//display in browser console for debug purposes
	
	myData.set(userID, measurements);
	
	//window.location.href = "/supersuit_profile.html";
}
  
//********If user is not logged in, then hid all on webpage and send Google login popup.
//********Once user is logged in, then run function showData().

	document.body.setAttribute("hidden", true);			//make all elements in file hidden
  
	var authData = myData.getAuth();

	if (authData)
	{
	  console.log("User " + authData.uid + " is logged in with " + authData.provider);	//if logged in - show data (window)
	  showData();
	} 
	else
	{
	  console.log("User is logged out");							//if logged out - don't show data in the window (block them)
	}

	  // Create a callback to handle the result of the authentication
	function authHandler(error, authData) 
	{
	  if (error) 
	  {
		console.log("Login Failed!", error);
	  } 
	  else
	  {
		console.log("Authenticated successfully with payload:", authData);	//show data(window)
		showData();
	  }
	}

	//Open pop up so user can login with Gmail
	// Or via popular OAuth providers ("google")
	myData.authWithOAuthPopup("google", authHandler);