"use strict";

/**
 * These extensions are a temporary measure until an annotation mechanism can be added to JSAV
 * We recommend AGAINST using these functions
 */

(function($) {
    /**
     * Creates a left bound indicator above the specified indices
     * Does nothing if the element already has a left bound arrow above it
     */
    JSAV._types.ds.AVArray.prototype.setLeftArrow = JSAV.anim(function(indices) {
        var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

        // Sets the arrow for every element specified
        $elems.each(function(index, item) {
            if (!$elems.hasClass("jsavarrow")) {
                $elems.toggleClass("jsavarrow");
            }

            if ($elems.hasClass("rightarrow")) {
                // If the selected index already has a right arrow, remove it
                // and add leftrightarrow class
                $elems.toggleClass("rightarrow");
                $elems.toggleClass("leftrightarrow");
            } else if (!$elems.hasClass("leftarrow")) {
                // If the index does not have a right arrow, add a left one
                $elems.toggleClass("leftarrow");
            }
        });
    });

    /**
     * Creates a right bound indicator above the specified indices
     * Does nothing if the element already has a right bound arrow above it
     */
    JSAV._types.ds.AVArray.prototype.setRightArrow = JSAV.anim(function(indices) {
        var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

        // Sets the arrow for every element specified
        $elems.each(function(index, item) {
            if (!$elems.hasClass("jsavarrow")) {
                $elems.toggleClass("jsavarrow");
            }

            if ($elems.hasClass("leftarrow")) {
                // If the selected index already has a left arrow, remove it
                // and add leftrightarrow class
                $elems.toggleClass("leftarrow");
                $elems.toggleClass("leftrightarrow");
            } else if (!$elems.hasClass("rightarrow")) {
                // If the index does not have a left arrow, add a right one
                $elems.toggleClass("rightarrow");
            }
        });
    });

    /**
     * Removes a left arrow (if it exists) from above the specified indices
     */
    JSAV._types.ds.AVArray.prototype.clearLeftArrow = JSAV.anim(function(indices) {
        var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

        // Clears the arrow for every element specified
        $elems.each(function(index, item) {
            if ($elems.hasClass("leftrightarrow")) {
                // Replace the shared bound indicator with a right bound indicator
                $elems.toggleClass("leftrightarrow");
                $elems.toggleClass("rightarrow");
            } else if ($elems.hasClass("leftarrow")) {
                // Remove the left arrow
                $elems.toggleClass("leftarrow");
                $elems.toggleClass("jsavarrow");
            }
        });
    });

    /**
     * Removes a right arrow (if it exists) from above the specified indices
     */
    JSAV._types.ds.AVArray.prototype.clearRightArrow = JSAV.anim(function(indices) {
        var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

        // Clears the arrow for every element specified
        $elems.each(function(index, item) {
            if ($(item).hasClass("leftrightarrow")) {
                // Replace the shared bound indicator with a left bound indicator
                $(item).toggleClass("leftrightarrow");
                $(item).toggleClass("leftarrow");
            } else if ($(item).hasClass("rightarrow")) {
                // Remove the right arrow
                $(item).toggleClass("rightarrow");
                $(item).toggleClass("jsavarrow");
            }
        });
    });

    /**
     * Extends the standard swap function to also swap the highlighting associated with each array element
     */
    JSAV._types.ds.AVArray.prototype.swapWithStyle = function(index1, index2) {
        this.swap(index1, index2);
        this.unhighlightBlue(index1);
        this.highlightBlue(index2);
    };
}(jQuery));

