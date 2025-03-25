/**
* Handles damage button clicked
* @param {string} Damage
* @param {object} Field having selected Car Part
* @name damageClickHandler Handles damage button clicked
 */
function damageClickHandler(damage, selectedPart)
{
    let fieldModel = window.imagemap.fieldSet[selectedPart];
    if (fieldModel) {
    	fieldModel.value = damage;
    }  
}

/**
* Highlight hovered image portion
* @name highlightOnHover Highlight hovered image portion
 */
function highlightOnHover() {
    setTimeout(highlight, 1000);
}

function highlight() {
    $('img[usemap]').maphilight();
    window.dispatchEvent(new Event('resize'));
}
