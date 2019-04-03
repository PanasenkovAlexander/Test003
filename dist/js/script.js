(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

window.onload = function () {

    console.log('Ready!');

    var Dropdown = function Dropdown() {

        var dropdownData;
        var dropdownContainerName;
        var dropdownsSection;
        var currentValue;

        function initializeDropdown(container, data) {
            dropdownData = data;
            dropdownContainerName = container;
            dropdownsSection = document.getElementById(container);
            console.log(dropdownData);
            console.log(dropdownContainerName);
            console.log(dropdownsSection);

            createDropdown();
        }

        ["click", "scroll"].forEach(function (e) {
            document.addEventListener(e, refreshInputs);
        });

        window.addEventListener("resize", function () {
            refreshInputs();
        });

        function refreshInputs() {
            closeAllDropdowns();
            setCurrentValues();
        }

        // Closing all dropdowns reseting focus on inputs (when resizing, scrolling and clicking outside of dropdowns)
        function closeAllDropdowns() {
            var dropdownList = dropdownsSection.querySelector(".dropdownList");
            if (dropdownList) {
                dropdownList.parentNode.removeChild(dropdownList);
            }
        }

        // Setting current values into inputs (when resizing, scrolling and clicking outside of dropdowns)
        function setCurrentValues() {
            var label;
            if (currentValue) {
                dropdownData.forEach(function (obj) {
                    if (obj["id"] == currentValue) {
                        label = obj["label"];
                    }
                });
                dropdownsSection.querySelector(".dropdownInput").value = label;
            } else {
                dropdownsSection.querySelector(".dropdownInput").value = "";
            }
        }

        function createDropdown() {

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

            console.log("Initialized dropdown in section: " + dropdownContainerName);
            initializeEventListeners();
        }

        function initializeEventListeners() {
            dropdownsSection.querySelector(".dropdown").addEventListener("click", function (e) {
                e.stopPropagation();
                openDropdownList();
            });
            dropdownsSection.querySelector(".dropdownInput").addEventListener("input", function (e) {
                clearDropdownListItems();
                var sortedArray = getMatchesFromArray(e.target.value);
                generateDropdownListItems(sortedArray);
            });
        }

        // Getting array of matched objects from objects aray
        function getMatchesFromArray(string) {
            var dropdownDataSorted = [];
            if (string) {
                dropdownData.forEach(function (item) {
                    if (string && (item.label.startsWith(string) || item.label.startsWith(string.charAt(0).toUpperCase() + string.slice(1)))) {
                        dropdownDataSorted.push(item);
                    }
                });
                if (dropdownDataSorted.length <= 0) {
                    dropdownDataSorted = [{ "label": "No matching elements", "id": "error" }];
                }
            } else {
                dropdownDataSorted = dropdownData;
            }
            return dropdownDataSorted;
        }

        function openDropdownList() {
            if (!dropdownsSection.querySelector(".dropdownList")) {
                var dropdownList = document.createElement("ul");
                dropdownList.className = "dropdownList";
                dropdownsSection.querySelector(".dropdown").appendChild(dropdownList);
                dropdownsSection.getElementsByClassName("dropdownInput")[0].focus();
                dropdownsSection.getElementsByClassName("dropdownInput")[0].value = "";
                generateDropdownListItems(dropdownData);
            }
        }

        function generateDropdownListItems(array) {
            array.forEach(function (listItem) {
                var dropdownListItem = document.createElement("li");
                dropdownListItem.className = "dropdownListItem";
                dropdownListItem.setAttribute("data-id", listItem["id"]);
                dropdownListItem.innerHTML = listItem["label"];
                dropdownListItem.addEventListener("click", function (e) {
                    e.stopPropagation();
                    if (e.target.dataset.id !== "error") {
                        setInputValue(parseInt(e.target.dataset.id), array);
                        currentValue = e.target.dataset.id;
                        console.log("Current value: ", currentValue);
                        closeAllDropdowns();
                    }
                });
                dropdownsSection.querySelector(".dropdownList").appendChild(dropdownListItem);
            });
            var dropdownListHeight = dropdownsSection.querySelector(".dropdownList").offsetHeight;
            var toBottom = getDropdownBottomOffset(dropdownListHeight);
            console.log(dropdownListHeight);
            console.log(toBottom);
            if (toBottom < dropdownListHeight) {
                dropdownsSection.querySelector(".dropdownList").className += " top";
            }
        }

        // Setting label into input field by id of element
        function setInputValue(id, array) {
            var label;
            array.forEach(function (obj) {
                if (obj["id"] == id && obj["id"] !== "error") {
                    label = obj["label"];
                }
            });
            dropdownsSection.querySelector(".dropdownInput").value = label;
        }

        // Clearing dropdown list (before generate new list items with input matches)
        function clearDropdownListItems() {
            dropdownsSection.querySelector(".dropdownList").innerHTML = "";
        }

        // Getting bottom offset for dropdown list
        function getDropdownBottomOffset() {
            var windowInnerHeight = window.innerHeight;
            var bottomOffset = dropdownsSection.querySelector(".dropdown").getBoundingClientRect().bottom;
            return windowInnerHeight - bottomOffset;
        }

        return {
            init: initializeDropdown
        };
    };

    var DROPDOWN_DATA_1 = [{ "label": "Bawcomville", "id": 0 }, { "label": "Rushford", "id": 1 }, { "label": "Bayview Village", "id": 2 }, { "label": "Oak Grove", "id": 3 }, { "label": "Smackover", "id": 4 }, { "label": "Natchez", "id": 5 }, { "label": "Baton Rouge", "id": 6 }, { "label": "Fremont", "id": 7 }, { "label": "Arcadia", "id": 8 }, { "label": "Cobban", "id": 9 }, { "label": "Drywood", "id": 10 }, { "label": "Oakville", "id": 11 }];

    var DROPDOWN_DATA_2 = [{ "label": "Blue", "id": 0 }, { "label": "Green", "id": 1 }, { "label": "Red", "id": 2 }, { "label": "Yellow", "id": 3 }, { "label": "Gray", "id": 4 }, { "label": "Orange", "id": 5 }, { "label": "Black", "id": 6 }, { "label": "Purple", "id": 7 }, { "label": "White", "id": 8 }];

    var dropdown1 = new Dropdown();
    dropdown1.init("dropdown1", DROPDOWN_DATA_1);

    var dropdown2 = new Dropdown();
    dropdown2.init("dropdown2", DROPDOWN_DATA_2);
};

},{}]},{},[1]);

//# sourceMappingURL=script.js.map
