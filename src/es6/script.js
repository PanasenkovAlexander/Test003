
window.onload = function(){

    console.log('Ready!');

    var Dropdown = function(){

        // Initialization
        const DROPDOWN_DATA = [
            { "label": "Bawcomville", "id": 0 }, 
            { "label": "Rushford", "id": 1 }, 
            { "label": "Bayview Village", "id": 2 },
            { "label": "Oak Grove", "id": 3 },
            { "label": "Smackover", "id": 4 },
            { "label": "Natchez", "id": 5 },
            { "label": "Baton Rouge", "id": 6 },
            { "label": "Fremont", "id": 7 },
            { "label": "Arcadia", "id": 8 },
            { "label": "Cobban", "id": 9 },
            { "label": "Drywood", "id": 10 },
            { "label": "Oakville", "id": 11 }
        ]

        var currentValues = [];

        function initializeDropdowns(amount){
            var dropdownsSection = document.getElementById("dropdowns");
            for(var i=0; i<amount; i++){
                var wrapper = document.createElement("div");
                wrapper.className = "wrapper";
                
                var dropdown = document.createElement("div");
                dropdown.className = "dropdown";
                
                var dropdownInput = document.createElement("input");
                dropdownInput.type = "text";
                dropdownInput.name = "city";
                dropdownInput.className = "dropdownInput";
                dropdownInput.placeholder = "Enter something";
                dropdownInput.autocomplete = "off";
                dropdownInput.required = true;

                var button = document.createElement("button");
                button.className = "btn dropdownButton";
                button.innerHTML = "&#9660;";

                dropdownsSection.appendChild(wrapper);
                wrapper.appendChild(dropdown);
                dropdown.appendChild(dropdownInput);
                dropdown.appendChild(button);
            }
            console.log("Initialized dropdowns");
            initializeEventListeners();
            
        }

        function initializeEventListeners(){
            Array.from(document.getElementsByClassName("dropdown")).forEach(function(dropdown){
                var clickedDropdownNumber;
                dropdown.addEventListener("click", function(e){
                    e.stopPropagation();
                    clickedDropdownNumber = Array.from(document.getElementsByClassName("dropdown")).indexOf(e.target.closest(".dropdown"));
                    openDropdownList(clickedDropdownNumber);
                });
                dropdown.querySelector(".dropdownInput").addEventListener("input", function(e){
                    clearDropdownListItems(clickedDropdownNumber);
                    var sortedArray = getMatchesFromArray(e.target.value, clickedDropdownNumber);
                    generateDropdownListItems(clickedDropdownNumber, sortedArray);
                });
            });
            console.log("Set event listeners for dropdowns and inputs");
            initCurrentValues();
        }

        function initCurrentValues(){
            Array.from(document.getElementsByClassName("dropdown")).forEach(function(dropdown, index){
                currentValues[index] = dropdown.querySelector(".dropdownInput").value;
            });
            console.log("Initial values: ", currentValues);
        }
        // Initial state set

        // ************************************************************************************************ //

        // Setting event listeners for resizing, scrolling and clicking outside of dropdowns
        ["click", "scroll"].forEach(function(e){
            document.addEventListener(e, refreshInputs);
        });

        window.addEventListener("resize", function(){
            refreshInputs();
        });

        function refreshInputs(){
            closeAllDropdowns();
            setCurrentValues();
        }

        // Closing all dropdowns reseting focus on inputs (when resizing, scrolling and clicking outside of dropdowns)
        function closeAllDropdowns(){
            var dropdowns = document.getElementsByClassName("dropdownList");
            Array.from(dropdowns).forEach(function(dropdown){
                dropdown.parentNode.removeChild(dropdown);
            });
        }

        // Setting current values into inputs (when resizing, scrolling and clicking outside of dropdowns)
        function setCurrentValues(){
            var label;
            var dropdown = document.getElementsByClassName("dropdown");
            currentValues.forEach(function(id, index){
                if(id){
                    DROPDOWN_DATA.forEach(function(obj){
                        if(obj["id"] == id){
                            label = obj["label"];
                        }
                    });
                    dropdown[index].querySelector(".dropdownInput").value = label;
                } else {
                    dropdown[index].querySelector(".dropdownInput").value = "";
                }
            });
        }

        // Removing focus state from inputs
        function unfocusAll(){
            
        }

        // Getting array of matched objects from objects aray
        function getMatchesFromArray(string){
            var dropdownDataSorted = [];
            if(string){
                DROPDOWN_DATA.forEach(function(item){
                    if(string && (item.label.startsWith(string) || item.label.startsWith(string.charAt(0).toUpperCase() + string.slice(1)))){
                        dropdownDataSorted.push(item);
                    }
                });
                if(dropdownDataSorted.length<=0){
                    dropdownDataSorted = [{"label" : "No matching elements", "id" : "error"}];
                }
            } else {
                dropdownDataSorted = DROPDOWN_DATA;
            }
            return dropdownDataSorted;
        }

        // Setting label into input field by id of element
        function setInputValue(clickedDropdownNumber, id, array){
            var label;
            var dropdown = document.getElementsByClassName("dropdown");
            array.forEach(function(obj){
                if(obj["id"] == id && obj["id"]!== "error"){
                    label = obj["label"];
                }
            });
            dropdown[clickedDropdownNumber].querySelector(".dropdownInput").value = label;
        }

        // Creating dropdown list for clicked dropdown element
        function openDropdownList(clickedDropdownNumber){
            var dropdown = document.getElementsByClassName("dropdown")[clickedDropdownNumber];
            if (!dropdown.querySelector(".dropdownList")) {
                var dropdownList = document.createElement("ul");
                dropdownList.className = "dropdownList";
                dropdown.appendChild(dropdownList);
                dropdown.getElementsByClassName("dropdownInput")[0].focus();
                dropdown.getElementsByClassName("dropdownInput")[0].value="";
                generateDropdownListItems(clickedDropdownNumber, DROPDOWN_DATA);
            }
        }

        // Generating dropdown list items and adding them into dropdown list, checking size of dropdown list and it's position relative to dropdown element
        function generateDropdownListItems(clickedDropdownNumber, array){
            var dropdown = document.getElementsByClassName("dropdown")[clickedDropdownNumber];
            dropdown.querySelector(".dropdownList").removeAttribute("style");
            dropdown.querySelector(".dropdownList").classList.remove("big");
            array.forEach(function(listItem){
                var dropdownListItem = document.createElement("li");
                dropdownListItem.className = "dropdownListItem";
                dropdownListItem.setAttribute("data-id", listItem["id"]);
                dropdownListItem.innerHTML = listItem["label"];
                dropdownListItem.addEventListener("click", function(e){
                    e.stopPropagation();
                    if(e.target.dataset.id !== "error") {
                        setInputValue(clickedDropdownNumber, parseInt(e.target.dataset.id), array);
                        currentValues[clickedDropdownNumber] = e.target.dataset.id;
                        console.log("Current values: ", currentValues);
                        closeAllDropdowns();
                    }
                });
                dropdown.querySelector(".dropdownList").appendChild(dropdownListItem);
            });
            var dropdownListHeight = dropdown.querySelector(".dropdownList").offsetHeight;
            var toBottom = getDropdownBottomOffset(clickedDropdownNumber, dropdownListHeight);
            console.log(dropdownListHeight);
            if(toBottom < dropdownListHeight) {
                dropdown.querySelector(".dropdownList").className += " top";
            }
        }

        // Clearing dropdown list (before generate new list items with input matches)
        function clearDropdownListItems(clickedDropdownNumber){
            document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").innerHTML = "";
        }

        // Getting bottom offset for dropdown list
        function getDropdownBottomOffset(clickedDropdownNumber){
            var windowInnerHeight = window.innerHeight;
            var bottomOffset = document.getElementsByClassName("dropdown")[clickedDropdownNumber].getBoundingClientRect().bottom;
            return (windowInnerHeight-bottomOffset);
        }

        return {
            init: initializeDropdowns
        }
    }

    var dropdown = new Dropdown();
    dropdown.init(7);

}

