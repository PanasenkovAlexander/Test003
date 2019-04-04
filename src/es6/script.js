
window.onload = function(){

    console.log('Ready!');

    var Dropdown = function(){

        var dropdownData;
        var dropdownContainerName;
        var dropdownSections;
        var currentValues = [];

        function initializeDropdown(container, data){
            dropdownData = data;
            dropdownContainerName = container;

            dropdownSections = document.getElementsByClassName(container);

            console.log(dropdownContainerName);

            createDropdown();
            initCurrentValues();
        }

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

        function initCurrentValues(){
            Array.from(dropdownSections).forEach(function(dropdownSection){
                currentValues.push(dropdownSection.querySelector(".dropdownInput").value);
            });
            console.log(currentValues);
        }

        // Closing all dropdowns reseting focus on inputs (when resizing, scrolling and clicking outside of dropdowns)
        function closeAllDropdowns(){
            Array.from(dropdownSections).forEach(function(dropdownSection){
                var dropdownList = dropdownSection.querySelector(".dropdownList");
                if(dropdownList){
                    dropdownList.parentNode.removeChild(dropdownList);
                }
            });
            
        }

        // Setting current values into inputs (when resizing, scrolling and clicking outside of dropdowns)
        function setCurrentValues(){
            var label;
            currentValues.forEach(function(currentValue, index){
                if(currentValue){
                    dropdownData.forEach(function(obj){
                        if(obj["id"] == currentValue){
                            label = obj["label"];
                        }
                    });
                    dropdownSections[index].querySelector(".dropdownInput").value = label;
                } else {
                    dropdownSections[index].querySelector(".dropdownInput").value = "";
                }
            });
            
        }

        function createDropdown(){

            Array.from(dropdownSections).forEach(function(dropdownSection){
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

                dropdownSection.appendChild(wrapper);
                wrapper.appendChild(dropdown);
                dropdown.appendChild(dropdownInput);
                dropdown.appendChild(button);

                initializeEventListeners(dropdownSection);
            })
        }


        function initializeEventListeners(dropdownSection){
            dropdownSection.querySelector(".dropdown").addEventListener("click", function(e){
                e.stopPropagation();
                refreshInputs();
                closeAllDropdowns();
                openDropdownList(dropdownSection);
            });
            dropdownSection.querySelector(".dropdownInput").addEventListener("focus", function(){
                openDropdownList(dropdownSection);
            });
            dropdownSection.querySelector(".dropdownInput").addEventListener("input", function(e){
                openDropdownList(dropdownSection);
                clearDropdownListItems(dropdownSection);
                var sortedArray = getMatchesFromArray(e.target.value);
                generateDropdownListItems(dropdownSection, sortedArray);
            });
        }

        // Getting array of matched objects from objects aray
        function getMatchesFromArray(string){
            var dropdownDataSorted = [];
            if(string){
                dropdownData.forEach(function(item){
                    if(string && (item.label.startsWith(string) || item.label.startsWith(string.charAt(0).toUpperCase() + string.slice(1)))){
                        dropdownDataSorted.push(item);
                    }
                });
                if(dropdownDataSorted.length<=0){
                    dropdownDataSorted = [{"label" : "No matching elements", "id" : "error"}];
                }
            } else {
                dropdownDataSorted = dropdownData;
            }
            return dropdownDataSorted;
        }

        function openDropdownList(dropdownSection){
            if (!dropdownSection.querySelector(".dropdownList")) {
                var dropdownList = document.createElement("ul");
                dropdownList.className = "dropdownList";
                dropdownSection.querySelector(".dropdown").appendChild(dropdownList);
                dropdownSection.getElementsByClassName("dropdownInput")[0].focus();
                dropdownSection.getElementsByClassName("dropdownInput")[0].value="";
                generateDropdownListItems(dropdownSection, dropdownData);
            }
        }

        function generateDropdownListItems(dropdownSection, array){
            array.forEach(function(listItem){
                var dropdownListItem = document.createElement("li");
                dropdownListItem.className = "dropdownListItem";
                dropdownListItem.setAttribute("data-id", listItem["id"]);
                dropdownListItem.innerHTML = listItem["label"];
                dropdownListItem.addEventListener("click", function(e){
                    e.stopPropagation();
                    if(e.target.dataset.id !== "error") {
                        setInputValue(parseInt(e.target.dataset.id), array, dropdownSection);
                        var currentDropdownNumber = Array.from(dropdownSections).indexOf(dropdownSection);
                        currentValues[currentDropdownNumber] = e.target.dataset.id;
                        closeAllDropdowns();
                        console.log(currentValues);
                    }
                });
                if(dropdownSection.querySelector(".dropdownList")){
                    dropdownSection.querySelector(".dropdownList").appendChild(dropdownListItem);
                }
            });
            var dropdownListHeight = dropdownSection.querySelector(".dropdownList").offsetHeight;
            var toBottom = getDropdownBottomOffset(dropdownSection);
            if(toBottom < dropdownListHeight) {
                dropdownSection.querySelector(".dropdownList").className += " top";
            }
        }

        // Setting label into input field by id of element
        function setInputValue(id, array, dropdownSection){
            var label;
            array.forEach(function(obj){
                if(obj["id"] == id && obj["id"]!== "error"){
                    label = obj["label"];
                }
            });
            dropdownSection.querySelector(".dropdownInput").value = label;
        }

        // Clearing dropdown list (before generate new list items with input matches)
        function clearDropdownListItems(dropdownSection){
            if(dropdownSection.querySelector(".dropdownList")){
                dropdownSection.querySelector(".dropdownList").innerHTML = "";
            }
        }

        // Getting bottom offset for dropdown list
        function getDropdownBottomOffset(dropdownSection){
            var windowInnerHeight = window.innerHeight;
            var bottomOffset = dropdownSection.querySelector(".dropdown").getBoundingClientRect().bottom;
            return (windowInnerHeight-bottomOffset);
        }

        return {
            init: initializeDropdown
        }
    }

    const DROPDOWN_DATA_1 = [
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

    var dropdown1 = new Dropdown();
    dropdown1.init("dropdown1", DROPDOWN_DATA_1);

}