/*global alert: true, ODSA, console */
$(document).ready(function() {
    var algo_statement = {
        "av_c1": QS_AV_C1,
        "av_c2": QS_AV_C2,
        "av_c3": QS_AV_C3,
        "av_c4": QS_AV_C4,
        "av_c5": QS_AV_C5,
        "av_c6": QS_AV_C6,
        "av_c7": QS_AV_C7,
        "av_c8": QS_AV_C8,
        "av_c9": QS_AV_C9,
        "av_c10": QS_AV_C10,
        "av_c11": QS_AV_C11,
        "av_c12": QS_AV_C12,
        "av_c13": QS_AV_C13,
        "av_c14": QS_AV_C14,
        "av_c15": QS_AV_C15,
        "av_c16": QS_AV_C16,
        "av_c17": QS_AV_C17,
        "av_c18": QS_AV_C18
    }

    // Execute the "Run" button function
    function runIt() {
        var arrValues = ODSA.AV.processArrayValues();

        // If arrValues is null, the user gave us junk which they need to fix
        if (arrValues) {
            ODSA.AV.reset(true);
            av = new JSAV($(".avcontainer"), { settings: settings });

            // Initialize the original array
            var arr = av.ds.array(arrValues, { indexed: true, layout: $('#jsavsettings-layout').val() });
            av.umsg(algo_statement.av_c18);
            av.displayInit();

            quicksort(arr, 0, arr.size() - 1);

            av.umsg(algo_statement.av_c1);
            av.recorded(); // mark the end
        }
    }

    function quicksort(arr, left, right) {
        av.umsg(algo_statement.av_c2);
        var pivotIndex = Math.floor((left + right) / 2);
        arr.addClass(pivotIndex, "processing");
        av.step();

        av.umsg(algo_statement.av_c3);
        arr.swapWithStyle(pivotIndex, right);
        av.step();

        av.umsg(algo_statement.av_c4);
        arr.setLeftArrow(left);
        arr.setRightArrow(right - 1);
        av.step();
        // finalPivotIndex will be the final position of the pivot
        var finalPivotIndex = partition(arr, left, right - 1, arr.value(right));

        av.umsg(algo_statement.av_c5);
        av.step();

        av.umsg(algo_statement.av_c6);
        arr.toggleArrow(finalPivotIndex);
        arr.swapWithStyle(right, finalPivotIndex);
        arr.removeClass(finalPivotIndex, "processing");
        arr.addClass(finalPivotIndex, "deemph");
        av.step();

        // Sort left partition
        var subArr1 = arr.slice(left, finalPivotIndex);
        if (subArr1.length === 1) {
            av.umsg(algo_statement.av_c7);
            arr.toggleArrow(finalPivotIndex - 1);
            av.step();
            arr.toggleArrow(finalPivotIndex - 1);
            arr.addClass(left, "deemph");
        } else if (subArr1.length > 1) {
            av.umsg(algo_statement.av_c8);
            av.step();
            quicksort(arr, left, finalPivotIndex - 1);
        }

        // Sort right partition
        var subArr2 = arr.slice(finalPivotIndex + 1, right + 1);
        if (subArr2.length === 1) {
            av.umsg(algo_statement.av_c9);
            arr.toggleArrow(finalPivotIndex + 1);
            av.step();
            arr.toggleArrow(finalPivotIndex + 1);
            arr.addClass(finalPivotIndex + 1, "deemph");
        } else if (subArr2.length > 1) {
            av.umsg(algo_statement.av_c10);
            av.step();
            quicksort(arr, finalPivotIndex + 1, right);
        }
    }

    function partition(arr, left, right, pivotVal) {
        var origLeft = left;

        while (left <= right) {
            // Move the left bound inwards
            av.umsg(algo_statement.av_c11);
            av.step();
            while (arr.value(left) < pivotVal) {
                av.umsg(algo_statement.av_c12);
                arr.clearLeftArrow(left);
                left++;
                arr.setLeftArrow(left);
                av.step();
            }

            arr.highlight(left);
            av.umsg(algo_statement.av_c13);
            av.step();

            // Move the right bound inwards
            av.umsg(algo_statement.av_c14);
            av.step();
            // If its desirable to have the right bound continue into sorted sections, replace origLeft with 0
            while ((right > origLeft) && (right >= left) && (arr.value(right) >= pivotVal)) {
                av.umsg(algo_statement.av_c15);
                arr.clearRightArrow(right);
                right--;
                arr.setRightArrow(right);
                av.step();
            }

            if (right > left) {
                arr.highlight(right);
                av.umsg(algo_statement.av_c13);
                av.step();
                // Swap highlighted elements
                av.umsg(algo_statement.av_c16);
                arr.swap(left, right);
                av.step();
                arr.unhighlight([left, right]);
            } else {
                av.umsg(algo_statement.av_c17);
                arr.unhighlight(left);
                av.step();
                break;
            }
        }

        // Clear the arrows and mark the final position of the pivot
        arr.clearLeftArrow(left);
        arr.clearRightArrow(right);
        arr.toggleArrow(left);

        // Return first position in right partition
        return left;
    }

    // Connect action callbacks to the HTML entities
    $("#run").click(runIt);
    $("#reset").click(ODSA.AV.reset);

    var av; // for JSAV library object

    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig(),
        interpret = config.interpreter, // get the interpreter
        settings = config.getSettings(); // Settings for the AV

    // Placeholder text translation needs to be set explicitly
    $("#arrayValues").attr("placeholder", "Scrie valorile din vector separate prin virgulă");

    // add the array layout setting preference
    var arrayLayout = settings.add("layout", {
        "type": "select",
        "options": { "bar": "Dreptunghi", "array": "Vector" },
        "label": "Aspect vector: ",
        "value": "array"
    });

    // Initialize the arraysize dropdown list
    ODSA.AV.initArraySize(5, 12, 8);
});