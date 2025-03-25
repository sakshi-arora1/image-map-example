(function () {
    
    window.imagemap = {};
    let fieldSet = window.imagemap.fieldSet = {};
    
    const COLOURS = {
        "HighDamage": "8B0000",
        "ModerateDamage": "FF8C00",
        "LowDamage": "FFC200"
    };
    
    const OPACITY = {
        "HighDamage": 0.9,
        "ModerateDamage": 0.7,
        "LowDamage": 0.6
    };
    
    $(function() {
        $(document).ready(function() {
            $('img[usemap]').maphilight();
            $('map').imageMapResize();
        });
    });
    
    let handleFileLoad = function(event) {
        document.getElementById('carImageDisplay').src = event.target.result;
    }
    
    let handleFileSelect = function(event) {
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsDataURL(event.target.files[0]);
    }
    
    let damageCarAttachment = document.querySelector('[name="damagedCarPicture"]');
    let imageDisplayElement = document.createElement('img');
    if (damageCarAttachment) {
    imageDisplayElement.src = "";
    imageDisplayElement.id = "carImageDisplay";
    damageCarAttachment.closest('.cmp-adaptiveform-fileinput__container').append(imageDisplayElement);
    damageCarAttachment.addEventListener('change', handleFileSelect, false);
    }

    let handleFormInitialization = function(event) {
        let formContainerView = event.detail;
        let formElement = formContainerView.getFormElement();
        let mapImageComponents = formElement.querySelectorAll('map');
        let handleMapImage = function(mapImage) {
            let imageContainerModelId = mapImage.closest('[data-cmp-is="adaptiveFormPanel"]').getAttribute("id");
            let imageContainerModel = formContainerView.getModel(imageContainerModelId);
            let selectedPartModel = imageContainerModel.parent.items[1].items[0];
            let imageFields = mapImage.querySelectorAll('[data-image-af-field]');
            let accessibleContainerModel = imageContainerModel.parent.parent.items[1];
            imageFields.forEach((imageField) => {
                imageField.addEventListener("click",(clickEvent) => {
                    selectedPartModel.value = clickEvent.target.getAttribute('data-image-af-field');
                });
            });
            accessibleContainerModel.items.forEach((fieldModel) => {
                let fieldName = fieldModel.name;
                fieldSet[fieldName] = fieldModel;
                fieldModel.subscribe((action) => {
                    let changes = action.payload.changes;
                    changes.forEach(change => {
                        if (change.propertyName === 'value') {
                            let damage = fieldModel.value;
                            let mapFields = mapImage.querySelectorAll('[data-image-af-field="' + fieldName + '"]');
                            if (damage != "NoDamage") {
                                mapFields.forEach((area) => {
                                    $(area).data('maphilight', { alwaysOn: true, fillOpacity: OPACITY[damage], fillColor: COLOURS[damage]}).trigger('alwaysOn.maphilight');
                                });
                            } else {
                                mapFields.forEach((area) => {
                                    $(area).data('maphilight', { alwaysOn: false }).trigger('alwaysOn.maphilight');
                                });
                            }
                        }
                    });
                });
            });
        };
        mapImageComponents.forEach(handleMapImage);
    };

    document.addEventListener("AF_FormContainerInitialised", handleFormInitialization);

})();