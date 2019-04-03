
window.onload = function(){

    console.log('Ready!');

    var Dropdown = function(){

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

        Array.from(document.getElementsByClassName("dropdown")).forEach(function(dropdown){
            var clickedDropdownNumber;
            dropdown.addEventListener("click", function(e){
                e.stopPropagation();
                clickedDropdownNumber = Array.from(document.getElementsByClassName("dropdown")).indexOf(e.target.closest(".dropdown"));
                toggleDropdown(clickedDropdownNumber);
            });
            dropdown.querySelector(".dropdownInput").addEventListener("input", function(e){
                clearDropdownListItems(clickedDropdownNumber);
                var sortedArray = getLabelsFromArray(e.target.value, clickedDropdownNumber);
                console.log(sortedArray, clickedDropdownNumber);
                generateDropdownListItems(clickedDropdownNumber, sortedArray);
            });
        });

        document.addEventListener("click", function(){
            closeAllDropdowns();
        });

        function getLabelsFromArray(string){
            console.log("Input is: " + string);
            var dropdownDataSorted = [];
            if(string){
                DROPDOWN_DATA.forEach(function(item){
                    if(string && (item.label.startsWith(string) || item.label.startsWith(string.charAt(0).toUpperCase() + string.slice(1)))){
                        dropdownDataSorted.push(item);
                    }
                });
            } else {
                dropdownDataSorted = DROPDOWN_DATA;
            }
            return dropdownDataSorted;
        }

        function setInputValue(clickedDropdownNumber, id, array){
            var label;
            array.forEach(function(obj){
                if(obj["id"] == id){
                    console.log("Obj Id: " + obj["id"]);
                    label = obj["label"];
                }
            })
            document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownInput").value = label;
        }

        function toggleDropdown(clickedDropdownNumber){
            if (!document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList")) {
                var dropdownList = document.createElement("ul");
                var dropdown = document.getElementsByClassName("dropdown")[clickedDropdownNumber];
                dropdownList.className = "dropdownList";
                dropdown.appendChild(dropdownList);
                dropdown.getElementsByClassName("dropdownInput")[0].focus();
                dropdown.getElementsByClassName("dropdownInput")[0].value="";
                generateDropdownListItems(clickedDropdownNumber, DROPDOWN_DATA);
            } else {
                var elem = document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList");
                elem.parentNode.removeChild(elem);
            }
        }

        function generateDropdownListItems(clickedDropdownNumber, array){
            document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").removeAttribute("style");
            document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").classList.remove("big");
            array.forEach(function(listItem){
                var dropdownListItem = document.createElement("li");
                dropdownListItem.className = "dropdownListItem";
                dropdownListItem.setAttribute("data-id", listItem["id"]);
                dropdownListItem.innerHTML = listItem["label"];
                dropdownListItem.addEventListener("click", function(e){
                    setInputValue(clickedDropdownNumber, parseInt(e.target.dataset.id), array);
                });
                document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").appendChild(dropdownListItem);
            });
            var dropdownListHeight = document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").offsetHeight;
            var dropdownListHeightRequired = dropdownListHeight*5/array.length;
            console.log("sorted array length: " + array.length);
            if(array.length > 5) {
                document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").style.height = dropdownListHeightRequired + "px";
                document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").className += " big";
            }
            var toBottom = getDropdownBottomOffset(clickedDropdownNumber, dropdownListHeightRequired);
            console.log(toBottom, dropdownListHeightRequired);
            if(toBottom < dropdownListHeightRequired) {
                document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").className += " top";
            }
        }

        function closeAllDropdowns(){
            var dropdowns = document.getElementsByClassName("dropdownList");
            Array.from(dropdowns).forEach(function(dropdown){
                dropdown.parentNode.removeChild(dropdown);
            });
        }

        function clearDropdownListItems(clickedDropdownNumber){
            document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").innerHTML = "";
        }

        function getDropdownBottomOffset(clickedDropdownNumber){
            var windowInnerHeight = window.innerHeight;
            var bottomOffset = document.getElementsByClassName("dropdown")[clickedDropdownNumber].getBoundingClientRect().bottom;
            console.log("To bottom: " + (windowInnerHeight-bottomOffset));
            return (windowInnerHeight-bottomOffset);
        }

        function initializeDropdown(){
            console.log("Dropdown Initialized!");
        }

        return {
            init: initializeDropdown
        }
    }

    var dropdown = new Dropdown();
    dropdown.init();

}

