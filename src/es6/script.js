
window.onload = function(){

    console.log('Ready!');

    var Dropdown = function(){

        var dropdownData;
        var dropdownSections;
        var currentValues = [];

        function initializeDropdown(container, data){
            dropdownData = data;
            dropdownSections = document.getElementsByClassName(container);

            generateDropdown();
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
        }

        function closeAllDropdowns(){
            var dropdownLists = document.getElementsByClassName("dropdownList");
            Array.from(dropdownLists).forEach(function(dropdownList){
                dropdownList.classList.remove("active");
                dropdownList.classList.remove("top");
            });
        }

        function setCurrentValues(){
            var label;
            currentValues.forEach(function(currentValue, index){
                if(currentValue){
                    dropdownData.forEach(function(obj){
                        if(obj["id"] == currentValue){
                            label = obj["label"];
                        }
                    });
                    if(!dropdownSections[index].querySelector(".dropdownInput").value) {
                        currentValues[index] = "";
                        label = "";
                    }
                    dropdownSections[index].querySelector(".dropdownInput").value = label;
                } else {
                    dropdownSections[index].querySelector(".dropdownInput").value = "";
                }
            });
            // console.log(currentValues);
        }

        function generateDropdown(){
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

                initializeDropdownEventListeners(dropdownSection);
                generateDropdownList(dropdownSection);
                generateDropdownListItems(dropdownSection, dropdownData);

            });
        }

        function initializeDropdownEventListeners(dropdownSection){
            dropdownSection.querySelector(".dropdownButton").addEventListener("click", function(e){
                e.stopPropagation();
                closeAllDropdowns();
                showDropdownList(dropdownSection);
                dropdownSection.querySelector(".dropdownInput").focus();
                dropdownSection.querySelector(".dropdownInput").value = "";
            });
            dropdownSection.querySelector(".dropdownInput").addEventListener("click", function(e){
                e.stopPropagation();
                closeAllDropdowns();
                showDropdownList(dropdownSection);
                dropdownSection.querySelector(".dropdownInput").value = "";

            });
            dropdownSection.querySelector(".dropdownInput").addEventListener("input", function(e){
                showDropdownList(dropdownSection);
                sortDropdownListItems(e.target.value, dropdownSection);
            });
        }

        function sortDropdownListItems(string, dropdownSection){
            var listItems = dropdownSection.getElementsByClassName("dropdownListItem");
            Array.from(listItems).forEach(function(listItem){
                listItem.classList.remove("invisible");
                if( !(listItem.textContent.startsWith(string) || listItem.textContent.startsWith(string.charAt(0).toUpperCase() + string.slice(1)))){
                    listItem.classList.add("invisible");
                }
            });
        }

        function generateDropdownList(dropdownSection){
            var dropdownList = document.createElement("ul");
            dropdownList.className = "dropdownList";
            dropdownSection.querySelector(".dropdown").appendChild(dropdownList);
        }

        function showDropdownList(dropdownSection){
            if(!dropdownSection.querySelector(".dropdownList").classList.contains("active")){
                dropdownSection.querySelector(".dropdownList").classList.add("active");
                var dropdownListHeight = dropdownSection.querySelector(".dropdownList").offsetHeight;
                var toBottom = getDropdownBottomOffset(dropdownSection);
                if(toBottom < dropdownListHeight && !dropdownSection.querySelector(".dropdownList").classList.contains("top")) {
                    dropdownSection.querySelector(".dropdownList").className += " top";
                } else {
                    dropdownSection.querySelector(".dropdownList").classList.remove("top");
                }
            }
        }

        function generateDropdownListItems(dropdownSection){
            dropdownData.forEach(function(listItem){
                var dropdownListItem = document.createElement("li");
                dropdownListItem.className = "dropdownListItem";
                dropdownListItem.setAttribute("data-id", listItem["id"]);
                dropdownListItem.innerHTML = listItem["label"];
                dropdownListItem.addEventListener("click", function(e){
                    e.stopPropagation();
                    setInputValue(parseInt(e.target.dataset.id), dropdownData, dropdownSection);
                    var currentDropdownNumber = Array.from(dropdownSections).indexOf(dropdownSection);
                    currentValues[currentDropdownNumber] = e.target.dataset.id;
                    closeAllDropdowns();
                });
                dropdownSection.querySelector(".dropdownList").appendChild(dropdownListItem);
            });
        }

        function setInputValue(id, array, dropdownSection){
            var label;
            array.forEach(function(obj){
                if(obj["id"] == id && obj["id"]!== "error"){
                    label = obj["label"];
                }
            });
            dropdownSection.querySelector(".dropdownInput").value = label;
        }

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

    const DROPDOWN_DATA_2 = [
        { "label": "Red", "id": 0 }, 
        { "label": "Blue", "id": 1 }, 
        { "label": "Green", "id": 2 },
        { "label": "Yellow", "id": 3 },
        { "label": "White", "id": 4 },
        { "label": "Brown", "id": 5 },
        { "label": "Pink", "id": 6 },
        { "label": "Black", "id": 7 },
        { "label": "Purple", "id": 8 },
        { "label": "Gray", "id": 9 }
    ]

    var dropdown1 = new Dropdown();
    dropdown1.init("dropdown1", DROPDOWN_DATA_1);

    var dropdown2 = new Dropdown();
    dropdown2.init("dropdown2", DROPDOWN_DATA_2);

}

