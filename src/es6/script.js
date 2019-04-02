
window.onload = function(){

    console.log('Ready!');

    var Dropdown = function(){

        const DROPDOWN_DATA = [
            { "label": "Bawcomville", "id": 0 }, 
            { "label": "Rushford", "id": 1 }, 
            { "label": "Bayview", "id": 2 },
            { "label": "Oak Grove", "id": 3 },
            { "label": "Smackover", "id": 4 },
            { "label": "Natchez", "id": 5 },
            { "label": "Baton Rouge", "id": 6 }
        ]

        Array.from(document.getElementsByClassName("dropdown")).forEach(function(dropdown){
            dropdown.addEventListener("click", function(e){
                e.stopPropagation();
                var clickedDropdownNumber = Array.from(document.getElementsByClassName("dropdown")).indexOf(e.target.closest(".dropdown"));
                toggleDropdown(clickedDropdownNumber);
            })
        });

        document.addEventListener("click", function(){
            closeAllDropdowns();
        });

        function toggleDropdown(clickedDropdownNumber){
            if (!document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList")) {
                var dropdownList = document.createElement("ul");
                var dropdown = document.getElementsByClassName("dropdown")[clickedDropdownNumber];
                dropdownList.className = "dropdownList";
                dropdown.appendChild(dropdownList);
                dropdown.getElementsByClassName("dropdownInput")[0].focus();
                dropdown.getElementsByClassName("dropdownInput")[0].value="";
                generateDropdownListItems(clickedDropdownNumber);
            } else {
                var elem = document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList");
                elem.parentNode.removeChild(elem);
            }
        }

        function generateDropdownListItems(clickedDropdownNumber){
            DROPDOWN_DATA.forEach(function(listItem){
                var dropdownListItem = document.createElement("li");
                dropdownListItem.className = "dropdownListItem";
                dropdownListItem.innerHTML = listItem["label"];
                document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").appendChild(dropdownListItem);
            });
            // console.log(DROPDOWN_DATA.length);
            var dropdownListHeight = document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").offsetHeight;
            var dropdownListHeightRequired = dropdownListHeight*5/DROPDOWN_DATA.length;
            if(DROPDOWN_DATA.length > 5) {
                document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").style.height = dropdownListHeightRequired + "px";
                document.getElementsByClassName("dropdown")[clickedDropdownNumber].querySelector(".dropdownList").className += " big";
            }
            // console.log(dropdownListHeight);
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

